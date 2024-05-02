import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { EventEmitter } from "events";

export default class Resources extends EventEmitter {
  assets: any;
  items: {
    [key: string]: GLTF;
  };
  loaders: {
    dracoLoader: DRACOLoader;
    gltfLoader: GLTFLoader;
  };
  loaded = 0;
  queue = 0;
  video: {
    [key: string]: HTMLVideoElement;
  };
  videoTextures: {
    [key: string]: THREE.VideoTexture;
  };

  constructor(assets: any) {
    super();

    this.assets = assets;

    // 存放模型和贴图
    this.items = {};
    this.loaded = 0;
    this.queue = this.assets.length;

    this.setLoaders();
    this.setLoading();
  }

  setLoaders() {
    // 设置加载器
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.dracoLoader = new DRACOLoader();
    this.loaders.dracoLoader.setDecoderPath("/draco/");
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
  }

  setLoading() {
    for (const asset of this.assets) {
      if (asset.type == "glbModel") {
        this.loaders.gltfLoader.load(asset.path, (file) => {
          this.singleAssetLoaded(asset.name, file);
        });
      } else if (asset.type == "videoTexture") {
        this.video = {};
        this.video[asset.name] = document.createElement("video");
        this.video[asset.name].src = asset.path;
        this.video[asset.name].playsInline = true;
        this.video[asset.name].autoplay = true;
        this.video[asset.name].loop = true;
        this.video[asset.name].muted = true;
        this.video[asset.name].play();

        // texture
        this.videoTextures = {};
        this.videoTextures[asset.name] = new THREE.VideoTexture(
          this.video[asset.name]
        );

        this.videoTextures[asset.name].flipY = true;
        this.videoTextures[asset.name].minFilter = THREE.NearestFilter;
        this.videoTextures[asset.name].magFilter = THREE.NearestFilter;
        this.videoTextures[asset.name].generateMipmaps = false;
        this.videoTextures[asset.name].encoding = THREE.sRGBEncoding;
        this.singleAssetLoaded(asset.name, this.videoTextures[asset.name]);
      }
    }
  }

  singleAssetLoaded(path: string, file: GLTF | THREE.VideoTexture) {
    this.items[path] = file;
    this.loaded++;
    if (this.loaded === this.queue) {
      // 加载完成
      this.emit("ready");
    }
  }
}

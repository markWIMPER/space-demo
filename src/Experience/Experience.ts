import * as THREE from "three";

import assets from "./Utils/assets";

import Time from "./Utils/Time";
import Sizes from "./Utils/Sizes";
import Camera from "./Camera";
import Renderer from "./Renderer";
import Resources from "./Utils/Resources";
import Theme from "./Theme";
import World from "./World/World";

/**
 * 初始化ROOM
 */
export default class Experience {
  static instance: Experience | null;
  canvas?: HTMLCanvasElement;
  scene: THREE.Scene;
  time: Time;
  sizes: Sizes;
  camera: Camera;
  renderer: Renderer;
  resources: Resources;
  theme: Theme;
  world: World;
  preloader: any;
  controls: any;

  constructor(canvas?: HTMLCanvasElement) {
    if (Experience.instance) {
      // 直接读取缓存
      return Experience.instance;
    }

    Experience.instance = this;
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.time = new Time();
    this.sizes = new Sizes();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resources = new Resources(assets);

    // this.theme = new Theme();
    this.world = new World();
    // this.preloader = new Preloader();

    // this.preloader.on("enablecontrols", () => {
    //   this.controls = new Controls();
    // });

    this.sizes.on("resize", () => {
      this.resize();
    });
    this.time.on("update", () => {
      this.update();
    });
  }

  resize() {
    this.camera.resize();
    this.world.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.renderer.update();
    this.world.update();
  }
}

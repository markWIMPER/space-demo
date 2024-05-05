import Experience from "./Experience";
import * as THREE from "three";

export default class Renderer {
  experience: Experience;
  sizes: any;
  scene: any;
  canvas: any;
  camera: any;
  renderer: THREE.WebGLRenderer;
  composer: EffectComposer;

  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;

    this.setRenderer();
  }

  setRenderer() {
    // debugger;
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    // 三维渲染器的物理正确光线追踪功能为开启状态
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.CineonToneMapping;
    this.renderer.toneMappingExposure = 1.75;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
  }

  resize() {
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    /* 透视相机 */
    // this.renderer.render(this.scene, this.camera.perspectiveCamera);
    /* 正交相机 */
    this.renderer.render(this.scene, this.camera.orthographicCamera);
  }
}

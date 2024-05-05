import Experience from "./Environment";

export default class Controls {
  constructor(camera) {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };
  }
}

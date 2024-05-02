import * as THREE from "three";
import Experience from "../Experience";

export default class Environment {
  experience: Experience;
  sunLight: THREE.DirectionalLight;

  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.setSunLight();
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight("#ffffff", 3);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 20;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(1.5, 7, 3);
    this.scene.add(this.sunLight);

    const light = new THREE.AmbientLight("#ffffff", 1); // soft white light
    this.scene.add(light);
  }
}

import * as THREE from "three";
import Experience from "../Experience";

export default class Room {
  experience: Experience;
  scene: any;
  resources: any;
  room: THREE.Group<THREE.Object3DEventMap>;
  actualRoom: any;

  constructor() {
    this.experience = new Experience();
    this.time = this.experience.time;
    this.scene = this.experience.scene;
    this.resources = this.experience.world.resources;
    this.room = this.resources.items.room as THREE.Group;
    this.actualRoom = this.room.scene;
    this.setModel();

    /* 设置鱼动画 */
    this.setAnimation();
  }

  setModel() {
    this.actualRoom.children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child instanceof THREE.Group) {
        child.children.forEach((groupChild) => {
          groupChild.castShadow = true;
          groupChild.receiveShadow = true;
        });
      }
      if (child.name === "Computer") {
        child.children[1].material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen,
        });
      }
      if (child.name === "Aquarium") {
        child.children[0].material = new THREE.MeshPhysicalMaterial();
        child.children[0].material.roughness = 0;
        child.children[0].material.color.set(0x549dd2);
        child.children[0].material.ior = 3;
        child.children[0].material.transmission = 1;
        child.children[0].material.opacity = 1;
      }
    });
    this.actualRoom.scale.set(0.11, 0.11, 0.11);
    this.scene.add(this.actualRoom);
  }

  setAnimation() {
    this.mixer = new THREE.AnimationMixer(this.actualRoom);
    this.swim = this.mixer.clipAction(this.room.animations[0]);
    this.swim.play();
  }

  update() {
    this.mixer.update(this.time.delta * 0.0009);
  }
}

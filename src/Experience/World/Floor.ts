import * as THREE from "three";
import Experience from "../Experience";

export default class Floor {
  geometry: THREE.PlaneGeometry;
  material: THREE.MeshBasicMaterial;
  plane: THREE.Mesh<any, any, THREE.Object3DEventMap>;
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.setFloor();
  }

  setFloor() {
    this.geometry = new THREE.PlaneGeometry(100, 100);
    this.material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.BackSide,
    });

    this.plane = new THREE.Mesh(this.geometry, this.material);

    /* 调整位置 */
    this.plane.rotation.x = Math.PI / 2;
    this.plane.position.y = -0.3;
    this.plane.receiveShadow = true;
    this.scene.add(this.plane);
  }
}

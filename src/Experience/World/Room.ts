import * as THREE from "three";
import Experience from "../Experience";
import gasp from "gsap";

export default class Room {
  experience: Experience;
  scene: any;
  resources: any;
  room: THREE.Group<THREE.Object3DEventMap>;
  actualRoom: any;
  lerp = {
    current: 0,
    target: 0,
    ease: 0.1,
  };

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

    /* 鼠标移动交互 */
    this.mouseMoveEvent();
  }

  setModel() {
    // 创建自定义的发光效果着色器
    const glowShader = {
      uniforms: {
        color: { value: new THREE.Color(0x483d8b) }, // 设置发光的颜色
      },
      vertexShader: `
        uniform vec3 u_color;
          uniform float time;
          uniform float u_height;
          varying float v_opacity;
          void main() {
              vec3 vPosition = position;
              v_opacity = mix(1.0, 0.0, position.y / u_height * 1.0) * (1.0 + sin(time) * 0.5);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1);
          }
      `,
      fragmentShader: `
        uniform vec3 u_color;
        uniform float u_opacity;
        varying float v_opacity;
        void main() {
            gl_FragColor = vec4(u_color, v_opacity * u_opacity);
        }
      `,
    };
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
        // child.children[1].material = new THREE.MeshBasicMaterial({
        //   // map: this.resources.items.screen,
        //   color: 0x00ffff,
        // });
        // child.children[1].material = new THREE.ShaderMaterial(glowShader);
        child.children[1].material = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          emissive: 0x2c3e50,
        });

        // 使其自发光
        const pointLight = new THREE.PointLight("#2C3E50", 1);
        pointLight.position.x = -3;
        child.children[1].add(pointLight);
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

  mouseMoveEvent() {
    window.addEventListener("mousemove", (e) => {
      this.rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.2;
    });
  }

  update() {
    this.lerp.current = gasp.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );
    // console.log(this.lerp);
    /* 设置旋转 */
    this.actualRoom.rotation.y = this.lerp.current;

    this.mixer.update(this.time.delta * 0.0009);
  }
}

import Experience from "../Experience";
import assets from "../Utils/assets";
import Resources from "../Utils/Resources";
import Controls from "./Controls";
import Environment from "./Environment";
import Room from "./Room";

export default class World {
  resources: any;
  constructor() {
    this.resources = new Resources(assets);
    this.experience = new Experience();
    this.controls = new Controls();
    this.scene = this.experience.scene;

    this.resources.on("ready", () => {
      console.warn("Complete loading");
      this.room = new Room();
      this.environment = new Environment();
    });
  }
  update() {
    if (this.room) {
      this.room.update();
    }
  }
}

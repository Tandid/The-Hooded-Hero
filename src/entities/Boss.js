import Enemy from "./Enemy";
import initAnims from "./anims/bossAnims.js";

class Boss extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, "boss");
    initAnims(scene.anims);
  }

  init() {
    super.init();
    this.health = 700;
    this.damage = 50;
    this.setScale(1.7);
    this.setSize(250, 250);
    this.setOffset(280, 200);
    this.speed = 400;
    this.maxPatrolDistance = 800;
  }

  update(time, delta) {
    super.update(time, delta);

    if (!this.active) {
      return;
    }

    if (this.health > 0) {
      this.play("boss-run", true);
    } else {
      this.play("boss-die", true);
    }
  }
}

export default Boss;

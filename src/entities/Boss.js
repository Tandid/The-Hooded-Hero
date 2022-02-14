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
    this.setSize(300, 250);
    this.setOffset(250, 200);
    this.speed = 400;
    this.maxPatrolDistance = 1000;
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

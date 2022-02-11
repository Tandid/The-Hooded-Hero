import Enemy from "./Enemy";
import initAnims from "./anims/archerAnims";
import Projectiles from "../attacks/Projectiles";

class Archer extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, "archer");
    initAnims(scene.anims);
  }

  init() {
    super.init();
    this.speed = 150;

    this.projectiles = new Projectiles(this.scene, "fireball-1");
    this.timeFromLastAttack = 0;
    this.attackDelay = this.getAttackDelay();
    this.lastDirection = null;

    this.setSize(120, 170);
    // this.setOffset(10, 15);
  }

  update(time, delta) {
    super.update(time, delta);

    if (!this.active) {
      return;
    }

    if (this.body.velocity.x > 0) {
      this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;
    } else {
      this.lastDirection = Phaser.Physics.Arcade.FACING_LEFT;
    }

    if (this.timeFromLastAttack + this.attackDelay <= time) {
      this.projectiles.fireProjectile(this, "fireball");

      this.timeFromLastAttack = time;
      this.attackDelay = this.getAttackDelay();
    }

    if (!this.active) {
      return;
    }
    if (this.isPlayingAnims("archer-hurt")) {
      return;
    }

    this.play("archer-walk", true);
  }

  getAttackDelay() {
    return Phaser.Math.Between(1000, 4000);
  }

  takesHit(source) {
    super.takesHit(source);
    this.play("archer-hurt", true);
  }
}

export default Archer;

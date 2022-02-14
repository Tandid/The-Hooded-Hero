import Enemy from "./Enemy";
import initAnims from "./anims/mageAnims";
import Projectiles from "../attacks/Projectiles";

class Mage extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, "mage");
    initAnims(scene.anims);
  }

  init() {
    super.init();
    this.speed = 150;
    this.health = 200;
    this.damage = 20;

    this.projectiles = new Projectiles(this.scene, "arrow");
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
      this.play("mage-attack", true);
      this.projectiles.fireProjectile(this, "arrow");

      this.timeFromLastAttack = time;
      this.attackDelay = this.getAttackDelay();
    }

    if (this.isPlayingAnims("mage-attack")) {
      return;
    }

    if (this.health > 0) {
      this.play("mage-idle", true);
    } else {
      this.play("mage-die", true);
    }
  }

  getAttackDelay() {
    return Phaser.Math.Between(1000, 4000);
  }
}

export default Mage;

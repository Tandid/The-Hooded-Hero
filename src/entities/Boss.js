import EnemyBoss from "./EnemyBoss";
import initAnims from "./anims/bossAnims.js";
import BossMeleeWeapon from "../attacks/BossMeleeWeapon";

class Boss extends EnemyBoss {
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
    this.maxPatrolDistance = 600;
    this.timeFromLastAttack = 0;
    this.attackDelay = this.getAttackDelay();
    this.meleeWeapon = new BossMeleeWeapon(this.scene, 500, 500, "axe-default");
  }

  getAttackDelay() {
    return Phaser.Math.Between(2500, 3500);
  }

  update(time, delta) {
    super.update(time, delta);

    if (!this.active) {
      return;
    }

    if (this.timeFromLastAttack + this.attackDelay <= time) {
      this.play("boss-melee", true);
      this.meleeWeapon.swing(this);
      console.log(this.meleeWeapon.body.width);
      console.log(this.meleeWeapon.body.height);
      // setTimeout(() => this.setSize(400, 250), 500);
      // setTimeout(() => this.setOffset(150, 200), 500);

      // this.projectiles.fireProjectile(this, "fire");

      this.timeFromLastAttack = time;
      this.attackDelay = this.getAttackDelay();
    }

    if (this.isPlayingAnims("boss-melee")) {
      //   // setTimeout(() => this.setSize(250, 250), 2000);
      //   // setTimeout(() => this.setOffset(280, 200), 2000);
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

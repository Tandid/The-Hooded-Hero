import Enemy from "./Enemy";
import initAnims from "./anims/slimeAnims";

class Slime extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, "slime");
    initAnims(scene.anims);
  }

  init() {
    super.init();
    this.setSize(120, 100);
    this.setOffset(65, 50);
    this.health = 100;
    this.damage = 10;
  }

  update(time, delta) {
    super.update(time, delta);

    if (!this.active) {
      return;
    }
    if (this.isPlayingAnims("slime-hurt")) {
      return;
    }
    if (this.isPlayingAnims("slime-idle")) {
      return;
    }
    // if (this.isPlayingAnims("slime-die")) {
    //   return;
    // }

    this.play("slime-idle", true);
    // this.play("slime-die", true);
  }

  // takesHit(source) {

  // }
}

export default Slime;

import Enemy from "./Enemy";
import initAnims from "./anims/slimeAnims";

class Slime extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, "slime");
    initAnims(scene.anims);
  }

  init() {
    super.init();
    this.setSize(120, 153);
    // this.setOffset(7, 20);
  }

  update(time, delta) {
    super.update(time, delta);

    if (!this.active) {
      return;
    }
    if (this.isPlayingAnims("slime-hurt")) {
      return;
    }

    this.play("slime-idle", true);
  }

  takesHit(source) {
    super.takesHit(source);
    this.play("slime-hurt", true);
  }
}

export default Slime;

import Enemy from "./Enemy";
import initAnims from "./anims/spiderAnims";

class Spider extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, "spider");
    initAnims(scene.anims);
  }

  init() {
    super.init();
    this.setSize(120, 90);
    this.setOffset(30, 20);
  }

  update(time, delta) {
    super.update(time, delta);

    if (!this.active) {
      return;
    }
    if (this.isPlayingAnims("spider-hurt")) {
      return;
    }

    this.play("spider-idle", true);
  }

  takesHit(source) {
    super.takesHit(source);
    this.play("spider-hurt", true);
  }
}

export default Spider;

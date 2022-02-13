import Enemy from "./Enemy";
import initAnims from "./anims/skeletonAnims";

class Skeleton extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, "skeleton");
    initAnims(scene.anims);
  }

  init() {
    super.init();
    this.health = 200;
    this.damage = 30;
    this.setSize(120, 170);
    // this.setOffset(7, 20);
  }

  update(time, delta) {
    super.update(time, delta);

    if (!this.active) {
      return;
    }
    if (this.isPlayingAnims("skeleton-hurt")) {
      return;
    }

    this.play("skeleton-idle", true);
  }

  takesHit(source) {
    super.takesHit(source);
    this.play("skeleton-hurt", true);
  }
}

export default Skeleton;

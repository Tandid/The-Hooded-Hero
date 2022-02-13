import Enemy from "./Enemy";
import initAnims from "./anims/beeAnims";

class Bee extends Enemy {
  constructor(scene, x, y) {
    super(scene, x, y, "bee");
    initAnims(scene.anims);
  }

  init() {
    super.init();
    this.health = 150;
    this.damage = 20;
    this.setSize(120, 140);
  }

  update(time, delta) {
    super.update(time, delta);

    if (!this.active) {
      return;
    }
    if (this.isPlayingAnims("bee-hurt")) {
      return;
    }

    this.play("bee-idle", true);
  }

  takesHit(source) {
    super.takesHit(source);
    this.play("bee-hurt", true);
  }
}

export default Bee;

import BaseScene from "./BaseScene";

class ComingSoonScene extends BaseScene {
  constructor(config) {
    super("ComingSoonScene", { ...config, canGoBack: true });
  }

  create() {
    super.create();
    this.cameras.main.fadeIn(500, 0, 0, 0);

    this.add
      .text(
        this.config.width / 2,
        this.config.height / 2,
        `Sorry, Multiplayer is still in the works!`,
        {
          fontFamily: "customFont",
          fontSize: "72px",
          fontWeight: "larger",
        }
      )
      .setOrigin(0.5, 0.5)
      .setColor("#FFF");

    this.add
      .text(
        this.config.width / 2,
        this.config.height / 2 + 100,
        `Have fun with Story Mode in the meantime! :)`,
        {
          fontFamily: "customFont",
          fontSize: "72px",
          fontWeight: "larger",
        }
      )
      .setOrigin(0.5, 0.5)
      .setColor("#FFF");

    setTimeout(() => this.cameras.main.fadeOut(500, 0, 0, 0), 4000);
    setTimeout(() => this.scene.stop("ComingSoonScene"), 5000);
    setTimeout(() => this.scene.start("MenuScene"), 5000);
  }
}

export default ComingSoonScene;

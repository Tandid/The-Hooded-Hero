import BaseScene from "./BaseScene";

class ComingSoonScene extends BaseScene {
  constructor(config) {
    super("ComingSoonScene", { ...config, canGoBack: true });
  }

  create() {
    super.create();
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    this.add
      .text(this.config.width / 2, this.config.height / 2, `Coming Soon!`, {
        fontFamily: "customFont",
        fontSize: "72px",
        fontWeight: "larger",
      })
      .setOrigin(0.5, 0.5)
      .setColor("#FFF");
  }
}

export default ComingSoonScene;

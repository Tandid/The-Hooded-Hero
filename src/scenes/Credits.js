import BaseScene from "./BaseScene";

class CreditsScene extends BaseScene {
  constructor(config) {
    super("CreditsScene", { ...config, canGoBack: true });
  }

  create() {
    super.create();
    this.cameras.main.fadeIn(500, 0, 0, 0);

    this.add
      .text(
        this.config.width / 2,
        this.config.height / 3,
        `Thanks for playing!`,
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
        (this.config.height * 2) / 3,
        `Creator: Tandid Alam`,
        {
          fontFamily: "customFont",
          fontSize: "72px",
          fontWeight: "larger",
        }
      )
      .setOrigin(0.5, 0.5)
      .setColor("#FFF");

    setTimeout(() => this.cameras.main.fadeOut(500, 0, 0, 0), 4000);
    setTimeout(() => this.scene.stop("CreditsScene"), 5000);
    setTimeout(() => this.scene.start("MenuScene"), 5000);
  }
}

export default CreditsScene;

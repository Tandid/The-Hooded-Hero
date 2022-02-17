import Phaser from "phaser";

class LoseScene extends Phaser.Scene {
  constructor(config) {
    super("LoseScene", { ...config, canGoBack: false });
    this.config = config;
  }

  create() {
    this.cursorOver = this.sound.add("cursorOver");
    this.cursorOver.volume = 0.4;

    this.select = this.sound.add("select");
    this.select.volume = 0.4;

    this.createPage();
    this.createHomeButton();
    this.createRestartButton();
  }

  createPage() {
    this.add
      .image(this.config.width / 2, this.config.height / 2, "panel-1")
      .setOrigin(0.5)
      .setScale(0.7);

    this.add
      .image(this.config.width / 2, this.config.height / 6, "header-shadow")
      .setOrigin(0.5)
      .setScale(0.7);

    this.add
      .image(this.config.width / 2, this.config.height / 6, "header")
      .setOrigin(0.5)
      .setScale(0.7);

    this.add
      .image(this.config.width / 2, this.config.height / 2 - 50, "skull")
      .setOrigin(0.5)
      .setScale(0.7);

    this.add
      .text(this.config.width / 2, this.config.height / 6, "DEFEAT!", {
        fontFamily: "customFont",
        fontSize: "60px",
      })
      .setOrigin(0.5, 0.5)
      .setColor("#D9B48FFF");
  }

  createHomeButton() {
    const homeBtn = this.add
      .image(
        this.config.width / 2 - 75,
        this.config.height / 2 + 150,
        "home-btn-big"
      )
      .setOrigin(0.5)
      .setScale(0.7)
      .setInteractive()
      .setDepth(2);

    homeBtn.on("pointerup", () => {
      this.select.play();
      this.scene.start("MenuScene");
    });

    homeBtn.on("pointerover", () => {
      this.cursorOver.play();
      homeBtn.setTint(0xc2c2c2);
    });

    homeBtn.on("pointerout", () => {
      homeBtn.clearTint();
    });
  }

  createRestartButton() {
    const restartBtn = this.add
      .image(
        this.config.width / 2 + 75,
        this.config.height / 2 + 150,
        "restart-btn-big"
      )
      .setOrigin(0.5)
      .setScale(0.7)
      .setInteractive()
      .setDepth(2);

    restartBtn.on("pointerup", () => {
      this.select.play();
      this.scene.restart("PlayScene");
    });

    restartBtn.on("pointerover", () => {
      this.cursorOver.play();
      restartBtn.setTint(0xc2c2c2);
    });

    restartBtn.on("pointerout", () => {
      restartBtn.clearTint();
    });
  }
}

export default LoseScene;
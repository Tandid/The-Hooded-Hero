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

    this.add
      .image(this.config.width / 2, this.config.height / 2, "panel-3")
      .setOrigin(0.5)
      .setScale(0.7);

    this.add
      .text(
        this.config.width / 2,
        this.config.height / 2 - 50,
        "Return to Menu?",
        {
          fontFamily: "customFont",
          fontSize: "50px",
        }
      )
      .setOrigin(0.5, 0.5)
      .setColor("#000");

    this.createYesButton();
    this.createNoButton();
  }

  createYesButton() {
    const yesBtn = this.add
      .image(this.config.width / 2 - 75, this.config.height / 2 + 50, "yes-btn")
      .setOrigin(0.5)
      .setScale(0.7)
      .setInteractive()
      .setDepth(2);

    yesBtn.on("pointerup", () => {
      this.select.play();
      this.scene.start("MenuScene");
    });

    yesBtn.on("pointerover", () => {
      this.cursorOver.play();
      yesBtn.setTint(0x3fbf3f);
    });

    yesBtn.on("pointerout", () => {
      yesBtn.clearTint();
    });
  }

  createNoButton() {
    const noBtn = this.add
      .image(this.config.width / 2 + 75, this.config.height / 2 + 50, "no-btn")
      .setOrigin(0.5)
      .setScale(0.7)
      .setInteractive()
      .setDepth(2);

    noBtn.on("pointerup", () => {
      this.select.play();
      this.scene.stop("PauseScene");
      this.scene.isPaused("PlayScene") === true
        ? this.scene.resume("PlayScene")
        : "";
    });

    noBtn.on("pointerover", () => {
      this.cursorOver.play();
      noBtn.setTint(0xff6666);
    });

    noBtn.on("pointerout", () => {
      noBtn.clearTint();
    });
  }
}

export default LoseScene;

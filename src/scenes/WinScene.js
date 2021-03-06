import Phaser from "phaser";
import EventEmitter from "../events/Emitter";

class WinScene extends Phaser.Scene {
  constructor(config) {
    super("WinScene", { ...config, canGoBack: false });
    this.config = config;
  }

  create({ gameStatus }) {
    this.cameras.main.fadeIn(500, 0, 0, 0);
    this.gameOver = this.sound.add("win", { volume: 0.1 }).play();
    this.cursorOver = this.sound.add("cursorOver");
    this.cursorOver.volume = 0.4;

    this.select = this.sound.add("select");
    this.select.volume = 0.4;

    this.createPage();
    this.createHomeButton();
    this.createRestartButton();
    this.createPlayButton();
  }

  createPage() {
    this.add
      .image(this.config.width / 2, this.config.height / 2, "panel-1")
      .setOrigin(0.5)
      .setScale(1, 0.7);

    this.add
      .image(this.config.width / 2, this.config.height / 6, "header-shadow")
      .setOrigin(0.5)
      .setScale(0.7);

    this.add
      .image(this.config.width / 2, this.config.height / 6, "header")
      .setOrigin(0.5)
      .setScale(0.7);

    this.add
      .image(this.config.width / 2 - 100, this.config.height / 2 - 60, "star")
      .setOrigin(0.5)
      .setScale(1.1);
    this.add
      .image(this.config.width / 2 + 100, this.config.height / 2 - 60, "star")
      .setOrigin(0.5)
      .setScale(1.1);
    this.add
      .image(this.config.width / 2, this.config.height / 2 - 85, "star")
      .setOrigin(0.5)
      .setScale(1.1);
    this.add
      .image(this.config.width / 2, this.config.height / 2 + 50, "panel-4")
      .setOrigin(0.5)
      .setScale(0.5);
    this.add
      .image(this.config.width / 2 - 50, this.config.height / 2 + 50, "coin")
      .setOrigin(0.5)
      .setScale(0.7);

    this.add
      .text(this.config.width / 2, this.config.height / 6, "You Win!", {
        fontFamily: "customFont",
        fontSize: "60px",
      })
      .setOrigin(0.5, 0.5)
      .setColor("#D9B48FFF");
  }

  createHomeButton() {
    const homeBtn = this.add
      .image(
        this.config.width / 2 - 150,
        this.config.height / 2 + 150,
        "home-btn-big"
      )
      .setOrigin(0.5)
      .setScale(0.7)
      .setInteractive()
      .setDepth(2);

    homeBtn.on("pointerup", () => {
      this.select.play();
      this.scene.stop("PlayScene");
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
        this.config.width / 2,
        this.config.height / 2 + 150,
        "restart-btn-big"
      )
      .setOrigin(0.5)
      .setScale(0.7)
      .setInteractive()
      .setDepth(2);

    restartBtn.on("pointerup", () => {
      this.select.play();
      this.scene.stop("WinScene");
      EventEmitter.emit("RESTART_GAME");
    });

    restartBtn.on("pointerover", () => {
      this.cursorOver.play();
      restartBtn.setTint(0xc2c2c2);
    });

    restartBtn.on("pointerout", () => {
      restartBtn.clearTint();
    });
  }

  createPlayButton() {
    const playBtn = this.add
      .image(
        this.config.width / 2 + 150,
        this.config.height / 2 + 150,
        "play-btn"
      )
      .setOrigin(0.5)
      .setScale(0.7)
      .setInteractive()
      .setDepth(2);

    playBtn.on("pointerup", () => {
      this.select.play();
      this.scene.stop("WinScene");
      this.registry.inc("level", 1);
      this.registry.inc("unlocked-levels", 1);
      EventEmitter.emit("RESTART_GAME");
    });

    playBtn.on("pointerover", () => {
      this.cursorOver.play();
      playBtn.setTint(0xc2c2c2);
    });

    playBtn.on("pointerout", () => {
      playBtn.clearTint();
    });
  }
}

export default WinScene;

import Phaser from "phaser";
import UsernameScene from "./UsernameScene";

class UserConfirmationScene extends Phaser.Scene {
  constructor(config) {
    super("UserConfirmationScene", { ...config, canGoBack: false });
    this.config = config;
  }

  init(data) {
    this.socket = data.socket;
    this.username = data.username;
    console.log({ UserConfirm: data });
  }

  create() {
    this.cursorOver = this.sound.add("cursorOver");
    this.cursorOver.volume = 0.4;

    this.select = this.sound.add("select");
    this.select.volume = 0.4;

    this.flute = this.sound.add("flute");
    this.flute.volume = 0.4;

    this.add
      .image(this.config.width / 2, this.config.height / 2, "panel-2")
      .setOrigin(0.5)
      .setScale(0.6);

    this.add
      .text(
        this.config.width / 2,
        this.config.height / 2 - 150,
        `Your name is: `,
        {
          fontFamily: "customFont",
          fontSize: "50px",
        }
      )
      .setOrigin(0.5, 0.5)
      .setColor("#000");

    this.add
      .text(
        this.config.width / 2,
        this.config.height / 2 - 75,
        `${this.username}`,
        {
          fontFamily: "customFont",
          fontSize: "50px",
        }
      )
      .setOrigin(0.5, 0.5)
      .setColor("#FFF");

    this.add
      .text(this.config.width / 2, this.config.height / 2, `Is this correct?`, {
        fontFamily: "customFont",
        fontSize: "50px",
      })
      .setOrigin(0.5, 0.5)
      .setColor("#000");

    this.createYesButton();
    this.createNoButton();
  }

  createYesButton() {
    const yesBtn = this.add
      .image(
        this.config.width / 2 - 100,
        this.config.height / 2 + 125,
        "yes-btn"
      )
      .setOrigin(0.5)
      .setScale(0.7)
      .setInteractive()
      .setDepth(2);

    yesBtn.on("pointerup", () => {
      this.flute.play();
      this.cameras.main.fadeOut(500, 0, 0, 0);
      setTimeout(
        () =>
          this.scene.start("InitialControlsScene", {
            socket: this.socket,
            username: this.username,
          }),
        500
      );
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
      .image(
        this.config.width / 2 + 100,
        this.config.height / 2 + 125,
        "no-btn"
      )
      .setOrigin(0.5)
      .setScale(0.7)
      .setInteractive()
      .setDepth(2);

    noBtn.on("pointerup", () => {
      this.select.play();
      this.scene.start("UsernameScene");
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

export default UserConfirmationScene;

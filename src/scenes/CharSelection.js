import BaseScene from "./BaseScene";

class CharSelection extends BaseScene {
  constructor(config) {
    super("CharSelection", { ...config, canGoBack: true });
  }

  init(data) {
    this.socket = data.socket;
    this.username = data.username;
    console.log({ CharSelection: data });
  }

  create() {
    super.create();

    this.cursorOver = this.sound.add("cursorOver");
    this.cursorOver.volume = 0.4;

    this.select = this.sound.add("select");
    this.select.volume = 0.4;

    this.pageFlip = this.sound.add("page-flip");
    this.pageFlip.volume = 0.4;

    this.createCloseButton();

    this.add
      .image(this.config.width / 2, this.config.height / 2, "panel-2")
      .setOrigin(0.5)
      .setScale(1, 0.7);

    this.add
      .image(this.config.width / 2, this.config.height / 6, "header")
      .setOrigin(0.5)
      .setScale(1.5, 0.9);

    this.add
      .text(this.config.width / 2, this.config.height / 6, "CHOOSE A HERO", {
        fontFamily: "customFont",
        fontSize: "72px",
      })
      .setOrigin(0.5, 0.5)
      .setColor("#D9B48FFF");

    const charSpriteArr = ["player-1", "player-2", "player-3", "player-4"];
    charSpriteArr.forEach((key, i) => {
      const player = this.add
        .sprite(
          this.config.width * 0.15 * (i + 1) + 150,
          this.config.height / 2,
          key
        )
        .setScale(1)
        .setInteractive();

      player.play(`idle-${key}`, true);

      player.on("pointerover", () => {
        player.play(`run-${key}`, true);
        this.cursorOver.play();
      });
      player.on("pointerout", () => {
        player.play(`idle-${key}`, true);
        this.cursorOver.stop();
      });

      player.on("pointerdown", () => {
        this.select.play();
      });

      player.on("pointerup", () => {
        this.scene.stop("CharSelection");
        this.scene.start("LobbyScene", {
          socket: this.socket,
          username: this.username,
          charSpriteKey: key,
        });
      });
    });
  }

  createCloseButton() {
    const closeBtn = this.add
      .image(
        this.config.width / 1.1 - 20,
        this.config.height / 7 + 20,
        "close-btn"
      )
      .setOrigin(0.5)
      .setScale(0.7)
      .setInteractive()
      .setDepth(2);

    closeBtn.on("pointerup", () => {
      this.select.play();
      this.scene.wake("MenuScene");
      this.scene.stop("CharSelection");
    });

    closeBtn.on("pointerover", () => {
      this.cursorOver.play();
      closeBtn.setTint(0xff6666);
    });

    closeBtn.on("pointerout", () => {
      closeBtn.clearTint();
    });
  }
}

export default CharSelection;

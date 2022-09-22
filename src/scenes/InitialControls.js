import Phaser from "phaser";

class InitialControlsScene extends Phaser.Scene {
  constructor(config) {
    super("InitialControlsScene", { ...config, canGoBack: false });
    this.config = config;
  }

  init(data) {
    this.socket = data.socket;
    this.username = data.username;
  }

  create() {
    this.cursorOver = this.sound.add("cursorOver");
    this.cursorOver.volume = 0.4;

    this.select = this.sound.add("select");
    this.select.volume = 0.4;

    this.pageFlip = this.sound.add("page-flip");
    this.pageFlip.volume = 0.4;

    this.cameras.main.fadeIn(500, 0, 0, 0);
    this.add
      .image(this.config.width / 2, this.config.height / 2, "panel-2")
      .setOrigin(0.5)
      .setScale(0.7);

    this.add
      .image(this.config.width / 3 - 20, 240, "left-key")
      .setOrigin(0.5)
      .setScale(0.5);

    this.add
      .image(this.config.width / 3 + 80, 240, "right-key")
      .setOrigin(0.5)
      .setScale(0.5);

    this.add
      .image(this.config.width / 3 - 20, 330, "q-key")
      .setOrigin(0.5)
      .setScale(0.5);

    this.add
      .image(this.config.width / 3 + 80, 330, "e-key")
      .setOrigin(0.5)
      .setScale(0.5);
    this.add
      .image(this.config.width / 3 + 35, 420, "space-key")
      .setOrigin(0.5)
      .setScale(0.5);
    this.add
      .image(this.config.width / 3 + 40, 510, "shift-key")
      .setOrigin(0.5)
      .setScale(0.5);

    this.add
      .image(this.config.width / 2, this.config.height / 6, "header-shadow")
      .setOrigin(0.5)
      .setScale(0.9);

    this.add
      .image(this.config.width / 2, this.config.height / 6, "header")
      .setOrigin(0.5)
      .setScale(0.9);

    this.add
      .text(this.config.width / 2, this.config.height / 6, "CONTROLS", {
        fontFamily: "customFont",
        fontSize: "72px",
      })
      .setOrigin(0.5, 0.5)
      .setColor("#D9B48FFF");

    this.add
      .text(this.config.width / 1.75, 240, "Move Left/Right", {
        fontFamily: "customFont",
        fontSize: "40px",
      })
      .setOrigin(0.5, 0.5)
      .setColor("0x000");

    this.add
      .text(this.config.width / 1.75 + 20, 330, "Projectile/Sword Attack", {
        fontFamily: "customFont",
        fontSize: "40px",
      })
      .setOrigin(0.5, 0.5)
      .setColor("0x000");

    this.add
      .text(this.config.width / 1.75, 420, "Jump/Double Jump", {
        fontFamily: "customFont",
        fontSize: "40px",
      })
      .setOrigin(0.5, 0.5)
      .setColor("0x000");
    this.add
      .text(this.config.width / 1.75, 510, "Hold to run", {
        fontFamily: "customFont",
        fontSize: "40px",
      })
      .setOrigin(0.5, 0.5)
      .setColor("0x000");

    setTimeout(
      () =>
        this.scene.start("MenuScene", {
          socket: this.socket,
          username: this.username,
        }),
      3000
    );
  }
}

export default InitialControlsScene;

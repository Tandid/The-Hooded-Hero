import BaseScene from "./BaseScene";

class ControlsScene extends BaseScene {
  constructor(config) {
    super("ControlsScene", { ...config, canGoBack: true });
    // this.config = config;
    // this.screenCenter = [config.width / 2, config.height / 4];
    // this.fontSize = 75;
    // this.lineHeight = 82;
    // this.fontOptions = { fontSize: `${this.fontSize}px`, fill: "#713E01" };
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
      .setScale(0.7);

    this.add
      .image(this.config.width / 3 - 20, 220, "left-key")
      .setOrigin(0.5)
      .setScale(0.5);

    this.add
      .image(this.config.width / 3 + 80, 220, "right-key")
      .setOrigin(0.5)
      .setScale(0.5);

    this.add
      .image(this.config.width / 3 - 20, 320, "q-key")
      .setOrigin(0.5)
      .setScale(0.5);

    this.add
      .image(this.config.width / 3 + 80, 320, "e-key")
      .setOrigin(0.5)
      .setScale(0.5);
    this.add
      .image(this.config.width / 3 + 30, 420, "space-key")
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
      .text(this.config.width / 1.75, 220, "Move Left/Right", {
        fontFamily: "customFont",
        fontSize: "40px",
      })
      .setOrigin(0.5, 0.5)
      .setColor("0x000");

    this.add
      .text(this.config.width / 1.75 + 20, 320, "Projectile/Sword Attack", {
        fontFamily: "customFont",
        fontSize: "40px",
      })
      .setOrigin(0.5, 0.5)
      .setColor("0x000");

    this.add
      .text(this.config.width / 1.75, 420, "Space to Jump", {
        fontFamily: "customFont",
        fontSize: "40px",
      })
      .setOrigin(0.5, 0.5)
      .setColor("0x000");
  }

  createCloseButton() {
    const closeBtn = this.add
      .image(
        this.config.width * 0.75 + 20,
        this.config.height / 7 - 10,
        "close-btn"
      )
      .setOrigin(0.5)
      .setScale(0.7)
      .setInteractive()
      .setDepth(2);

    closeBtn.on("pointerup", () => {
      this.select.play();
      this.scene.start("MenuScene");
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

export default ControlsScene;

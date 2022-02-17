import BaseScene from "./BaseScene";

class SettingsScene extends BaseScene {
  constructor(config) {
    super("SettingsScene", { ...config, canGoBack: true });
  }

  create() {
    super.create();

    this.cursorOver = this.sound.add("cursorOver");
    this.cursorOver.volume = 0.4;

    this.select = this.sound.add("select");
    this.select.volume = 0.4;

    this.pageFlip = this.sound.add("page-flip");
    this.pageFlip.volume = 0.4;

    this.createPage();
    this.createCloseButton();
    this.createAddButton();
    this.createSubtractButton();
    this.createVolumeBar();

    this.add
      .image(
        this.config.width / 2 + 50,
        this.config.height / 2 + 150,
        "switch-off-bg"
      )
      .setOrigin(0.5)
      .setScale(1.3, 0.9);

    this.add
      .image(
        this.config.width / 2 + 100,
        this.config.height / 2 + 150,
        "switch-on"
      )
      .setOrigin(0.5)
      .setScale(0.8);

    this.add
      .image(
        this.config.width / 3 + 50,
        this.config.height / 2 - 50,
        "music-btn-on"
      )
      .setOrigin(0.5)
      .setScale(0.8);
    this.add
      .image(
        this.config.width / 3 + 50,
        this.config.height / 2 + 50,
        "sound-btn-on"
      )
      .setOrigin(0.5)
      .setScale(0.8);
    this.add
      .image(
        this.config.width / 2 - 100,
        this.config.height / 2 + 150,
        "mute-btn-on"
      )
      .setOrigin(0.5)
      .setScale(0.8);
  }

  createPage() {
    this.add
      .image(this.config.width / 2, this.config.height / 2, "panel-2")
      .setOrigin(0.5)
      .setScale(0.7);

    this.add
      .image(this.config.width / 2, this.config.height / 2 - 50, "panel-4")
      .setOrigin(0.5)
      .setScale(1.3, 0.5);

    this.add
      .image(this.config.width / 2, this.config.height / 2 + 50, "panel-4")
      .setOrigin(0.5)
      .setScale(1.3, 0.5);

    this.add
      .image(this.config.width / 2, this.config.height / 2 + 150, "panel-4")
      .setOrigin(0.5)
      .setScale(0.75, 0.5);

    this.add
      .image(this.config.width / 2, this.config.height / 6, "header-shadow")
      .setOrigin(0.5)
      .setScale(0.9);

    this.add
      .image(this.config.width / 2, this.config.height / 6, "header")
      .setOrigin(0.5)
      .setScale(0.9);

    this.add
      .text(this.config.width / 2, this.config.height / 6, "SETTINGS", {
        fontFamily: "customFont",
        fontSize: "72px",
      })
      .setOrigin(0.5, 0.5)
      .setColor("#D9B48FFF");
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

  createVolumeBar() {}

  createSubtractButton() {
    const subtractBtn = this.add
      .image(
        this.config.width / 2 - 100,
        this.config.height / 2 - 50,
        "prev-btn"
      )
      .setOrigin(0.5)
      .setScale(0.5)
      .setInteractive();

    this.add
      .image(
        this.config.width / 2 - 100,
        this.config.height / 2 + 50,
        "prev-btn"
      )
      .setOrigin(0.5)
      .setScale(0.5);

    subtractBtn.on("pointerup", () => {
      this.select.play();
    });
    subtractBtn.on("pointerover", () => {
      subtractBtn.setTintFill(0xc2c2c2);
      this.cursorOver.play();
    });
    subtractBtn.on("pointerout", () => {
      subtractBtn.clearTint();
    });
  }

  createAddButton() {
    const addBtn = this.add
      .image(
        this.config.width / 2 + 200,
        this.config.height / 2 - 50,
        "next-btn"
      )
      .setOrigin(0.5)
      .setScale(0.5)
      .setInteractive();

    this.add
      .image(
        this.config.width / 2 + 200,
        this.config.height / 2 + 50,
        "next-btn"
      )
      .setOrigin(0.5)
      .setScale(0.5)
      .setInteractive();

    addBtn.on("pointerup", () => {
      this.select.play();
    });
    addBtn.on("pointerover", () => {
      addBtn.setTintFill(0xc2c2c2);
      this.cursorOver.play();
    });
    addBtn.on("pointerout", () => {
      addBtn.clearTint();
    });
  }
}

export default SettingsScene;

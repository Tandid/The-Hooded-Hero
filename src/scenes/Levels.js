import BaseScene from "./BaseScene";

class LevelScene extends BaseScene {
  constructor(config) {
    super("LevelScene", { ...config, canGoBack: true });
    this.screenCenter = [config.width / 2, config.height / 4 + 100];
    this.lineHeight = 100;
  }

  create() {
    super.create();

    this.cursorOver = this.sound.add("cursorOver");
    this.cursorOver.volume = 0.4;

    this.select = this.sound.add("select");
    this.select.volume = 0.4;

    this.pageFlip = this.sound.add("page-flip");
    this.pageFlip.volume = 0.4;

    this.flute = this.sound.add("flute");
    this.flute.volume = 0.4;

    this.menu = [];

    this.createCloseButton();

    this.add
      .image(this.config.width / 2, this.config.height / 2, "panel-3")
      .setOrigin(0.5)
      .setScale(1.4);

    this.add
      .image(this.config.width / 2, this.config.height / 6, "header-shadow")
      .setOrigin(0.5)
      .setScale(0.9);

    this.add
      .image(this.config.width / 2, this.config.height / 6, "header")
      .setOrigin(0.5)
      .setScale(0.9);
    this.add
      .text(this.config.width / 2, this.config.height / 6, "LEVELS", {
        fontFamily: "customFont",
        fontSize: "72px",
      })
      .setOrigin(0.5, 0.5)
      .setColor("#D9B48FFF");

    const levels = this.registry.get("unlocked-levels");

    let row = 70;
    for (let i = 1; i <= 3; i++) {
      this.add
        .image(
          this.config.width / 2 + 20,
          this.config.height / 4 + row,
          "panel-4"
        )
        .setOrigin(0.5)
        .setScale(1, 0.5);

      this.add
        .image(
          this.config.width / 3,
          this.config.height / 4 + row,
          "stage-icon"
        )
        .setOrigin(0.5)
        .setScale(0.5);

      this.add
        .text(this.config.width / 3, this.config.height / 4 + row, `${i}`, {
          fontFamily: "customFont",
          fontSize: "50px",
        })
        .setOrigin(0.5)
        .setColor("#000000");

      row += 100;

      this.menu.push({
        scene: "PlayScene",
        text: `Level ${i}`,
        level: i,
      });
    }

    this.createMenu(this.menu, this.setupMenuEvents.bind(this));
  }

  createCloseButton() {
    const closeBtn = this.add
      .image(this.config.width * 0.8, this.config.height / 7 + 30, "close-btn")
      .setOrigin(0.5)
      .setScale(0.7)
      .setInteractive()
      .setDepth(2);

    closeBtn.on("pointerup", () => {
      this.select.play();
      this.scene.wake("MenuScene");
      this.scene.stop("LevelScene");
    });

    closeBtn.on("pointerover", () => {
      this.cursorOver.play();
      closeBtn.setTint(0xff6666);
    });

    closeBtn.on("pointerout", () => {
      closeBtn.clearTint();
    });
  }

  setupMenuEvents(menuItem) {
    const textGO = menuItem.textGO;
    textGO.setInteractive();

    textGO.on("pointerover", () => {
      this.cursorOver.play();
      textGO.setStyle({ fill: "#fff" });
    });

    textGO.on("pointerout", () => {
      textGO.setStyle({ fill: "#000" });
    });

    textGO.on("pointerup", () => {
      this.cameras.main.fadeOut(1000, 0, 0, 0);

      setTimeout(() => this.scene.start("TransitionScene"), 1000);
      setTimeout(() => this.scene.stop("TransitionScene"), 4000);

      if (menuItem.scene) {
        this.flute.play();
        this.registry.set("level", menuItem.level);
        setTimeout(() => this.scene.start(menuItem.scene), 4000);
      }
    });
  }
}

export default LevelScene;

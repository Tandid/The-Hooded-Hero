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

    this.createCancelButton();
    this.add
      .image(this.config.width / 2, this.config.height / 2, "panel-3")
      .setOrigin(0.5)
      .setScale(1.4);

    // this.add
    //   .image(this.config.width / 2, this.config.height / 2 + 50, "panel-4")
    //   .setOrigin(0.5)
    //   .setScale(1.3, 0.5);
    // this.add
    //   .image(this.config.width / 2, this.config.height / 2 + 150, "panel-4")
    //   .setOrigin(0.5)
    //   .setScale(1.3, 0.5);

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
    for (let i = 1; i <= levels; i++) {
      this.add
        .image(this.config.width / 2, this.config.height / 4 + row, "panel-4")
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

      row += 100;

      this.menu.push({
        scene: "PlayScene",
        text: `Level ${i}`,
        level: i,
      });
    }

    this.createMenu(this.menu, this.setupMenuEvents.bind(this));
  }

  createCancelButton() {
    const cancelbtn =
      // .image(
      //   this.config.rightBottomCorner.x - 15,
      //   this.config.rightBottomCorner.y - 115,
      //   "home"
      // )
      this.add
        .image(this.config.width * 0.8, this.config.height / 7, "small-close")
        .setOrigin(0.5)
        .setScale(0.7)
        .setInteractive()
        .setDepth(2);

    const btnbackground = this.add
      .image(
        this.config.width * 0.8,
        this.config.height / 7,
        "small-red-button"
      )
      .setOrigin(0.5)
      .setScale(0.7)
      .setDepth(1);

    cancelbtn.on("pointerup", () => {
      this.scene.start("MenuScene");
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
      if (menuItem.scene) {
        this.flute.play();
        this.registry.set("level", menuItem.level);
        this.scene.start(menuItem.scene);
      }
    });
  }
}

export default LevelScene;

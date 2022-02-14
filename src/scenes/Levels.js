import BaseScene from "./BaseScene";

class LevelScene extends BaseScene {
  constructor(config) {
    super("LevelScene", { ...config, canGoBack: true });
  }

  create() {
    super.create();

    this.menu = [];

    this.createCancelButton();
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

    for (let i = 1; i <= levels; i++) {
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
      textGO.setStyle({ fill: "#ff0" });
    });

    textGO.on("pointerout", () => {
      textGO.setStyle({ fill: "#713E01" });
    });

    textGO.on("pointerup", () => {
      if (menuItem.scene) {
        this.registry.set("level", menuItem.level);
        this.scene.start(menuItem.scene);
      }

      if (menuItem.text === "Exit") {
        this.game.destroy(true);
      }
    });
  }
}

export default LevelScene;

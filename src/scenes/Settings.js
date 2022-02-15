import BaseScene from "./BaseScene";

class SettingsScene extends BaseScene {
  constructor(config) {
    super("SettingsScene", { ...config, canGoBack: true });
  }

  create() {
    super.create();
    this.createCancelButton();

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

    this.add
      .image(
        this.config.width / 2 - 100,
        this.config.height / 2 - 50,
        "prev-btn"
      )
      .setOrigin(0.5)
      .setScale(0.5);

    this.add
      .image(
        this.config.width / 2 + 200,
        this.config.height / 2 - 50,
        "next-btn"
      )
      .setOrigin(0.5)
      .setScale(0.5);

    this.add
      .image(
        this.config.width / 2 - 100,
        this.config.height / 2 + 50,
        "prev-btn"
      )
      .setOrigin(0.5)
      .setScale(0.5);

    this.add
      .image(
        this.config.width / 2 + 200,
        this.config.height / 2 + 50,
        "next-btn"
      )
      .setOrigin(0.5)
      .setScale(0.5);
    this.add
      .text(this.config.width / 2, this.config.height / 6, "SETTINGS", {
        fontFamily: "customFont",
        fontSize: "72px",
      })
      .setOrigin(0.5, 0.5)
      .setColor("#D9B48FFF");
  }

  createCancelButton() {
    const cancelbtn =
      // .image(
      //   this.config.rightBottomCorner.x - 15,
      //   this.config.rightBottomCorner.y - 115,
      //   "home"
      // )
      this.add
        .image(
          this.config.width * 0.75 + 20,
          this.config.height / 7 - 10,
          "small-close"
        )
        .setOrigin(0.5)
        .setScale(0.7)
        .setInteractive()
        .setDepth(2);

    const btnbackground = this.add
      .image(
        this.config.width * 0.75 + 20,
        this.config.height / 7 - 10,
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

export default SettingsScene;

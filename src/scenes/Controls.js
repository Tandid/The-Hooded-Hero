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
    this.createCancelButton();
    this.add
      .image(this.config.width / 2, this.config.height / 2, "panel-2")
      .setOrigin(0.5)
      .setScale(0.7);

    this.add
      .image(this.config.width / 3, 250, "left-key")
      .setOrigin(0.5)
      .setScale(0.5);

    this.add
      .image(this.config.width / 3 + 100, 250, "right-key")
      .setOrigin(0.5)
      .setScale(0.5);

    this.add
      .image(this.config.width / 3, 350, "q-key")
      .setOrigin(0.5)
      .setScale(0.5);

    this.add
      .image(this.config.width / 3 + 100, 350, "e-key")
      .setOrigin(0.5)
      .setScale(0.5);
    this.add
      .image(this.config.width / 3 + 50, 450, "space-key")
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
      .text(this.config.width / 1.75, 250, "Move Left/Right", {
        fontFamily: "customFont",
        fontSize: "40px",
      })
      .setOrigin(0.5, 0.5)
      .setColor("0x000");

    this.add
      .text(this.config.width / 1.75 + 20, 350, "Projectile/Sword Attack", {
        fontFamily: "customFont",
        fontSize: "40px",
      })
      .setOrigin(0.5, 0.5)
      .setColor("0x000");

    this.add
      .text(this.config.width / 1.75, 450, "Space to Jump", {
        fontFamily: "customFont",
        fontSize: "40px",
      })
      .setOrigin(0.5, 0.5)
      .setColor("0x000");

    // if (this.config.canGoBack) {
    //   const settingsButton = this.add
    //     .image(
    //       this.config.width - 10,
    //       this.config.height - 10,
    //       "settings-button"
    //     )
    //     .setOrigin(1)
    //     .setScale(0.5)
    //     .setInteractive();

    //   settingsButton.on("pointerup", () => {
    //     this.scene.start("MenuScene");
    //   });
    // }
  }

  createCancelButton() {
    const cancelbtn =
      // .image(
      //   this.config.rightBottomCorner.x - 15,
      //   this.config.rightBottomCorner.y - 115,
      //   "home"
      // )
      this.add
        .image(this.config.width * 0.75, this.config.height / 7, "small-close")
        .setOrigin(0.5)
        .setScale(0.7)
        .setInteractive()
        .setDepth(2);

    const btnbackground = this.add
      .image(
        this.config.width * 0.75,
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

export default ControlsScene;

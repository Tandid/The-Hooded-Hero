import BaseScene from "./BaseScene";

class MenuScene extends BaseScene {
  constructor(config) {
    super("MenuScene", config);

    this.screenCenter = [config.width / 2, config.height / 1.8];
    this.menu = [
      { scene: "PlayScene", text: "Story Mode" },
      { scene: "PlayScene", text: "Multiplayer" },
      { scene: "LevelScene", text: "Levels" },
      // { scene: "SettingsOverlayScene", text: "Settings" },
      // { scene: null, text: "Exit" },
    ];
  }

  create() {
    super.create();

    this.add
      .image(this.config.width / 2, this.config.height / 2, "panel-1")
      .setOrigin(0.5)
      .setScale(0.8);
    this.add
      .image(this.config.width / 2, this.config.height / 2, "logo")
      .setOrigin(0.5)
      .setScale(0.6);

    this.add
      .image(this.config.width / 8, this.config.height - 30, "textbox")
      .setOrigin(0.5)
      .setScale(1, 0.5)
      .setDepth(1);

    this.add
      .image(this.config.width / 25, this.config.height - 30, "profile")
      .setOrigin(0.5)
      .setScale(0.5)
      .setDepth(2);

    this.add
      .text(this.config.width / 10 - 10, this.config.height - 45, `Username`, {
        fontFamily: "customFont",
        fontSize: "30px",
        fontWeight: "larger",
      })
      .setOrigin(0)
      .setColor("#000")
      .setDepth(2);

    this.createControlsButton();
    this.createContactsButton();
    this.createMenu(this.menu, this.setupMenuEvents.bind(this));
    this.playBgMusic();
  }

  createControlsButton() {
    const contactsBtn = this.add
      .image(this.config.width - 100, this.config.height - 30, "controls-btn")
      .setOrigin(0.5)
      .setScale(0.5)
      .setDepth(2)
      .setInteractive();

    contactsBtn.on("pointerup", () => {
      this.scene.start("ControlsScene");
    });
  }

  createContactsButton() {
    const contact = this.add
      .image(this.config.width - 170, this.config.height - 30, "contacts-btn")
      .setOrigin(0.5)
      .setScale(0.5)
      .setDepth(2)
      .setInteractive();

    const btnbackground = this.add
      .image(
        this.config.width - 170,
        this.config.height - 30,
        "small-yellow-button"
      )
      .setOrigin(0.5)
      .setScale(0.5)
      .setDepth(1)
      .setInteractive();

    contact.on("pointerup", () => {
      this.scene.start("CreditsScene");
    });
  }

  playBgMusic() {
    // if (this.sound.get("forest-theme")) {
    //   this.sound.get("forest-theme").stop();
    //   this.sound.add("menu-theme", { loop: true, volume: 0.04 }).play();
    // }
    if (this.sound.get("menu-theme")) {
      return;
    }
    // if (this.sound.get("cave-theme")) {
    //   return;
    // }
    // if (this.sound.get("boss-theme")) {
    //   return;
    // }
    this.sound.stopAll();
    this.sound.add("menu-theme", { loop: true, volume: 0.04 }).play();
  }

  setupMenuEvents(menuItem) {
    const textGO = menuItem.textGO;
    textGO.setInteractive();

    textGO.on("pointerover", () => {
      textGO.setStyle({ fill: "#fff" });
    });

    textGO.on("pointerout", () => {
      textGO.setStyle({ fill: "#000" });
    });

    textGO.on("pointerup", () => {
      menuItem.scene && this.scene.start(menuItem.scene);

      if (menuItem.text === "Exit") {
        this.game.destroy(true);
      }
    });
  }
}

export default MenuScene;

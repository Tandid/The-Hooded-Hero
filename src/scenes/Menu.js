import BaseScene from "./BaseScene";
import TransitionScene from "./Transition";

class MenuScene extends BaseScene {
  constructor(config) {
    super("MenuScene", config);

    this.screenCenter = [config.width / 2, config.height / 1.8];
    this.menu = [
      { scene: "PlayScene", text: "Story Mode" },
      { scene: "PlayScene", text: "Multiplayer" },
      { scene: "LevelScene", text: "Levels" },
      // { scene: "TransitionScene", text: "Transition" },
      // { scene: "SettingsOverlayScene", text: "Settings" },
      // { scene: null, text: "Exit" },
    ];
  }

  create() {
    super.create();
    this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.cursorOver = this.sound.add("cursorOver");
    this.cursorOver.volume = 0.4;

    this.select = this.sound.add("select");
    this.select.volume = 0.4;

    this.pageFlip = this.sound.add("page-flip");
    this.pageFlip.volume = 0.4;

    this.flute = this.sound.add("flute");
    this.flute.volume = 0.4;

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
    const controlsBtn = this.add
      .image(this.config.width - 100, this.config.height - 30, "controls-btn")
      .setOrigin(0.5)
      .setScale(0.5)
      .setDepth(2)
      .setInteractive();

    controlsBtn.on("pointerup", () => {
      this.pageFlip.play();
      this.scene.start("ControlsScene");
    });

    controlsBtn.on("pointerover", () => {
      controlsBtn.setTint(0xc2c2c2);
      this.cursorOver.play();
    });

    controlsBtn.on("pointerout", () => {
      controlsBtn.clearTint();
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
      this.cursorOver.play();
      textGO.setStyle({ fill: "#fff" });
    });

    textGO.on("pointerout", () => {
      textGO.setStyle({ fill: "#000" });
    });

    textGO.on("pointerup", () => {
      if (menuItem.text === "Story Mode") {
        this.cameras.main.fadeOut(1000, 0, 0, 0);

        setTimeout(() => this.scene.start("TransitionScene"), 1000);
        setTimeout(() => this.scene.stop("TransitionScene"), 4000);

        setTimeout(
          () => menuItem.scene && this.scene.start(menuItem.scene),
          4000
        );
        this.flute.play();
      } else {
        menuItem.scene && this.scene.start(menuItem.scene);
        this.select.play();
      }

      if (menuItem.text === "Exit") {
        this.game.destroy(true);
      }
    });
  }
}

export default MenuScene;

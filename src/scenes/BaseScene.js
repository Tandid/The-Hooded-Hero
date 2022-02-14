import Phaser from "phaser";

class BaseScene extends Phaser.Scene {
  constructor(key, config) {
    super(key);
    this.config = config;
    this.screenCenter = [config.width / 2, config.height / 2];
    this.fontSize = 60;
    this.fontFamily = "customFont";

    this.lineHeight = 75;
    this.fontOptions = {
      fontFamily: `${this.fontFamily}`,
      fontSize: `${this.fontSize}px`,
      fill: "#713E01",
      fontWeight: "larger",
    };
  }

  create() {
    this.add.image(0, 0, "sky-bg").setOrigin(0).setScale(1);

    if (this.config.canGoBack) {
      const backBtn = this.add
        .image(this.config.width - 30, this.config.height - 30, "small-left")
        .setOrigin(0.5)
        .setScale(0.5)
        .setInteractive()
        .setDepth(2);

      const btnbackground = this.add
        .image(
          this.config.width - 30,
          this.config.height - 30,
          "small-blue-button"
        )
        .setOrigin(0.5)
        .setScale(0.5)
        .setInteractive()
        .setDepth(1);

      backBtn.on("pointerup", () => {
        this.scene.start("MenuScene");
      });
    } else {
      const settingsBtn = this.add
        .image(
          this.config.width - 30,
          this.config.height - 30,
          "settings-button"
        )
        .setOrigin(0.5)
        .setScale(0.5)
        .setInteractive();

      settingsBtn.on("pointerup", () => {
        this.scene.start("SettingsScene");
      });
    }
  }

  createMenu(menu, setupMenuEvents) {
    let lastMenuPositionY = 0;

    menu.forEach((menuItem) => {
      const menuPosition = [
        this.screenCenter[0],
        this.screenCenter[1] + lastMenuPositionY,
      ];
      menuItem.textGO = this.add
        .text(...menuPosition, menuItem.text, this.fontOptions)
        .setOrigin(0.5, 1);
      lastMenuPositionY += this.lineHeight;
      setupMenuEvents(menuItem);
    });
  }
}

export default BaseScene;

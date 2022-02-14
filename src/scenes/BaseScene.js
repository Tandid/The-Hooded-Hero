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
    this.add.image(0, 0, "sky-bg").setOrigin(0).setScale(1).setDepth(-1);
    this.add.image(0, 0, "mountain-bg").setOrigin(0).setScale(1).setDepth(-1);
    this.add
      .image(this.config.width / 30, this.config.height - 400, "tree-1")
      .setOrigin(0.5)
      .setScale(2)
      .setDepth(-1);

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

    const totalLeavesNum = 20;
    this.leaves = [];
    for (let i = 0; i < totalLeavesNum; i++) {
      const x = Math.floor(Math.random() * this.scale.width);
      const y = Math.floor(Math.random() * this.scale.height);
      const angle = Math.floor(Math.random() * -10);
      const leaf = this.add
        .image(x, y, "leaf")
        .setScale(1.5)
        .setAngle(angle)
        .setDepth(-1);
      this.tweens.add({
        targets: leaf,
        // scale: { from: 1.5, to: 1.7 },
        delay: i * 100,
        repeat: -1,
        yoyo: true,
      });
      this.leaves.push(leaf);
    }

    const totalArrowsNum = 5;
    this.arrows = [];
    for (let i = 0; i < totalArrowsNum; i++) {
      const x = Math.floor(Math.random() * this.scale.width);
      const y = Math.floor(Math.random() * this.scale.height);
      const angle = Math.floor(Math.random() * -10);
      const arrow = this.add
        .image(x, y, "arrow")
        .setScale(1.5)
        .setAngle(angle)
        .setDepth(-1);
      this.tweens.add({
        targets: arrow,
        // scale: { from: 1.5, to: 1.7 },
        delay: i * 100,
        repeat: -1,
        yoyo: true,
      });
      this.arrows.push(arrow);
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

  update() {
    this.leaves.forEach((leaf) => {
      leaf.y += 0.4;
      leaf.x += -0.9;
      if (leaf.x < 0) {
        leaf.x = this.scale.width + 100;
        leaf.y = Math.floor(Math.random() * this.scale.height);
      }
    });
    this.arrows.forEach((arrow) => {
      arrow.x += 5;
      if (arrow.x > 1600) {
        arrow.x = this.scale.width - 1600;
        arrow.y = Math.floor(Math.random() * this.scale.height);
      }
    });
  }
}

export default BaseScene;

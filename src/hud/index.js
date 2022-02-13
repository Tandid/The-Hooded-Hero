import Phaser from "phaser";

class Hud extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

    scene.add.existing(this);

    const { rightTopCorner, leftTopCorner } = scene.config;

    this.containerWidth = 100;
    this.setPosition(
      rightTopCorner.x - this.containerWidth,
      rightTopCorner.y + 10
    );

    this.setScrollFactor(0);

    this.fontSize = 50;
    this.setupList();
    this.createPlayerIcon();
  }

  setupList() {
    const scoreBoard = this.createScoreboard();
    this.add([scoreBoard]);

    let lineHeight = 0;
    this.list.forEach((item) => {
      item.setPosition(item.x, item.y + lineHeight);
      lineHeight += 20;
    });
  }

  createPlayerIcon() {
    // const btn = this.add
    //   .image(leftTopCorner.x, leftTopCorner.y, "restart")
    //   .setOrigin(1)
    //   .setScrollFactor(0)
    //   .setScale(0.8)
    //   .setInteractive()
    //   .setDepth(2);
    // const btnbackground = this.add
    //   .image(leftTopCorner.x, leftTopCorner.y, "small-red-button")
    //   .setOrigin(1)
    //   .setScrollFactor(0)
    //   .setScale(1)
    //   .setInteractive()
    //   .setDepth(1);
    // btn.on("pointerup", () => {
    //   this.scene.restart();
    // });
  }

  // createPlayerIcon() {}

  createScoreboard() {
    const scoreText = this.scene.add.text(0, 0, "0", {
      fontSize: `${this.fontSize}px`,
      fill: "#fff",
    });
    const scoreImage = this.scene.add
      .image(scoreText.width + 5, 0, "coin")
      .setOrigin(1.5, 0)
      .setScale(1);

    const scoreBoard = this.scene.add.container(0, 0, [scoreText, scoreImage]);
    scoreBoard.setName("scoreBoard");
    return scoreBoard;
  }

  updateScoreboard(score) {
    const [scoreText, scoreImage] = this.getByName("scoreBoard").list;
    scoreText.setText(score);
    scoreImage.setX(scoreText.width + 5);
  }
}

export default Hud;

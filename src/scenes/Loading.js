import Phaser from "phaser";

class LoadingScene extends Phaser.Scene {
  constructor(config) {
    super("LoadingScene");
    this.config = config;
    this.fontFamily = "customFont";
    this.playerStart = this.config.width / 10;
    this.acceleration = 120;
    this.num = 10;
  }

  create() {
    this.add
      .image(this.config.width / 2, this.config.height / 4, "logo")
      .setOrigin(0.5)
      .setScale(1.1);

    this.add
      .text(
        this.config.width / 2,
        this.config.height / 2,
        `Loading Assets and Textures ... (${this.num}%)`,
        {
          fontFamily: "customFont",
          fontSize: "30px",
          fontWeight: "larger",
        }
      )
      .setOrigin(0.5, 0.5)
      .setColor("#FFF");

    this.add
      .image(this.config.width / 1.1 + 50, this.config.height / 1.3, "dummy")
      .setScale(1);

    this.physics.add
      .image(this.playerStart, this.config.height / 1.6, "arrow")
      .setAccelerationX(this.acceleration)
      .setScale(1.1);

    this.generateRandomHint();

    setTimeout(() => {
      this.scene.stop("LoadingScene");
      this.scene.start("MenuScene");
    }, 3800);
  }

  generateRandomHint() {
    const messages = [
      "The more coins you collect, the more health you get back!",
      "Sometimes patience is your best friend..",
      "Arrows do 20 damage per hit!",
      "You can outrun all your enemies!",
      "Your sword does more than double the damage of your arrows",
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);

    this.add
      .text(
        this.config.width / 2,
        this.config.height / 1.1,
        `Hint: ${messages[randomIndex]}`,
        {
          fontFamily: "customFont",
          fontSize: "15px",
          fontWeight: "larger",
        }
      )
      .setOrigin(0.5, 0.5)
      .setColor("#FFF");
  }
}

export default LoadingScene;

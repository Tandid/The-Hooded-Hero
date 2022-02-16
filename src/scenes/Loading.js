import Phaser from "phaser";

class LoadingScene extends Phaser.Scene {
  constructor(config) {
    super("LoadingScene");
    this.config = config;
    this.fontFamily = "customFont";
    this.playerStart = this.config.width / 10;
    this.acceleration = 120;
    this.num = 48;
  }

  create() {
    this.add
      .image(this.config.width / 2, this.config.height / 2, "logo")
      .setOrigin(0.5)
      .setScale(0.6);

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

    // setTimeout(() => {
    //   this.scene.stop("LoadingScene");
    //   this.scene.start("MenuScene");
    // }, 3800);
    setTimeout(() => {
      this.scene.stop("LoadingScene");
      this.scene.start("MenuScene");
    }, 100);
  }

  generateRandomHint() {
    const messages = [
      "Not all heroes wear capes, some wear hoods..",
      "Hint: Yes, you can double jump!",
      "The Hooded Hero's favorite show is Arrow, who would've guess right??",
      "Hint: A little birdy said to stay away from Level 3, unless...",
      "Hint: Does our hero ever need to restock on arrows?? Spam away!",
      "Hint: Sword attacks do double the damage of arrows. You're welcome. ",
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);

    this.add
      .text(
        this.config.width / 2,
        this.config.height / 1.1,
        `${messages[randomIndex]}`,
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

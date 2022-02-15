import Phaser from "phaser";

class TransitionScene extends Phaser.Scene {
  constructor(config) {
    super("TransitionScene");
    this.config = config;
    this.fontFamily = "customFont";
    this.playerStart = this.config.width / 10;
    this.acceleration = 120;
    this.num = 48;
  }

  create() {
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    setTimeout(() => this.cameras.main.fadeOut(1000, 0, 0, 0), 2000);

    this.add
      .text(this.config.width / 2, this.config.height / 2, `Loading ...`, {
        fontFamily: "customFont",
        fontSize: "72px",
        fontWeight: "larger",
      })
      .setOrigin(0.5, 0.5)
      .setColor("#FFF");

    const player = this.add
      .image(
        this.config.width / 1.1 + 50,
        this.config.height / 1.1,
        "player-icon"
      )
      .setScale(0.5)
      .setDepth(-1);

    this.tweens.add({
      targets: player,
      scale: { from: 0.5, to: 0.6 },
      repeat: -1,
      yoyo: true,
    });

    this.generateRandomHint();

    // setTimeout(() => {
    //   this.scene.stop("LoadingScene");
    //   this.scene.start("MenuScene");
    // }, 1000);
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

export default TransitionScene;

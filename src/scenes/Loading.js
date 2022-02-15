import Phaser from "phaser";
// import Player from "../entities/Player";
// import initAnimations from "./anims/playerAnims";

class LoadingScene extends Phaser.Scene {
  constructor(config) {
    super("LoadingScene");
    this.config = config;
    this.fontFamily = "customFont";
    this.playerStart = this.config.width / 10;
    this.acceleration = 30;
  }

  init() {}

  create() {
    this.add
      .image(this.config.width / 2, this.config.height / 4, "logo")
      .setOrigin(0.5)
      .setScale(1.1);

    this.add
      .text(
        this.config.width / 2,
        this.config.height / 2,
        "Loading Assets and Textures ... ",
        {
          fontFamily: "customFont",
          fontSize: "30px",
          fontWeight: "larger",
        }
      )
      .setOrigin(0.5, 0.5)
      .setColor("#FFF");

    // const player = this.createPlayer();
    // const flag = this.createFlag();
    this.generateRandomHint();

    // this.createPlayerColliders(player, {
    //   colliders: {
    //     platformsColliders: layers.platformsColliders,
    //     player,
    //   },
    // });

    // setTimeout(() => {
    //   this.scene.stop("LoadingScene");
    //   this.scene.start("MenuScene");
    // }, 4000);
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

  createPlayer() {
    this.physics.add
      .sprite(this.playerStart, this.config.height / 1.5, "player")
      .setAccelerationX(this.acceleration)
      .setScale(0.7);
  }

  createFlag() {
    this.physics.add
      .image(this.config.width / 1.1, this.config.height / 1.5 - 10, "banner")
      .setScale(0.5);
  }

  // createPlayer() {
  //   return new Player(this, this.playerStart, this.config.height / 1.5);
  // }

  // update() {
  //   this.play("run", true);
  // }
}

export default LoadingScene;

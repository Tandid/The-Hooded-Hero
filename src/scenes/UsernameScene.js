import UsernameConfig from "../utils/UsernameSceneConfig";

export default class UsernameScene extends Phaser.Scene {
  constructor(config) {
    super("UsernameScene");
    this.config = config;
    this.state = {
      titleText: "Enter your name!",
    };
  }

  init(data) {
    this.socket = data.socket;
  }

  create() {
    const usernameConfig = new UsernameConfig(this, this.socket);

    this.add
      .image(this.config.width / 2, this.config.height / 2, "panel-2")
      .setOrigin(0.5)
      .setScale(0.7);

    // creates the title box with type effect
    this.add
      .text(
        this.config.width / 2,
        this.config.height / 3,
        `${this.state.titleText}`,
        {
          fontFamily: "customFont",
          fontSize: "60px",
          fontWeight: "larger",
        }
      )
      .setOrigin(0.5, 0.5)
      .setColor("#000");

    usernameConfig.runAllTextBoxLogic(
      this.config.width / 2,
      this.config.height / 2,
      {
        fontFamily: "customFont",
        textColor: 0xffffff,
        fontSize: "20px",
        fixedWidth: 500,
        fixedHeight: 60,
      }
    );
  }
}

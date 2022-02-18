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
      .text(
        this.config.width / 2,
        this.config.height / 3,
        `${this.state.titleText}`,
        {
          fontFamily: "customFont",
          fontSize: "50px",
          fontWeight: "larger",
        }
      )
      .setOrigin(0.5, 0.5)
      .setColor("#FFF");

    usernameConfig.runAllTextBoxLogic(
      this.config.width / 2,
      this.config.height / 2,
      {
        fontFamily: "customFont",
        textColor: 0xffffff,
        fontSize: "20px",
      }
    );
  }
}

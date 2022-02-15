import BaseScene from "./BaseScene";

class CreditsScene extends BaseScene {
  constructor(config) {
    super("CreditsScene", { ...config, canGoBack: true });

    this.menu = [{ scene: null, text: "" }];
  }

  create() {
    super.create();
    this.createCancelButton();
    this.add
      .image(this.config.width / 2, this.config.height / 2, "panel-2")
      .setOrigin(0.5)
      .setScale(0.7);

    this.add
      .image(this.config.width / 2, this.config.height / 6, "header-shadow")
      .setOrigin(0.5)
      .setScale(0.9);

    this.add
      .image(this.config.width / 2, this.config.height / 6, "header")
      .setOrigin(0.5)
      .setScale(0.9);

    this.add
      .text(this.config.width / 2, this.config.height / 6, "CONTACT", {
        fontFamily: "customFont",
        fontSize: "72px",
      })
      .setOrigin(0.5, 0.5)
      .setColor("#D9B48FFF");

    this.add
      .text(this.config.width / 1.75, 220, "Github", {
        fontFamily: "customFont",
        fontSize: "40px",
      })
      .setOrigin(0.5, 0.5)
      .setColor("0x000");

    this.add
      .text(this.config.width / 1.75 + 20, 320, "Linkedin", {
        fontFamily: "customFont",
        fontSize: "40px",
      })
      .setOrigin(0.5, 0.5)
      .setColor("0x000");

    this.add
      .text(this.config.width / 1.75, 420, "Email Address", {
        fontFamily: "customFont",
        fontSize: "40px",
      })
      .setOrigin(0.5, 0.5)
      .setColor("0x000");

    // if (this.config.canGoBack) {
    //   const settingsButton = this.add
    //     .image(
    //       this.config.width - 10,
    //       this.config.height - 10,
    //       "settings-button"
    //     )
    //     .setOrigin(1)
    //     .setScale(0.5)
    //     .setInteractive();

    //   settingsButton.on("pointerup", () => {
    //     this.scene.start("MenuScene");
    //   });
    // }
  }

  createCancelButton() {
    const cancelbtn =
      // .image(
      //   this.config.rightBottomCorner.x - 15,
      //   this.config.rightBottomCorner.y - 115,
      //   "home"
      // )
      this.add
        .image(
          this.config.width * 0.75 + 20,
          this.config.height / 7 - 10,
          "small-close"
        )
        .setOrigin(0.5)
        .setScale(0.7)
        .setInteractive()
        .setDepth(2);

    const btnbackground = this.add
      .image(
        this.config.width * 0.75 + 20,
        this.config.height / 7 - 10,
        "small-red-button"
      )
      .setOrigin(0.5)
      .setScale(0.7)
      .setDepth(1);

    cancelbtn.on("pointerup", () => {
      this.scene.start("MenuScene");
    });
  }
}

export default CreditsScene;

export default class UsernameSceneConfig {
  constructor(scene, socket) {
    this.scene = scene;
    this.socket = socket;
    this.state = {
      savedText: "",
      inputTextBox: undefined,
      inputTextBoxConfigSettings: undefined,
      confirmationButtons: undefined,
    };
  }

  runAllTextBoxLogic(x, y, config) {
    const { scene } = this;

    this.saveConfigToState(x, y, config);
    this.state.inputTextBox = this.createNameInputBox(config);
    this.state.inputTextBox.setInteractive();
    const thisConfigContext = this;

    this.state.inputTextBox.on(
      "pointerdown",
      function () {
        const config = {
          // onOpen and onClose for debugging purposes
          onTextChanged: function (textObject, text) {
            textObject.text = text;
          },
          onClose: function (textObject) {
            thisConfigContext.state.savedText = textObject.text;
            // thisConfigContext.destroyTextBox(); // destorys textbox
            thisConfigContext.startConfirmation(); // confirmation message and buttons pop up
          },
          selectAll: true,
        };
        scene.plugins
          .get("rexTextEdit")
          .edit(thisConfigContext.state.inputTextBox, config); // opens up the text editor on pointerdown with specific configurations
      },
      // recall, the third argument to the event handler provides explicit context, so we can reference scene inside the event handler
      { scene, thisConfigContext }
    );
  }
  // ------------------------------------------- HELPER METHODS-------------------------------------------

  // misc, returns savedText from inputTextBox
  getName() {
    return this.state.savedText;
  }

  saveConfigToState(x, y, config) {
    if (!this.state.inputTextBoxConfigSettings) {
      this.state.inputTextBoxConfigSettings = config;
      this.state.inputTextBoxConfigSettings.x = x;
      this.state.inputTextBoxConfigSettings.y = y;
    }
  }

  // Creates InputTextBox given a particular configuration object
  createNameInputBox(config) {
    const { scene } = this;
    const { x, y, fixedWidth, fixedHeight } = config;
    return scene.add
      .rexBBCodeText(x, y, "", {
        fontFamily: "customFont",
        fontSize: "50px",
        fixedWidth,
        fixedHeight,
        halign: "center",
        valign: "center",
        maxLines: 1,
      })
      .setOrigin(0.5);
  }

  startConfirmation() {
    const { scene } = this;

    scene.add
      .text(640, 400, `Your name is: ${this.getName()}?`, {
        fontFamily: "customFont",
        fontSize: "60px",
        fontWeight: "larger",
      })
      .setOrigin(0.5)
      .setColor("#000");

    this.addButtons("customFont"); // draw buttons
    this.handleButtonEvents(); // button events are different than textbox events.
  }

  // this method will create our buttons for us when called in addButtons method
  createConfirmationButton(text, fontFamily) {
    const { scene } = this;

    const confirmationButton = scene.rexUI.add.label({
      width: 30,
      height: 30,
      background: scene.rexUI.add
        .roundRectangle(0, 0, 2, 4, 20, 0x4e342e)
        .setStrokeStyle(2, 0x7b5e57), // same colors at ConfirmationMessage
      // text: this.getText(text, 0, 0, 0, fontFamily),
      space: {
        left: 20, // space INSIDE the button
        right: 20,
      },
    });

    confirmationButton.on("pointerover", () => {});
    confirmationButton.on("pointerout", () => {});
    confirmationButton.on("pointerdown", () => {});

    return confirmationButton;
  }

  addButtons(customFont) {
    const { scene } = this;
    this.state.confirmationButtons = scene.rexUI.add
      .buttons({
        x: scene.scale.width / 2,
        y: 550,
        orientation: 0,
        buttons: [
          this.createConfirmationButton("yes", customFont),
          this.createConfirmationButton("no", customFont),
        ],
        space: {
          item: 50, // space BETWEEN buttons
        },
      })
      .layout();
  }

  // if user clicks on yes, start the next scene, if no, create new text box and delete confirmation buttons.
  handleButtonEvents() {
    const { scene } = this;
    this.state.confirmationButtons
      .on("button.click", (button) => {
        if (button.text === "yes") {
          scene.scene.stop("UsernameScene");
          scene.scene.start("MainMenuScene", {
            socket: this.socket,
            username: this.getName(),
          });
          scene.scene.launch("SettingsButton");
        } else {
          const { x, y } = this.state.inputTextBoxConfigSettings;
          this.runAllTextBoxLogic(x, y, this.state.inputTextBoxConfigSettings);
          this.state.confirmationButtons.destroy(); // destroys buttons
        }
      })
      .on("button.over", (button) => {
        button.getElement("background").setStrokeStyle(1, 0xffffff);
      })
      .on("button.out", (button) => {
        button.getElement("background").setStrokeStyle(2, 0x7b5e57);
      });
  }
}

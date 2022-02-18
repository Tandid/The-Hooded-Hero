export default class UsernameSceneConfig {
  constructor(scene, config, socket) {
    this.scene = scene;
    // this.socket = socket;
    this.state = {
      savedText: "",
      inputTextBox: "", // holds username input box in state so we can start and destroy at will
      inputTextBoxConfigSettings: undefined, // holds username input box config settings so we can create an input box at will with proper settings.
      confirmationButtons: undefined, // reference to a group of buttons, can create and destroy at will
    };
  }

  runAllTextBoxLogic(x, y, config) {
    const { scene } = this;

    this.saveConfigToState(x, y, config);

    this.state.inputTextBox = this.createNameInputBox(config);
    // this.state.inputTextBox.setInteractive();

    const thisConfigContext = this;

    // this.state.inputTextBox.on(
    //   "pointerdown",
    //   function () {
    //     const config = {
    //       // onOpen and onClose for debugging purposes
    //       onTextChanged: function (textObject, text) {
    //         textObject.text = text;
    //       },
    //       onClose: function (textObject) {
    //         thisConfigContext.state.savedText = textObject.text;
    //         // thisConfigContext.startConfirmation();
    //       },
    //       selectAll: true,
    //     };
    //   },
    //   { scene, thisConfigContext }
    // );
  }
  // ------------------------------------------- HELPER METHODS-------------------------------------------

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

  createNameInputBox(config) {
    const { scene } = this;
    const { x, y, textColor, fontSize, fixedWidth, fixedHeight, fontFamily } =
      config;
    scene.add
      .text(x, y, `Hello`, {
        fontFamily: "customFont",
        fontSize: "50px",
        fontWeight: "larger",
        backgroundColor: "#333333",
      })
      .setOrigin(0.5, 0.5)
      .setColor("#FFF");
  }
}

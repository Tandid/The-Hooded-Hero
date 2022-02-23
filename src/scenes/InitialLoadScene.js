import Phaser from "phaser";

class InitialLoadScene extends Phaser.Scene {
  constructor() {
    super("InitialLoadScene");
  }

  preload() {
    this.load.scenePlugin(
      "rexuiplugin",
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js",
      "rexUI",
      "rexUI"
    );

    this.load.image("logo", "public/assets/logo.png");
    this.load.image("dummy", "public/assets/dummy.png");
    this.load.image("arrow", "public/assets/weapons/arrow.png");

    this.load.once("complete", () => {
      this.startGame();
    });
  }

  startGame() {
    this.registry.set("level", 1);
    this.registry.set("unlocked-levels", 1);
    this.scene.run("PreloadScene");
    this.scene.start("LoadingScene");
  }
}

export default InitialLoadScene;

import Phaser from "phaser";
import io from "socket.io-client";

class InitialLoadScene extends Phaser.Scene {
  constructor() {
    super("InitialLoadScene");
    this.socket = io();
  }

  // init(data) {
  //   this.socket = data.socket;
  //   console.log({ InitialLoad: data });
  // }

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
    this.scene.run("PreloadScene", { socket: this.socket });
    this.scene.start("LoadingScene", { socket: this.socket });
  }
}

export default InitialLoadScene;

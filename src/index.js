// /** @type {import("../typings/phaser")} */
/* The above loads the phaser.d.ts file so that VSCode has autocomplete for the Phaser API.
If you experience problems with autocomplete, try opening the phaser.d.ts file and scrolling up and down in it.
That may fix the problem -- some weird quirk with VSCode. A new typing file is released with
every new release of Phaser. Make sure it's up-to-date!*/

import Phaser from "phaser";
import io from "socket.io-client";
import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";
import InputTextPlugin from "phaser3-rex-plugins/plugins/inputtext-plugin";
import BBCodeTextPlugin from "phaser3-rex-plugins/plugins/bbcodetext-plugin";
import TextEditPlugin from "phaser3-rex-plugins/plugins/textedit-plugin.js";

import PlayScene from "./scenes/Play";
import InitialLoadScene from "./scenes/InitialLoadScene";
import InitialControlsScene from "./scenes/InitialControls";
import PreloadScene from "./scenes/Preload";
import MenuScene from "./scenes/Menu";
import LevelScene from "./scenes/Levels";
import ControlsScene from "./scenes/Controls";
import CreditsScene from "./scenes/Credits";
import SettingsOverlayScene from "./scenes/SettingsOverlay";
import LoadingScene from "./scenes/Loading";
import TransitionScene from "./scenes/Transition";
import ContactScene from "./scenes/Contact";
import ComingSoonScene from "./scenes/ComingSoon";
import PauseScene from "./scenes/Pause";
import LoseScene from "./scenes/LoseScene";
import WinScene from "./scenes/WinScene";
import UsernameScene from "./scenes/UsernameScene";
import UserConfirmationScene from "./scenes/UserConfirmation";
import CharSelection from "./scenes/CharSelection";
import LobbyScene from "./scenes/LobbyScene";
import JoinRoomScene from "./scenes/JoinRoomScene";
import WaitingScene from "./scenes/WaitingScene";

const MAP_WIDTH = 16000;

const WIDTH = 1280;
const HEIGHT = 720;
const ZOOM_FACTOR = 0.5;

const SHARED_CONFIG = {
  mapOffset: MAP_WIDTH > WIDTH ? MAP_WIDTH - WIDTH : 0,
  width: WIDTH,
  height: HEIGHT,
  zoomFactor: ZOOM_FACTOR,
  debug: false,
  leftTopCorner: {
    x: (WIDTH - WIDTH / ZOOM_FACTOR) / 2,
    y: (HEIGHT - HEIGHT / ZOOM_FACTOR) / 2,
  },
  rightTopCorner: {
    x: WIDTH / ZOOM_FACTOR + (WIDTH - WIDTH / ZOOM_FACTOR) / 2,
    y: (HEIGHT - HEIGHT / ZOOM_FACTOR) / 2,
  },
  rightBottomCorner: {
    x: WIDTH / ZOOM_FACTOR + (WIDTH - WIDTH / ZOOM_FACTOR) / 2,
    y: HEIGHT / ZOOM_FACTOR + (HEIGHT - HEIGHT / ZOOM_FACTOR) / 2,
  },
  lastLevel: 3,
};

const Scenes = [
  InitialLoadScene,
  LoadingScene,
  PreloadScene,
  TransitionScene,
  UsernameScene,
  UserConfirmationScene,
  InitialControlsScene,
  MenuScene,
  PlayScene,
  ComingSoonScene,
  CharSelection,
  LobbyScene,
  WaitingScene,
  JoinRoomScene,
  LevelScene,
  SettingsOverlayScene,
  ControlsScene,
  CreditsScene,
  ContactScene,
  PauseScene,
  LoseScene,
  WinScene,
];
const createScene = (Scene) => new Scene(SHARED_CONFIG);
const initScenes = () => Scenes.map(createScene);

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: SHARED_CONFIG.debug,
    },
  },
  parent: "phaser-container",
  dom: {
    createContainer: true,
  },
  plugins: {
    scene: [
      {
        key: "rexUI",
        plugin: UIPlugin,
        mapping: "rexUI",
      },
    ],
    global: [
      {
        key: "rexInputTextPlugin",
        plugin: InputTextPlugin,
        start: true,
      },
      {
        key: "rexBBCodeTextPlugin",
        plugin: BBCodeTextPlugin,
        start: true,
      },
      {
        key: "rexTextEdit",
        plugin: TextEditPlugin,
        start: true,
      },
    ],
  },
  scene: initScenes(),
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

new Phaser.Game(config);

import Phaser from "phaser";
import OnlinePlayer from "../entities/OnlinePlayer";
import EventEmitter from "../events/Emitter";

import initAnims from "../anims";

class WaitingScene extends Phaser.Scene {
  constructor(config) {
    super("WaitingScene");
    this.config = config;
    this.stageKey = "lobby";
    this.opponents = {};
    this.requiredPlayers = 4;
  }

  init(data) {
    console.log({ Waiting: data });
    this.socket = data.socket;
    this.roomInfo = data.roomInfo;
    this.roomKey = data.roomKey;
    this.charSpriteKey = data.charSpriteKey;
    this.username = data.username;
  }

  create() {
    this.cursorOver = this.sound.add("cursorOver");
    this.cursorOver.volume = 0.4;

    this.select = this.sound.add("select");
    this.select.volume = 0.4;

    const map = this.createMap();

    initAnims(this.anims);

    const layers = this.createLayers(map);
    const playerZones = this.getPlayerZones(layers.playerZones);
    const player = this.createPlayer(playerZones.start);

    this.createPlayerColliders(player, {
      colliders: {
        platformsColliders: layers.platformsColliders,
      },
    });

    this.createBG(map);
    this.createHomeButton();
    this.createSettingsButton();
    this.setupFollowupCameraOn(player);
  }

  createMap() {
    const map = this.make.tilemap({ key: this.stageKey });
    map.addTilesetImage("tileset_1", "forest-tiles");
    map.addTilesetImage("tileset_2", "cave-tiles");
    map.addTilesetImage("environment", "environment-tiles");

    return map;
  }

  createLayers(map) {
    const tileset1 = map.getTileset("tileset_1");
    const tileset2 = map.getTileset("tileset_2");
    const tileset3 = map.getTileset("environment");

    const platformsColliders = map.createLayer("platforms_colliders", [
      tileset1,
      tileset2,
      tileset3,
    ]);

    const environment = map.createLayer("environment", [tileset3]).setDepth(-4);

    const platforms = map.createLayer("platforms", [
      tileset1,
      tileset2,
      tileset3,
    ]);
    const playerZones = map.getObjectLayer("player_zones");

    platformsColliders.setCollisionByProperty({ collides: true }).setAlpha(0);

    return {
      environment,
      platforms,
      platformsColliders,
      playerZones,
    };
  }

  createBG(map) {
    const bgObject = map.getObjectLayer("distance_bg").objects[0];

    this.forestImageOne = this.add
      .tileSprite(
        bgObject.x,
        bgObject.y,
        this.config.width * 3,
        bgObject.height * 1.75,
        "bg-forest-1"
      )
      .setOrigin(0.5)
      .setDepth(-10)
      .setScale(1)
      .setScrollFactor(0, 1);

    this.forestImageTwo = this.add
      .tileSprite(
        0,
        300,
        this.config.width + 3000,
        this.config.height + 800,
        "bg-forest-2"
      )
      .setOrigin(0.5, 0)
      .setDepth(-11)
      .setScale(1)
      .setScrollFactor(0, 1);

    this.forestImageThree = this.add
      .tileSprite(
        0,
        300,
        this.config.width + 3000,
        this.config.height + 800,
        "bg-forest-3"
      )
      .setOrigin(0.5, 0)
      .setDepth(-12)
      .setScale(1)
      .setScrollFactor(0, 1);

    this.mountainImage = this.add
      .tileSprite(
        0,
        200,
        this.config.width + 3000,
        this.config.height + 800,
        "mountain-bg"
      )
      .setOrigin(0.5, 0)
      .setDepth(-13)
      .setScale(1)
      .setScrollFactor(0, 1);

    this.skyImage = this.add
      .tileSprite(
        0,
        0,
        this.config.width + 3000,
        this.config.height + 800,
        "sky-bg"
      )
      .setOrigin(0.5, 0)
      .setDepth(-14)
      .setScale(1)
      .setScrollFactor(0, 1);
  }

  createSettingsButton() {
    const settingsBtn = this.add
      .image(
        this.config.rightBottomCorner.x - 15,
        this.config.rightBottomCorner.y - 10,
        "settings-button"
      )
      .setOrigin(1)
      .setScrollFactor(0)
      .setScale(1)
      .setInteractive();

    settingsBtn.on("pointerup", () => {
      this.scene.pause("WaitingScene");
      this.scene.sendToBack("WaitingScene");
      this.scene.launch("SettingsOverlayScene");
    });

    settingsBtn.on("pointerover", () => {
      settingsBtn.setTint(0xc2c2c2);
      this.cursorOver.play();
    });
    settingsBtn.on("pointerout", () => {
      settingsBtn.clearTint();
    });
  }

  createHomeButton() {
    const homeBtn = this.add
      .image(
        this.config.rightBottomCorner.x - 15,
        this.config.rightBottomCorner.y - 115,
        "home-btn"
      )
      .setOrigin(1)
      .setScrollFactor(0)
      .setScale(0.9)
      .setInteractive()
      .setDepth(2);

    homeBtn.on("pointerup", () => {
      this.select.play();
      this.scene.pause("PlayScene");
      // this.scene.sendToBack("PlayScene");
      this.scene.launch("PauseScene");
    });
    homeBtn.on("pointerover", () => {
      homeBtn.setTint(0xc2c2c2);
      this.cursorOver.play();
    });
    homeBtn.on("pointerout", () => {
      homeBtn.clearTint();
    });
  }

  createPlayer(start) {
    return new OnlinePlayer(
      this,
      start.x,
      start.y,
      this.charSpriteKey,
      this.username,
      this.socket
    );
  }

  createPlayerColliders(player, { colliders }) {
    player.addCollider(colliders.platformsColliders);
  }

  setupFollowupCameraOn(player) {
    const { height, width, mapOffset, zoomFactor } = this.config;
    this.physics.world.setBounds(0, 0, width + mapOffset, height * 3);
    this.cameras.main
      .setBounds(0, 0, width + mapOffset, height + 1000)
      .setZoom(zoomFactor);
    this.cameras.main.startFollow(player);
  }

  getPlayerZones(playerZonesLayer) {
    const playerZones = playerZonesLayer.objects;
    return {
      start: playerZones.find((zone) => zone.name === "startZone"),
      end: playerZones.find((zone) => zone.name === "endZone"),
    };
  }
}

export default WaitingScene;

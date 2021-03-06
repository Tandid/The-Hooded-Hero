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
    this.requiredPlayers = 1;
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
    const height = this.config.height;
    this.cursorOver = this.sound.add("cursorOver");
    this.cursorOver.volume = 0.4;

    this.select = this.sound.add("select");
    this.select.volume = 0.4;

    const map = this.createMap();

    initAnims(this.anims);

    const layers = this.createLayers(map);
    const playerZones = this.getPlayerZones(layers.playerZones);
    const player = this.createPlayer(playerZones.start);
    this.player = player;
    console.log({ Me: this.player });

    this.createPlayerColliders(player, {
      colliders: {
        platformsColliders: layers.platformsColliders,
      },
    });

    this.createBG(map);
    this.createHomeButton();
    this.createSettingsButton();
    this.setupFollowupCameraOn(player);
    this.createRoomKey();

    this.playerCounter = this.add
      .text(1200, height / 5, `${this.roomInfo.playerNum} player(s) in lobby`, {
        fontFamily: "customFont",
        fontSize: "100px",
        fill: "#000",
      })
      .setOrigin(0.5)
      .setDepth(2);

    this.waitingForPlayers = this.add
      .text(
        1200,
        height / 5 + 100,
        `Waiting for ${
          this.requiredPlayers - this.roomInfo.playerNum
        } player(s)`,
        {
          fontFamily: "customFont",
          fontSize: "0px",
          fill: "#fff",
        }
      )
      .setOrigin(0.5);

    this.startButton = this.add
      .text(1200, height / 5 + 200, "", {
        fontFamily: "customFont",
        fontSize: "200px",
        fill: "#000",
      })
      .setOrigin(0.5)
      .setDepth(2);

    this.usernameText = this.add
      .text(this.player.x, this.player.y, this.username, {
        fontSize: "40px",
        fill: "#fff",
      })
      .setOrigin(0.5, 1)
      .setDepth(2);

    const countdown = this.add
      .text(1200, height / 5 + 200, `10`, {
        fontFamily: "customFont",
        fontSize: "0px",
        fill: "#fff",
      })
      .setOrigin(0.5)
      .setDepth(2);

    if (this.roomInfo.playerNum < this.requiredPlayers) {
      this.waitingForPlayers.setFontSize("100px");
    }

    // sends message to randomize when first player joins lobby
    if (this.roomInfo.playerNum === 1) {
      this.socket.emit("randomize");
    }

    // renders start button when there are 4 or more players in lobby;
    if (this.roomInfo.playerNum >= this.requiredPlayers) {
      this.startButton.setText("Start");
    }

    Object.keys(this.roomInfo.players).forEach((playerId) => {
      if (playerId !== this.socket.id) {
        const { spriteKey, username } = this.roomInfo.players[playerId];
        this.opponents[playerId] = new OnlinePlayer(
          this,
          playerZones.start.x,
          playerZones.start.y,
          spriteKey,
          username,
          this.socket,
          false
        );
        this.opponents[playerId].body.setAllowGravity(false);

        this[`opponents${playerId}`] = this.add
          .text(
            this.opponents[playerId].x + 90,
            this.opponents[playerId].y - 160,
            username,
            {
              fontSize: "40px",
              fill: "#fff",
            }
          )
          .setOrigin(0.5, 1);
      }
    });

    this.socket.on("newPlayerJoined", ({ playerId, playerInfo }) => {
      if (!this.roomInfo.players[playerId]) {
        this.roomInfo.playerNum += 1;
        this.roomInfo.players[playerId] = playerInfo; // { username, spriteKey }
        this.opponents[playerId] = new OnlinePlayer(
          this,
          playerZones.start.x,
          playerZones.start.y,
          this.roomInfo.players[playerId].spriteKey,
          this.roomInfo.players[playerId].username,
          this.socket,
          false
        );
        this.opponents[playerId].body.setAllowGravity(false);
      }

      console.log({ Opponent: this.opponents[playerId] });

      if (this.roomInfo.playerNum === this.requiredPlayers) {
        this.waitingForPlayers.setFontSize("0px");
        this.startButton.setText("Start");
      }

      this.waitingForPlayers.setText(
        `Waiting for ${
          this.requiredPlayers - this.roomInfo.playerNum
        } player(s)`
      );

      this.playerCounter.setText(
        `${this.roomInfo.playerNum} player(s) in lobby`
      );

      this[`opponents${playerId}`] = this.add
        .text(
          this.opponents[playerId].x,
          this.opponents[playerId].y,
          this.roomInfo.players[playerId].username,
          {
            fontSize: "40px",
            fill: "#fff",
          }
        )
        .setOrigin(0.5, 1);
    });

    this.socket.on("playerLeft", ({ playerId }) => {
      // remove opponent from opponent list
      if (this.opponents[playerId]) {
        this.opponents[playerId].destroy(); // remove opponent's game object
        delete this.opponents[playerId]; // remove opponent's key-value pair
        this[`opponents${playerId}`].destroy(); // remove opponent's name
      }

      // remove opponent from player list
      if (this.roomInfo.players[playerId]) {
        delete this.roomInfo.players[playerId];
        this.roomInfo.playerNum -= 1;

        // show waiting message if player num becomes lower than required num for starting game
        if (this.roomInfo.playerNum < this.requiredPlayers) {
          this.waitingForPlayers.setText(
            `Waiting for ${
              this.requiredPlayers - this.roomInfo.playerNum
            } player(s)`
          );
          this.waitingForPlayers.setFontSize("100px");
          this.startButton.setText("");
        }
      }

      // update display for player num in the room
      this.playerCounter.setText(
        `${this.roomInfo.playerNum} player(s) in lobby`
      );
    });

    this.socket.on("playerMoved", ({ playerId, moveState }) => {
      if (this.opponents[playerId]) {
        this.opponents[playerId].updateOtherPlayer(moveState);
        this[`opponents${playerId}`].setX(this.opponents[playerId].x + 90);
        this[`opponents${playerId}`].setY(this.opponents[playerId].y - 160);
      }
    });

    this.startButton.setInteractive();
    this.startButton.on("pointerover", () => {
      this.startButton.setFill("#fff");
    });
    this.startButton.on("pointerout", () => {
      this.startButton.setFill("#000");
    });
    this.startButton.on("pointerup", () => {
      this.input.enabled = false;
      this.socket.emit("startTimer");
      this.startButton.destroy();
    });

    this.socket.on("timerUpdated", (timeLeft) => {
      if (this.startButton) {
        this.startButton.destroy();
      }
      countdown.setFontSize("100px");
      countdown.setText(`${timeLeft}`);
    });

    this.socket.on("loadNextStage", (roomInfo) => {
      this.socket.removeAllListeners();
      this.cameras.main.fadeOut(1000, 0, 0, 0);
      this.cameras.main.on("camerafadeoutcomplete", () => {
        eventsCenter.emit("startTransition");
      });

      this.time.addEvent({
        delay: 2000,
        callback: () => {
          const nextStageKey = roomInfo.stages[0];
          this.game.music.stopAll();
          this.sound.stopAll();
          this.scene.stop("WaitingScene");
          this.scene.start(nextStageKey, {
            socket: this.socket,
            roomInfo,
            charSpriteKey: this.charSpriteKey,
            username: this.username,
          });
        },
      });
    });
  }

  createMap() {
    const map = this.make.tilemap({ key: this.stageKey });
    map.addTilesetImage("tileset_1", "forest-tiles");
    map.addTilesetImage("tileset_2", "cave-tiles");
    map.addTilesetImage("environment", "environment-tiles");
    map.addTilesetImage("house_inside_4", "house-tiles");

    return map;
  }

  createLayers(map) {
    const tileset1 = map.getTileset("tileset_1");
    const tileset2 = map.getTileset("tileset_2");
    const tileset3 = map.getTileset("environment");
    const tileset4 = map.getTileset("house_inside_4");

    const platformsColliders = map.createLayer("platforms_colliders", [
      tileset1,
      tileset2,
      tileset3,
    ]);

    const environment = map
      .createLayer("environment", [tileset3, tileset4])
      .setDepth(-4);

    const platforms = map.createLayer("platforms", [
      tileset1,
      tileset2,
      tileset3,
      tileset4,
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
      this.scene.pause("WaitingScene");
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

  createRoomKey() {
    if (this.roomKey.length === 4) {
      this.add
        .text(100, this.config.height + 600, `Room Code: ${this.roomKey}`, {
          fontFamily: "customFont",
          fontSize: "80px",
          fill: "#fff",
        })
        .setDepth(2);
    }
  }

  createPlayer(start) {
    return new OnlinePlayer(
      this,
      start.x,
      start.y,
      this.charSpriteKey,
      this.username,
      this.socket,
      true
    );
  }

  createPlayerColliders(player, { colliders }) {
    player.addCollider(colliders.platformsColliders);
  }

  setupFollowupCameraOn(player) {
    const { height, width, mapOffset } = this.config;
    this.physics.world.setBounds(0, 0, width + mapOffset, height * 3);
    this.cameras.main
      .setBounds(0, 0, width + mapOffset, height + 1000)
      .setZoom(0.5);
  }

  getPlayerZones(playerZonesLayer) {
    const playerZones = playerZonesLayer.objects;
    return {
      start: playerZones.find((zone) => zone.name === "startZone"),
      end: playerZones.find((zone) => zone.name === "endZone"),
    };
  }

  update() {
    this.displayUsername();
  }

  displayUsername() {
    this.usernameText.setX(this.player.x + 90);
    this.usernameText.setY(this.player.y - 160);
  }
}

export default WaitingScene;

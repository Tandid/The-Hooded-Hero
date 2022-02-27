import BaseScene from "./BaseScene";

export default class LobbyScene extends BaseScene {
  constructor(config) {
    super("LobbyScene", { ...config, canGoBack: true });
  }

  init(data) {
    this.socket = data.socket;
    this.charSpriteKey = data.charSpriteKey;
    this.username = data.username;
    console.log({ LobbyScene: data });
  }

  create() {
    super.create();
    this.createCloseButton();

    this.add
      .image(this.config.width / 2, this.config.height / 2, "panel-2")
      .setOrigin(0.5)
      .setScale(1, 0.7);

    this.add
      .image(this.config.width / 2, this.config.height / 6, "header")
      .setOrigin(0.5)
      .setScale(1.5, 0.9);

    this.add
      .text(this.config.width / 2, this.config.height / 6, "CHOOSE A ROOM", {
        fontFamily: "customFont",
        fontSize: "72px",
      })
      .setOrigin(0.5, 0.5)
      .setColor("#D9B48FFF");

    const width = this.scale.width;

    // send message to start room status communication chain
    this.socket.emit("checkStaticRooms");

    // render buttons for rooms in the open lobby
    const rooms = [];
    this.socket.on("staticRoomStatus", (staticRooms) => {
      for (let i = 0; i < staticRooms.length; ++i) {
        // render open lobbies with green font, and red if closed
        if (staticRooms[i].isOpen) {
          rooms[i] = this.add
            .text(width * 0.6, 50 * (i + 1), `Room ${i + 1}`, {
              fontFamily: "customFont",
              fontSize: "30px",
              fill: "#7CFC00",
              align: "center",
            })
            .setStroke("#000", 2);
        } else {
          rooms[i] = this.add.text(
            width * 0.6,
            100 * (i + 1),
            `Room ${i + 1}`,
            {
              fontFamily: "customFont",
              fontSize: "30px",
              fill: "#FF0000",
              align: "center",
            }
          );
        }
        rooms[i].setInteractive();
        rooms[i].on("pointerover", () => {
          rooms[i].setStroke("#fff", 2);
        });
        rooms[i].on("pointerout", () => {
          rooms[i].setStroke("#000", 2);
          if (staticRooms[i].isOpen) {
            rooms[i].setFill("#7CFC00");
          }
        });
        rooms[i].on("pointerdown", () => {
          rooms[i].setTint("0xc2c2c2");
        });
        rooms[i].on("pointerup", () => {
          this.input.enabled = false;
          rooms[i].clearTint();
          if (staticRooms[i].isOpen) {
            rooms[i].setFill("#7CFC00");
          }
          this.socket.emit("joinRoom", {
            roomKey: `room${i + 1}`,
            spriteKey: this.charSpriteKey,
            username: this.username,
          });
        });
      }

      // whenever a room closes/opens, the color of the button will update
      this.socket.on("updatedRooms", (staticRooms) => {
        for (let i = 0; i < staticRooms.length; ++i) {
          // render open lobbies with green font, and red if closed
          if (rooms[i]) {
            if (staticRooms[i].isOpen) {
              rooms[i].setFill("#7CFC00");
            } else {
              rooms[i].setFill("#FF0000");
            }
          }
        }
      });
    });

    const joinCustomRoom = this.add.text(
      width * 0.12,
      225,
      "Join a Custom Room",
      {
        fontFamily: "customFont",
        fontSize: "30px",
        fill: "#fff",
      }
    );

    joinCustomRoom.setInteractive();
    joinCustomRoom.on("pointerover", () => {
      joinCustomRoom.setStroke("#fff", 2);
    });
    joinCustomRoom.on("pointerout", () => {
      joinCustomRoom.setStroke("#fff", 0);
    });
    joinCustomRoom.on("pointerdown", () => {});
    joinCustomRoom.on("pointerup", () => {
      this.input.enabled = false;
      this.socket.removeAllListeners();
      this.scene.stop("LobbyScene");
      this.scene.start("JoinRoomScene", {
        socket: this.socket,
        charSpriteKey: this.charSpriteKey,
        username: this.username,
      });
    });

    // create a custom room
    const createRoomButton = this.add.text(
      width * 0.15,
      428,
      "Create New Room",
      {
        fontFamily: "customFont",
        fontSize: "30px",
        fill: "#fff",
      }
    );

    createRoomButton.setInteractive();
    createRoomButton.on("pointerover", () => {
      createRoomButton.setStroke("#fff", 2);
    });
    createRoomButton.on("pointerout", () => {
      createRoomButton.setStroke("#fff", 0);
    });
    createRoomButton.on("pointerdown", () => {});
    createRoomButton.on("pointerup", () => {
      this.input.enabled = false;
      this.socket.emit("createRoom");
    });

    // immediately join the custom room that was created
    this.socket.on("roomCreated", (code) => {
      this.socket.emit("joinRoom", {
        roomKey: code,
        spriteKey: this.charSpriteKey,
        username: this.username,
      });
    });

    // feedback if clicked on closed room
    this.socket.on("roomClosed", () => {
      this.input.enabled = true;
      const roomClosedText = this.add.text(350, 40, "This room is closed", {
        fontFamily: "customFont",
        fontSize: "30px",
        fill: "#fff",
      });
      const roomClosedInterval = setInterval(() => {
        roomClosedText.destroy();
        clearInterval(roomClosedInterval);
      }, 3000);
    });

    this.socket.on("roomFull", () => {
      this.input.enabled = true;
      const roomFullText = this.add.text(350, 40, "This room is full", {
        fontFamily: "customFont",
        fontSize: "30px",
        fill: "#fff",
      });
      const roomFullInterval = setInterval(() => {
        roomFullText.destroy();
        clearInterval(roomFullInterval);
      }, 3000);
    });

    // player will go to stage scene afer receiving room info from server
    this.socket.on("roomInfo", ({ roomInfo, roomKey }) => {
      this.socket.removeAllListeners();
      this.scene.stop("LobbyScene");
      this.scene.start("WaitingScene", {
        socket: this.socket,
        roomInfo,
        roomKey,
        charSpriteKey: this.charSpriteKey,
        username: this.username,
      });
    });
  }

  createCloseButton() {
    const closeBtn = this.add
      .image(
        this.config.width / 1.1 - 20,
        this.config.height / 7 - 10,
        "close-btn"
      )
      .setOrigin(0.5)
      .setScale(0.7)
      .setInteractive()
      .setDepth(2);

    closeBtn.on("pointerup", () => {
      this.select.play();
      this.scene.wake("MenuScene");
      this.scene.stop("LobbyScene");
    });

    closeBtn.on("pointerover", () => {
      this.cursorOver.play();
      closeBtn.setTint(0xff6666);
    });

    closeBtn.on("pointerout", () => {
      closeBtn.clearTint();
    });
  }
}

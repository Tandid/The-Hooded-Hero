import Phaser from "phaser";

class SettingsOverlayScene extends Phaser.Scene {
  constructor(config) {
    super("SettingsOverlayScene", { ...config, canGoBack: true });
    this.config = config;
  }

  create() {
    this.toggleMute = false;

    this.currentMusicBars = [1, 1, 1, 1, 1];
    this.currentSFXBars = [1, 1, 1];
    this.maxVolumeBars = 10;
    this.minVolumeBars = 0;

    this.cursorOver = this.sound.add("cursorOver");
    this.cursorOver.volume = 0.4;

    this.select = this.sound.add("select");
    this.select.volume = 0.4;

    this.pageFlip = this.sound.add("page-flip");
    this.pageFlip.volume = 0.4;

    this.createPage();
    this.createCloseButton();

    this.createMusicSetting();
    this.createSFXSetting();
    this.createMuteButton();

    this.createMusicBars();
    this.createSFXBars();
  }

  createPage() {
    this.add
      .image(this.config.width / 2, this.config.height / 2, "panel-2")
      .setOrigin(0.5)
      .setScale(0.7);

    this.add
      .image(this.config.width / 2, this.config.height / 2 - 50, "panel-4")
      .setOrigin(0.5)
      .setScale(1.3, 0.5);

    this.add
      .image(this.config.width / 2, this.config.height / 2 + 50, "panel-4")
      .setOrigin(0.5)
      .setScale(1.3, 0.5);

    this.add
      .image(this.config.width / 2, this.config.height / 2 + 150, "panel-4")
      .setOrigin(0.5)
      .setScale(0.75, 0.5);

    this.add
      .image(this.config.width / 2, this.config.height / 6, "header-shadow")
      .setOrigin(0.5)
      .setScale(0.9);

    this.add
      .image(this.config.width / 2, this.config.height / 6, "header")
      .setOrigin(0.5)
      .setScale(0.9);

    this.add
      .text(this.config.width / 2, this.config.height / 6, "SETTINGS", {
        fontFamily: "customFont",
        fontSize: "72px",
      })
      .setOrigin(0.5, 0.5)
      .setColor("#D9B48FFF");

    this.add
      .image(
        this.config.width / 3 + 50,
        this.config.height / 2 - 50,
        "music-btn-on"
      )
      .setOrigin(0.5)
      .setScale(0.8);
    this.add
      .image(
        this.config.width / 3 + 50,
        this.config.height / 2 + 50,
        "sound-btn-on"
      )
      .setOrigin(0.5)
      .setScale(0.8);

    this.add
      .image(
        this.config.width / 2 - 100,
        this.config.height / 2 + 150,
        "mute-btn-on"
      )
      .setOrigin(0.5)
      .setScale(0.8);
  }

  createMuteButton() {
    const muteBtn = this.add
      .image(
        this.config.width / 2 + 50,
        this.config.height / 2 + 150,
        "switch-off-bg"
      )
      .setOrigin(0.5)
      .setScale(1.3, 0.9)
      .setInteractive();

    if (this.toggleMute === false) {
      const switchOn = this.add
        .image(
          this.config.width / 2 + 100,
          this.config.height / 2 + 150,
          "switch-on"
        )
        .setOrigin(0.5)
        .setScale(0.8);
    } else {
      const switchOn = this.add
        .image(
          this.config.width / 2 + 100,
          this.config.height / 2 + 150,
          "switch-off"
        )
        .setOrigin(0.5)
        .setScale(0.8);
    }

    muteBtn.on("pointerup", () => {
      this.select.play();
      this.toggleMute(!this.toggleMute);
    });
    muteBtn.on("pointerover", () => {
      muteBtn.setTint(0xc2c2c2);
      this.cursorOver.play();
    });
    muteBtn.on("pointerout", () => {
      muteBtn.clearTint();
    });
  }

  createCloseButton() {
    const closeBtn = this.add
      .image(
        this.config.width * 0.75 + 20,
        this.config.height / 7 - 10,
        "close-btn"
      )
      .setOrigin(0.5)
      .setScale(0.7)
      .setInteractive()
      .setDepth(2);

    closeBtn.on("pointerup", () => {
      this.select.play();
      this.scene.start("MenuScene");
    });

    closeBtn.on("pointerover", () => {
      this.cursorOver.play();
      closeBtn.setTint(0xff6666);
    });

    closeBtn.on("pointerout", () => {
      closeBtn.clearTint();
    });
  }

  createVolumeBar(width, height) {
    this.add.image(width, height, "yellow-bar").setOrigin(0.5).setScale(0.7);
  }

  createMusicSetting() {
    this.createAddButton(
      this.config.width / 2 + 200,
      this.config.height / 2 - 50
    );
    this.createSubtractButton(
      this.config.width / 2 - 100,
      this.config.height / 2 - 50
    );

    // this.createVolumeBar(
    //   this.config.width / 2 - 65,
    //   this.config.height / 2 - 50
    // );
  }

  createSFXSetting() {
    this.createAddButton(
      this.config.width / 2 + 200,
      this.config.height / 2 + 50
    );
    this.createSubtractButton(
      this.config.width / 2 - 100,
      this.config.height / 2 + 50
    );
  }

  createSubtractButton(width, height) {
    const subtractBtn = this.add
      .image(width, height, "prev-btn")
      .setOrigin(0.5)
      .setScale(0.5)
      .setInteractive();

    subtractBtn.on("pointerup", () => {
      this.select.play();
      if (this.currentMusicBars.length > this.minVolumeBars) {
        this.currentMusicBars.pop();
      }
    });
    subtractBtn.on("pointerover", () => {
      subtractBtn.setTintFill(0xc2c2c2);
      this.cursorOver.play();
    });
    subtractBtn.on("pointerout", () => {
      subtractBtn.clearTint();
    });
  }

  createMusicBars() {
    const barWidth = 25;
    let width = this.config.width / 2 - 65;
    let height = this.config.height / 2 - 50;
    this.currentMusicBars.map((MusicBar) => {
      this.createVolumeBar(width, height);
      width += barWidth;
    });
  }

  createSFXBars() {
    const barWidth = 25;
    let width = this.config.width / 2 - 65;
    let height = this.config.height / 2 + 50;
    this.currentSFXBars.map((sfxBar) => {
      this.createVolumeBar(width, height);
      width += barWidth;
    });
  }

  createAddButton(width, height) {
    let barWidth = 25;

    const addBtn = this.add
      .image(width, height, "next-btn")
      .setOrigin(0.5)
      .setScale(0.5)
      .setInteractive();

    addBtn.on("pointerup", () => {
      this.select.play();

      if (this.currentMusicBars.length < this.maxVolumeBars) {
        this.currentMusicBars.push(1);
        console.log(this.currentMusicBars);
      }
    });

    // createSFXBars(){}

    addBtn.on("pointerover", () => {
      addBtn.setTintFill(0xc2c2c2);
      this.cursorOver.play();
    });

    addBtn.on("pointerout", () => {
      addBtn.clearTint();
    });
  }

  update() {
    this.createMusicBars();
    // this.createSFXBars();
  }
}

export default SettingsOverlayScene;

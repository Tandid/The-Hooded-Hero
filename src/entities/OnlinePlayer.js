import Phaser from "phaser";
import initAnimations from "./anims/onlinePlayerAnims";
import collidable from "../mixins/collidable";
import anims from "../mixins/anims";
import EventEmitter from "../events/Emitter";

class OnlinePlayer extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey, username, socket) {
    super(scene, x, y, spriteKey);
    this.spriteKey = spriteKey;
    this.username = username;
    this.socket = socket;
    this.moveState = {
      x,
      y,
      left: false,
      right: false,
      up: false,
    };

    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Mixins
    Object.assign(this, collidable);
    Object.assign(this, anims);

    this.init();
    this.initEvents();
  }

  init() {
    console.log(this.spriteKey);
    this.gravity = 1000;
    this.playerSpeed = 300;
    this.jumpCount = 0;
    this.consecutiveJumps = 1;
    this.hasBeenHit = false;
    this.bounceVelocity = 400;
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.jumpSound = this.scene.sound.add("jump", { volume: 0.2 });
    this.takeDamageSound = this.scene.sound.add("damage", { volume: 0.2 });
    this.stepSound = this.scene.sound.add("step", { volume: 0.3 });

    this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;

    this.body.setSize(120, 150);
    this.body.setOffset(90, 40);

    this.body.setGravityY(this.gravity);
    this.setCollideWorldBounds(true);
    this.setOrigin(0, 1);

    initAnimations(this.scene.anims, this.spriteKey);

    this.scene.time.addEvent({
      delay: 350,
      repeat: -1,
      callbackScope: this,
      callback: () => {
        if (this.isPlayingAnims("run")) {
          this.stepSound.play();
        }
      },
    });
  }

  initEvents() {
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  update() {
    if (this.hasBeenHit || !this.body) {
      return;
    }

    if (this.getBounds().top > this.scene.config.height * 2.5) {
      EventEmitter.emit("PLAYER_LOSE");
      return;
    }

    const { left, right, space, shift } = this.cursors;
    const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);
    const onFloor = this.body.onFloor();

    if (left.isDown) {
      this.lastDirection = Phaser.Physics.Arcade.FACING_LEFT;
      this.setVelocityX(-this.playerSpeed);
      this.setFlipX(true);
    } else if (right.isDown) {
      this.lastDirection = Phaser.Physics.Arcade.FACING_RIGHT;
      this.setVelocityX(this.playerSpeed);
      this.setFlipX(false);
    } else {
      this.setVelocityX(0);
    }

    if (
      isSpaceJustDown &&
      (onFloor || this.jumpCount < this.consecutiveJumps)
    ) {
      this.jumpSound.play();
      this.setVelocityY(-this.playerSpeed * 1.4);
      this.jumpCount++;
    }

    if (shift.isDown && onFloor) {
      this.playerSpeed = 500;
    } else {
      this.playerSpeed = 350;
    }

    if (onFloor) {
      this.jumpCount = 0;
    }

    onFloor
      ? this.body.velocity.x !== 0
        ? this.play(`run-${this.spriteKey}`, true)
        : this.play(`idle-${this.spriteKey}`, true)
      : this.play(`jump-${this.spriteKey}`, true);
  }

  playDamageTween() {
    return this.scene.tweens.add({
      targets: this,
      duration: 100,
      repeat: -1,
      tint: 0xffffff,
    });
  }

  bounceOff(source) {
    if (source.body) {
      this.body.touching.right
        ? this.setVelocityX(-this.bounceVelocity)
        : this.setVelocityX(this.bounceVelocity);
    } else {
      this.body.blocked.right
        ? this.setVelocityX(-this.bounceVelocity)
        : this.setVelocityX(this.bounceVelocity);
    }

    setTimeout(() => this.setVelocityY(-this.bounceVelocity), 0);
  }

  takesHit(source) {
    this.takeDamageSound.play();
    if (this.hasBeenHit) {
      return;
    }

    this.hasBeenHit = true;
    this.bounceOff(source);
    const hitAnim = this.playDamageTween();

    source.deliversHit && source.deliversHit(this);

    this.scene.time.delayedCall(500, () => {
      this.hasBeenHit = false;
      hitAnim.stop();
      this.clearTint();
    });
  }
}

export default OnlinePlayer;

import "phaser";
class OnlinePlayer extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey, username, socket, platform) {
    super(scene, x, y, spriteKey);
    this.spriteKey = spriteKey;
    this.username = username;
    this.socket = socket;
    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.setCollideWorldBounds(this.scene.stageKey === "lobby");
    this.scene.physics.add.collider(this, platform, null, null, this);
    this.facingLeft = false;
    this.flipX = false;
    this.body.setSize(this.width * 0.6);
    this.moveState = {
      x,
      y,
      left: false,
      right: false,
      up: false,
    };
  }

  // move & animate player based on cursors pressed, and broadcast its movements to other players
  update(cursors, jumpSound) {
    this.updateMovement(cursors);
    this.updateJump(cursors, jumpSound);
  }

  updateMovement(cursors) {
    // player moves left
    if (cursors.left.isDown) {
      if (!this.facingLeft) {
        this.flipX = !this.flipX;
        this.facingLeft = true;
      }
      this.setVelocityX(-250);
      if (this.body.onFloor()) {
        this.play(`run-${this.spriteKey}`, true);
      }
      if (this.socket) {
        this.moveState.x = this.x;
        this.moveState.y = this.y;
        this.moveState.left = true;
        this.moveState.right = false;
        this.moveState.up = false;
        this.socket.emit("updatePlayer", this.moveState);
      }
    }

    // player moves right
    else if (cursors.right.isDown) {
      if (this.facingLeft) {
        this.flipX = !this.flipX;
        this.facingLeft = false;
      }
      this.setVelocityX(250);

      if (this.body.onFloor()) {
        this.play(`run-${this.spriteKey}`, true);
      }

      if (this.socket) {
        this.moveState.x = this.x;
        this.moveState.y = this.y;
        this.moveState.left = false;
        this.moveState.right = true;
        this.moveState.up = false;
        this.socket.emit("updatePlayer", this.moveState);
      }
    }

    // neutral (player not moving)
    else {
      this.setVelocityX(0);
      this.play(`idle-${this.spriteKey}`, true);
      if (this.socket) {
        this.moveState.x = this.x;
        this.moveState.y = this.y;
        this.moveState.left = false;
        this.moveState.right = false;
        this.moveState.up = false;
        this.socket.emit("updatePlayer", this.moveState);
      }
    }
  }

  updateJump(cursors, jumpSound) {
    if (cursors.up.isDown && this.body.onFloor()) {
      this.setVelocityY(-550);
      if (this.socket) {
        this.moveState.x = this.x;
        this.moveState.y = this.y;
        this.moveState.left = false;
        this.moveState.right = false;
        this.moveState.up = true;
        this.socket.emit("updatePlayer", this.moveState);
      }
      jumpSound.play();
    }
  }

  respawn() {
    this.scene.hurt = true;
    this.scene.cameras.main.shake(200, 0.01);
    this.setVelocity(0, 0);
    this.setX(this.scene.respawnPoint.x);
    this.setY(this.scene.respawnPoint.y);
    this.play(`hurt-${this.scene.charSpriteKey}`, true);
    this.scene.time.addEvent({
      delay: 800,
      callback: () => {
        this.scene.hurt = false;
        this.play(`idle-${this.spriteKey}`, true);
      },
    });
  }

  launchToAir() {
    this.body.setAllowGravity(false);
    this.setVelocity(0, 0);
    this.play(`idle-${this.spriteKey}`, true);
    this.scene.tweens.add({
      targets: this,
      y: "-=100",
      angle: this.flipX ? -20 : 20,
      ease: "Sine.easeInOut",
      duration: 1000,
      onComplete: this.startFlyMode,
    });
  }

  startMoving() {
    if (!this.isFlying) {
      this.tween.stop();
      this.isFlying = true;
      this.play(`run-${this.spriteKey}`, true);
    }
  }

  stopMoving() {
    if (this.isFlying) {
      this.tween.data[0].start = this.y;
      this.tween.restart();
      this.isFlying = false;
      this.play(`idle-${this.spriteKey}`, true);
    }
  }

  // update opponents movements based on moveState player received from server
  updateOtherPlayer(moveState) {
    // opponent moves left
    if (moveState.left) {
      if (!this.facingLeft) {
        this.flipX = !this.flipX;
        this.facingLeft = true;
      }
      this.play(`run-${this.spriteKey}`, true);
      this.setPosition(moveState.x, moveState.y);
      // this.setVelocityX(-250);
    }

    // opponent moves right
    else if (moveState.right) {
      if (this.facingLeft) {
        this.flipX = !this.flipX;
        this.facingLeft = false;
      }
      // this.setVelocityX(250);
      this.play(`run-${this.spriteKey}`, true);
      this.setPosition(moveState.x, moveState.y);
    }

    // neutral (opponent not moving)
    else {
      this.setVelocityX(0);
      this.play(`idle-${this.spriteKey}`, true);
      this.setPosition(moveState.x, moveState.y);
    }
  }
}

export default OnlinePlayer;

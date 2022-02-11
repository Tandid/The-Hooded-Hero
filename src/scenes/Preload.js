import Phaser from "phaser";

class Preload extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.load.tilemapTiledJSON(
      "level_1",
      "assets/crystal_world_map_level_1.json"
    );

    this.load.tilemapTiledJSON(
      "level_2",
      "assets/crystal_world_map_level_2.json"
    );

    this.load.image("tiles-1", "assets/main_lev_build_1.png");
    this.load.image("tiles-3", "assets/tileset_1.png");
    this.load.image("environment", "assets/environment.png");

    this.load.image("bg-spikes-tileset", "assets/bg_spikes_tileset.png");
    this.load.image("bg-spikes-dark", "assets/bg_spikes_dark.png");
    this.load.image("sky-play", "assets/sky_play.png");

    this.load.image("menu-bg", "assets/background01.png", {});

    this.load.image("back", "assets/back.png");

    // PROJECTILES
    this.load.image("iceball-1", "assets/weapons/iceball_001.png");

    this.load.image("fireball-1", "assets/weapons/improved_fireball_001.png");
    this.load.image("fireball-2", "assets/weapons/improved_fireball_002.png");
    this.load.image("fireball-3", "assets/weapons/improved_fireball_003.png");

    // COLLECTIBLES

    this.load.image("coin", "assets/collectables/coin_2.png");

    this.load.image("coin-1", "assets/collectables/coin_1.png");
    this.load.image("coin-2", "assets/collectables/coin_2.png");
    this.load.image("coin-3", "assets/collectables/coin_3.png");
    this.load.image("coin-4", "assets/collectables/coin_4.png");
    this.load.image("coin-5", "assets/collectables/coin_5.png");
    this.load.image("coin-6", "assets/collectables/coin_6.png");
    this.load.image("coin-7", "assets/collectables/coin_7.png");
    this.load.image("coin-8", "assets/collectables/coin_8.png");

    // PLAYER MOVEMENT

    this.load.spritesheet("player", "assets/player/move_sprite_1.png", {
      frameWidth: 300,
      frameHeight: 190,
      // spacing: 50,
    });

    this.load.spritesheet(
      "player-slide-sheet",
      "assets/player/slide_sheet_2.png",
      {
        frameWidth: 300,
        frameHeight: 190,
        // spacing: 32,
      }
    );

    this.load.spritesheet(
      "player-throw",
      "assets/player/throw_attack_sheet_1.png",
      {
        frameWidth: 300,
        frameHeight: 190,
        // spacing: 32,
      }
    );

    this.load.spritesheet("hit-sheet", "assets/weapons/hit_effect_sheet.png", {
      frameWidth: 226,
      frameHeight: 272,
    });

    this.load.spritesheet("sword-default", "assets/weapons/sword_sheet_1.png", {
      frameWidth: 52,
      frameHeight: 32,
      spacing: 16,
    });

    // ENEMIES

    this.load.spritesheet("skeleton", "assets/enemy/skeleton.png", {
      frameWidth: 290,
      frameHeight: 170,
      // spacing: 32,
    });

    this.load.spritesheet("snaky", "assets/enemy/enemy_sheet_2.png", {
      frameWidth: 233,
      frameHeight: 193,
      // spacing: 32,
    });

    // SOUND EFFECTS
    this.load.audio("theme", "assets/music/theme_music.wav");

    this.load.audio("projectile-launch", "assets/music/projectile_launch.wav");
    this.load.audio("step", "assets/music/step_mud.wav");
    this.load.audio("jump", "assets/music/jump.wav");
    this.load.audio("swipe", "assets/music/swipe.wav");
    this.load.audio("coin-pickup", "assets/music/coin_pickup.wav");

    this.load.once("complete", () => {
      this.startGame();
    });
  }

  startGame() {
    this.registry.set("level", 1);
    this.registry.set("unlocked-levels", 1);
    this.scene.start("MenuScene");
  }
}

export default Preload;

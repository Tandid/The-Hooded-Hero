import Phaser from "phaser";

class Preload extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    // MAPS

    this.load.tilemapTiledJSON("level_1", "assets/level_1.json");
    this.load.tilemapTiledJSON("level_2", "assets/level_2.json");
    this.load.tilemapTiledJSON("level_3", "assets/level_3.json");

    // TILESETS

    this.load.image("forest-tiles", "assets/tileset_1.png");
    this.load.image("cave-tiles", "assets/tileset_2.png");
    this.load.image("environment-tiles", "assets/environment.png");

    // this.load.image("bg-spikes-tileset", "assets/bg_spikes_tileset.png");

    // FOREST BACKGROUNDS

    this.load.image("bg-forest-1", "assets/bg_forest_1.png");
    this.load.image("bg-forest-2", "assets/bg_forest_2.png");
    this.load.image("bg-forest-3", "assets/bg_forest_3.png");
    this.load.image("mountain-bg", "assets/mountain_bg.png");
    this.load.image("sky-bg", "assets/sky_bg.png");

    // CAVE BACKGROUNDS

    this.load.image("bg-cave-1", "assets/bg_cave_1.png");
    this.load.image("bg-cave-2", "assets/bg_cave_2.png");
    this.load.image("bg-cave-3", "assets/bg_cave_3.png");
    this.load.image("bg-cave-4", "assets/bg_cave_4.png");
    this.load.image("bg-cave-5", "assets/bg_cave_5.png");

    // MENU BACKGROUND

    this.load.image("menu-bg", "assets/background01.png", {});

    // BACK BUTTON

    this.load.image("back", "assets/back.png");

    // PROJECTILES
    this.load.image("arrow", "assets/weapons/arrow.png");

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
      "player-throw",
      "assets/player/throw_attack_sheet_1.png",
      {
        frameWidth: 300,
        frameHeight: 190,
        // spacing: 32,
      }
    );

    this.load.spritesheet(
      "player-melee",
      "assets/player/attackspritesheet.png",
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

    this.load.spritesheet("sword-default", "assets/weapons/sword_hitbox.png", {
      frameWidth: 300,
      frameHeight: 190,
      // spacing: 32,
    });

    // ENEMIES

    this.load.spritesheet("skeleton", "assets/enemy/skeleton.png", {
      frameWidth: 290,
      frameHeight: 170,
      // spacing: 32,
    });

    this.load.spritesheet("archer", "assets/enemy/archer.png", {
      frameWidth: 233,
      frameHeight: 193,
      // spacing: 32,
    });

    this.load.spritesheet("slime", "assets/enemy/slime.png", {
      frameWidth: 258,
      frameHeight: 153,
      // spacing: 32,
    });

    this.load.spritesheet("bee", "assets/enemy/bee.png", {
      frameWidth: 170,
      frameHeight: 155,
      // spacing: 32,
    });

    this.load.spritesheet("spider", "assets/enemy/spider.png", {
      frameWidth: 184,
      frameHeight: 126,
      // spacing: 32,
    });

    // DEATH ANIMATIONS

    this.load.spritesheet(
      "archer-death",
      "assets/deathAnims/archer_death.png",
      {
        frameWidth: 453,
        frameHeight: 193,
        // spacing: 32,
      }
    );

    this.load.spritesheet("bee-death", "assets/deathAnims/bee_death.png", {
      frameWidth: 370,
      frameHeight: 305,
      // spacing: 32,
    });

    this.load.spritesheet(
      "skeleton-death",
      "assets/deathAnims/skeleton_death.png",
      {
        frameWidth: 460,
        frameHeight: 180,
        // spacing: 32,
      }
    );

    this.load.spritesheet("slime-death", "assets/deathAnims/slime_death.png", {
      frameWidth: 258,
      frameHeight: 153,
      // spacing: 32,
    });

    this.load.spritesheet(
      "spider-death",
      "assets/deathAnims/spider_death.png",
      {
        frameWidth: 294,
        frameHeight: 206,
        // spacing: 32,
      }
    );

    this.load.spritesheet("boss-death", "assets/deathAnims/archer_death.png", {
      frameWidth: 184,
      frameHeight: 126,
      // spacing: 32,
    });

    // THEME MUSIC
    this.load.audio("forest-theme", "assets/music/forest_theme.wav");
    this.load.audio("cave-theme", "assets/music/cave_theme.wav");
    this.load.audio("boss-theme", "assets/music/boss_theme.wav");

    // SOUND EFFECTS
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
    this.registry.set("level", 2);
    this.registry.set("level", 3);
    this.registry.set("unlocked-levels", 1);
    this.registry.set("unlocked-levels", 2);
    this.registry.set("unlocked-levels", 3);
    this.scene.start("MenuScene");
  }
}

export default Preload;

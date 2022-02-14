import Phaser from "phaser";

class Preload extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    // LOGO
    this.load.image("logo", "assets/logo_3.png");

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
    this.load.image("leaf", "assets/leaf.png");

    // CAVE BACKGROUNDS

    this.load.image("bg-cave-1", "assets/bg_cave_1.png");
    this.load.image("bg-cave-2", "assets/bg_cave_2.png");
    this.load.image("bg-cave-3", "assets/bg_cave_3.png");
    this.load.image("bg-cave-4", "assets/bg_cave_4.png");
    this.load.image("bg-cave-5", "assets/bg_cave_5.png");

    // MENU BACKGROUND

    this.load.image("menu-bg", "assets/background01.png", {});

    // PROJECTILES
    this.load.image("arrow", "assets/weapons/arrow.png");

    // UI

    this.load.image("header", "assets/ui/Panels/header.png");
    this.load.image("header-shadow", "assets/ui/Panels/header_shadow.png");
    this.load.image("panel-1", "assets/ui/Panels/panel_1.png");
    this.load.image("panel-2", "assets/ui/Panels/panel_2.png");
    this.load.image("panel-3", "assets/ui/Panels/panel_3.png");
    this.load.image("panel-4", "assets/ui/Panels/panel_4.png");

    this.load.image("player-icon", "assets/ui/Status/portrait_character.png");
    this.load.image("portrait", "assets/ui/Status/portrait.png");

    this.load.image("textbox", "assets/ui/Textbox/textbox.png");

    this.load.image("coin", "assets/ui/Icons/icon_small_coin.png");
    this.load.image("profile", "assets/ui/Icons/icon_small_profile.png");
    this.load.image("settings-button", "assets/ui/Icons/icon_big_setting.png");
    this.load.image("home", "assets/ui/Icons/icon_small_home.png");
    this.load.image("restart", "assets/ui/Icons/icon_small_restart.png");
    this.load.image("small-close", "assets/ui/Icons/icon_small_close.png");
    this.load.image("small-left", "assets/ui/Icons/icon_small_left.png");

    this.load.image("next-btn", "assets/ui/Icons/icon_small_next.png");
    this.load.image("prev-btn", "assets/ui/Icons/icon_small_prev.png");
    this.load.image("music-btn-on", "assets/ui/Icons/icon_small_music_on.png");
    this.load.image(
      "music-btn-off",
      "assets/ui/Icons/icon_small_music_off.png"
    );
    this.load.image("sound-btn-on", "assets/ui/Icons/icon_small_sound_on.png");
    this.load.image(
      "sound-btn-off",
      "assets/ui/Icons/icon_small_sound_off.png"
    );
    this.load.image(
      "mute-btn-on",
      "assets/ui/Icons/icon_small_notification.png"
    );
    this.load.image(
      "mute-btn-off",
      "assets/ui/Icons/icon_small_notificationoff.png"
    );

    this.load.image("left-key", "assets/ui/Icons/arrow_left_icon.png");
    this.load.image("right-key", "assets/ui/Icons/arrow_right_icon.png");
    this.load.image("space-key", "assets/ui/Icons/spacebar_icon.png");
    this.load.image("q-key", "assets/ui/Icons/Q_icon.png");
    this.load.image("e-key", "assets/ui/Icons/E_icon.png");

    this.load.image("blue-button", "assets/ui/Buttons/button_blue.png");
    this.load.image("brown-button", "assets/ui/Buttons/button_brown.png");
    this.load.image("red-button", "assets/ui/Buttons/button_red.png");
    this.load.image("green-button", "assets/ui/Buttons/button_green.png");
    this.load.image("yellow-button", "assets/ui/Buttons/button_yellow.png");

    this.load.image(
      "blue-long-button",
      "assets/ui/Buttons/button_color_blue.png"
    );
    this.load.image(
      "brown-long-button",
      "assets/ui/Buttons/button_color_brown.png"
    );
    this.load.image(
      "red-long-button",
      "assets/ui/Buttons/button_color_red.png"
    );
    this.load.image(
      "green-long-button",
      "assets/ui/Buttons/button_color_green.png"
    );
    this.load.image(
      "yellow-long-button",
      "assets/ui/Buttons/button_color_yellow.png"
    );

    this.load.image(
      "small-blue-button",
      "assets/ui/Buttons/button_small_blue.png"
    );
    this.load.image(
      "small-red-button",
      "assets/ui/Buttons/button_small_red.png"
    );
    this.load.image(
      "small-yellow-button",
      "assets/ui/Buttons/button_square_yellow.png"
    );

    // COLLECTIBLES

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
      "player-death",
      "assets/deathAnims/player_death.png",
      {
        frameWidth: 300,
        frameHeight: 256,
        // spacing: 32,
      }
    );

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
    this.load.audio("menu-theme", "assets/music/menu_music.wav");
    this.load.audio("forest-theme", "assets/music/forest_theme.wav");
    this.load.audio("cave-theme", "assets/music/cave_theme.wav");
    this.load.audio("boss-theme", "assets/music/boss_theme.wav");

    // SOUND EFFECTS
    this.load.audio("projectile-launch", "assets/music/projectile_launch.wav");
    this.load.audio("step", "assets/music/step_mud.wav");
    this.load.audio("jump", "assets/music/jump.wav");
    this.load.audio("swipe", "assets/music/swipe.wav");
    this.load.audio("damage", "assets/music/punch.wav");
    this.load.audio("enemy-damage", "assets/music/enemyhit.wav");
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

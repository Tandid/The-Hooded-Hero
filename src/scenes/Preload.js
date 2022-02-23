import Phaser from "phaser";

class Preload extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    // LOGO
    this.load.image("logo", "public/assets/logo.png");
    this.load.image("github", "public/assets/github.png");
    this.load.image("linkedin", "public/assets/linkedin.png");
    this.load.image("gmail", "public/assets/gmail.png");

    // MAPS

    this.load.tilemapTiledJSON("level_1", "public/assets/level_1.json");
    this.load.tilemapTiledJSON("level_2", "public/assets/level_2.json");
    this.load.tilemapTiledJSON("level_3", "public/assets/level_3.json");

    // TILESETS

    this.load.image("forest-tiles", "public/assets/tileset_1.png");
    this.load.image("cave-tiles", "public/assets/tileset_2.png");
    this.load.image("environment-tiles", "public/assets/environment.png");

    this.load.image("dummy", "public/assets/dummy.png");

    // this.load.image("bg-spikes-tileset", "public/assets/bg_spikes_tileset.png");

    // FOREST BACKGROUNDS

    this.load.image("bg-forest-1", "public/assets/bg_forest_1.png");
    this.load.image("bg-forest-2", "public/assets/bg_forest_2.png");
    this.load.image("bg-forest-3", "public/assets/bg_forest_3.png");
    this.load.image("mountain-bg", "public/assets/mountain_bg.png");
    this.load.image("sky-bg", "public/assets/sky_bg.png");
    this.load.image("leaf", "public/assets/leaf.png");
    this.load.image("tree-1", "public/assets/tree1.png");
    this.load.image("tree-2", "public/assets/tree2.png");

    // CAVE BACKGROUNDS

    this.load.image("bg-cave-1", "public/assets/bg_cave_1.png");
    this.load.image("bg-cave-2", "public/assets/bg_cave_2.png");
    this.load.image("bg-cave-3", "public/assets/bg_cave_3.png");
    this.load.image("bg-cave-4", "public/assets/bg_cave_4.png");
    this.load.image("bg-cave-5", "public/assets/bg_cave_5.png");

    // PROJECTILES
    this.load.image("arrow", "public/assets/weapons/arrow.png");

    this.load.image("fire-1", "public/assets/projectiles/fire_0.png");
    this.load.image("fire-2", "public/assets/projectiles/fire_1.png");
    this.load.image("fire-3", "public/assets/projectiles/fire_2.png");
    this.load.image("fire-4", "public/assets/projectiles/fire_3.png");
    this.load.image("fire-5", "public/assets/projectiles/fire_4.png");
    this.load.image("fire-6", "public/assets/projectiles/fire_5.png");
    this.load.image("fire-7", "public/assets/projectiles/fire_6.png");
    this.load.image("fire-8", "public/assets/projectiles/fire_7.png");

    // UI

    this.load.image("header", "public/assets/ui/Panels/header.png");
    this.load.image(
      "header-shadow",
      "public/assets/ui/Panels/header_shadow.png"
    );
    this.load.image("panel-1", "public/assets/ui/Panels/panel_1.png");
    this.load.image("panel-2", "public/assets/ui/Panels/panel_2.png");
    this.load.image("panel-3", "public/assets/ui/Panels/panel_3.png");
    this.load.image("panel-4", "public/assets/ui/Panels/panel_4.png");

    this.load.image(
      "player-icon",
      "public/assets/ui/Status/portrait_character.png"
    );
    this.load.image("portrait", "public/assets/ui/Status/portrait.png");

    this.load.image("stage-icon", "public/assets/ui/Stage/stage_default.png");

    this.load.image("textbox", "public/assets/ui/Textbox/textbox.png");

    this.load.image("coin", "public/assets/ui/Icons/icon_small_coin.png");
    this.load.image("star", "public/assets/ui/Icons/icon_big_star.png");
    this.load.image("profile", "public/assets/ui/Icons/icon_small_profile.png");
    this.load.image(
      "settings-button",
      "public/assets/ui/Icons/icon_big_setting.png"
    );
    this.load.image("home", "public/assets/ui/Icons/icon_small_home.png");
    this.load.image("restart", "public/assets/ui/Icons/icon_small_restart.png");
    this.load.image(
      "small-close",
      "public/assets/ui/Icons/icon_small_close.png"
    );
    this.load.image("small-left", "public/assets/ui/Icons/icon_small_left.png");
    this.load.image("controls-btn", "public/assets/ui/Icons/icon_big_book.png");
    this.load.image(
      "contacts-btn",
      "public/assets/ui/Icons/icon_small_message.png"
    );

    this.load.image("next-btn", "public/assets/ui/Icons/icon_small_next.png");
    this.load.image("prev-btn", "public/assets/ui/Icons/icon_small_prev.png");
    this.load.image(
      "music-btn-on",
      "public/assets/ui/Icons/icon_small_music_on.png"
    );
    this.load.image(
      "music-btn-off",
      "public/assets/ui/Icons/icon_small_music_off.png"
    );
    this.load.image(
      "sound-btn-on",
      "public/assets/ui/Icons/icon_small_sound_on.png"
    );
    this.load.image(
      "sound-btn-off",
      "public/assets/ui/Icons/icon_small_sound_off.png"
    );
    this.load.image(
      "mute-btn-on",
      "public/assets/ui/Icons/icon_small_notification.png"
    );
    this.load.image(
      "mute-btn-off",
      "public/assets/ui/Icons/icon_small_notificationoff.png"
    );

    this.load.image(
      "switch-off-bg",
      "public/assets/ui/Settings/switch_off_bg.png"
    );

    this.load.image(
      "switch-on",
      "public/assets/ui/Settings/settings_slider_yellow.png"
    );
    this.load.image("switch-off", "public/assets/ui/Settings/switch_off.png");
    this.load.image("skull", "public/assets/ui/Stage/defeat.png");
    this.load.image(
      "yellow-bar",
      "public/assets/ui/Settings/settings_slider_fill.png"
    );

    this.load.image("page", "public/assets/ui/Icons/page_icon.png");
    this.load.image("left-key", "public/assets/ui/Icons/arrow_left_icon.png");
    this.load.image("right-key", "public/assets/ui/Icons/arrow_right_icon.png");
    this.load.image("space-key", "public/assets/ui/Icons/spacebar_icon.png");
    this.load.image("q-key", "public/assets/ui/Icons/Q_icon.png");
    this.load.image("e-key", "public/assets/ui/Icons/E_icon.png");

    this.load.image("back-btn", "public/assets/ui/Buttons/back_btn.png");
    this.load.image("close-btn", "public/assets/ui/Buttons/close_btn.png");
    this.load.image("restart-btn", "public/assets/ui/Buttons/restart_btn.png");
    this.load.image(
      "restart-btn-big",
      "public/assets/ui/Buttons/restart_btn_big.png"
    );
    this.load.image("email-btn", "public/assets/ui/Buttons/email_btn.png");
    this.load.image("home-btn", "public/assets/ui/Buttons/home_btn.png");
    this.load.image(
      "home-btn-big",
      "public/assets/ui/Buttons/home_btn_big.png"
    );
    this.load.image("yes-btn", "public/assets/ui/Buttons/yes_btn.png");
    this.load.image("no-btn", "public/assets/ui/Buttons/no_btn.png");
    this.load.image("play-btn", "public/assets/ui/Buttons/play_btn.png");

    this.load.image("blue-button", "public/assets/ui/Buttons/button_blue.png");
    this.load.image(
      "brown-button",
      "public/assets/ui/Buttons/button_brown.png"
    );
    this.load.image("red-button", "public/assets/ui/Buttons/button_red.png");
    this.load.image(
      "green-button",
      "public/assets/ui/Buttons/button_green.png"
    );
    this.load.image(
      "yellow-button",
      "public/assets/ui/Buttons/button_yellow.png"
    );

    this.load.image(
      "blue-long-button",
      "public/assets/ui/Buttons/button_color_blue.png"
    );
    this.load.image(
      "brown-long-button",
      "public/assets/ui/Buttons/button_color_brown.png"
    );
    this.load.image(
      "red-long-button",
      "public/assets/ui/Buttons/button_color_red.png"
    );
    this.load.image(
      "green-long-button",
      "public/assets/ui/Buttons/button_color_green.png"
    );
    this.load.image(
      "yellow-long-button",
      "public/assets/ui/Buttons/button_color_yellow.png"
    );

    this.load.image(
      "small-blue-button",
      "public/assets/ui/Buttons/button_small_blue.png"
    );
    this.load.image(
      "small-red-button",
      "public/assets/ui/Buttons/button_small_red.png"
    );
    this.load.image(
      "small-yellow-button",
      "public/assets/ui/Buttons/button_square_yellow.png"
    );

    // COLLECTIBLES

    this.load.image("coin-1", "public/assets/collectables/coin_1.png");
    this.load.image("coin-2", "public/assets/collectables/coin_2.png");
    this.load.image("coin-3", "public/assets/collectables/coin_3.png");
    this.load.image("coin-4", "public/assets/collectables/coin_4.png");
    this.load.image("coin-5", "public/assets/collectables/coin_5.png");
    this.load.image("coin-6", "public/assets/collectables/coin_6.png");
    this.load.image("coin-7", "public/assets/collectables/coin_7.png");
    this.load.image("coin-8", "public/assets/collectables/coin_8.png");

    // PLAYER MOVEMENT

    this.load.spritesheet("player", "public/assets/player/move_sprite_1.png", {
      frameWidth: 300,
      frameHeight: 190,
      // spacing: 50,
    });

    this.load.spritesheet(
      "player-throw",
      "public/assets/player/throw_attack_sheet_1.png",
      {
        frameWidth: 300,
        frameHeight: 190,
        // spacing: 32,
      }
    );

    this.load.spritesheet(
      "player-melee",
      "public/assets/player/attackspritesheet.png",
      {
        frameWidth: 300,
        frameHeight: 190,
        // spacing: 32,
      }
    );

    this.load.spritesheet(
      "hit-sheet",
      "public/assets/weapons/hit_effect_sheet.png",
      {
        frameWidth: 226,
        frameHeight: 272,
      }
    );

    this.load.spritesheet(
      "sword-default",
      "public/assets/weapons/sword_hitbox.png",
      {
        frameWidth: 300,
        frameHeight: 190,
        // spacing: 32,
      }
    );

    // ONLINE PLAYER MOVEMENT
    this.load.spritesheet("player-1", "public/assets/player/player_1.png", {
      frameWidth: 300,
      frameHeight: 200,
      // spacing: 32,
    });
    this.load.spritesheet("player-2", "public/assets/player/player_2.png", {
      frameWidth: 165,
      frameHeight: 180,
      // spacing: 32,
    });
    this.load.spritesheet("player-3", "public/assets/player/player_3.png", {
      frameWidth: 165,
      frameHeight: 180,
      // spacing: 32,
    });
    this.load.spritesheet("player-4", "public/assets/player/player_4.png", {
      frameWidth: 170,
      frameHeight: 180,
      // spacing: 32,
    });

    // ENEMIES

    this.load.spritesheet("skeleton", "public/assets/enemy/skeleton.png", {
      frameWidth: 290,
      frameHeight: 170,
      // spacing: 32,
    });

    this.load.spritesheet("archer", "public/assets/enemy/archer.png", {
      frameWidth: 233,
      frameHeight: 193,
      // spacing: 32,
    });
    this.load.spritesheet("mage", "public/assets/enemy/mage.png", {
      frameWidth: 300,
      frameHeight: 215,
      // spacing: 32,
    });

    this.load.spritesheet("slime", "public/assets/enemy/slime.png", {
      frameWidth: 258,
      frameHeight: 153,
      // spacing: 32,
    });

    this.load.spritesheet("bee", "public/assets/enemy/bee.png", {
      frameWidth: 170,
      frameHeight: 155,
      // spacing: 32,
    });

    this.load.spritesheet("spider", "public/assets/enemy/spider.png", {
      frameWidth: 184,
      frameHeight: 126,
      // spacing: 32,
    });

    this.load.spritesheet("boss", "public/assets/enemy/boss_run.png", {
      frameWidth: 850,
      frameHeight: 477,
      // spacing: 32,
    });
    this.load.spritesheet(
      "boss-default",
      "public/assets/enemy/boss_attack.png",
      {
        frameWidth: 850,
        frameHeight: 477,
        // spacing: 32,
      }
    );

    // this.load.spritesheet(
    //   "boss-default",
    //   "public/assets/enemy/boss_attack.png",
    //   {
    //     frameWidth: 850,
    //     frameHeight: 477,
    //     // spacing: 32,
    //   }
    // );

    // DEATH ANIMATIONS

    this.load.spritesheet(
      "player-death",
      "public/assets/deathAnims/player_death.png",
      {
        frameWidth: 300,
        frameHeight: 256,
        // spacing: 32,
      }
    );

    this.load.spritesheet(
      "archer-death",
      "public/assets/deathAnims/archer_death.png",
      {
        frameWidth: 453,
        frameHeight: 193,
        // spacing: 32,
      }
    );
    this.load.spritesheet(
      "mage-death",
      "public/assets/deathAnims/mage_death.png",
      {
        frameWidth: 510,
        frameHeight: 215,
        // spacing: 32,
      }
    );

    this.load.spritesheet(
      "bee-death",
      "public/assets/deathAnims/bee_death.png",
      {
        frameWidth: 370,
        frameHeight: 305,
        // spacing: 32,
      }
    );

    this.load.spritesheet(
      "skeleton-death",
      "public/assets/deathAnims/skeleton_death.png",
      {
        frameWidth: 460,
        frameHeight: 180,
        // spacing: 32,
      }
    );

    this.load.spritesheet(
      "slime-death",
      "public/assets/deathAnims/slime_death.png",
      {
        frameWidth: 258,
        frameHeight: 153,
        // spacing: 32,
      }
    );

    this.load.spritesheet(
      "spider-death",
      "public/assets/deathAnims/spider_death.png",
      {
        frameWidth: 294,
        frameHeight: 206,
        // spacing: 32,
      }
    );

    this.load.spritesheet(
      "boss-death",
      "public/assets/deathAnims/boss_death.png",
      {
        frameWidth: 850,
        frameHeight: 477,
        // spacing: 32,
      }
    );

    // THEME MUSIC
    this.load.audio("menu-theme", "public/assets/music/menu_music.wav");
    this.load.audio("forest-theme", "public/assets/music/forest_theme.wav");
    this.load.audio("cave-theme", "public/assets/music/cave_theme.wav");
    this.load.audio("boss-theme", "public/assets/music/boss_theme.wav");

    // SOUND EFFECTS
    this.load.audio(
      "projectile-launch",
      "public/assets/music/projectile_launch.wav"
    );
    this.load.audio("step", "public/assets/music/step_mud.wav");
    this.load.audio("jump", "public/assets/music/jump.wav");
    this.load.audio("swipe", "public/assets/music/swipe.wav");
    this.load.audio("damage", "public/assets/music/punch.wav");
    this.load.audio("enemy-damage", "public/assets/music/enemyhit.wav");
    this.load.audio("coin-pickup", "public/assets/music/coin_pickup.wav");
    this.load.audio("cursorOver", "public/assets/music/cursorOver.wav");
    this.load.audio("flute", "public/assets/music/flute.wav");
    this.load.audio("page-flip", "public/assets/music/page_flip.wav");
    this.load.audio("select", "public/assets/music/select.wav");
    this.load.audio("lose", "public/assets/music/lose.wav");
    this.load.audio("win", "public/assets/music/win.wav");

    this.load.once("complete", () => {
      this.startGame();
    });
  }

  startGame() {
    this.registry.set("level", 1);
    this.registry.set("unlocked-levels", 1);
  }
}

export default Preload;

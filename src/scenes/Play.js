import Phaser from "phaser";
import Player from "../entities/Player";
import Enemies from "../groups/Enemies";
import Collectables from "../groups/Collectables";
import Hud from "../hud";
import EventEmitter from "../events/Emitter";

import initAnims from "../anims";

class Play extends Phaser.Scene {
  constructor(config) {
    super("PlayScene");
    this.config = config;
  }

  create({ gameStatus }) {
    this.score = 0;
    this.hud = new Hud(this, 0, 0);
    const map = this.createMap();

    initAnims(this.anims);

    const layers = this.createLayers(map);
    const playerZones = this.getPlayerZones(layers.playerZones);
    const player = this.createPlayer(playerZones.start);
    const enemies = this.createEnemies(
      layers.enemySpawns,
      layers.platformsColliders
    );
    const collectables = this.createCollectables(layers.collectables);

    this.createBG(map);

    this.createEnemyColliders(enemies, {
      colliders: {
        platformsColliders: layers.platformsColliders,
        player,
      },
    });

    this.createPlayerColliders(player, {
      colliders: {
        platformsColliders: layers.platformsColliders,
        projectiles: enemies.getProjectiles(),
        collectables,
        traps: layers.traps,
      },
    });

    this.createEndOfLevel(playerZones.end, player);
    this.setupFollowupCameraOn(player);

    if (gameStatus === "PLAYER_LOSE") {
      return;
    }

    this.createGameEvents();
  }

  createMap() {
    const map = this.make.tilemap({ key: "map" });
    map.addTilesetImage("main_lev_build_1", "tiles-1");
    map.addTilesetImage("bg_spikes_tileset", "bg-spikes-tileset");
    return map;
  }

  createLayers(map) {
    const tileset = map.getTileset("main_lev_build_1");
    const tilesetBg = map.getTileset("bg_spikes_tileset");

    map.createStaticLayer("distance", tilesetBg).setDepth(-12);

    const platformsColliders = map.createStaticLayer(
      "platforms_colliders",
      tileset
    );
    const environment = map
      .createStaticLayer("environment", tileset)
      .setDepth(-2);
    const platforms = map.createStaticLayer("platforms", tileset);
    const playerZones = map.getObjectLayer("player_zones");
    const enemySpawns = map.getObjectLayer("enemy_spawns");
    const collectables = map.getObjectLayer("collectables");
    const traps = map.createStaticLayer("traps", tileset);

    platformsColliders.setCollisionByProperty({ collides: true });
    traps.setCollisionByExclusion(-1);

    return {
      environment,
      platforms,
      platformsColliders,
      playerZones,
      enemySpawns,
      collectables,
      traps,
    };
  }

  createBG(map) {
    const bgObject = map.getObjectLayer("distance_bg").objects[0];
    this.add
      .tileSprite(
        bgObject.x,
        bgObject.y,
        this.config.width,
        bgObject.height,
        "bg-spikes-dark"
      )
      .setOrigin(0, 1)
      .setDepth(-10)
      .setScrollFactor(0, 1);

    this.add
      .tileSprite(0, 0, this.config.width, 180, "sky-play")
      .setOrigin(0, 0)
      .setDepth(-11)
      .setScale(1.1)
      .setScrollFactor(0, 1);
  }

  createGameEvents() {
    EventEmitter.on("PLAYER_LOSE", () => {
      console.log("Hello!");
      this.scene.restart({ gameStatus: "PLAYER_LOSE" });
    });
  }
  createCollectables(collectableLayer) {
    const collectables = new Collectables(this).setDepth(-1);

    collectables.addFromLayer(collectableLayer);

    collectables.playAnimation("diamond-shine");

    return collectables;
    s;
  }

  createPlayer(start) {
    return new Player(this, start.x, start.y);
  }

  onCollect(entity, collectable) {
    this.score += collectable.score;
    this.hud.updateScoreboard(this.score);
    collectable.disableBody(true, true);
  }

  createEnemies(spawnLayer, platformsColliders) {
    const enemies = new Enemies(this);
    const enemyTypes = enemies.getTypes();

    spawnLayer.objects.forEach((spawnPoint, i) => {
      // if (i === 1) { return; }
      const enemy = new enemyTypes[spawnPoint.type](
        this,
        spawnPoint.x,
        spawnPoint.y
      );
      enemy.setPlatformColliders(platformsColliders);
      enemies.add(enemy);
    });

    return enemies;
  }

  onPlayerCollision(enemy, player) {
    player.takesHit(enemy);
  }

  onHit(entity, source) {
    entity.takesHit(source);
  }

  createEnemyColliders(enemies, { colliders }) {
    enemies
      .addCollider(colliders.platformsColliders)
      .addCollider(colliders.player, this.onPlayerCollision)
      .addCollider(colliders.player.projectiles, this.onHit)
      .addOverlap(colliders.player.meleeWeapon, this.onHit);
  }

  createPlayerColliders(player, { colliders }) {
    player
      .addCollider(colliders.platformsColliders)
      .addCollider(colliders.projectiles, this.onHit)
      .addCollider(colliders.traps, this.onHit)
      .addOverlap(colliders.collectables, this.onCollect, this);
  }

  setupFollowupCameraOn(player) {
    const { height, width, mapOffset, zoomFactor } = this.config;
    this.physics.world.setBounds(0, 0, width + mapOffset, height + 200);
    this.cameras.main
      .setBounds(0, 0, width + mapOffset, height)
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

  createEndOfLevel(end, player) {
    const endOfLevel = this.physics.add
      .sprite(end.x, end.y, "end")
      .setAlpha(0)
      .setSize(5, this.config.height)
      .setOrigin(0.5, 1);

    const eolOverlap = this.physics.add.overlap(player, endOfLevel, () => {
      eolOverlap.active = false;
      console.log("Payer has won!");
    });
  }
}

export default Play;

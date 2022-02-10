export default (anims) => {
  anims.create({
    key: "idle",
    frames: anims.generateFrameNumbers("player", { start: 0, end: 7 }),
    frameRate: 9,
    repeat: -1,
  });

  anims.create({
    key: "run",
    frames: anims.generateFrameNumbers("player", { start: 8, end: 17 }),
    frameRate: 12,
    repeat: -1,
  });

  anims.create({
    key: "jump",
    frames: anims.generateFrameNumbers("player", { start: 18, end: 20 }),
    frameRate: 1,
    repeat: 1,
  });

  anims.create({
    key: "throw",
    frames: anims.generateFrameNumbers("player-throw", { start: 0, end: 7 }),
    frameRate: 14,
    repeat: 0,
  });

  anims.create({
    key: "slide",
    frames: anims.generateFrameNumbers("player-slide-sheet", {
      start: 0,
      end: 2,
    }),
    frameRate: 20,
    repeat: 0,
  });
};

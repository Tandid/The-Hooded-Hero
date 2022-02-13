export default (anims) => {
  anims.create({
    key: "bee-idle",
    frames: anims.generateFrameNumbers("bee", { start: 0, end: 12 }),
    frameRate: 15,
    repeat: -1,
  });

  anims.create({
    key: "bee-hurt",
    frames: anims.generateFrameNumbers("bee", { start: 11, end: 12 }),
    frameRate: 10,
    repeat: 0,
  });

  anims.create({
    key: "bee-die",
    frames: anims.generateFrameNumbers("bee-death", { start: 0, end: 8 }),
    frameRate: 10,
    repeat: 0,
  });
};

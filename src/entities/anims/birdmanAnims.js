export default (anims) => {
  anims.create({
    key: "birdman-idle",
    frames: anims.generateFrameNumbers("birdman", { start: 0, end: 10 }),
    frameRate: 15,
    repeat: -1,
  });

  anims.create({
    key: "birdman-hurt",
    frames: anims.generateFrameNumbers("birdman", { start: 11, end: 12 }),
    frameRate: 10,
    repeat: 0,
  });
};

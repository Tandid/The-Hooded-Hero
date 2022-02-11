export default (anims) => {
  anims.create({
    key: "skeleton-idle",
    frames: anims.generateFrameNumbers("skeleton", { start: 0, end: 10 }),
    frameRate: 15,
    repeat: -1,
  });

  anims.create({
    key: "skeleton-hurt",
    frames: anims.generateFrameNumbers("skeleton", { start: 11, end: 12 }),
    frameRate: 10,
    repeat: 0,
  });
};

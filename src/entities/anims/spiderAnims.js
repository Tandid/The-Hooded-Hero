export default (anims) => {
  anims.create({
    key: "spider-idle",
    frames: anims.generateFrameNumbers("spider", { start: 0, end: 15 }),
    frameRate: 15,
    repeat: -1,
  });

  anims.create({
    key: "spider-hurt",
    frames: anims.generateFrameNumbers("spider", { start: 11, end: 12 }),
    frameRate: 10,
    repeat: 0,
  });
};

export default (anims) => {
  anims.create({
    key: "snaky-walk",
    frames: anims.generateFrameNumbers("snaky", { start: 0, end: 10 }),
    frameRate: 15,
    repeat: -1,
  });

  anims.create({
    key: "snaky-hurt",
    frames: anims.generateFrameNumbers("snaky", { start: 9, end: 10 }),
    frameRate: 10,
    repeat: 0,
  });
};

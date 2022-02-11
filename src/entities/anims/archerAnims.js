export default (anims) => {
  anims.create({
    key: "archer-walk",
    frames: anims.generateFrameNumbers("archer", { start: 0, end: 10 }),
    frameRate: 15,
    repeat: -1,
  });

  anims.create({
    key: "archer-hurt",
    frames: anims.generateFrameNumbers("archer", { start: 9, end: 10 }),
    frameRate: 10,
    repeat: 0,
  });

  anims.create({
    key: "archer-attack",
    frames: anims.generateFrameNumbers("archer", { start: 13, end: 25 }),
    frameRate: 60,
    repeat: 0,
  });
};

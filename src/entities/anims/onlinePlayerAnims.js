export default (anims, key) => {
  anims.create({
    key: `idle-${key}`,
    frames: anims.generateFrameNumbers(key, { start: 0, end: 7 }),
    frameRate: 6,
    repeat: -1,
  });
  anims.create({
    key: `run-${key}`,
    frames: anims.generateFrameNumbers(key, { start: 8, end: 18 }),
    frameRate: 20,
    repeat: -1,
  });

  anims.create({
    key: `jump-${key}`,
    frames: anims.generateFrameNumbers(key, { start: 19, end: 20 }),
    frameRate: 1.5,
    repeat: -1,
  });
};

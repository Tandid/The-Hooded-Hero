export default (anims) => {
  anims.create({
    key: "boss-run",
    frames: anims.generateFrameNumbers("boss", { start: 0, end: 10 }),
    frameRate: 20,
    repeat: -1,
  });

  anims.create({
    key: "boss-die",
    frames: anims.generateFrameNumbers("boss-death", {
      start: 0,
      end: 10,
    }),
    frameRate: 11,
    repeat: 0,
  });
};

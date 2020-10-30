module.exports = {
  async up(db, client) {
    await db.collection('events').updateMany({}, {
      $set: {
        photo: null,
      }
    })
  },

  async down(db, client) {
    await db.collection('events').updateMany({}, {
      $unset: {
        photo: null,
      }
    })
  }
};

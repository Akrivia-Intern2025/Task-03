const db = require('../mysql/connection');

module.exports = {
  async createUser(userData) {
    return db('users').insert(userData);
  },
  async findByEmail(email) {
    return db('users').where({ email }).first();
  },
  async findEmail(email) {
  return db('users')
    .select('user_id', 'username', 'email', 'profile_pic') // Include profile photo
    .where({ email })
    .first();
},

  async findByUsername(username) {
    return db('users').where({ username }).first();
  },
  async updateProfilePic(email, url) {
    return db('users').where({ email }).update({ profile_pic: url });
  },
};
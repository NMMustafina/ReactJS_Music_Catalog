const path = require('path');

const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public/uploads'),
  mongo: {
    db: 'mongodb://localhost/player',
    options: {useNewUrlParser: true},
  },
  facebook: {
    appId: '931048021618155',
    appSecret: process.env.FACEBOOK_APP_SECRET,
  }
};
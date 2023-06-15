const sequelize = require('../../../services/database');

const User = sequelize.define('User', {
  
  username: {
    type: String,
    allowNull: false,
    unique: true
  },
  name: {
    type: String,
    allowNull: false
  },
  email: {
    type: String,
    allowNull: false
  },
  password: {
    type: String,
    allowNull: false
  }
}, {
  
});

/*await*/ User.sync();

module.exports = {
  User,
};

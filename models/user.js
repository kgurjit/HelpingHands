module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
      username: {
        type: DataTypes.STRING,
        unique: true
      },
      password: DataTypes.STRING
    },
    {
      timestamps: false
    }
  );
return User;
};
'use strict';
module.exports = function(sequelize, DataTypes) {
  var favorite = sequelize.define('favorite', {
    artist: DataTypes.STRING,
    song: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.favorite.belongsTo(models.user);
      }
    }
  });
  return favorite;
};
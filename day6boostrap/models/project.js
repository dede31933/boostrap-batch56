'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      // Menghubungkan Project dengan User
      Project.belongsTo(models.User, {
        foreignKey: 'userId', // Pastikan foreignKey sesuai dengan nama kolom di tabel Projects
        as: 'user' // Alias untuk referensi ini (opsional)
      });
    }
  }
  Project.init({
    name: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    descriptions: DataTypes.TEXT,
    technologies: DataTypes.STRING,
    image: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};

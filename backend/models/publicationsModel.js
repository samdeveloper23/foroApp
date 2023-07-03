const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const UserModel = require('./userModel');

const PublicationModel = sequelize.define('Publication', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Definir la relación entre Publication y User
PublicationModel.belongsTo(UserModel, { foreignKey: 'userId' });

module.exports = PublicationModel;

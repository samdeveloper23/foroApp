// publicationModel.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

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

module.exports = PublicationModel;

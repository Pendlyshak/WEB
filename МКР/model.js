const { Sequelize, DataTypes, Model } = require("sequelize");
const options = require("../options");
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: options.dbPath,
});
class User extends Model { }
User.init({
    username: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.STRING,

    },
    manufacturer: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: "User",
    createdAt: false,
    updatedAt: false,
});

module.exports = User;
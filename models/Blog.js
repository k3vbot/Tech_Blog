const {Model, DataTypes} = require('sequelize');

const sequelize = require('./../config/connection');

class Blog extends Model {
}

Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        blogContent: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: true,
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        createdAt: {
            type: "TIMESTAMP",
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false,
        }
    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'blog',
    }
);

module.exports = Blog;
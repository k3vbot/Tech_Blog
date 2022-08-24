const { Model, DataTypes } = require('sequelize');

const sequelize = require('./../config/connection');

class Comment extends Model {
}

Comment.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        commentText: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
            }
        },
        userId: {
            type: DataTypes.UUID,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        commentId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'blogs',
                key: 'id'
            }
        },
        createdAt: {
            type: "TIMESTAMP",
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'comments',
    }
);

module.exports = Comment;
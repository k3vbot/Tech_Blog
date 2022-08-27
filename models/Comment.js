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
        userId: {
            type: DataTypes.UUID,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        blogId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'blog',
                key: 'id'
            }
        },
        commentText: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
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
        modelName: 'comment',
    }
);

module.exports = Comment;
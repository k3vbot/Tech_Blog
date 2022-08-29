const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');


User.hasMany(Blog, {
    foreignKey: 'userId'
});

Blog.belongsTo(User, {
    foreignKey: 'userId',
});

Comment.belongsTo(User, {
    foreignKey: 'userId'
});

Comment.belongsTo(Blog, {
    foreignKey: 'blogId'
});

User.hasMany(Comment, {
    foreignKey: 'userId'
});

Blog.hasMany(Comment, {
    foreignKey: 'blogId'
});

module.exports = {
    User,
    Blog,
    Comment,
};

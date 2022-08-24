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

module.exports = {
    Blog,
    User,
    Comment,
};

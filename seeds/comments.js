const { Comment } = require('../models');

const commentData = [
    {
        userId: 1,
        blogId: 2,
        commentText: 'Wow so cool'
    },
    {
        userId: 2,
        blogId: 1,
        commentText: 'Wow so neat'
    },
    {
        userId: 3,
        blogId: 3,
        commentText: 'Wow so awesome'
    },
    {
        userId: 1,
        blogId: 3,
        commentText: 'Wow so sick'
    }
]

const commentSeeds = () => Comment.bulkCreate(commentData);

module.exports = commentSeeds;
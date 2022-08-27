const { Blog }= require('../models');

const blogData = [
    {
        title: 'seeded blog',
        blogContent: 'this is simply a seeded blog',
        userId: 1
    },
    {
        title: 'a super secret seeded blog',
        blogContent: 'this is not a seeded blog. or is it?',
        userId: 2
    },
    {
        title: 'a seeded blog',
        blogContent: 'this is simply a seeded blog',
        userId: 3
    },
    
]

const blogSeeds = () => Blog.bulkCreate(blogData);

module.exports = blogSeeds;
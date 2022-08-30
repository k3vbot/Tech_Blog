const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const authorized = require('../../utils/authorized');

router.get('/', (req, res) => {
    Blog.findAll({
        attributes: [
            'id',
            'title',
            'createdAt',
            'blogContent'
        ],
        order: [['createdAt', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'commentText', 'blogId', 'userId', 'createdAt'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            },
        ]
    })
    .then(dbBlogData => res.json(dbBlogData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Blog.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'createdAt',
            'blogContent'
        ],
        include: [
            {
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['id', 'commentText', 'blogId', 'userId', 'createdAt'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
        ]
    })
    .then(dbBlogData => {
        if (!dbBlogData) {
            res.status(404).json({ message: 'No Blog with this ID found'});
            return;
        }
        res.json(dbBlogData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', authorized, (req, res) => {
    Blog.create({
        title: req.body.title,
        blogContent: req.body.blogContent,
        userId: req.session.userId
    })
    .then(dbBlogData => res.json(dbBlogData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', authorized, (req, res) => {
    Blog.update({
        title: req.body.title,
        blogContent: req.body.blogContent
    },
    {
        where: {
            id: req.params.id
        }
    })
    .then(dbBlogData => {
        if (!dbBlogData) {
            res.status(404).json({ message: 'No Blog post found with this ID'});
            return;
        }
        res.json(dbBlogData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', authorized, (req, res) => {
    Blog.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbBlogData => {
        if (!dbBlogData) {
            res.status(404).json({ message: 'No Blog Post with this ID found'});
            return;
        }
        res.json(dbBlogData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
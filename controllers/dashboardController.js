const router = require('express').Router();
const sequelize = require('../config/connection');
const {User, Blog, Comment} = require('../models');
const authorized = require('../utils/authorized');


router.get('/', authorized, (req, res) => {
    Blog.findAll({
        where: {
            userId: req.session.userId
        },
        attributes: [
            'id',
            'title',
            'createdAt',
            'blogContent'
        ],
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
            }
        ]
    })
    .then(dbBlogData => {
        const blogs = dbBlogData.map(blog => blog.get({ plain: true }));
        res.render('dashboard', {blogs, isLoggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/edit/:id', authorized, (req, res) => {
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
            }
        ]
    })
    .then(dbBlogData => {
        if (!dbBlogData) {
            res.status(404).json({ message: 'No Blog Post with this ID found'});
            return;
        }

        const blog = dbBlogData.get({ plain: true });
        res.render('edit-blog', {
            blog,
            isLoggedIn: true
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/create/', authorized, (req, res) => {
    Blog.findAll({
        where: {
            userId: req.session.userId
        },
        attributes: [
            'id',
            'title',
            'createdAt',
            'blogContent'
        ],
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
            }
        ]
    })
    .then(dbBlogData => {

        const blogs = dbBlogData.map(blog => blog.get({ plain: true }));
        res.render('create-blog', { blogs, isLoggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
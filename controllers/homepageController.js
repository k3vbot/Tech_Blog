const router = require('express').Router();
const apiController = require('./dashboardController');
const {Blog, User, Comment } = require('./../models');

router.get('/', (req, res) => {
    Blog.findAll({
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
        res.render('homepage', {
            blogs,
            isLoggedIn: req.session.isLoggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/signin', (req, res) => {
    if (req.session.isLoggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signin');
});

router.get('signup', (req, res) => {
    if (req.session.isLoggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

router.get('/post/:id', (req, res) => {
    Blog.findOne({
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
            res.status(404).json({ message: 'No blog post with this ID found' });
            return;
        }

        const blog = dbBlogData.get({ plain: true });

        res.render('single-blog', {
            blog,
            isLoggedIn: req.session.isLoggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
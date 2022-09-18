const router = require('express').Router();
const {User, Blog, Comment } = require('./../models');
const authorized = require('../utils/authorized')

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            inlcude: [{model: User}],
        });
        const blogs = blogData.map((post) => Blog.get({ plain: true }));

        res.render('all-blogs', {
            blogs,
            logged_in: req.session.logged_in,
        })
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {model: User},
                {
                    model: Comment,
                    include: {
                        model: User,
                    },
                },
            ],
        });
        if (!blogData) {
            res.status(404).json({ message: 'No blog with that ID found'});
        }
        const blog = blogData.get({ plain: true });
        const comments = blog.comments;

        res.render('single-blog', {
            blog,
            comments,
            logged_in: req.session.logged_in,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/blog/edit/:id', authorized, async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id);
        const blog = blogData.get({ plain: true });
        res.render('edit-blog', { blog, logged_in: req.session.logged_in });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/signin', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('signin');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/dashboard', authorized, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: {exclude: ['password']},
            include: [{model: Blog}],
        });
        const user = userData.get({ plain: true});
        
        res.render('dashboard', {
            ...user,
            logged_in: req.session.logged_in,
        });       
    } catch (error) {
        res.status(500).json(error)
    }
});
module.exports = router;
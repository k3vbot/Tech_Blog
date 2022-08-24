const router = require('express').Router();
const apiController = require('./apiController');
const {Blog, User} = require('./../models');

router.get('/', (req, res) => {
    res.render('homepage', {
        isLoggedIn: req.session.isLoggedIn || false,
    })
});

router.get('/blogs', async (req, res) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/');
    }
    try {
        const userBlogsFromDB = await Blog.findAll({
            where: {
                userId: req.session.user.id,
            },
        });
        const blogs = userBlogsFromDB.map(blog => blog.get({plain: true}));
        res.render('blogs', {
            blogs,
            isLoggedIn: req.session.isLoggedIn,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.use('/api', apiController);

module.exports = router;
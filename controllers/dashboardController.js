const router = require('express').Router();
const bcrypt = require('bcryptjs');
const {Blog, User, Comment} = require('../models');


// signup, signin, signout
router.post('/signup', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        req.session.save(() => {
            req.session.user = newUser;
            req.session.isLoggedIn = true;
            res.json(newUser);
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({error});
    }
});


// Blog create route
router.post('/blogs', async (req, res) => {
    if (!req.session.isLoggedIn) {
        return res.status(401).json({error: 'You must be logged in to do that!'});
    }
    try {
        const newBlog = await Blog.create({
            blog: req.body.blog,
            userId: req.session.user.id,
        });
        res.json(newBlog);
    } catch (error) {
        console.error(error);
        res.status(500).json({error});
    }
});

module.exports = router;
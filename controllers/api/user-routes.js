const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');


router.get('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
        });
        res.status(200).json(userData);
    } catch (error) {
        res.status(400).json(error)
    }
});

router.post('/signin', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {username: req.body.username },
        });
        if (!userData) {
            res.status(400).json({
                message: 'Incorrect username or password'
            });
        }

        const validPw = await userData.checkPassword(req.body.password);

        if (!validPw) {
            res.status(400).json({
                message: 'incorrect username or password'
            });
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are logged in'});
        })
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post('/signout', (req, res) => {
    try {
        if (req.session.logged_in) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    } catch (error) {
        res.status(404).end();
    }
});

module.exports = router;
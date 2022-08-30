const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { User, Blog, Comment } = require('../../models');
const authorized = require('../../utils/authorized');



// GET /api/users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//GET /api/users/:id

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id   
        },
        include: [
            {
                model: Blog,
                attributes: ['id', 'title', 'blogContent', 'createdAt']
            },
            {
                model: Comment,
                attributes: ['id', 'commentText', 'createdAt'],
                include: {
                    model: Blog,
                    attributes: ['title']
                }
            }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user with this ID found'});
            return;
        }
        res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);    
    }); 
});

// POST /api/user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password,
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.userId = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.isLoggedIn = true;

            res.json(dbUserData);
        });
    });
});

// SignIn
router.post('/signin', async (req, res) => {
    try {
        const existingUser = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if (!existingUser) {
            return res.status(401).json({error: 'Invalid Credentials'});
        }

        const doesPasswordMatch = await bcrypt.compare(req.body.password, existingUser.password);

        if (!doesPasswordMatch) {
            return res.status(401).json({error: 'Invalid Credentials'});
        }

        req.session.save(() => {
            req.session.user = existingUser;
            req.session.isLoggedIn = true;
            res.json({success: true});
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error});
    }
});

//SignOut
router.post('/signout', async (req, res) => {
    console.log('im out here');
    if (req.session.isLoggedIn) {
        console.log('im out here');
        req.session.destroy(() => {
            res.send(true);
        });
    }
});

// Find user by ID
router.put('/:id', authorized, (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'No user with this ID found'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE user by id
router.delete('/:id', authorized, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user with this ID found' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
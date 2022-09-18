const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');

const authorized = require('../../utils/authorized');

router.get('/', async (req, res) => {
    const blogData = await Blog.findAll();
    
    res.status(200).json(blogData);
});

router.put('/:id', authorized, async (req, res) => {
    try {
        let updatedBlog = await Blog.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!updatedBlog) {
            res.status(404).json({ message: 'No blog with that ID found'});
            return;
        }
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json(error)
    }
});

router.delete('/:id', authorized, async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: re.params.id,
                user_id: req.session.user_id,
            },
        });
        if(!blogData) {
            res.status(404).json({ message: "No blog with that ID found"});
            return;
        }
        res.status(200).json(blogData);
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router;
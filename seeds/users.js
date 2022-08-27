const { User } = require('../models')

const userData = [
    {
        username: 'techguy1',
        password: 'password'
    },
    {
        username: 'bloggirl1',
        password: 'wordpass'
    },
    {
        username: 'techblog1',
        password: 'passpass'
    }
]

const userSeeds = () => User.bulkCreate(userData);

module.exports = userSeeds;
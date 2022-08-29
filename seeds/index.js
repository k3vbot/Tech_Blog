const userSeeds = require('./users');
const blogSeeds = require('./blogs');
const commentSeeds = require('./comments');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await userSeeds();

    await blogSeeds();

    await commentSeeds();

    process.exit(0);
};

seedAll();
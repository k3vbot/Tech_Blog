const { User } = require('./../models');
const users = require('./users');
const sequelize = require('./../config/conenction');

const seeder = async () => {
    await sequelize.sync({ force: true});
    await User.bulkCreate(users, {
        individualHooks: true,
    });
    process.exit(0);
};

(async () => {
    await seeder();
})();
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('blog', 'postgres', 'huevang', {
    host: 'localhost',
    dialect: 'postgresql',
    port: 5432,
    logging:false
})

sequelize.authenticate().then(() => {
    console.log('Server  connected database successfully...');
}).catch((error) => {
    console.log(error);
})

sequelize.sync();

module.exports = sequelize;
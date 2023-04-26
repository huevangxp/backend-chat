const controller = require('../controllers/auth.controller');

module.exports = (app) => {
    app.post('/register', controller.register);
    app.post('/login', controller.login);
    app.get('/users', controller.select);   
}
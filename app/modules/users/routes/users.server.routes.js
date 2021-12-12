var usersController = require('../controllers/users.server.controller');
var isAuthenticated = require('../../../middlewares/auth.server.middlewares').isAuthenticated;

module.exports = function (app) {
    app.route('/api/me')
        .get(isAuthenticated, usersController.me);
    
    app.route('/api/users')
        .get(isAuthenticated, usersController.getUsers)
}
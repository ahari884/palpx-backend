const addUserToAGroup = require('../controllers/addUserToAGroup');
const createGroup = require('../controllers/createGroup');
const deleteGroup = require('../controllers/deleteGroup');
const getGroups = require('../controllers/getGroups');
const removeUserFromGroup = require('../controllers/removeUserFromGroup');
var isAuthenticated = require('../../../middlewares/auth.server.middlewares').isAuthenticated;

module.exports = function (app) {
    app.use('/api/groups', isAuthenticated)
    app.route('/api/groups')
        .post(createGroup)
        .get(getGroups)
    
    app.route('/api/groups/:groupId')
        .get(getGroups)
        .delete(deleteGroup)
        .post(addUserToAGroup)
    
    app.route('/api/groups/:groupId/users/:username')
        .delete(removeUserFromGroup)

}

var usersDbo = require('../dbo/users.server.dbo');

exports.me = function (req, res) {
    usersDbo.findUserByUsername(req.user.username, function (err, result) {
        if (err) {
            res.status(400).send({
                success: false,
                message: err
            })
        } else {
            let userData = {
                username: result.username,
                _id: result._id,
                roles: result.roles,
                firstName: result.firstName,
                lastName: result.lastName
            }
        
            res.status(200).send(userData);
        }
    })
}

exports.getUsers = async function(req, res) {
    let users = await usersDbo.getUsers(req.query.searchKey) || []
    res.status(200).send(users)
}

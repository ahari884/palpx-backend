var groupsDbo = require('../dbo/groups.server.dbo')
var userGroupsDbo = require('../dbo/user-groups.server.dbo')
var UserDbo = require('../../users/dbo/users.server.dbo')

module.exports = async function(req, res) {
    let groupId = req.params.groupId
    let username = req.params.username
    let doesGroupExist = await groupsDbo.getGroups(groupId)
    if(!doesGroupExist.length) {
        return res.status(404).send({
            status: 'failed',
            message: 'Group does not exist'
        })
    }
    let doesUserExist = await UserDbo.doUsersExist([username])
    if(!doesUserExist) {
        return res.status(404).send({
            status: 'failed',
            message: 'User does not exist'
        })
    }

    userGroupsDbo.removeUserFromGroup(groupId, username)
        .then((result)=>{
            return res.status(201).send({
                status: 'success',
                message: 'Removed user from group successfully'
            })
        })
        .catch((e)=>{
            console.log('Error removing user from the group')
            return res.status(200).send({
                status: 'failed',
                message: 'Failed to remove the user from the group'
            })
        })


}
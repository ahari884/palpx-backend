var groupsDbo = require('../dbo/groups.server.dbo')
var groupUsersDbo = require('../dbo/user-groups.server.dbo')

module.exports = function (req, res) {
    let groupId = req.params.groupId
    groupsDbo.getGroups(groupId)
        .then(async (result) => {
            console.log('res', result, Object.keys(result[0]))
            if (!(groupId)) {
                return res.status(200).send(result)
            }
            result = result[0] || {}
            let users = await groupUsersDbo.getAllUsersForGroup(groupId)
            console.log('users', users)
            result['users'] = users
            res.status(200).send(result)
        })
        .catch((e) => {
            console.log('Error fetching groups')
            res.status(404).send({
                status: 'failed',
                message: 'Unable to fetch the groups at the moment'
            })
        })
}
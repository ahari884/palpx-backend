var groupsDbo = require('../dbo/groups.server.dbo')
var userGroupsDbo = require('../dbo/user-groups.server.dbo')

module.exports = async function (req, res) {
    let groupId = req.params.groupId
    let ack = await groupsDbo.deleteGroup(groupId).catch((e) => {
        console.log('Deleting error', e)
        return { deletedCount: 0 }
    })
    console.log('Ack', ack)
    if (!ack.deletedCount) {
        return res.status(400).send({
            status: 'failed',
            message: `Requested group doesn't exist or unable delete the item`
        })
    }
    userGroupsDbo.deleteUserGroupMappings(groupId).catch((e)=>{})
    res.status(201).send({
        status: 'success',
        message: 'Successfully deleted'
    })
}

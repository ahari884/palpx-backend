var Group = require('mongoose').model('Group')
var userGroupsDbo = require('../dbo/user-groups.server.dbo')

exports.doesGroupNameExist = function (groupName) {
    return Group.findOne({
        name: groupName
    }).lean().exec()
}

exports.createGroup = async function (groupData, users, cb) {
    let group = new Group(groupData)
    await group.save().catch((e) => {
        console.log('Error creating group', e)
        return cb('Unable to create the group')
    })
    
    let usersGroupsData = await userGroupsDbo.addUsersToGroup(group._id, users)
    if(!usersGroupsData) {
        Group.deleteOne({
            name: groupData.name
        }).catch((e)=>{})
        return cb('Unable to add users to the group')
    }
    cb(null, usersGroupsData)

}

exports.getGroups = async function (groupId) {
    return Group.find(groupId? { _id: groupId }: {}).lean().exec()
}

exports.deleteGroup = async function (groupId) {
    return Group.deleteOne({
        _id: groupId
    })
}

var UserGroup = require('mongoose').model('UserGroup')

exports.addUsersToGroup = function(groupId, usersData) {
    let usersGroupData = usersData.map((user) => {
        return {
            username: user,
            groupId
        }
    })
    return UserGroup.insertMany(usersGroupData).then((result) => {
        return result
    }).catch((e)=>{
        console.log('Error adding users to group', e)
        return null
    })
}

exports.getAllUsersForGroup = function(groupId) {
    return UserGroup.find({groupId}).lean().exec()
}

exports.deleteUserGroupMappings = function(groupId) {
    return UserGroup.deleteMany({
        groupId
    })
}

exports.removeUserFromGroup = function(groupId, username) {
    return UserGroup.findOneAndRemove({
        groupId,
        username
    })
}


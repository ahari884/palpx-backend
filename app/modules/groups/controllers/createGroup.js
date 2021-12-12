var groupsDbo = require('../dbo/groups.server.dbo')
var usersDbo = require('../../users/dbo/users.server.dbo')

module.exports = async function createGroup(req, res) {
    let body = req.body
    if (!body)
        return res.status(400).send({ status: 'failed', message: `Body doesn't exist` })
    if (!body.name)
        return res.status(400).send({ status: 'failed', message: 'name is required' })
    let users = body.users || []

    let doesGroupNameExist =  await groupsDbo.doesGroupNameExist(body.name)
    if(doesGroupNameExist) {
        return res.status(400).send({
            status: 'failed',
            message: 'Group name already exists.  Please try another one'
        })
    }

    let doUsersExist = await usersDbo.doUsersExist(users)
    if (users.length && !doUsersExist)
        return res.status(400).send({ status: 'failed', message: 'User does not exist'})

    let groupData = {
        name: body.name,
        createdBy: req.user._id
    }

    users.push(req.user.username)

    groupsDbo.createGroup(groupData, users, function (err, result) {
        if (err) {
            return res.status(304).send({
                message: err,
                status: 'failed'
            })
        }
        res.status(201).send(result)
    })
}
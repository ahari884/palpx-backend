var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userGroupsSchema = new Schema({
    groupId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    username: {
        type: Schema.Types.String,
        required: true
    }
})

userGroupsSchema.index({groupId: 1, username: 1}, { unique: true})

mongoose.model('UserGroup', userGroupsSchema)

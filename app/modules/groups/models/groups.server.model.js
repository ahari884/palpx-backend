var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var groupSchema = new Schema({
    name: {
        type: Schema.Types.String,
        unique: true,
        required: 'Group name is required and should be unique'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

mongoose.model('Group', groupSchema)

var mongoose = require('mongoose');
var config = require('./config');

module.exports = function () {
    mongoose.Promise = global.Promise;
    db = mongoose.connect(config.dbUrl, { useNewUrlParser: true, useCreateIndex: true }).then(function () {
        console.log('Connected to database successfully', config.dbUrl);
    }, function (err) {
        console.log('Database connection timeout error');
    });

    require('../modules/users/models/users.server.model');
    require('../modules/users/models/session.server.model');
    require('../modules/groups/models/groups.server.model');
    require('../modules/groups/models/user-groups.server.model');

    return db;
}
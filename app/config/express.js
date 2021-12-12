var config = require('./config');
var express = require('express');
var logger = require('morgan');
var compress = require('compression');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var path = require('path');
var glob = require('glob');
var cors = require('cors')

module.exports = function(){
    
    var app = express();
    app.use(cors({ credentials: true }))
    app.use(function (req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, access_token");
        res.setHeader("Access-Control-Allow-Methods","PUT, GET, POST, OPTIONS, DELETE");
        next();
    });

    app.use(express.static(path.join(__dirname, '../uploads')));

    if(process.env.NODE_ENV == 'development'){
        app.use(logger('dev'));
    }else{
        app.use(compress());
    }
    app.use(bodyParser.urlencoded({
        extended:true
    }));
    
    app.use(bodyParser.json());
    app.use(methodOverride());

    // Adding all routes from modules by passing app to the routes with the help of glob
    glob(path.dirname(require.main.filename) + '/app/modules/**/routes/*.js', function (err, files) {
        if (files && files.length) {
            files.forEach(function (file) {
                require(file)(app);
            });
        }
    });

    return app;
}

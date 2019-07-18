const express = require('express')
const path = require('path');
const ehbs = require('express-handlebars');
const morgan = require('morgan')
const multer = require('multer')
const errorHandler = require ('errorhandler');
// importando el enrutador
const routes = require('../routes/routes')
module.exports = app => {


    //settings
    
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, '../views'));
    app.engine('.hbs', ehbs({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('../helpers/helpers')

    }))
    app.set('view engine', '.hbs');

    //midelwares
    app.use(morgan('dev'));
    app.use(multer({
        dest: path.join(__dirname, ('../public/upload/temp'))

    }).single('image'));
    app.use(express.urlencoded({ extended: 'false' }));
    app.use(express.json());


    //routes
    app.use(routes);

    //static files
    app.use('/public', express.static(path.join(__dirname, '../public')));
    //errorhandler
    if ('development' === app.get('env')) {
        app.use(errorHandler)
    }

    return app;
}
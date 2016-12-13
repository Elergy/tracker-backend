require('node-env-file')('./.env');

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const connectToDB = require('./utils/db/connect-to-db');
const routes = require('./routes');
const checkUserMiddleware = require('./middlewares/check-user-middleware');

const app = express();
app.set('port', process.env.port || 8089);

function initMiddlewares(mongoConnection) {
    require('./middlewares/auth-middleware');

    app.use(bodyParser());
    
    app.use(session({
        name: 'session',
        secret: process.env.session_secret,
        resave: true,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoConnection })
    }));
    app.use(passport.initialize());
    app.use(passport.session());

}

function initRoutes() {
    app.use('/docs', express.static('node_modules/swagger-ui/dist'));
    app.use('/swagger', express.static('swagger'));

    app.use('/api/v1/user', routes.user, (err, req, res, next) => {
        res.json({error: err.message});
    });
    app.use('/api/v1/project', checkUserMiddleware, routes.project, (err, req, res, next) => {
        res.json({error: err.message});
    });
    app.use('/api/v1/task', checkUserMiddleware, routes.task, (err, req, res, next) => {
        res.json({error: err.message});
    });
}

async function start() {
    let mongoConnection;
    
    try {
        mongoConnection = await connectToDB();
    } catch(ex) {
        console.log(`Database error: ${ex.message}`);
        return;
    }

    initMiddlewares(mongoConnection);
    initRoutes();
    
    http
        .createServer(app)
        .listen(app.get('port'), () => {
            console.log('Express server listening on port ' + app.get('port'));

        });
}

start();
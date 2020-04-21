'use strict';
//base express require
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var http = require('http');
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var fs = require('fs');
var Logger = require("logger-ro");
var cors = require('cors');
var swaggerPath = "./swagger/v1";
var compression = require('compression');
/**
 * load config
 */
var config = require("config");
var serverConfig = config.get("server");
var authConfig = config.get("auth");
var mockConfig = config.get("mockMode");
var logConfig = config.get("logger");
var dbConfig = config.get("mysql");
var redisConfig = config.get("redis");
var schedulerConfig = config.get("scheduler");
var localConfig = config.get('local');
if (!dbConfig.dialect)
    dbConfig['dialect'] = 'mysql';

// 为数据库名称上加上每个用户名称
dbConfig.cloudDB = dbConfig.cloudDBPrefix;
redisConfig.prefix = redisConfig.redisPrefix;
/**
 * 设置全局配置参数，启动app.js时加载到内存使用
 */
global.__dbConfig = dbConfig;
global.__redisConfig = redisConfig;
global.__authConfig = authConfig;
global.__logConfig = logConfig;
global.__serverConfig = serverConfig;
global.__base = __dirname;
global.__localConfig = localConfig;
var logger = new Logger(logConfig);
var serverHost = serverConfig.host;
var serverPort = serverConfig.port;

var app = express();
app.set('port', serverPort);
// use ejs as templaet if use vue or react please ignore below
app.set('view engine', 'ejs');
// T允许跨域
// https://www.npmjs.com/package/cors 设置跨域

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__base, 'public')));
app.use(compression());

/**
 * jwtToken验证模块的启用
 */
var authorization = require(__base + '/models/authorization');
app.use(authorization(__authConfig.on));


// initiate db singleton
var cloudDb = require("db-singleton-ro")(dbConfig, __dirname + "/schemas/cloudDB", "cloudDB_schema");
cloudDb.sequelize(__dbConfig.cloudDB);


// swaggerRouter configuration
var options = {
    swaggerUi: '/swagger.json',
    controllers: swaggerPath + '/controllers',
    useStubs: mockConfig | false // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(swaggerPath + '/api/swagger.yaml', 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);
var NODE_ENV = config.util.getEnv('NODE_ENV') | 'debug';

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata());

    // Validate Swagger requests
    app.use(middleware.swaggerValidator());

    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter(options));

    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi());

    // Start the server
    http.createServer(app).listen(serverPort, function () {
        logger.info('主程序 已经在 http://' + serverHost + ":" + serverPort + "/ 运行");
        if (mockConfig)
            logger.info('Swagger-ui执行在 http://' + serverHost + ":" + serverPort + '/docs');
    });
});

module.exports = app;

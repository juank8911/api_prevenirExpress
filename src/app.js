let express = require('express');
let morgan = require('morgan');
let bodyparser = require('body-parser');
let cors = require('cors');
let jwt = require('jsonwebtoken');
let formidable = require('express-form-data');
var  cron  = require ('node-cron');
var horas = require('./models/eventos');

//configuracion de la aplicacion
let config = require('./config');
let user = require('./routes/userRoutes');
let jwtRou = require('./routes/jwtRoutes');
let ses = require('./models/jwt');
let con = require('./models/user');

var app = express();
//middleawares

app.use(morgan('dev'));
app.use(express.static('src/public'));
app.use(bodyparser.json({limit: '50mb'}));
//app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());
app.use(formidable.parse({ keepExtensions: true}));
app.set('port',config.puerto);

// cron.schedule ( ' * * */2 * * ' , ( ) => {
//   console.log ( ' ejecutando cada minuto 1, 2, 4 y 5 ' ) ;
//   // horas.citaHistorial((err,res)=>{
//   //   console.log(res+' ok');
//   // });
// } ) ;

cron.schedule('* */2 * * *', () => {
  console.log('running a task every two minutes');
});

//Permisos CORS para acceso a la Api
app.all('*', function(req, res,next) {
    /**
     * Response settings
     * @type {Object}
     */
    var responseSettings = {
        "AccessControlAllowOrigin": req.headers.origin,
        "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
        "AccessControlAllowCredentials": true
    };

    /**
     * Headers
     */
    res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
    res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }


});

//let rutas = express.Router();
//rutas de el servidor
//rutas.route('/login').post(ses.login);
require('./routes/userRoutes')(app);
require('./routes/jwtRoutes')(app);
require('./routes/imgRoutes')(app);
require('./routes/servRoutes')(app);
require('./routes/depaRoutes')(app);
require('./routes/muniRoutes')(app);
require('./routes/cateRoutes')(app);
require('./routes/parenntRoutes')(app);
require('./routes/provedorRoutes')(app);
require('./routes/eventsRoutes')(app);
require('./routes/horarioRoutes')(app);
//app.use(rutas);

app.listen(app.get('port'),()=>{
	console.log('server on port',config.puerto);
});

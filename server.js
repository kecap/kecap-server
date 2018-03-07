const http = require('http');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const https = require('https');
const Bundle = require('bono');
// const serve = require('koa-static');
const fs = require('fs');
const normMiddleware = require('bono-norm/middleware');
const auth = require('bono-auth');

const Api = require('./api');
const AuthBundle = require('./auth');
const config = require('./config');
const secret = 'rahasia';

const PORT = process.env.PORT || 3000;

let app = new Bundle();
const api = new Api(config.diskdb);

/* no needed yet */
// app.use(serve(require('path').resolve(__dirname) + '/www/'));
app.use(require('kcors')());
app.use(require('bono/middlewares/json')());
app.use(normMiddleware(config.diskdb));
api.use(auth.authenticate());

app.get('/', ctx => 'Welkom');
app.bundle('/api', api);
app.bundle('/auth', new AuthBundle({ auth, secret }));

let options = {
  key: fs.readFileSync('./server.pem', 'utf8'),
  cert: fs.readFileSync('./server.crt', 'utf8'),
};

http.Server(app.callback()).listen(PORT);
https.createServer(options, app.callback()).listen(8443);

// server.listen(PORT, () => console.info(`Listening on port ${PORT}`));

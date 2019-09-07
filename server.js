// Environment variables
require('dotenv').config();

const http = require('http');
const app = require('./config/app');
const utils = require('./helper/utils');

http.createServer(app).listen(app.get('port'), () => {
  utils.infoLog(`Express server listening on port ${app.get('port')}`);
});

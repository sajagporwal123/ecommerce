const express = require('express');
const cors = require('cors');

// Body Parser
const bodyParser = require('body-parser');
// Translations
const l10n = require('jm-ez-l10n');

l10n.setTranslationsFile('en', './language/translation.en.json');
global.l10n = l10n;

const utils = require('../helper/utils');
global.models = require('../models');

const app = express();
app.set('port', process.env.SERVER_PORT);
app.use(l10n.enableL10NExpress);
app.use(bodyParser.json());

// CORS
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  process.on('uncaughtException', (err) => {
    utils.errorLog(`${(new Date()).toUTCString()} uncaughtException: ${err.message}`);
    utils.errorLog(err.stack);
    // Todo :- Send Email To Admin
    process.exit(1);
  });

  process.on('unhandledRejection', (reason) => {
    utils.errorLog(`${(new Date()).toUTCString()} unhandledRejection:`);
    utils.errorLog(reason);
    // Todo :- Send Email To Admin
    process.exit(1);
  });
}


// ROUTER
app.use('/api', require('../routes'));

module.exports = app;

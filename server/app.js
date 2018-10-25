process.chdir(__dirname);

$GLB_CFGS = require('./config/global');
const path = require('path');
const http = require('http');
// const https = require('https');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, './assets')));

$parseSvrCpts = require('./midcpts/cpt_parseserver');
const LibParseServer = $parseSvrCpts.ps_lib;
const ParseServer = $parseSvrCpts.ps_server();
const ParseDashboard = $parseSvrCpts.ps_dashboard();

app.use('/parse', ParseServer);
app.use('/dashboard', ParseDashboard);

const httpServer = http.createServer(app);
httpServer.listen(4048, function () {
  console.log('parse-server parse-dashboard are running on port 4048 ......')
});
const parseLiveQueryServer = LibParseServer.ParseServer.createLiveQueryServer(httpServer);
console.log('parse-server successfully started live query server... ');

/*const httpsServer = https.createServer(credentials, app);
httpsServer.listen($config.svrSSLPort || 4049, function () {
    console.log('parse-server parse-dashboard are running on port ' + $config.svrSSLPort + ' with ssl ......');
});
const parseLiveQueryServer = LibParseServer.ParseServer.createLiveQueryServer(httpsServer);
console.log('parse-server successfully started live query server... ');*/

//nodejs 代理https
/*const httpProxy = require('http-proxy');
const pem = require('pem');

pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
    if (err) {
        throw err
    }
    httpProxy.createServer({
        ssl: {
            key: keys.serviceKey,
            cert: keys.certificate
        },
        target: 'https://registry.npm.taobao.org',
        secure: true // Depends on your needs, could be false.
    }).listen(11443);
});*/




module.exports = {

  ps_cfgs: {
	svrPort: 4048,
    svrSSLPort: 4049,
    parse_db_type: 'PG',        //PG    MYSQL   MONGODB
    parse_serverURL: 'http://127.0.0.1:4048/parse',
    // parse_serverURL: 'https://127.0.0.1:4049/parse',
    // parse_databaseURI: 'mongodb://localhost/test?useNewUrlParser=true',
    parse_databaseURI_PG: 'postgres://u_zone_gasep:u_zone_gasep@10.5.4.115:33081/db_parser',
    parse_databaseURI_MYSQL: 'postgres://wits_parser:wits_parser@localhost:5432/db_parser',
    parse_databaseURI_MONGODB: 'mongodb://10.5.4.145:27017/test',
    parse_dshbd_userId: 'wits',
    parse_dshbd_passwd: 'wits',
    parse_appId: 'wits_parse',
    parse_appName: 'wits_apps',
    parse_masterKey: 'wits_masterKey',
    parse_jsKey: 'wits_jsKey',
    parse_liveQModules: ['GameScore'],
    redisURL: 'redis://10.5.4.145:16379/3',
    auth_key: '/wits/proj-wkspace/wits-projects-plus/Node_APPS/wits-plus-fullstack/server/certs/server/server.key',
    auth_cert: '/wits/proj-wkspace/wits-projects-plus/Node_APPS/wits-plus-fullstack/server/certs/server/server.crt'
  }


};

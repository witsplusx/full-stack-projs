let LibParseServer = require('parse-server');
let bzcfgs = $GLB_CFGS.ps_cfgs;
module.exports = {
  ps_lib: LibParseServer,
  ps_server: function (){
	var parse = null;
	
	
	let ParseServer = LibParseServer.ParseServer;
	
	let redisCache = new LibParseServer.RedisCacheAdapter({
    url: bzcfgs.redisURL
});
	
	//console.log('bzcfgs.parse_db_type=====' + bzcfgs.parse_db_type);
	//console.log('bzcfgs.parse_databaseURI_PG===' + bzcfgs.parse_databaseURI_PG);
	if(bzcfgs.parse_db_type === 'PG') {
		parse = new ParseServer({
			"databaseURI": bzcfgs.parse_databaseURI_PG,
			"appId": bzcfgs.parse_appId,
			"javascriptKey": bzcfgs.parse_jsKey,
			"masterKey": bzcfgs.parse_masterKey,
			cacheAdapter: redisCache,
			liveQuery: {
				classNames: bzcfgs.parse_liveQModules
			},
			"serverURL": bzcfgs.parse_serverURL
		});
	}
	if(bzcfgs.parse_db_type === 'MYSQL') {
		let MySQL = require('parse-server-mysql-adapter').MySQL;
		let mysql = new MySQL(bzcfgs.parse_databaseURI_MYSQL);
		parse = new ParseServer({
			databaseAdapter: mysql.getDatabaseAdapter(),
			"masterKey": bzcfgs.parse_masterKey,
			cacheAdapter: redisCache,
			liveQuery: {
				classNames: bzcfgs.parse_liveQModules
			},
			"serverURL": bzcfgs.parse_serverURL
		});
	}
	if(bzcfgs.parse_db_type === 'MONGODB') {
		parse = new ParseServer({
			"databaseURI": bzcfgs.parse_databaseURI_MONGODB,
			"appId": bzcfgs.parse_appId,
			"javascriptKey": bzcfgs.parse_jsKey,
			"masterKey": bzcfgs.parse_masterKey,
			cacheAdapter: redisCache,
			liveQuery: {
				classNames: bzcfgs.parse_liveQModules
			},
			"serverURL": bzcfgs.parse_serverURL
		});
	}
	if(parse === null) {
		console.error('init parse serrver error!!!!!');
		return;
	}
	return parse;
  },

	ps_dashboard: function() {
		
		let ParseDashboard = require('parse-dashboard');
		
		return new ParseDashboard({
	  "apps": [
		  /*{
			  "serverURL": "http://localhost:13370/parse",
			  "appId": "wits_parse_app1",
			  "masterKey": "wits_parse_key1"
		  },
		  {
			  "serverURL": "http://localhost:13371/parse",
			  "appId": "wits_parse_app2",
			  "masterKey": "wits_parse_key2"
		  },*/
		  {
			  "appId": bzcfgs.parse_appId,
			  "appName": bzcfgs.parse_appName,
			  "masterKey": bzcfgs.parse_masterKey,
			  "serverURL": bzcfgs.parse_serverURL
		  }
	  ],
	  "users": [
		  {
			  "user": "wits",
			  "pass": "wits"
		  }
	  ],
	  "useEncryptedPasswords": false
	})
		
	}
	
	


};

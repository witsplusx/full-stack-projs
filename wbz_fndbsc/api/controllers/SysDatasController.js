
module.exports = {
  index: function(req, res) {
    if (!req.isSocket) {return res.badRequest();}
    let msg = "这是测试消息^_^" + Math.random();
    sails.sockets.join(req, 'funSockets');
    sails.sockets.broadcast('funSockets', 'message', {msg: msg}, req);
    return res.ok({ msg: msg });
  },
  gaseqps: function (req, res) {
    return res.send(sails.config.custom.gasEPDatas.equipments);
  },
  wshello: function (req, res) {
    if (!req.isSocket) {
      return res.badRequest();
    }

    var socketId = sails.sockets.getId(req);

    sails.sockets.join(req, 'funSockets');
    sails.sockets.broadcast('funSockets', 'wshello', {howdy: 'hi there!'}, req);

    return res.json({
      socketId: socketId,
      bakDatas: sails.config.custom.gasEPDatas.equipments
    });
  },
  redistest: function (req, res) {
    let cluster = sails.config.custom.gasEPDatas.rdsCluster;
    cluster.zrange('GSD-[NDIR001710090411_0_0]', 0, -1).then(function (bak) {
      if(bak) {
        console.log('GSD-[NDIR001711080581_0_0] data==========' + bak);
        return res.send(bak);
      } else {
        return res.error('no datas....');
      }

    });
  },
  uploadFileTester: function (req, res) {

    req.file('avatar').upload({
      // don't allow the total upload size to exceed ~10MB
      maxBytes: 10000000
    },function whenDone(err, uploadedFiles) {
      if (err) {
        return res.serverError(err);
      }

      // If no files were uploaded, respond with an error.
      if (uploadedFiles.length === 0){
        return res.badRequest('No file was uploaded');
      }


      /*// Get the base URL for our deployed application from our custom config
      // (e.g. this might be "http://foobar.example.com:1339" or "https://example.com")
      var baseUrl = sails.config.custom.baseUrl;

      // Save the "fd" and the url where the avatar for a user can be accessed
      User.update(req.session.userId, {

        // Generate a unique URL where the avatar can be downloaded.
        avatarUrl: require('util').format('%s/user/avatar/%s', baseUrl, req.session.userId),

        // Grab the first file and use it's `fd` (file descriptor)
        avatarFd: uploadedFiles[0].fd
      })
        .exec(function (err){
          if (err) return res.serverError(err);
          return res.ok();
        });*/
    });
  },
};

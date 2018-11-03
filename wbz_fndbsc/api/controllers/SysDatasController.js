
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
};

let layconts = [
  {"x":0,"y":0,"w":2,"h":8,"i":"实时浓度告警"},
  {"x":3,"y":0,"w":8,"h":2,"i":"合肥城市生命线—燃气专项综合平台"},
  {"x":9,"y":0,"w":2,"h":8,"i":"实时设备告警"},
  {"x":0,"y":8,"w":3,"h":8,"i":"燃气集团应急平台"},
  {"x":3,"y":2,"w":6,"h":14,"i":"GIS地图"},
  {"x":9,"y":8,"w":3,"h":8,"i":"大数据预测分析"},
];

/*io.socket.on('message', function(data){
  console.log('console websockets === ' + data.msg);
});
io.socket.get('/message', function gotResponse(body, response) {
  console.log(response.statusCode, body);
  console.log('console websockets === ' + body.msg);
});*/



var wits_3dgis = wits_jsfrm.use('wits_3dgis');


parasails.registerPage('dashboard', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    layout: layconts,
    draggable: true,
    resizable: true,
    responsive: true,
    index: 0
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    // _.extend(this, SAILS_LOCALS);
  },
  mounted: async function() {
    this.index = this.layout.length;
    // cesiumGisInit();
    // wits_3dgis.sample();

    $.ajax({
      url: "gisdatas/oradata_exp_gasep.json",
      type: "GET",
      dataType: "json",
      success: function(data) {
        wits_3dgis.sample({equipmts: data});
      }
    })

  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    /*increaseWidth: function(item) {
      let width = document.getElementById("content").offsetWidth;
      width += 20;
      document.getElementById("content").style.width = width+"px";
    },
    decreaseWidth: function(item) {
      let width = document.getElementById("content").offsetWidth;
      width -= 20;
      document.getElementById("content").style.width = width+"px";
    },
    removeItem: function(item) {
      //console.log("### REMOVE " + item.i);
      this.layout.splice(this.layout.indexOf(item), 1);
    },
    addItem: function() {
      let self = this;
      //console.log("### LENGTH: " + this.layout.length);
      let item = {"x":0,"y":0,"w":2,"h":2,"i":this.index+"", whatever: "bbb"};
      this.index++;
      this.layout.push(item);
    }*/
  }
});

parasails.registerPage('sample', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    visible: false
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    // _.extend(this, SAILS_LOCALS);
  },
  mounted: async function() {

    io.socket.on('fndbsc/user', function(msg){
      console.log('sending   ........' + msg);
    });

    io.socket.on('hello', function (data) {
      alert('0-0-0-0-0--0-');
      console.log('Socket `' + data.id + '` joined the party!');
    });

  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    show: function () {
      io.socket.get('/commws/hello', function gotResponse(data, jwRes) {
        console.log('Server responded with status code ' + jwRes.statusCode + ' and data: ', data);
      });

      io.socket.on('user', function (data) {
        console.log('Socket `' + data.id + '` joined the party!');
      });
      io.socket.get('/user', function(resData) {
        console.log(resData);
      });
    }
  }
});

module.exports = {


  friendlyName: 'View welcome',


  description: 'Display "Welcome" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/welcome'
    }

  },


  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }


};

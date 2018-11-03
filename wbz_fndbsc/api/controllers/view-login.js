module.exports = {
  friendlyName: 'View login',
  description: 'Display "login" page.',
  exits: {
    success: {
      viewTemplatePath: 'pages/login'
    }
  },
  fn: async function (inputs, exits) {

    // Respond with view.
    return exits.success();

  }
};

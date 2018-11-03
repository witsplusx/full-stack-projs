module.exports = {

  friendlyName: 'View dashboard',
  description: 'Display "Dashboard" page.',
  exits: {
    success: {
      viewTemplatePath: 'pages/dashboard',
      data: sails.config.custom.gasEPDatas
    }
  },
  fn: async function (inputs, exits) {
    // Respond with view.
    return exits.success();
  }

};

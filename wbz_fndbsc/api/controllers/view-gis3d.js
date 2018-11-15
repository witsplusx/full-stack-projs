module.exports = {
  friendlyName: 'View gis 3 d',
  description: 'Display "Gis 3 d" page.',
  exits: {
    success: {
      viewTemplatePath: 'pages/gis3d'
    }
  },
  fn: async function (inputs, exits) {
    // Respond with view.
    return exits.success();
  }
};

/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');

module.exports = {
  attributes: {
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
      columnName: 'uni_email',
      columnType: 'varchar(128)'
    },
    username: {
      type: 'string',
      required: true,
      unique: true,
      columnName: 'usr_name',
      columnType: 'varchar(80)'
    },
    password: {
      type: 'string',
      required: true,
      columnName: 'usr_passwd',
      columnType: 'varchar(80)'
    },
    emailConfirmed: {
      type      : 'boolean',
      defaultsTo: false,
      columnName: 'email_confirmed',
      columnType: 'tinyint(1)'
    },

  },
  customToJSON: function() {
    return _.omit(this, ['password']);
  },
  beforeCreate: encryptPassword,
  beforeUpdate: (values, next) => {
    if (!values.password) {
      delete values.password;

      return next();
    }

    try {
      // check if the password is already hashed
      bcrypt.getRounds(values.password);
    } catch(e) {
      return encryptPassword(values, next);
    }

    next();
  }
};

function encryptPassword(values, next) {
  if (!values.password) {
    return next();
  }
  bcrypt.hash(values.password, 10, (error, hash) => {
    if (error) {
      return next(error);
    }
    values.password = hash;
    next();
  });
}

/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const bcrypt = require('bcrypt-nodejs');

module.exports = {
  datastore: 'default',
  tableName: 'fdb_sca_user',
  attributes: {

    /*
      email: {
        type: 'string',
        isEmail: true,
        unique: false,
        required: false
      },
*/
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
      columnName: 'uni_email',
      columnType: 'varchar(128)',
    },
    username: {
      type: 'string',
      required: true,
      unique: true,
      columnName: 'uni_username',
      columnType: 'varchar(80)',
    },
    password: {
      type: 'string',
      required: true,
      columnName: 'usr_passwd',
      columnType: 'varchar(128)',
    },
    // One-to-Many -> Add a reference to Posts 
 
    },
  customToJSON: function() {
     return _.omit(this, ['password'])
  },
  beforeCreate: function(user, cb){
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(user.password, salt, null, function(err, hash){
        if(err) return cb(err);
        user.password = hash;
        return cb();
      });
    });
  }
};

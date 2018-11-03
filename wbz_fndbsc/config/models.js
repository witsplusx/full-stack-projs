/**
 * Default model settings
 * (sails.config.models)
 *
 * Your default, project-wide model settings. Can also be overridden on a
 * per-model basis by setting a top-level properties in the model definition.
 *
 * For details about all available model settings, see:
 * https://sailsjs.com/config/models
 *
 * For more general background on Sails model settings, and how to configure
 * them on a project-wide or per-model basis, see:
 * https://sailsjs.com/docs/concepts/models-and-orm/model-settings
 */

module.exports.models = {


  /***************************************************************************
  *                                                                          *
  * Whether the `.create()` and `.update()` model methods should ignore      *
  * (and refuse to persist) unrecognized data-- i.e. properties other than   *
  * those explicitly defined by attributes in the model definition.          *
  *                                                                          *
  * To ease future maintenance of your code base, it is usually a good idea  *
  * to set this to `true`.                                                   *
  *                                                                          *
  * > Note that `schema: false` is not supported by every database.          *
  * > For example, if you are using a SQL database, then relevant models     *
  * > are always effectively `schema: true`.  And if no `schema` setting is  *
  * > provided whatsoever, the behavior is left up to the database adapter.  *
  * >                                                                        *
  * > For more info, see:                                                    *
  * > https://sailsjs.com/docs/concepts/orm/model-settings#?schema           *
  *                                                                          *
  ***************************************************************************/

  schema: true,


  /***************************************************************************
  *                                                                          *
  * How and whether Sails will attempt to automatically rebuild the          *
  * tables/collections/etc. in your schema.                                  *
  *                                                                          *
  * > Note that, when running in a production environment, this will be      *
  * > automatically set to `migrate: 'safe'`, no matter what you configure   *
  * > here.  This is a failsafe to prevent Sails from accidentally running   *
  * > auto-migrations on your production database.                           *
  * >                                                                        *
  * > For more info, see:                                                    *
  * > https://sailsjs.com/docs/concepts/orm/model-settings#?migrate          *
  *                                                                          *
  ***************************************************************************/

  migrate: 'drop',


  /***************************************************************************
  *                                                                          *
  * Base attributes that are included in all of your models by default.      *
  * By convention, this is your primary key attribute (`id`), as well as two *
  * other timestamp attributes for tracking when records were last created   *
  * or updated.                                                              *
  *                                                                          *
  * > For more info, see:                                                    *
  * > https://sailsjs.com/docs/concepts/orm/model-settings#?attributes       *
  *                                                                          *
  ***************************************************************************/

  attributes: {
    id: { type: 'number', columnName: 'id', columnType: 'bigint(20)', autoIncrement: true },
	  bsCreatedAt: { type: 'number', autoCreatedAt: true, columnName: 'vsc_created_at', columnType: 'bigint(16)',},
    bsUpdatedAt: { type: 'number', autoUpdatedAt: true, columnName: 'vsc_updated_at', columnType: 'bigint(16)',},
    bsMetaType: {type: 'number', columnName: 'vsc_meta_type', columnType: 'integer(12)'},
    bsMetaDesc: {type: 'string', columnName: 'vsc_meta_desc', columnType: 'varchar(80)'},
	  bsIsUse: {type: 'boolean', columnName: 'vsc_is_use', columnType: 'tinyint(1)',  defaultsTo: true},
    bsDRegion: {type: 'number', columnName: 'vsc_data_region', columnType: 'integer(10)'},
    bsDVersion: {type: 'number', columnName: 'vsc_data_version', columnType: 'integer(12)'},
	  bsTxId: {type: 'number', columnName: 'vsc_txid', columnType: 'bigint(20)'},
	  bsPaUnid: {type: 'number', columnName: 'vsc_pa_unid', columnType: 'bigint(20)'},
    bsName: {type: 'string', columnName: 'vsc_name', columnType: 'varchar(80)'},
    bsCode: {type: 'string', columnName: 'vsc_code', columnType: 'varchar(80)'},
    //--------------------------------------------------------------------------
    //  /\   Using MongoDB?
    //  ||   Replace `id` above with this instead:
    //
    // ```
    // id: { type: 'string', columnName: '_id' },
    // ```
    //
    // Plus, don't forget to configure MongoDB as your default datastore:
    // https://sailsjs.com/docs/tutorials/using-mongo-db
    //--------------------------------------------------------------------------
  },



  /******************************************************************************
  *                                                                             *
  * The set of DEKs (data encryption keys) for at-rest encryption.              *
  * i.e. when encrypting/decrypting data for attributes with `encrypt: true`.   *
  *                                                                             *
  * > The `default` DEK is used for all new encryptions, but multiple DEKs      *
  * > can be configured to allow for key rotation.  In production, be sure to   *
  * > manage these keys like you would any other sensitive credential.          *
  *                                                                             *
  * > For more info, see:                                                       *
  * > https://sailsjs.com/docs/concepts/orm/model-settings#?dataEncryptionKeys  *
  *                                                                             *
  ******************************************************************************/

  dataEncryptionKeys: {
    default: 'eMwfS3NMT8Nop/wXq6JydIAeDW25ZoOubPt0ngGFfmY='
  },


  /***************************************************************************
  *                                                                          *
  * Whether or not implicit records for associations should be cleaned up    *
  * automatically using the built-in polyfill.  This is especially useful    *
  * during development with sails-disk.                                      *
  *                                                                          *
  * Depending on which databases you're using, you may want to disable this  *
  * polyfill in your production environment.                                 *
  *                                                                          *
  * (For production configuration, see `config/env/production.js`.)          *
  *                                                                          *
  ***************************************************************************/

  cascadeOnDestroy: true


};

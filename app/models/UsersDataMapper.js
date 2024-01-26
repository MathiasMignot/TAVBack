const debug = require('debug')('TAT:datamapper:users');
const CoreDatamapper = require('./CoreDataMapper')
const client = require('../helpers/client');


class UsersDataMapper extends CoreDatamapper{

    static tablename = 'users';

    static insertFunc ='insert_users';

    static updateFunc ='update_users';

    constructor(){

        super();
        debug('users dataMapper created') ;
    }

    async findByEmail(email) {
        debug(`${this.constructor.tableName} findByEmail(${email})`);
        const preparedQuery = {
          text: 'SELECT * FROM "users" WHERE email=$1',
          values: [email],
        };
        const results = await client.query(preparedQuery);
        return results.rows[0];
      }
}
module.exports = new UsersDataMapper();
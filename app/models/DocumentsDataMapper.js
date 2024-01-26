const debug = require('debug')('TAT:datamapper:documents');
const CoreDatamapper = require('./CoreDataMapper')
const client = require('../helpers/client');


class DocumentsDataMapper extends CoreDatamapper{

    static tableName = 'documents';

    static insertFunc ='insert_document';

    static updateFunc ='update_document';

    constructor(){

        super();
        debug('documents dataMapper created') ;
    }

    async findOneByCategory(id){

        const preparedQuery = {
            text : `SELECT * FROM documents WHERE category_id = $1`,
            values :[id]
        }
        const results = await client.query(preparedQuery)
        return results.rows
    }

    async findStandDoc(){
        const preparedQuery = {
            text : `SELECT * FROM documents WHERE category_id >= $1 OR category_id <= $2`,
            values :[5,8]
        }
        const results = await client.query(preparedQuery)
        return results.rows
    }
}
module.exports = new DocumentsDataMapper();
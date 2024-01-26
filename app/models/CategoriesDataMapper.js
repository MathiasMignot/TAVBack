const debug = require('debug')('TAT:datamapper:categories');
const CoreDatamapper = require('./CoreDataMapper')


class CategoriesDataMapper extends CoreDatamapper{

    static tablename = 'documents';

    static insertFunc ='insert_categories';

    static updateFunc ='update_categories';

    constructor(){

        super();
        debug('categories dataMapper created') ;
    }


}
module.exports = new CategoriesDataMapper();
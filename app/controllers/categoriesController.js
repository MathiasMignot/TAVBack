const debug = require ('debug')('TAT:controllers:documents');
const CoreController= require("./CoreController") ;
const CategoriesDataMapper = require('../models/CategoriesDataMapper');

class CategoriesController extends CoreController{

    static datamapper = CategoriesDataMapper ;

    static dataName = {one:'category', many:'categories'};

    constructor(){

        super();
        debug('CategoriesController created');
    }

    
}

module.exports= new CategoriesController();
const debug = require ('debug')('TAT:controllers:documents');
const CoreController= require("./CoreController") ;
const DocumentsDataMapper = require('../models/DocumentsDataMapper');

class DocumentsController extends CoreController{

    static dataMapper = DocumentsDataMapper ;

    static dataName = {one:'document', many:'documents'};

    constructor(){

        super();
        debug('DocumentsController created');
    }

    async getByCategoryId(req,res){

        try {
            const {id}= req.params ;
            const result = await DocumentsDataMapper.findOneByCategory(id);
    
            return res.json(result) ;
            
        } catch (error) {
            return res.status(500).json({ message: e.message });
        }
    }
    async getStandDoc(req,res){
        try {
        
            const result = await DocumentsDataMapper.findStandDoc();
    
            return res.json(result) ;
            
        } catch (error) {
            return res.status(500).json({ message: e.message });
        }

    }
    
    }



module.exports= new DocumentsController();
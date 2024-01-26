const express = require ('express');
const documentsController=require ('../../controllers/documentsController.js');
const upload = require ('../../helpers/multer.js')
const auth = require ('./../../authentification.js')

const router = express.Router();

router.get("/", documentsController.getAll.bind(documentsController));

router.get("/:id", documentsController.getOne.bind(documentsController))

router.post("/",auth,upload.single("file"), documentsController.createOne.bind(documentsController));

router.patch("/:id",auth,upload.single("file"), documentsController.patchOne.bind(documentsController));

router.get('/category/:id', documentsController.getByCategoryId);

router.get("/presentoire/doc", documentsController.getStandDoc)


router.delete('/:id',auth,documentsController.deleteOne.bind(documentsController))

module.exports = router ;
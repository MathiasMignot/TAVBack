const express = require ('express');
const categoriesController=require ('../../controllers/categoriesController.js');

const upload = require ('../../helpers/multer.js')

const router = express.Router();

router.get("/", categoriesController.getAll);

router.get("/:id", categoriesController.getOne)

router.post("/", upload.single("upload_file") ,categoriesController.createOne);

router.patch("/:id", upload.single("upload_file"),categoriesController.patchOne);

module.exports = router ;
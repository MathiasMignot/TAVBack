const express = require ('express')

const documentsRouter = require('./documentsRouter')
const usersRouter= require ('./usersRouter')
const router = express.Router();

router.use('/documents', documentsRouter)
router.use('/users', usersRouter)



module.exports = router;
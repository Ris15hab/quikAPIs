const {addData,getData,getDataById,updateDataById,deleteDataById} = require('../controllers/apis')
const express = require('express')
const router = express.Router();

router.post('/*/addData',addData)
router.get('/*/getData',getData)
router.get('/*/getDataById',getDataById)
router.put('/*/updateDataById',updateDataById)
router.delete('/*/deleteDataById',deleteDataById)

module.exports = router
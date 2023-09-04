const { addData, getData, getDataById, updateDataById, deleteDataById } = require('../controllers/apis')
const { apiHitCount } = require('../middleware/apiHitCount')
const express = require('express')
const router = express.Router();

router.post('/*/addData', apiHitCount, addData)
router.get('/*/getData', apiHitCount, getData)
router.get('/*/getDataById', apiHitCount, getDataById)
router.put('/*/updateDataById', apiHitCount, updateDataById)
router.delete('/*/deleteDataById', apiHitCount, deleteDataById)

module.exports = router
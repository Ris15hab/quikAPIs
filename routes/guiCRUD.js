const { getFields, dropAll } = require('../controllers/guiCRUD')
const { verifyToken } = require('../middleware/auth')
const express = require('express')
const router = express.Router();

router.get('/guiCRUD/getFields', verifyToken, getFields)
router.delete('/guiCRUD/dropAll',verifyToken,dropAll)

module.exports = router
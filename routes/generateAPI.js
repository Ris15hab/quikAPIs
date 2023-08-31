const { createCRUD, deleteCRUD } = require('../controllers/generateAPI')
const { createController, createModel, createRoutes, appendAllRoutes, appendAppRoutes } = require('../middleware/createfiles')
const { verifyToken } = require('../middleware/auth')
const express = require('express')

const router = express.Router()

router.post('/crud/createcrud',
    verifyToken,
    createModel,
    createController,
    createRoutes,
    appendAllRoutes,
    appendAppRoutes,
    createCRUD)

router.delete('/crud/deletecrud', verifyToken, deleteCRUD)

module.exports = router
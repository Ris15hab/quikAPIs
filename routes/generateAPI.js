const { createCRUD, deleteCRUD } = require('../controllers/generateAPI')
const { createController, createModel, createRoutes, appendAllRoutes, appendAppRoutes } = require('../middleware/createfiles')
const { deleteModel, deleteController, deleteRoutes, deleteAllRoutes, deleteAppRoutes } = require('../middleware/deleteFiles')
const { verifyToken } = require('../middleware/auth')
const express = require('express')

const router = express.Router()

router.post('/crud/createcrud',
    verifyToken,
    // createModel,
    // createController,
    // createRoutes,
    // appendAllRoutes,
    // appendAppRoutes,
    createCRUD)

router.delete('/crud/deletecrud',
    verifyToken,
    // deleteAppRoutes,
    // deleteAllRoutes,
    // deleteRoutes,
    // deleteController,
    // deleteModel,
    deleteCRUD)

module.exports = router
const allRoutes = require('./utils/allRoutes')

routes = (app) => {
    app.use(allRoutes.user);
    app.use(allRoutes.generateAPI);
    app.use(allRoutes.userDB);
    app.use(allRoutes.guiCRUD);
    app.use(allRoutes.api);
}

module.exports = { routes }
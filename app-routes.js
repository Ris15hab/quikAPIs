const allRoutes = require('./utils/allRoutes')

routes = (app)=>{
app.use(allRoutes.user);
app.use(allRoutes.generateAPI);
app.use(allRoutes.userDB);
app.use(allRoutes.guiCRUD);
}

module.exports = { routes }
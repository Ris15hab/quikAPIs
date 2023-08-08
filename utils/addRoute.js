const fs = require('fs');
const path = require('path')

const addAllRoute = async (allRoutesNewData) => {
    const allRoutesData = path.join(__dirname, './allRoutesData.txt')
    await fs.appendFile(allRoutesData, allRoutesNewData, (err) => {
        if (err) {
            console.error('Error appending data to allRoutesData.txt:', err);
        } else {
            fs.readFile(allRoutesData, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading allRoutesData.txt :', err);
                    return;
                }
                // console.log(data)
                const content = `const allRoutes = {\n${data}\n}\n\nmodule.exports = allRoutes;\n`;
                const FileAllRoutes = path.join(__dirname, './allRoutes.js')
                // Write the content to the new file
                fs.writeFile(FileAllRoutes, content, (err) => {
                    if (err) {
                        console.error('Error in adding data to allRoutes.js', err);
                    } else {
                        console.log('allRoutes.js successfully updated');
                    }
                });
            });
        }
    })
}

const addAppRoute = async (appRoutesNewData) => {
    const appRouteData = path.join(__dirname, './app-routeData.txt')
    await fs.appendFile(appRouteData, appRoutesNewData, (err) => {
        if (err) {
            console.error('Error appending data to app-routeData.txt:', err);
        } else {
            fs.readFile(appRouteData, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading allRoutesData.txt :', err);
                    return;
                }
                // console.log(data)
                const content2 = `const allRoutes = require('./utils/allRoutes')\n\nroutes = (app)=>{\n${data}\n}\n\nmodule.exports = { routes }`;
                const FileAppRoutes = path.join(__dirname, '../app-routes.js')
                // console.log(content2)
                // Write the content to the new file
                fs.writeFile(FileAppRoutes, content2, (err) => {
                    if (err) {
                        console.error('Error in adding data to app-routes.js', err);
                    } else {
                        console.log('app-routes.js successfully updated');
                    }
                });
            });
        }
    })
}

// const newRoute = "\ntesing:require('../tesingpath'),"
// const appRoutesNewData = `\napp.use(allRoutes.testing);`
// addAppRoute(appRoutesNewData);

module.exports = {
    addAllRoute,
    addAppRoute
}
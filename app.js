//importing modules
const express = require('express')
require('dotenv').config()
require('./connection');
const cors= require('cors')
// const path = require('path')

//creating app
const app = express()

app.use(express.json())
app.use(cors())
// const modelPath = path.join(__dirname,'./models')
// app.use(express.static(modelPath))

//setting port
const PORT = process.env.PORT || 8000

// // //importing routes
// const userRoute = require('./routes/contact')

// // //setting routes
// app.use('/user',userRoute)

// Route Define
let apiRoute = require("./app-routes");
apiRoute.routes(app);

//error handling
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
})

//setting server
app.listen(PORT,()=>{
    console.log(`listening to port ${PORT}`)
})
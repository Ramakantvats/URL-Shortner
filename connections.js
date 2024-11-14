const mongoose = require("mongoose")

async function connectMongodb(URL){
    return mongoose.connect(URL)
}

module.exports = connectMongodb
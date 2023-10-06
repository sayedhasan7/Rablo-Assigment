const mongoose = require("mongoose")


const Connnection = async (connectionurl) => {
    await mongoose.connect(connectionurl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(console.log("Connected Successfully")).catch((err)=>{console.log(err)})
}

module.exports = Connnection;
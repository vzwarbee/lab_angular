const { default: mongoose } = require("mongoose")

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        console.log("Db Connect Successfully!");
    } catch (error) {
        console.log("database Error!");
        console.error(error);
    }
}

module.exports = dbConnect;
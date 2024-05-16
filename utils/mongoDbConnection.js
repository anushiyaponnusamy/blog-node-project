const mongoose = require("mongoose");
// const dbOptions = {
//   useNewUrlParser: true,
//   connectTimeoutMS: 45000, // Give up initial connection after 45 seconds
//   socketTimeoutMS: 60000, // Close sockets after 60 seconds of inactivity
//   family: 4, // Use IPv4, skip trying IPv6
//   useUnifiedTopology: true,
//   keepAlive: true,
//   keepAliveInitialDelay: 300000,
//   maxPoolSize: 200,
// };
const connectToMongoDb = () => {
    try {
        mongoose.connect(process.env.MONGO_URL).then(() => {
            console.log("connected to mongodb successfully");
        });
    } catch (error) {
        console.log(error);
    }
};
module.exports = connectToMongoDb;

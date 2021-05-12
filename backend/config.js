const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    port: process.env.PORT,
    mongoConnectionString: process.env.MONGO_CONNECTION_URL
};

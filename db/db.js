require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("connected to db")
}).catch((err) => console.log("not connected to db", err))
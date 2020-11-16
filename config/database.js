const mongoose = require('mongoose')

const DB_URL = process.env.DATABASE_URL || "mongodb://localhost/blog_nodejs";

async function connect() {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connect }
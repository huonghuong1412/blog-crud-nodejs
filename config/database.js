const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost/blog_nodejs', {
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
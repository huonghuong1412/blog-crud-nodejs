const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const User = new Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        name: { type: String, required: true }
    },
    {
        timestamps: true
    }
)

User.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        user.password = hash;
        next();
    })
})

module.exports = mongoose.model('user', User)
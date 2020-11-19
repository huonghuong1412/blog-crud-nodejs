const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const Schema = mongoose.Schema;
mongoose.plugin(slug)

const Blog = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        slug: { type: String, slug: 'title', unique: true },
        user: { type: Object, maxlength: 100, minlength: 6 }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('blog', Blog)
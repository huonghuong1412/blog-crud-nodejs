const Blog = require('../model/Blog')

class BlogController {
    // get all
    getAll = (req, res, next) => {
        Blog.find({}, (err, blogs) => {
            console.log(req.session);
            res.render('index', {
                blogs: blogs
            })
        })
    }

    // get detail -- blog/:slug
    getDetail = (req, res, next) => {
        Blog.findOne({ slug: req.params.slug }, (err, blog) => {
            res.render('blog', {
                blog: blog
            })
        })
    }
    
}

module.exports = new BlogController();
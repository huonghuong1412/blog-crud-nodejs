const Blog = require('../model/Blog')

class BlogController {
    // get all // index home page
    getAll = (req, res, next) => {
        const perPage = 8;
        const page = req.params.page || 1;
        Blog
            .find({})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec((err, blogs) => {
                Blog.count().exec((err, count) => {
                    if (err) {
                        next();
                    } else {
                        if(req.params.page) {
                            res.render('blogs', {
                                blogs: blogs,
                                current: page,
                                pages: Math.ceil(count / perPage)
                            })
                        } else {
                            res.render('index', {
                                blogs: blogs,
                                current: page,
                                pages: Math.ceil(count / perPage)
                            })
                        }
                    }
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
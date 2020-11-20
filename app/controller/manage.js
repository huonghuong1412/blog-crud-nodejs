const Blog = require('../model/Blog')
const User = require('../model/User')
class Managecontroller {
    // get all
    getAll = (req, res, next) => {
        const perPage = 4;
        const page = req.params.page || 1;
        Blog
            .find({})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec((err, blogs) => {
                Blog.countDocuments().exec((err, count) => {
                    if (err) {
                        next();
                    } else {
                        if (req.session.User) {
                            res.render('admin/all', {
                                blogs: blogs,
                                current: page,
                                pages: Math.ceil(count / perPage)
                            })
                        } else {
                            res.redirect('/auth/login')
                        }
                    }
                })
            })
        // Blog.find({}, (err, blogs) => {
        //     if (req.session.User) {
        //         res.render('admin/all', {
        //             blogs: blogs
        //         })
        //     } else {
        //         res.redirect('/auth/login')
        //     }
        // })
    }

    // create page to add blog
    createPage = (req, res, next) => {
        if (req.session.User) {
            res.render('admin/create')
        } else {
            res.redirect('/auth/login')
        }
    }

    // store to post blog /post/store
    create = (req, res, next) => {
        var User = req.session.User;
        req.body.user = User;
        Blog.create(req.body, (err, blog) => {
            res.redirect('/')
        })
    }

    // get item edit -- /post/:id/edit
    getItemEidt = (req, res, next) => {
        Blog.findById(req.params.id, (err, blog) => {
            res.render('admin/update', {
                blog: blog
            })
        })
    }

    // update blog item -- /post/:id
    update = (req, res, next) => {
        var User = req.session.User;
        req.body.user = User;
        Blog.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/manage'))
            .catch(next)
    }

    // delete blog -- /post/:id

    delete = (req, res, next) => {
        Blog.deleteOne({
            _id: req.params.id
        })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // Search blog -- /post/search

    search = (req, res, next) => {
        let query = {
            $or: [
                {
                    title: {
                        $regex: req.query.title,
                        $options: 'i'
                    }
                }, {
                    slug: {
                        $regex: req.query.title,
                        $options: 'i'
                    }
                }, {
                    description: {
                        $regex: req.query.title,
                        $options: 'i'
                    }
                }
            ]
        }
        // let textSearch = req.query.slug;
        Blog.find(query, (err, blogs) => {
            res.render('admin/search', {
                blogs: blogs
            })
        })
    }
}

module.exports = new Managecontroller();
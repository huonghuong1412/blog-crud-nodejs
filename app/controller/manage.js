const Blog = require('../model/Blog')
class Managecontroller {
    // get all
    getAll = (req, res, next) => {
        const perPage = 4;
        const page = req.params.page || 1;
        const user = req.session.User;
        Blog
            .find({
                user: user
            })
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec((err, blogs) => {
                Blog.countDocuments({
                    user: user
                }).exec((err, count) => {
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
    }

    // create page to add blog
    createPage = (req, res, next) => {
        if (req.session.User && req.session.User.userId) {
            res.render('admin/create')
        } else {
            res.redirect('/auth/login')
        }
    }

    // store to post blog /post/store
    create = (req, res, next) => {
        var User = req.session.User;
        req.body.user = User;
        var formData = req.body;
        console.log(formData);

        Blog.create(req.body, (err, blog) => {
            res.redirect('/')
        })
    }

    // get item edit -- /post/:id/edit
    getItemEidt = (req, res, next) => {
        const user = req.session.User;
        let query = {
            $and: [
                {
                    user: user
                },
                {
                    _id: req.params.id
                }
            ]
        }
        Blog.findOne(query)
            .then((blog) => {
                res.render('admin/update', {
                    blog: blog
                })
            }).catch(() => {
                next();
                res.redirect('/')
            })
    }

    // update blog item -- /post/:id
    update = (req, res, next) => {
        var User = req.session.User;
        req.body.user = User;
        Blog.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/manage/1'))
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
        const user = req.session.User;
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
            ],
            $and: [
                {
                    user: user
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
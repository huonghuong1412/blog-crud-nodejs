const Blog = require('../model/Blog')

class Managecontroller {
    // get all
    getAll = (req, res, next) => {
        Blog.find({}, (err, blogs) => {
            res.render('admin/all', {
                blogs: blogs
            })
        })
    }

    // create page to add blog
    createPage = (req, res, next) => {
        res.render('admin/create')
    }

    // store to post blog /post/store
    create = (req, res, next) => {
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

}

module.exports = new Managecontroller();
const User = require('../model/User.js')

class UserController {
    login = (req, res, next) => {
        res.render('user/login')
    }

    // register page
    register = (req, res, next) => {
        res.render('user/register')
    }

    // store user register -- /user/register
    storeUser = (req, res, next) => {
        User.create(req.body, (err, user) => {
            res.redirect('/')
        })
    }
}

module.exports = new UserController();
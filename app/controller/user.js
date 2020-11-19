const User = require('../model/User.js')
const bcrypt = require('bcrypt')

class UserController {
    login = (req, res, next) => {
        res.render('user/login')
    }

    checkLogin = (req, res, next) => {
        const { username, password } = req.body;
        User.findOne({ username: username }, (err, user) => {
            if (user) {
                bcrypt.compare(password, user.password, (err, same) => {
                    if (same) {
                        req.session.User = {
                            userId: user._id,
                            username: user.username,
                            name: user.name
                        };
                        res.redirect('/');
                    } else {
                        res.redirect('/auth/login')
                    }
                })
            } else {
                res.redirect('/auth/login')
            }
        })
    }

    // Muon vao trang tao moi blog thi phai login truoc, neu khong se redirect ve trang chu
    authMiddleware = (req, res, next) => {
        User.findById(req.session.User.userId, (err, user) => {
            if (err || !user) {
                res.redirect('/');
            } else {
                next();
            }
        })
    }

    // luu giu session sau khi dang nhap
    // chi hien khi nguoi dung dang nhap xong, con voi khach thi khong hien thi
    userSession = (req, res, next) => {
        if (req.session.User) {
            res.redirect('/')
        } else {
            next();
        }
    }

    // register page
    register = (req, res, next) => {
        res.render('user/register')
    }

    // store user register -- /user/register
    storeUser = (req, res, next) => {
        const userDataRegister = req.body;
        const user = new User(userDataRegister);
        user.save()
            .then(() => res.redirect('/'))
            .catch(() => res.redirect('/auth/register'))
    }

    logout = (req, res) => {
        req.session.destroy(function () {
            delete req.session;
            res.redirect('/')
        });
    }
}

module.exports = new UserController();
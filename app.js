const express = require('express');
const expressSession = require('express-session');
const app = express();
const port = process.env.PORT || 3000;
const database = require('./config/database');
const BlogController = require('./app/controller/posts');
const AboutController = require('./app/controller/about');
const UserController = require('./app/controller/user');
const ManageController = require('./app/controller/manage');

database.connect();

app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.json());
app.use(expressSession({
    secret: 'keyboard cat'
}))

global.loggedIn = null;
app.use("*", (req, res, next) => {
    loggedIn = req.session.User;
    next()
});

app.set('view engine', 'ejs')
// client get all & detail blog action
app.get('/', BlogController.getAll);
app.get('/blog/:slug', BlogController.getDetail);

// blog page
app.get('/blogs/:page', BlogController.getAll)
app.get('/search', BlogController.searchBlog)


// manage admin action
// create 
app.get('/post/new', UserController.authMiddleware, ManageController.createPage);
app.post('/post/store', UserController.authMiddleware, ManageController.create);

// get page admin
app.get('/manage/:page', ManageController.getAll);

// update
app.get('/post/:id/edit', ManageController.getItemEidt);
app.post('/post/update/:id', ManageController.update);

// delete
app.post('/post/delete/:id', ManageController.delete);

// search blog
app.get('/post/search', ManageController.search);

// about page
app.get('/about', AboutController.about);

// user action
app.get('/auth/login', UserController.userSession, UserController.login);
app.post('/user/login', UserController.userSession, UserController.checkLogin);
app.get('/auth/register', UserController.userSession, UserController.register);
app.post('/user/register', UserController.userSession, UserController.storeUser);
app.get('/auth/logout', UserController.logout)


app.get('*', (req, res) => res.render('notfound'))
app.get('/blog/abc', (req, res) => res.render('notfound'))

app.listen(port, () => {
    console.log("Server listening in port = " + port);
});
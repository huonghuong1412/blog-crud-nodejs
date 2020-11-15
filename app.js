const express = require('express')
const ejs = require('ejs');
const app = express();
const port = 3000;
const database = require('./config/database')
const BlogController = require('./app/controller/posts')
const AboutController = require('./app/controller/about')
const UserController = require('./app/controller/user')
const ManageController = require('./app/controller/manage');

database.connect();

app.use(express.static('public'))
app.use(express.urlencoded())
app.use(express.json())

app.set('view engine', 'ejs')

// client get all & detail blog action
app.get('/', BlogController.getAll)
app.get('/blog/:slug', BlogController.getDetail)

// manage admin action
// create 
app.get('/post/new', ManageController.createPage)
app.post('/post/store', ManageController.create)

// get page admin
app.get('/manage', ManageController.getAll)

// update
app.get('/post/:id/edit', ManageController.getItemEidt)
app.post('/post/update/:id', ManageController.update)

// delete
app.post('/post/delete/:id', ManageController.delete)

// search blog
app.get('/post/search', ManageController.search)

// about page
app.get('/about', AboutController.about)

// user action
app.get('/auth/login', UserController.login)
app.get('/auth/register', UserController.register)
app.post('/user/register', UserController.storeUser)

app.get('*', (req, res, next) => {
    res.render('notfound')
})

app.listen(port, () => {
    console.log("Server listening in port = " + port);
})
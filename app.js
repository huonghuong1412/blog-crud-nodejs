const path = require('path')
const express = require('express')
const ejs = require('ejs')
const app = express();
const port = 3000;

app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/', (req, res, next) => {
    res.render('index')
})

app.get('/about', (req, res, next) => {
    res.render('about')
})
app.get('/contact', (req, res, next) => {
    res.render('contact')
})
app.get('/login', (req, res, next) => {
    res.render('login')
})
app.get('/register', (req, res, next) => {
    res.render('register')
})

app.listen(port, () => {
    console.log("Server listening in port = " + port);
})
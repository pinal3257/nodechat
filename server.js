const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/nodekb');

let db = mongoose.connections;

// Init App
const app = express();

let Article = require('./models/articles');

//load view engine
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    Article.find({}, function(err, articles){
        if(err)
        {
            console.log(err);
        }
        else
        {
        res.render('index',{
            title:'text from sever',
            articles:articles
        });
        }
    });
})

app.get('/articals/add', function (req, res) {
    res.render('add_artical',{
        title:'Articals'
    });
})


// Add submit post rout
app.post('/articals/add', function (req, res) {
    let article = new Article();

    article.title = req.body.title;
    console.log(req.body.auther);
    article.author = req.body.author;
    article.body = req.body.body;

    article.save(function(err){
        if(err)
        {             
            console.log(err);
            return;
        }
        else
        {
            res.redirect('/');
        }
    });
})


//run the server
app.listen(3001, function () {
    console.log("Server started on 3001");
})
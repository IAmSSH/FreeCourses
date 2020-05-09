const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cheerio = require('cheerio'),
    site = require('./site'),
    axios = require('axios');

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(__dirname, express.static('public'))

// Globals
let title,
    description,
    learning,
    image,
    expandMessage,
    content;


app.get('/', (req, res) => {
    res.redirect('/search');
});

app.get('/search', (req, res) => {
    res.render('search')
});

app.post('/submit', (req, res) => {

    axios.get('https://www.udemy.com/course/practical-leadership/')
        .then(function (response) {
            // handle success
            const $ = cheerio.load(response.data);
            title = $('h1.clp-lead__title').html();
            learning = $('.what-you-get__items')
                        .find('.what-you-get__text')
                        .contents().toArray()
            description = $('div.clp-component-render div.description div.js-simple-collapse-inner').html();
            image = $('.introduction-asset img').attr('src')
            content = $('.curriculum-wrapper')
                        .find('.section-title-text')
                        .contents()
                        .toArray()
            expandMessage = $('.section-container--more-sections').find('span').html()
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
            res.render("result", 
                {
                    expandMessage:expandMessage,
                    description: description, 
                    learning:learning, 
                    content: content, 
                    title:title,
                    image: image
                })
        });
});

app.listen(8080, () => console.log("Started..."));
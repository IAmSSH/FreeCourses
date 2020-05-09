const app = require('express')(),
    bodyParser = require('body-parser'),
    cheerio = require('cheerio'),
    site = require('./site'),
    osmosis = require('osmosis')
    ;

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Globals
let title,
    description,
    learning,
    image,
    content;


app.get('/', (req, res) => {
    res.redirect('/search');
});

app.get('/search', (req, res) => {
    res.render('search')
});

app.post('/submit', (req, res) => {
    // Perform scraping

    const $ = cheerio.load(site);
    title = $('h1.clp-lead__title').html();
    learning = $('.what-you-get__items')
                .find('.what-you-get__text')
                .contents().toArray()
    description = $('div.clp-component-render div.description div.js-simple-collapse-inner').html()
    // console.log(
    //     $('.ud-component--clp--curriculum').text()
    // );


    // function fun() {
    //     return new Promise((resolve, reject) => {
    //         let result;

    //         osmosis.get('http://localhost:8080/samplePage2')
    //             .set({title:'h1'})
    //             .data(res=>{result = res})
    //             .error(err => reject(err))
    //             .done(() => resolve(result))
    //     })
    // }

    // fun().then(console.log).catch(console.log);


    // axios.get('https://www.udemy.com/course/complete-python-bootcamp/')
    //     .then(function (response) {
    //         // handle success
    //         
    //         
    //     })
    //     .catch(function (error) {
    //         // handle error
    //         console.log(error);
    //     })
    //     .then(function () {
    //         // always executed
    //     });

    // render new page with scraped details
    res.render("result", {learning:learning, title:title})
    // res.send("results")
});

app.get('/samplePage', (req, res) => {
    res.render('samplePage');
})

app.get('/samplePage2', (req, res) => {
    res.render('samplePage2');
})

app.get('/cloneSite', (req, res) => {
    res.render('cloneSite');
})

app.listen(8080, () => console.log("Started..."));
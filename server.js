require("dotenv").config()  // Load env variables
const express = require('express') // bring in express to make our app
const morgan = require('morgan') // nice logger for our request
const methodOverride = require('method-override') // allows us to override post request from our ejs/forms
const PORT = process.env.PORT

const app = express()
const Pokemon = require('./models/pokemon');

//////////////////////////////////////////////
//////// Middlewares
///////////////////////////////////////////////

app.use(morgan('tiny'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}))

// Static Files
app.use(express.static('public'))

// Set Views
app.set('views', './views');
app.set('view engine', 'ejs');


//////////////////////////////////////////////
//////// Routes
///////////////////////////////////////////////

//Index
app.get('/', (req, res) => {
    res.render('index.ejs', { Pokemon })
})

// SHOW
app.get('/:id', (req, res) => {
    res.render('show.ejs', { Pokemon: Pokemon[req.params.id] });
    });

app.listen(PORT, ()=> console.log(`Who let the dogs out on port: ${PORT}`))
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
app.use(express.static('public'))

//Index
app.get('/', (req, res) => {
    res.render('index.ejs', { Pokemon })
})


app.listen(PORT, ()=> console.log(`Who let the dogs out on port: ${PORT}`))
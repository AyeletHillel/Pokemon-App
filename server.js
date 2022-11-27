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

//INDEX
app.get('/', (req, res) => {
    res.render('index.ejs', { Pokemon })
})

// NEW 
app.get('/new', (req, res) => {
    console.log(req.body)
    res.render('new.ejs')
})

//DESTROY route
app.delete("/:id",(req,res) =>{
    Pokemon.splice(req.params.id, 1)
    res.redirect("/")
})

//UPDATE route
app.put("/:id",(req,res) =>{
    console.log(req.body)
    const id = req.params.id
    Pokemon.findByIdAndUpdate(id, req.body, {new: true}, (err, fruit) => {
        // redirect user back to main page when fruit 
        res.redirect("/")
    })
})

// CREATE
app.post('/', (req, res,) => {
    Pokemon.push(req.body)
    res.redirect("/")

})

// EDIT 
app.get('/:id/edit', (req, res) => {
        res.render('edit.ejs', { 
            Pokemon: Pokemon[req.params.id],
            index: req.params.id
         })
})

// SHOW
app.get('/:id', (req, res) => {
    res.render('show.ejs', { 
        Pokemon: Pokemon[req.params.id],
        index: req.params.id
     });
    });


// LISTEN
app.listen(PORT, ()=> console.log(`Who let the dogs out on port: ${PORT}`))
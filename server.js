//Where you require things. Requirements are first 
//the below require has to be the 1st thing. This allows us to use process.env
require("dotenv").config();//this has to be first!!!!
const express = require('express');
const app = express();
//const fruits = require('./models/fruits');
const Fruit = require('./models/fruits')//you know it's a model if it's an uppercase
const mongoose = require('mongoose');//so we can use mongoose models and scheemas

app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

//connection to the database
mongoose.connect(process.env.MONGO_URI, {//process.env is what we're going to get for the environment variables
    useNewUrlParser: true, //get rid of deprecation
    useUnifiedTopology: true,
  });
  mongoose.connection.once("open", () => {
    console.log("connected to mongo");
  });

//Middleware
app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});
app.use(express.urlencoded({extended:false}));//need it for post request or git request
//https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded


//Defining the routes
//Induces
//Index, New, Delete, Update, Create, Edit, Show


//Index
//view all of the fruits
app.get("/fruits", (req, res) => {
    Fruit.find({}, (error, allFruits) => {//find method that finds all of the objects, can pass errors and all fruits
      res.render("Index", {//rendering index route
        fruits: allFruits,//render all of the fruits
      });
    });
  });

//New
app.get('/fruits/new', (req,res) => {//when you create a new fruit
    res.render('New');//render the new page inside of the views which is a form
});

//Delete


//Update


//Create
app.post('/fruits/', (req, res)=>{
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;//do some data correction
    }
    Fruit.create(req.body, (error, createdFruit)=>{
        res.redirect('/fruits');
    });
});

//Edit


//SHow
//this shows one fruit - more specific
app.get('/fruits/:id', (req, res) => {//:id=params
    Fruit.findById(req.params.id, (err, foundFruit) => {
    res.render('Show', { //second param must be an object
        fruit: foundFruit//service back the fruit we just found
    });
    });
});

app.listen(3000,() => {
    console.log('listening');
});
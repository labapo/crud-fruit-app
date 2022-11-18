const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema({//S in Schema is uppercase
    name:  { 
        type: String, 
        required: true },
    color:  { 
        type: String, 
        required: true 
    },
    readyToEat: Boolean
});

const Fruit = mongoose.model('Fruit', fruitSchema);

module.exports = Fruit;
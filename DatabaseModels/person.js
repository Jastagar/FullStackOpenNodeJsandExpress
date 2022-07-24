const mongoose = require('mongoose')

const person = new mongoose.Schema({
    "name": String,
    "number": String,
    "id": Number
})
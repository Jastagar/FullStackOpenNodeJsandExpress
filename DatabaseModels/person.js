const mongoose = require('mongoose')

const person = new mongoose.Schema({
    "name": String,
    "number": String
})

person.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Persons", person)
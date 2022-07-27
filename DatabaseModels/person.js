const mongoose = require('mongoose')

const person = new mongoose.Schema({
    "name": {
        type:String,
        minLength:3,
        required:true
    },
    "number": {
        type:String,
        validate: {
            validator: function(v) {
              return /\d{2,3}-\d{10}/.test(v);
            },
            message: () => `This is not a valid phone number!`
          },
        required:true}
})

person.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Persons", person)
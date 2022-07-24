require('dotenv').config()

const express = require('express')
const app = express()
const cors = require("cors")
const morgan = require('morgan')
const mongoose = require('mongoose')
const Person = require("./DatabaseModels/person")


function errorHandling(error, req, res, next) {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}


mongoose.connect(process.env.DATABASE_URL)
    .then((result) => {
        console.log("Connected to mongoose")
    })
    .catch((err) => {
        console.log("Couldn't Connect to mongo Database because of :", err)
    })

app.use(express.json());
app.use(cors())
app.use(morgan('tiny'))
app.use(express.static("build"))
app.use(errorHandling)


app.get("/api/persons", (req, res, next) => {
    Person.find({}).then((result) => {
        res.json(result)
    }).catch((err) => next(err))
})
app.get("/info", (req, res, next) => {
    const timeStamp = new Date().toString()
    Person.find({}).then((result) => {
        console.log(result)
        res.send(`
            <h3>You have info of ${result.length} persons in your phoneBook</h3>
            <h3>${timeStamp}</h3>
        `)
    }).catch((err) => next(err))
})
app.get("/api/persons/:id", (req, res, next) => {
    const id = req.params.id;
    Person.findById(id).then((foundPerson) => {
        if (foundPerson) {
            res.send(foundPerson)
        } else {
            res.status(404).end()
        }
    }).catch((err) => next(err))
})

app.delete("/api/persons/:id", (req, res, next) => {
    const id = req.params.id;
    Person.findByIdAndDelete(id).then((something) => {
        if (something) {
            res.send("deleted")
        } else {
            res.send("Not Found, maybe Deleted already")
        }
    }).catch((err) => next(err))

})
app.post("/api/persons/:name/:number", (req, res, next) => {
    const name = req.params.name
    const number = req.params.number
    Person.find({ name: name }, { number: number })
        .then((foundPerson) => {
            if (foundPerson.length) {
                console.log(foundPerson)
                res.send("Sorry this name or number already exists at id: ",
                    foundPerson.id)
            } else {
                const newContact = new Person({
                    name: name,
                    number: number
                })
                newContact.save()
                res.send("User Added")
            }
        }).catch((err) => next(err))
})
app.put("/api/persons/:id",(req,res)=>{
    Person.findByIdAndUpdate(req.body.id,req.body,{new:true})
    res.send("Recieved")
})


app.listen(process.env.PORT, () => {
    console.log(process.env.PORT)
})





































// const http = require('http')

// let notes = [
//     {
//       id: 1,
//       content: "HTML is easy",
//       date: "2022-05-30T17:30:31.098Z",
//       important: true
//     },
//     {
//       id: 2,
//       content: "Browser can execute only Javascript",
//       date: "2022-05-30T18:39:34.091Z",
//       important: false
//     },
//     {
//       id: 3,
//       content: "GET and POST are the most important methods of HTTP protocol",
//       date: "2022-05-30T19:20:14.298Z",
//       important: true
//     }
//   ]

// const app = http.createServer((req,res)=>{
//     res.writeHead(200,{"content-Type":"application/json"})
//     res.end(JSON.stringify(notes))
// })

// const PORT = 3001
// app.listen(PORT)
// console.log("Server running on port",PORT)
require('dotenv').config()

const express = require('express')
const app = express()
const cors = require("cors")
const mongoose = require('mongoose')
const Person = require("./DatabaseModels/person")


function errorHandling(error, req, res, next) {
    console.error("THis the the error handling midleware")
    console.error(error.message)
    console.error(error.name)
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    }else if (error.name === 'ValidationError') {
        console.log("This was also triggered")
        return res.status(400).json({ error: error.message })
    }
    next(error)
}


app.use(express.json());
app.use(cors())
// app.use(morgan('tiny'))
app.use(express.static("build"))


mongoose.connect(process.env.DATABASE_URL)
    .then((result) => {
        console.log("Connected to mongoose")
    })
    .catch((err) => {
        console.log("Couldn't Connect to mongo Database because of :", err)
    })




// Request handling.
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

app.post("/api/persons", (req, res, next) => {
    const name = req.body.name
    const number = req.body.number
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
                const errorV = newContact.save()
                next(errorV)
                
                res.send("User Added")
            }
        }).catch((err)=>{
            console.log("Outer Catch was also called")
        })
})

app.put("/api/persons/:id",(req,res,next)=>{
    console.log(req.body)
    Person.findByIdAndUpdate(req.body.id,req.body,{new:true,runValidators: true, context: 'query'}).then((result)=>{
        console.log(result)
    }).catch(err=>next(err))
    res.send("Recieved")
})


app.use(errorHandling)


app.listen(process.env.PORT, () => {
    console.log(process.env.PORT)
})


// Check the middleware, its not being called


































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
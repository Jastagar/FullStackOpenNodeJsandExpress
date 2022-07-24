require('dotenv').config()
const express = require('express')
const app = express()
const cors = require("cors")
const morgan = require('morgan')



app.use(cors())
app.use(morgan('tiny'))
app.use(express.static("build"))

let persons = [{
        "name": "Hitkar",
        "number": "6283989756",
        "id": 726858957976
    },
    {
        "name": "Sukhman",
        "number": "7889219091",
        "id": 850184216583
    },
    {
        "name": "Ishaan",
        "number": "7015715846",
        "id": 924852655998
    },
    {
        "name": "Jaskaran",
        "number": "9882121590",
        "id": 299852807889
    },
    {
        "name": "Shaminder Singh Brar",
        "number": "9876100414",
        "id": 150364105213
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get("/api/persons", (req, res) => {
    res.json(persons)
})
app.get("/info", (req, res) => {
    const len = persons.length
    const timeStamp = new Date().toString()
    res.send(`
    <h3>Phonebook has info for ${len} persons<h3>
    <h3>${timeStamp}</h3>
  `)
})
app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id;
    const parsedId = parseInt(id)
    const person = persons.find((e) => {
        return e.id === parsedId

    })
    person ? res.send(person) : res.status(404).send("No one by this Id")
})

app.delete("/api/persons/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const personToDelete = persons.find((e) => {
        return e.id === id
    })
    if (personToDelete) {
        const newPersons = persons.filter((e) => {
            return e.id !== id
        })
        persons = newPersons
        res.status(200).send("Person record with id " + id + " has been removed", persons)
    } else {
        res.status(404).send("This Record does not exist in the PhoneBook data")
    }

})
app.post("/api/persons/:name/:number", (req, res) => {
    const name = req.params.name
    const number = req.params.number
    const alreadyNumber = persons.find((e) => {
        return e.number === number
    })
    const alreadyName = persons.find((e) => {
        return e.name === name
    })
    console.log(name)
    console.log(number)
    console.log(alreadyName)
    console.log(alreadyNumber)
    if (alreadyName) {
        res.status(500).send({ error: 'name must be unique' })
    } else if (alreadyNumber) {
        res.status(500).send({ error: 'number must be unique' })
    } else {
        const newId = parseInt(Math.random() * 100000000)
        const newPerson = {
            "id": newId,
            "name": name,
            "number": number
        }
        console.log(newPerson)
        persons.push(newPerson)
        console.log(persons)
        res.status(200).send(`Added new number ${number} with name ${name}`)
    }
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
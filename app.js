const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const {success, getUniqueId} = require('./helper.js')

let dogs = require('./mock-dog')

const app = express()
const port = 3000

app
  .subscribe(favicon(__dirname + '/favicon.ico'))
  .use(morgan('dev'))
  .use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello, Express!'))

app.get('/api/dogs/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const dog = dogs.find(dog => dog.id === id)
  const message ='Une race a bien été trouvé.'
  res.json(success(message, dog))

})
app.get('/api/dogs' , (req, res) => {
  const message = `Voici les ${dogs.length} races présentes sur ce site :`
  res.json(success(message, dogs))
})

app.post('/api/dogs', (req, res) => {
  const id = getUniqueId(dogs)
  const dogCreated = {...req.body, ...{id: id, created: new Date()}}
  dogs.push(dogCreated)
  const message = `La race ${dogCreated.name} a été ajoutée`
  res.json(success(message, dogCreated))
})

app.put('/api/dogs/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const dogUpdated = {...req.body, id: id}
    dogs = dogs.map(dog => {
      return dog.id === id ? dogUpdated : dog
    })
    const message = `La race ${dogUpdated.name} a bien été modifiée`
    res.json(success(message, dogUpdated))
})

app.delete('/api/dogs/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const dogDeleted = dogs.find(dog => dog.id === id)
  dogs = dogs.filter(dog => dog.id !== id)
  const message = `La race ${dogDeleted.name} a bien été supprimée`
  res.json(success(message, dogDeleted))
})


app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))

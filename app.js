const express = require('express')
const {success} = require('./helper.js')
let dogs = require('./mock-dog');

const app = express()
const port = 3000

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

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))

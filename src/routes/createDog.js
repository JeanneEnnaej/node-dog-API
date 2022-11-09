const { Dog } = require('../db/sequelize')

module.exports = (app) => {
  app.post('/api/dogs', (req, res) => {
    Dog.create(req.body)
      .then(dog => {
        const message = `La race ${req.body.name} a bien été crée.`
        res.json({ message, data: dog })
      })
      .catch(error => {
        const message = `La race n'a pas pu être créée. Réessayez dans quelques instants.`
        res.status(500).json({message, data: error})
      })
  })
}

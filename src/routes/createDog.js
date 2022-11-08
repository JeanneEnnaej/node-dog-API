const { Dog } = require('../db/sequelize')

module.exports = (app) => {
  app.post('/api/dogs', (req, res) => {
    Dog.create(req.body)
      .then(dog => {
        const message = `La race ${req.body.name} a bien été crée.`
        res.json({ message, data: dog })
      })
  })
}

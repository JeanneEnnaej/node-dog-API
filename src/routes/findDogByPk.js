const { Dog } = require('../db/sequelize')

module.exports = (app) => {
  app.get('/api/dogs/:id', (req, res) => {
    Dog.findByPk(req.params.id)
      .then(dog => {
        const message = 'Une race a bien été trouvé.'
        res.json({ message, data: dog })
      })
  })
}

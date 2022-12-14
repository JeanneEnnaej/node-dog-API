const { Dog } = require('../db/sequelize')

module.exports = (app) => {
  app.get('/api/dogs', (req, res) => {
    Dog.findAll()
      .then(dogs => {
        const message = 'La liste des races a bien été récupérée.'
        res.json({ message, data: dogs })
      })
      .catch(error => {
        const message = `La liste des races n'a pas pu être récupérée. Réessayez dans quelques instants.`
        res.status(500).json({message, data: error})
      })
  })
}

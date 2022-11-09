const { Dog } = require('../db/sequelize')

module.exports = (app) => {
  app.get('/api/dogs/:id', (req, res) => {
    Dog.findByPk(req.params.id)
      .then(dog => {
        if (dog === null) {
          const message = `La race demandée n'existe pas. Essayez un autre identifiant`;
          return res.status(404).json({message})
        }
        const message = 'Une race a bien été trouvé.'
        res.json({ message, data: dog })
      })
      .catch(error => {
        const message = `La race n'a pas pu être récupérée. Réessayez dans quelques instants.`
        res.status(500).json({message, data: error})
      })
  })
}

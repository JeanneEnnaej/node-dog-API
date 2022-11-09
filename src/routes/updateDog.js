const { Dog } = require('../db/sequelize')

module.exports = (app) => {
  app.put('/api/dogs/:id', (req, res) => {
    const id = req.params.id
    Dog.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Dog.findByPk(id).then(dog => {
        if (dog === null) {
          const message = `La race demandée n'existe pas. Essayez un autre identifiant`;
          return res.status(404).json({message})
        }
        const message = `La race ${dog.name} a bien été modifiée.`
        res.json({message, data: dog })
      })
    })
    .catch(error => {
      const message = `La race n'a pas pu être modifiée. Réessayez dans quelques instants.`
      res.status(500).json({message, data: error})
    })
  })
}

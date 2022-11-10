const { Dog } = require('../db/sequelize')

module.exports = (app) => {
  app.delete('/api/dogs/:id', (req, res) => {
    Dog.findByPk(req.params.id).then(dog => {
      if (dog === null) {
        const message = `La race demandée n'existe pas. Essayez un autre identifiant.`;
        return res.status(404).json({message})
      }
      const dogDeleted = dog;
      return Dog.destroy({
        where: { id: dog.id }
      })
      .then(_ => {
        const message = `La race avec l'identifiant n°${dogDeleted.id} a bien été supprimée.`
        res.json({message, data: dogDeleted })
      })
    })
    .catch(error => {
      const message = `La race n'a pas pu être modifiée. Réessayez dans quelques instants.`
      res.status(500).json({message, data: error})
    })
  })
}

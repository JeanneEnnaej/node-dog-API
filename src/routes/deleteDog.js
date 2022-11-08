const { Dog } = require('../db/sequelize')

module.exports = (app) => {
  app.delete('/api/dogs/:id', (req, res) => {
    Dog.findByPk(req.params.id).then(dog => {
      const dogDeleted = dog;
      Dog.destroy({
        where: { id: dog.id }
      })
      .then(_ => {
        const message = `La race avec l'identifiant n°${dogDeleted.id} a bien été supprimée.`
        res.json({message, data: dogDeleted })
      })
    })
  })
}

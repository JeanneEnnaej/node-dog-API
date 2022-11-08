const { Dog } = require('../db/sequelize')

module.exports = (app) => {
  app.put('/api/dogs/:id', (req, res) => {
    const id = req.params.id
    Dog.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      Dog.findByPk(id).then(dog => {
        const message = `La race ${dog.name} a bien été modifiée.`
        res.json({message, data: dog })
      })
    })
  })
}

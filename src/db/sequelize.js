const { Sequelize, DataTypes } = require('sequelize')
const DogModel = require('../models/dog')
const dogs = require('./mock-dog')

const sequelize = new Sequelize('doglibrary', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})

const dog = dogModel(sequelize, DataTypes)

const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {
    dogs.map(dog => {
      dog.create({
        name: dog.name,
        hp: dog.hp,
        cp: dog.cp,
        picture: dog.picture,
        types: dog.types.join()
      }).then(dog => console.log(dog.toJSON()))
    })
    console.log('La base de donnée a bien été initialisée !')
  })
}

module.exports = {
  initDb, Dog
}

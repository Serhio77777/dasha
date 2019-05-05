const mysql = require('mysql')
const connection = require('../datastore/db')
const { encrypt, decrypt } = require('../middleware/hash')
const dateFns = require('date-fns')

const getAll = id => {
  return new Promise((resolve, reject) => {
    connection.query(
      id > -1 ? `SELECT * FROM Trip WHERE userId = ?` : `SELECT * FROM Trip`,
      id > -1 ? [id] : [],
      (error, results, fields) => {
        if (error) {
          throw error
        }
        console.log(results)
        resolve(results)
      })
  })
}

const getOne = id => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM Trip WHERE id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          throw error
        }
        resolve(results[0])
      })
  })
}

const create = (body) => {
  body.places = JSON.stringify(body.places)
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO Trip SET ?`,
      [body],
      (error, results, fields) => {
        if (error) {
          throw error
        }
        console.log(results)
        resolve(results)
      })
  })
}

const remove = id => {
    return new Promise((resolve, reject) => {
        connection.query(
            `DELETE FROM Trip WHERE id = ?`, 
            [Number(id)], 
            (error, results, fields) => {
                if (error) {
                    throw error
                }
                resolve(results)
        })
    })
}

const addPlaces = async (body, id) => {
  let trip = await getOne(id)
  let places = JSON.parse(trip.places)
  places = places.concat(body.places)
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE Trip SET ` +
            'places = ? ' +
            'WHERE id = ? ',
      [
        JSON.stringify(places),
        id
      ],
      (error, results, fields) => {
        if (error) {
          throw error
        }
        console.log(results)
        resolve(results)
      })
  })
}

const update = (body, id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE Trip SET ` +
            'name = ?, ' +
            'description = ? ' +
            'WHERE id = ? ',
      [
        body.name,
        body.description,
        id
      ],
      (error, results, fields) => {
        if (error) {
          throw error
        }
        console.log(results)
        resolve(results)
      })
  })
}

module.exports.getAll = getAll
module.exports.getOne = getOne
module.exports.addPlaces = addPlaces
module.exports.create = create
module.exports.update = update
module.exports.delete = remove

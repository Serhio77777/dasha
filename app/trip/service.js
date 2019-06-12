const mysql = require('mysql')
const connection = require('../datastore/db')
const { encrypt, decrypt } = require('../middleware/hash')
const dateFns = require('date-fns')
const HttpError = require('../middleware/error')

const getAll = (id, searchText, next) => {
  return new Promise((resolve, reject) => {
    connection.query(
      id > -1 ? `SELECT * FROM Trip WHERE cityId = ?` : `SELECT * FROM Trip`,
      [id],
      (error, results, fields) => {
        if (error) {
          throw error
        }
        Promise.all(results.map(async element => {
          if (JSON.parse(element.places).length) {
            element.places = JSON.parse(element.places).filter((v, i, a) => a.indexOf(v) === i)
            return Promise.all(element.places.map(async place => (await getOnePlace(place))))
          } else {
            return []
          }
        }))
          .then(data => {
            results = results.map((element, index) => {
              element.places = data[index]
              return element
            })
            if (searchText) {
              results = results.filter(element => element.name.match(searchText))
            }
            resolve(results)
          })
          .catch(next)
      })
  })
}

const getImageById = id => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM Image WHERE id = ?`, 
      [id],
      (error, results, fields) => {
        if (error) {
          reject(error)
        }
        if (results[0]) {
          resolve(results[0].image)
        } else {
          resolve()
        }
    })
  })
}

const getOnePlace = id => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM Place WHERE id = ?`,
      [id],
     async (error, results, fields) => {
        if (error) {
          reject(error)
        }
        if (results.length === 0) {
            return resolve()
        }
        if (JSON.parse(results[0].images).length) {
          results[0].images = await Promise.all(JSON.parse(results[0].images).map(async element => {
            if (element) {
              return getImageById(element)
            } else {
              return element
            }
          }))
        } else {
          results[0].images = []
        }
        if (JSON.parse(results[0].rate).length === 0) {
          results[0].rate = 0
        } else if (JSON.parse(results[0].rate).length === 1) {
          results[0].rate = JSON.parse(results[0].rate)[0]
        } else {
          results[0].rate = JSON.parse(results[0].rate).reduce((accumulator, currentValue) => accumulator + currentValue) / JSON.parse(results[0].rate).length
        }
        results[0].coords = JSON.parse(results[0].coords)
        resolve(results[0])
      })
  })
}

const getOne = id => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM Trip WHERE id = ?`,
      [id],
      async (error, results, fields) => {
        if (error) {
          reject(error)
        }
        if (results.length === 0) {
          return reject(new HttpError('Trip not found.'))
        }
        if (JSON.parse(results[0].places).length) {
          results[0].places = await Promise.all(JSON.parse(results[0].places)
            .filter((v, i, a) => a.indexOf(v) === i)
            .map(async element => {
              if (element) {
                return getOnePlace(element)
              } else {
                return element
              }
            }))
        } else {
          results[0].places = []
        }
        resolve(results[0])
      })
  })
}

const create = (body) => {
  body.places = body.places && body.places.length ? JSON.stringify(body.places) : JSON.stringify([])
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO Trip SET ?`,
      [body],
      async (error, results, fields) => {
        if (error) {
          reject(error)
        } else {
          resolve(await getOne(results.insertId))
        }
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
          reject(error)
        }
        resolve({message: 'Trip is deleted successfully.'})
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
          reject(error)
        }
        resolve({message: 'Place is set successfully'})
      })
  })
}

const update = (body, id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE Trip SET ` +
        'name = ?, ' +
        'description = ?, ' +
        'userId = ? ' +
        'WHERE id = ? ',
      [
        body.name,
        body.description,
        body.userId ? body.userId : null,
        id
      ],
      async (error, results, fields) => {
        if (error) {
          reject(error)
        }
        resolve(await getOne(id))
      })
  })
}

module.exports.getAll = getAll
module.exports.getOne = getOne
module.exports.addPlaces = addPlaces
module.exports.create = create
module.exports.update = update
module.exports.delete = remove

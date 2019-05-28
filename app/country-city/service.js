const mysql = require('mysql')
const connection = require('../datastore/db')
const { encrypt, decrypt } = require('../middleware/hash')
const dateFns = require('date-fns')
const HttpError = require('../middleware/error')

const getAll = (db, id, searchText, next) => {
  let request = []
  return new Promise((resolve, reject) => {
    connection.query(
      db === 'City' && !!id ? `SELECT * FROM ${db} WHERE countryId = ?` : `SELECT * FROM ${db}`,
      db === 'City' && !!id ? [id] : [],
      (error, results, fields) => {
        if (error) {
          reject(error)
        }
        if (db === 'City') {
          Promise.all(results.map(async element => (await getOne(element.countryId, 'Country')).name))
            .then(data => {
              results = results.map((element, index) => {
                element.countryId = data[index]
                return element
              })
              if (searchText) {
                results = results.filter(element => element.name.match(searchText))
              }
              resolve(results)
            })
            .catch(next)
        } else {
          if (searchText) {
            results = results.filter(element => element.name.match(searchText))
          }
          resolve(results)
        }
      })
  })
}

const getOne = (id, db) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${db} WHERE id = ?`,
      [id],
      async (error, results, fields) => {
        if (error) {
          reject(error)
        }
        if (results.length === 0) {
            return reject(new HttpError(`${db} not found.`))
        }
        if (db === 'City') {
          results[0].countryId = (await getOne(results[0].countryId, 'Country')).name
        }
        resolve(results[0])
      })
  })
}

const create = (body, db) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO ${db} SET ?`,
      [body],
      async (error, results, fields) => {
        if (error) {
          reject(error)
        }
        resolve(await getOne(results.insertId, db))
      })
  })
}

const remove = (id, db) => {
  return new Promise(async (resolve, reject) => {
    connection.query(
      `DELETE FROM ${db} WHERE id = ?`, 
      [id], 
      (error, results, fields) => {
        if (error) {
          reject(error)
        } 
        resolve({message: `${db} is deleted successfully.`})
    })
  })
}

const update = (body, id, db) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${db} SET ` +
          'name = ? ' +
          'WHERE id = ? ',
      [
        body.name,
        id
      ],
      async (error, results, fields) => {
        if (error) {
            reject(error)
        }
        resolve(await getOne(id, db))
      })
  })
}

module.exports.getAll = getAll
module.exports.getOne = getOne
module.exports.create = create
module.exports.update = update
module.exports.delete = remove

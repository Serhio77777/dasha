const mysql = require('mysql')
const connection = require('../datastore/db')
const { encrypt, decrypt } = require('../middleware/hash')
const dateFns = require('date-fns')

const getAll = (db, id) => {
  let request = []
  return new Promise((resolve, reject) => {
    connection.query(
      db === 'City' && !!id ? `SELECT * FROM ${db} WHERE countryId = ?` : `SELECT * FROM ${db}`,
      db === 'City' && !!id ? [id] : [],
      (error, results, fields) => {
        if (error) {
          throw error
        }
        console.log(results)
        resolve(results)
      })
  })
}

const getOne = (id, db) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${db} WHERE id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          throw error
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
      (error, results, fields) => {
        if (error) {
          throw error
        }
        console.log(results)
        resolve(results)
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
                    throw error
                }
                resolve(results)
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
module.exports.create = create
module.exports.update = update
module.exports.delete = remove

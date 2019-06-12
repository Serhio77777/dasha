const mysql = require('mysql')
const connection = require('../datastore/db')
const { encrypt, decrypt } = require('../middleware/hash')
const dateFns = require('date-fns')
const HttpError = require('../middleware/error')

const getAll = id => {
  return new Promise((resolve, reject) => {
    connection.query(
      id ? `SELECT * FROM Tip WHERE cityId = ?` : `SELECT * FROM Tip`,
      [id],
      (error, results, fields) => {
        if (error) {
          throw error
        }
        resolve(results.map(result => {
          result.tips = JSON.parse(result.tips)
          return result
        }))
      })
  })
}

const getOne = id => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM Tip WHERE id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          reject(error)
        }
        if (results.length === 0) {
          return reject(new HttpError(`Tip not found.`))
        }
        results[0].tips = JSON.parse(results[0].tips)
        resolve(results[0])
      })
  })
}

const create = (body) => {
  body.tips = JSON.stringify(body.tips)
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO Tip SET ?`,
      [body],
      async (error, results, fields) => {
        if (error) {
          reject(error)
        }
        resolve(await getOne(results.insertId))
      })
  })
}

const remove = id => {
  return new Promise((resolve, reject) => {
    connection.query(
      `DELETE FROM Tip WHERE id = ?`, 
      [Number(id)], 
      (error, results, fields) => {
        if (error) {
            reject(error)
        }
        resolve({message: 'Tip is deleted successfully.'})
    })
  })
}

const update = (body, id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE Tip SET ` +
        'cityId = ?, ' +
        'tips = ? ' +
        'WHERE id = ? ',
      [
        body.cityId,
        JSON.stringify(body.tips),
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
module.exports.create = create
module.exports.update = update
module.exports.delete = remove

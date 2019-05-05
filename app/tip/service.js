const mysql = require('mysql')
const connection = require('../datastore/db')
const { encrypt, decrypt } = require('../middleware/hash')
const dateFns = require('date-fns')

const getAll = id => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM Tip WHERE cityId = ?`,
      [id],
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
      `SELECT * FROM Tip WHERE id = ?`,
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
  body.tips = JSON.stringify(body.tips)
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO Tip SET ?`,
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
            `DELETE FROM Tip WHERE id = ?`, 
            [Number(id)], 
            (error, results, fields) => {
                if (error) {
                    throw error
                }
                resolve(results)
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

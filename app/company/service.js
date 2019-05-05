const mysql = require('mysql')
const connection = require('../datastore/db')
const { encrypt, decrypt } = require('../middleware/hash')
const dateFns = require('date-fns')

const getAll = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM Company`,
      [],
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
      `SELECT * FROM Company WHERE id = ?`,
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
  body.image = ""
  body.discount = JSON.stringify(body.discount)
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO Company SET ?`,
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
            `DELETE FROM Company WHERE id = ?`, 
            [Number(id)], 
            (error, results, fields) => {
                if (error) {
                    throw error
                }
                resolve(results)
        })
    })
}

const getImage = body => {
  return new Promise((resolve, reject) => {
    connection.query(
    `SELECT * FROM Image WHERE image = ?`,
    [body.image],
    (error, results, fields) => {
      if (error) {
        throw error
      }
      resolve(results[0].id)
    })
  })
}

const addImage = async (body, id) => {
  if (typeof (await connection.query(
    `SELECT * FROM Image WHERE image = ?`,
    [body.image],
    (error, results, fields) => {
      if (error || !results[0]) {
        throw error
      }
      return results[0].id
  })) !== 'number') {
    await connection.query(
      `INSERT INTO Image SET ?`,
      [{ image: body.image }],
      (error, results, fields) => {
        if (error) {
          throw error
        }
    })
  }
  let imageId = await getImage(body)
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE Company SET ` +
            'image = ? ' +
            'WHERE id = ? ',
      [
        imageId,
        id
      ],
      (error, results, fields) => {
        if (error) {
          throw error
        }
        resolve(results)
      })
  })
}

const update = (body, id) => {
  body.discount = JSON.stringify(body.discount)
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE Company SET ` +
          'name = ?, ' +
          'discount = ? ' +
          'WHERE id = ? ',
      [
        body.name,
        body.discount,
        id
      ],
      (error, results, fields) => {
        if (error) {
          throw error
        }
        resolve(results)
      })
  })
}

module.exports.getAll = getAll
module.exports.addImage = addImage
module.exports.getOne = getOne
module.exports.create = create
module.exports.update = update
module.exports.delete = remove

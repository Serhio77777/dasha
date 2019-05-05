const mysql = require('mysql')
const connection = require('../datastore/db')
const { encrypt, decrypt } = require('../middleware/hash')
const dateFns = require('date-fns')

const getAll = (id, propName) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM Discount WHERE ${propName} = ?`,
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
      `SELECT * FROM Discount WHERE id = ?`,
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
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO Discount SET ?`,
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
        `DELETE FROM Discount WHERE id = ?`, 
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

const addImage = async (id, body) => {
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
      `UPDATE Discount SET ` +
            `image = ? ` +
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
  console.log(1111, body)
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE Discount SET ` +
            'name = ?, ' +
            'description = ?, ' +
            'site = ?, ' +
            'companyId = ? ' +
            'WHERE id = ? ',
      [
        body.name,
        body.description,
        body.site,
        body.companyId,
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
module.exports.addImage = addImage
module.exports.create = create
module.exports.update = update
module.exports.delete = remove

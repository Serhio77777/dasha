const mysql = require('mysql')
const connection = require('../datastore/db')
const { encrypt, decrypt } = require('../middleware/hash')
const dateFns = require('date-fns')
const HttpError = require('../middleware/error')

const getAll = (next) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM Company`,
      [],
      (error, results, fields) => {
        if (error) {
            reject(error)
        }
        Promise.all(results.map(async element => element.image && !element.image.match('http') ? getImageById(element.image) : element.image))
          .then(data => {
            resolve(results.map((element, index) => {
              element.image = data[index]
              return element
            }))
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
        resolve(results[0].image)
    })
  })
}

const getOne = id => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM Company WHERE id = ?`,
      [id],
      async (error, results, fields) => {
        if (error) {
          reject(error)
        }
        if (results.length === 0) {
            return reject(new HttpError('Company not found.'))
        }
        if (results[0].image) {
          results[0].image = await getOneImage(results[0].image)
        }
        resolve(results[0])
      })
  })
}

const create = (body) => {
  body.image = ""
  body.discount = body.discount ? JSON.stringify(body.discount) : JSON.stringify([])
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO Company SET ?`,
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
      `DELETE FROM Company WHERE id = ?`, 
      [Number(id)], 
      (error, results, fields) => {
        if (error) {
            reject(error)
        }
        resolve({message: 'Company is deleted successfully.'})
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
        reject(error)
      }
      resolve(results[0].id)
    })
  })
}

const addImage = async (body, id, next) => {
  if (typeof (await connection.query(
    `SELECT * FROM Image WHERE image = ?`,
    [body.image],
    (error, results, fields) => {
      if (error) {
        next(error)
        // TODO: need a clever solution...
        return 0
      } else if (results.length === 0) {
        return results
      } else {
        return results[0].id
      }
  })) !== 'number') { // TODO: maybe something else could help
    await connection.query(
      `INSERT INTO Image SET ?`,
      [{ image: body.image }],
      (error, results, fields) => {
        if (error) {
          return next(error)
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
          reject(error)
        } else {
          resolve({message: 'Image is set successfully.'})
        }
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
      async (error, results, fields) => {
        if (error) {
            reject(error)
        }
        resolve(await getOne(id))
      })
  })
}

module.exports.getAll = getAll
module.exports.addImage = addImage
module.exports.getOne = getOne
module.exports.create = create
module.exports.update = update
module.exports.delete = remove

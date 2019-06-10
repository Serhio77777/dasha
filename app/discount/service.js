const mysql = require('mysql')
const connection = require('../datastore/db')
const { encrypt, decrypt } = require('../middleware/hash')
const dateFns = require('date-fns')
const HttpError = require('../middleware/error')

const getAll = (id, propName, searchText, next) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM Discount WHERE ${propName} = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
            reject(error)
        }
        Promise.all(results.map(async element => element.image ? getImageById(element.image) : element.image))
          .then(data => {
            results = results.map((element, index) => {
              element.image = data[index]
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
        resolve(results[0].image)
    })
  })
}


const getOne = id => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM Discount WHERE id = ?`,
      [id],
      async (error, results, fields) => {
        if (error) {
          reject(error)
        }
        if (results.length === 0) {
            return reject(new HttpError('Discount not found.'))
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
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO Discount SET ?`,
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
      `DELETE FROM Discount WHERE id = ?`, 
      [Number(id)], 
      (error, results, fields) => {
        if (error) {
            reject(error)
        }
        resolve({message: 'Discount is deleted successfully.'})
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

const addImage = async (id, body) => {
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
      `UPDATE Discount SET ` +
        `image = ? ` +
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
module.exports.addImage = addImage
module.exports.create = create
module.exports.update = update
module.exports.delete = remove

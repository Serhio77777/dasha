const mysql = require('mysql')
const connection = require('../datastore/db')
const { encrypt, decrypt } = require('../middleware/hash')
const HttpError = require('../middleware/error')

const getAllUsers = next => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM User`, 
      [], 
      (error, results, fields) => {
        if (error) {
          reject(error)
        }
        if (results && results.length) {
          Promise.all(results.map(async element => element.image ? getImageById(element.image) : element.image))
            .then(data => {
              resolve(results.map((element, index) => {
                element.image = data[index]
                return element
              }))
            })
            .catch(next)
        } else {
          resolve([])
        }
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

const deleteUser = id => {
  return new Promise((resolve, reject) => {
    connection.query(
      `DELETE FROM User WHERE Id = ?`, 
      [Number(id)], 
      (error, results, fields) => {
        if (error) {
            reject(error)
        }
        resolve({message: 'User is deleted successfully.'})
    })
  })
}

const getUserProfile = (body, id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      id ? `SELECT * FROM User WHERE id = ?` : `SELECT * FROM User WHERE userHash = ?`, 
      [id ? id : encrypt(`${body.email}${body.password}`)], 
      async (error, results, fields) => {
        if (error) {
            return reject(error)
        }
        if (results.length === 0) {
            return reject(new HttpError('Invalid email or password.'))
        }
        if (results[0].image) {
          results[0].image = await getImageById(results[0].image)
        }
        resolve(results[0])
    })
  })
}

const createUserProfile = (body) => {
  body.userHash = encrypt(`${body.email}${body.password}`)
  body.image = ''
  return new Promise((resolve, reject) => {
    if (getUserProfile(body).firstName) {
        reject(new Error('Exist'))
    } else {
        connection.query(
          `INSERT INTO User SET ?`, 
          [body], 
          async (error, results, fields) => {
            if (error) {
              reject(error)
            } else {
              resolve(await getUserProfile(body))
            }
      })
    }
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
      } else {
        resolve(results[0].id)
      }
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
      `UPDATE User SET ` +
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

const updateUserProfile = (body, id) => {
  body.userHash = encrypt(`${body.email}${body.password}`)
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE User SET ' +
      'firstName = ?, ' +
      'surName = ?, ' +
      'role = ?, ' +
      'userHash = ?, ' +
      'email = ?, ' +
      'password = ? ' +
      'WHERE id = ? ',
      [
        body.firstName,
        body.surName,
        body.role,
        body.userHash,
        body.email,
        body.password,
        Number(id)
      ], 
      async (error, results, fields) => {
        if (error) {
            reject(error)
        }
        resolve(await getUserProfile(body))
    })
  })
}

module.exports.getAllUsers = getAllUsers
module.exports.addImage = addImage
module.exports.deleteUser = deleteUser
module.exports.getUserProfile = getUserProfile
module.exports.createUserProfile = createUserProfile
module.exports.updateUserProfile = updateUserProfile
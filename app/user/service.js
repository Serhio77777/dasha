const mysql = require('mysql')
const connection = require('../datastore/db')
const { encrypt, decrypt } = require('../middleware/hash')

const getAllUsers = body => {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM User`, 
            [], 
            (error, results, fields) => {
                if (error) {
                    throw error
                }
                resolve(results)
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
                    throw error
                }
                resolve(results)
        })
    })
}

const getUserProfile = body => {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM User WHERE userHash = ?`, 
            [encrypt(`${body.email}${body.password}`)], 
            (error, results, fields) => {
                if (error) {
                    throw error
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
                (error, results, fields) => {
                    if (error) {
                        throw error
                    }
                    resolve(results)
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
      `UPDATE User SET ` +
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

const updateUserProfile = (body, id) => {
    body.userHash = encrypt(`${body.email}${body.password}`)
    console.log(id, Number(id))
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
                    throw error
                }
                let user = await getUserProfile(body)
                await resolve(user)
        })
    })
}

module.exports.getAllUsers = getAllUsers
module.exports.addImage = addImage
module.exports.deleteUser = deleteUser
module.exports.getUserProfile = getUserProfile
module.exports.createUserProfile = createUserProfile
module.exports.updateUserProfile = updateUserProfile
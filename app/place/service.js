const mysql = require('mysql')
const connection = require('../datastore/db')
const { encrypt, decrypt } = require('../middleware/hash')
const dateFns = require('date-fns')

const getAll = id => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM Place WHERE cityId = ?`,
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
      `SELECT * FROM Place WHERE id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          throw error
        }
        resolve(results[0])
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
  let place = await getOne(id)
  let images = JSON.parse(place.images)
  images.push(imageId)
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE Place SET ` +
            'images = ? ' +
            'WHERE id = ? ',
      [
        JSON.stringify(images),
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

const addRate = async (id, body) => {
  let place = await getOne(id)
  let rate = JSON.parse(place.rate)
  rate.push(body.rate)
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE Place SET ` +
            'rate = ? ' +
            'WHERE id = ? ',
      [
        JSON.stringify(rate),
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

const create = async body => {
  return new Promise((resolve, reject) => {
      body.images = JSON.stringify([])
      body.rate = JSON.stringify([])
      body.coords = JSON.stringify([body.coords])
      connection.query(
        `INSERT INTO Place SET ?`,
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
            `DELETE FROM Place WHERE id = ?`, 
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
      `UPDATE Place SET ` +
            'cityId = ?, ' +
            'description = ?, ' +
            'coords = ?, ' +
            'name = ? ' +
            'WHERE id = ? ',
      [
        body.cityId,
        body.description,
        JSON.stringify(body.coords),
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
module.exports.addImage = addImage
module.exports.addRate = addRate
module.exports.getOne = getOne
module.exports.create = create
module.exports.update = update
module.exports.delete = remove

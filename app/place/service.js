const mysql = require('mysql')
const connection = require('../datastore/db')
const { encrypt, decrypt } = require('../middleware/hash')
const dateFns = require('date-fns')
const HttpError = require('../middleware/error')

const getAll = (id, searchText, next) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM Place WHERE cityId = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
            reject(error)
        }
        Promise.all(results.map(async element => {
          if (JSON.parse(element.images).length) {
            return Promise.all(JSON.parse(element.images).map(async image => (await getImageById(image))))
          } else {
            return []          
          }
        }))
          .then(data => {
            results = results.map((element, index) => {
              element.images = data[index]
              if (JSON.parse(element.rate).length === 0) {
                element.rate = 0
              } else if (JSON.parse(element.rate).length === 1) {
                element.rate = JSON.parse(element.rate)[0]
              } else {
                element.rate = JSON.parse(element.rate).reduce((accumulator, currentValue) => accumulator + currentValue) / JSON.parse(element.rate).length
              }
              element.coords = JSON.parse(element.coords)
              return element
            }).sort((a,b) => {
              if (a.rate > b.rate) return -1
              if (a.rate < b.rate) return 1
              return 0
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
        if (results[0]) {
          resolve(results[0].image)
        } else {
          resolve()
        }
    })
  })
}

const getOne = id => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM Place WHERE id = ?`,
      [id],
     async (error, results, fields) => {
        if (error) {
          reject(error)
        }
        if (results.length === 0) {
            return reject(new HttpError('Place not found.'))
        }
        if (JSON.parse(results[0].images).length) {
          results[0].images = await Promise.all(JSON.parse(results[0].images).map(async element => {
            if (element) {
              return getImageById(element)
            } else {
              return element
            }
          }))
        } else {
          results[0].images = []
        }
        if (JSON.parse(results[0].rate).length === 0) {
          results[0].rate = 0
        } else if (JSON.parse(results[0].rate).length === 1) {
          results[0].rate = JSON.parse(results[0].rate)[0]
        } else {
          results[0].rate = JSON.parse(results[0].rate).reduce((accumulator, currentValue) => accumulator + currentValue) / JSON.parse(results[0].rate).length
        }
        results[0].coords = JSON.parse(results[0].coords)
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
          reject(error)
        } else {
          resolve({message: 'Image is set successfully.'})
        }
      })
  })
}

const addRate = async (id, body) => {
  let place = await getOne(id)
  let rate = JSON.parse(place.rate)
  if (body.rate.find(rate => rate === body.rate)) {
    rate.push(body.rate)
  }
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
          reject(error)
        }
        resolve({message: 'Rate is added successfully.'})
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
      `DELETE FROM Place WHERE id = ?`, 
      [Number(id)], 
      (error, results, fields) => {
        if (error) {
          reject(error)
        }
        resolve({message: 'Place is deleted successfully.'})
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
module.exports.addRate = addRate
module.exports.getOne = getOne
module.exports.create = create
module.exports.update = update
module.exports.delete = remove

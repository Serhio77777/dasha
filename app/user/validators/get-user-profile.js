const ajv = require('ajv')()
require('ajv-keywords')(ajv)
let companySchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  required: ['email', 'password'],
  additionalProperties: true
}

let validatePut = ajv.compile(companySchema)

module.exports = validatePut

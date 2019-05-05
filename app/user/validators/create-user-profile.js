const ajv = require('ajv')()
require('ajv-keywords')(ajv)
let companySchema = {
  type: 'object',
  properties: {
    surName: {
      type: 'string'
    },
    firstName: {
      type: 'string'
    },
    role: {
      type: 'string'
    },
    sex: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },
  required: ['surName', 'firstName', 'role', 'sex', 'email', 'password'],
  additionalProperties: true
}

let validatePut = ajv.compile(companySchema)

module.exports = validatePut

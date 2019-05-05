const ajv = require('ajv')()
require('ajv-keywords')(ajv)
let companySchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    }
  },
  required: ['name'],
  additionalProperties: true
}

let validatePut = ajv.compile(companySchema)

module.exports = validatePut

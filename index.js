import { capitalCase } from 'change-case'
import is from 'is'

/**
 * Shorthand helper for writing Sanity fields
 *
 * @param {string|Array<String>} name Pass a `string` key to automatically create a title case title. Pass an `Array` to specify name and title.
 * @param {string} type Field type, defaults to 'string'
 * @param {Object} options Pass an object of options for the field
 * @param {Array} fields Pass an Array of fields for 'array' or 'object' types
 */
export function qF(name, type = 'string', options = {}, fields = []) {
  const field = {}

  // Handle `name` param
  if (is.string(name)) {
    field.name = name
    field.title = capitalCase(name)
  } else if (is.array(name) && name.length === 2) {
    const [nameKey, nameTitle] = name
    field.name = nameKey
    field.title = nameTitle
  }

  // Handle `type` param
  field.type = type

  // `array` field type does not need `title` key
  if (type === 'array') {
    delete field.title
  }

  // Handle `options` param
  if (is.object(options) && Object.keys(options).length) {
    // 'rows' lives outside the options key ... for some reason
    if (type === 'text' && options.rows) {
      field.rows = options.rows
      delete options.rows
    }

    // If there's still options left...
    if (Object.keys(options).length) {
      field.options = options
    }
  }

  // Handle `fields` param
  if (fields && is.array(fields) && fields.length) {
    if (type === 'array') field.of = fields
    if (type === 'object') field.fields = fields
  }

  return field
}

export function quickField(...args) {
  return qF(...args)
}

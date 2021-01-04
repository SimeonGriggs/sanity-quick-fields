import { capitalCase } from 'change-case'
import is from 'is'

/**
 * Shorthand helper for writing Sanity fields
 *
 * @param {string|Array<String>} name Pass a `string` key to automatically create a title case title. Pass an `Array` to specify name and title.
 * @param {string} type Field type, defaults to 'string'
 * @param {Object} options Pass an object of options for the field
 */
export function qF(name, type = 'string', options = {}) {
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

    // 'to' also lives outside options
    if (type === 'reference' && options.to) {
      field.to = options.to
      delete options.to
    }

    // If there's still options left...
    if (Object.keys(options).length) {
      field.options = options
    }
  }

  return field
}

/**
 * Class for building fields with Children and Previews
 */
class QuickFieldBuilder {
  constructor(name, type = 'string', options = {}) {
    const fieldBase = qF(name, type, options)

    Object.keys(fieldBase).forEach((key) => (this[key] = fieldBase[key]))

    return this
  }

  // Add children fields
  children(fields = []) {
    if (is.array(fields) && fields.length) {
      if (this.type === 'array') this.of = fields
      if (this.type === 'object') this.fields = fields
    }

    return this
  }

  // Add preview helper
  preview(select = {}) {
    this.preview = { select }

    return this
  }

  // Return a plain Object
  get toObject() {
    const fieldObj = {}
    Object.keys(this).forEach((key) => (fieldObj[key] = this[key]))
    return fieldObj
  }
}

export function qFB(...args) {
  return new QuickFieldBuilder(...args)
}

/**
 * Long-name functions
 */
export function quickField(...args) {
  return qF(...args)
}

export function quickFieldBuilder(...args) {
  return qFB(...args)
}

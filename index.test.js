import { qF, quickField, qFB, quickFieldBuilder } from './index'

test('Pass string to `name`', () => {
  const args = ['name']

  expect(qF(...args)).toEqual({
    name: 'name',
    title: 'Name',
    type: 'string',
  })

  expect(qF(...args)).toEqual(quickField(...args))
})

test('Pass array to `name`', () => {
  const args = [['nameArg', 'titleArg']]

  expect(qF(...args)).toEqual({
    name: 'nameArg',
    title: 'titleArg',
    type: 'string',
  })

  expect(qF(...args)).toEqual(quickField(...args))
})

test('Pass `number` as `type`', () => {
  const args = ['stockLevel', 'number']

  expect(qF(...args)).toEqual({
    name: 'stockLevel',
    title: 'Stock Level',
    type: 'number',
  })

  expect(qF(...args)).toEqual(quickField(...args))
})

test('Pass object as `type` with nested quickFields', () => {
  const args = ['social_accounts', 'object']
  const argFields = [qF('twitter'), quickField(['linkedin', 'LinkedIn'])]
  const expected = {
    name: 'social_accounts',
    title: 'Social Accounts',
    type: 'object',
    fields: [
      { name: 'twitter', title: 'Twitter', type: 'string' },
      { name: 'linkedin', title: 'LinkedIn', type: 'string' },
    ],
  }

  expect(qFB(...args).children(argFields).toObject).toEqual(expected)
  expect(quickFieldBuilder(...args).children(argFields).toObject).toEqual(
    expected
  )
})

test('Pass text as `type` with rows option', () => {
  const args = ['bio', 'text', { rows: 5 }]

  expect(qF(...args)).toEqual({
    name: 'bio',
    title: 'Bio',
    type: 'text',
    rows: 5,
  })

  expect(qF(...args)).toEqual(quickField(...args))
})

test('Pass array as `type` with nested quickFields', () => {
  const args = ['dates', 'array']
  const argFields = [qF('date', 'datetime')]
  const expected = {
    name: 'dates',
    type: 'array',
    of: [{ name: 'date', title: 'Date', type: 'datetime' }],
  }

  // 'Array' type fields don't need a `title` key
  expect(qFB(...args).children(argFields).toObject).toEqual(expected)
  expect(quickFieldBuilder(...args).children(argFields).toObject).toEqual(
    expected
  )
})

test('Pass an object to `options`', () => {
  const args = ['dateOfBirth', 'date', { dateFormat: 'YYYY-MM-DD' }]

  expect(qF(...args)).toEqual({
    name: 'dateOfBirth',
    title: 'Date Of Birth',
    type: 'date',
    options: {
      dateFormat: 'YYYY-MM-DD',
    },
  })

  expect(qF(...args)).toEqual(quickField(...args))
})

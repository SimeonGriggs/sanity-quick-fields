import { qF, quickField } from './index'

test('Pass string to `name`', () => {
  const args = ['name']

  expect(qF(...args)).toStrictEqual({
    name: 'name',
    title: 'Name',
    type: 'string',
  })

  expect(qF(...args)).toStrictEqual(quickField(...args))
})

test('Pass array to `name`', () => {
  const args = [['nameArg', 'titleArg']]

  expect(qF(...args)).toStrictEqual({
    name: 'nameArg',
    title: 'titleArg',
    type: 'string',
  })

  expect(qF(...args)).toStrictEqual(quickField(...args))
})

test('Pass `number` as `type`', () => {
  const args = ['stockLevel', 'number']

  expect(qF(...args)).toStrictEqual({
    name: 'stockLevel',
    title: 'Stock Level',
    type: 'number',
  })

  expect(qF(...args)).toStrictEqual(quickField(...args))
})

test('Pass object as `type` with nested quickFields', () => {
  const args = [
    'social_accounts',
    'object',
    undefined,
    [qF('twitter'), quickField(['linkedin', 'LinkedIn'])],
  ]

  expect(qF(...args)).toStrictEqual({
    name: 'social_accounts',
    title: 'Social Accounts',
    type: 'object',
    fields: [
      { name: 'twitter', title: 'Twitter', type: 'string' },
      { name: 'linkedin', title: 'LinkedIn', type: 'string' },
    ],
  })

  expect(qF(...args)).toStrictEqual(quickField(...args))
})

test('Pass text as `type` with rows option', () => {
  const args = ['bio', 'text', { rows: 5 }]

  expect(qF(...args)).toStrictEqual({
    name: 'bio',
    title: 'Bio',
    type: 'text',
    rows: 5,
  })

  expect(qF(...args)).toStrictEqual(quickField(...args))
})

test('Pass array as `type` with nested quickFields', () => {
  const args = ['dates', 'array', undefined, [qF('date', 'datetime')]]

  // 'Array' type fields don't need a `title` key
  expect(qF(...args)).toStrictEqual({
    name: 'dates',
    type: 'array',
    of: [{ name: 'date', title: 'Date', type: 'datetime' }],
  })

  expect(qF(...args)).toStrictEqual(quickField(...args))
})

test('Pass an object to `options`', () => {
  const args = ['dateOfBirth', 'date', { dateFormat: 'YYYY-MM-DD' }]

  expect(qF(...args)).toStrictEqual({
    name: 'dateOfBirth',
    title: 'Date Of Birth',
    type: 'date',
    options: {
      dateFormat: 'YYYY-MM-DD',
    },
  })

  expect(qF(...args)).toStrictEqual(quickField(...args))
})

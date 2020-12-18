# Sanity.io quickFields

Sanity.io Schema is awesome, but the definition files get _long_.

This `quickFields()` (or `qF()` for short) function will help you compose fields in a more concise way.

```js
// Before...
fields: [
    {
        name: 'title',
        title: 'Title',
        type: 'string',
    },
    {
        name: 'published',
        title: 'Published',
        type: 'date',
    },
],

// After...
fields: [
    qF('title'),
    qF('published', 'date'),
],
```

## Get started

```
npm i sanity-quick-fields
or
yarn add sanity-quick-fields
```

Inside any Sanity document import the `qF()` or `quickFields()` functions. They both do the same thing.

```js
import { qF } from "sanity-quick-fields";
```

## Parameters

```js
qF(name, type, options, fields);
```

### `name` (string or Array)

Pass a **string** for the field's name, and `qF` will automatically generate a Capital Case version for the title.

```js
qf('currentLocation')

{ name: 'currentLocation', title: 'Current Location', type: 'string' }
```

You can overwrite this behaviour by passing in an **Array** instead, with `name` and `title` in that order.

```js
qf(['linkedIn', 'LinkedIn'])

{ name: 'linkedIn', title: 'LinkedIn', type: 'string' }
```

### `type` (string)

Defaults to `string`. qF will pass along whatever type you feed the function, so if it doesn't exist in Sanity, you'll probably get an error.

### `options` (Object)

Pass in an Object of any additional options you need to pass into the field. These are inserted directly into the `options` key.

You can pass in `rows` here on the `text` field type. It's smart enough to store that _outside_ of `options`.

```js
qf('dateOfBirth', 'date', { dateFormat: 'YYYY-MM-DD' })

{
    name: 'dateOfBirth',
    title: 'Date Of Birth',
    type: 'date',
    options: {
      dateFormat: 'YYYY-MM-DD',
    },
}
```

### `fields` (Array)

If creating an Array or Object `type`, pass an **Array** of fields. This is where nesting `qF()` becomes powerful.

```js
qf('contact', 'object', undefined, [qF('twitter'), qf('email')])

{
    name: 'contact',
    title: 'Contact',
    type: 'object',
    fields: [
        { name: 'twitter', title: 'Twitter', type: 'string' },
        { name: 'email', title: 'Email', type: 'string' },
    ],
}
```

## Mix and match

`qF` works best on simple fields, but for more complex fields it probably makes more sense to write them in full. And that's fine, you can selectively use the function where it makes sense.

```js
fields: [
  qf("title"),
  {
    name: "slug",
    title: "Slug",
    type: "slug",
    validation: (Rule) =>
      Rule.required().custom((slug) => {
        const regex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
        return regex.test(slug.current);
      }),
    options: {
      source: "title",
      maxLength: 96,
    },
  },
  qf("body", "portableText"),
];
```

## Thanks

This library is insired by [ACF Builder](https://github.com/StoutLogic/acf-builder), the best way by far to compose Advanced Custom Fields!

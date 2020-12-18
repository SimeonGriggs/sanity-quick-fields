# Sanity.io Quick Fields

Sanity.io Schema is awesome, but the definition files get _long_.

This `quickFields()` / `qF()` function will help you compose fields in a more concise way.

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
qF('currentLocation')

{ name: 'currentLocation', title: 'Current Location', type: 'string' }
```

You can overwrite this behaviour by passing in an **Array** instead, with `name` and `title` in that order.

```js
qF(['linkedIn', 'LinkedIn'])

{ name: 'linkedIn', title: 'LinkedIn', type: 'string' }
```

### `type` (string)

Defaults to `string` – `qF()` will pass along whatever type you feed the function, so if it doesn't exist in Sanity, you'll probably get an error.

```js
qF('quantity', 'number')

{ name: 'quantity', title: 'Quantity', type: 'number' }
```

### `options` (Object)

Pass in an Object of any additional options you need to pass into the field. These are inserted directly into the `options` key.

```js
qF('dateOfBirth', 'date', { dateFormat: 'YY-MM-DD' })

{
    name: 'dateOfBirth',
    title: 'Date Of Birth',
    type: 'date',
    options: {
      dateFormat: 'YY-MM-DD',
    },
}
```

You can pass in `rows` here on the `text` field type. It's smart enough to store that _outside_ of `options` (why is it this way Sanity, why?!).

### `fields` (Array)

If creating an Array or Object `type`, pass an **Array** of fields. This is where nesting `qF()` becomes powerful.

```js
qF('contact', 'object', undefined, [qF('twitter'), qF('email')])

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

Skip over options by passing `undefined` as the third param.

## Mix and match

`qF` works best on simple fields, but for more complex fields it probably makes more sense to write them in full. And that's fine, you can selectively use the function where it makes sense.

```js
fields: [
  qF("title"),
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
  qF("body", "bodyPortableText"),
];
```

## Thanks

This library is insired by [ACF Builder](https://github.com/StoutLogic/acf-builder), the best way by far to compose Advanced Custom Fields!

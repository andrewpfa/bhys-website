import {defineArrayMember, defineField} from 'sanity'

export function richTextFieldFor(name: string, title: string) {
  return defineField({
    name,
    title,
    type: 'array',
    of: [
      defineArrayMember({
        type: 'block',
        styles: [
          {title: 'Normal', value: 'normal'},
          {title: 'Heading 2', value: 'h2'},
          {title: 'Heading 3', value: 'h3'},
        ],
        lists: [
          {title: 'Bullet', value: 'bullet'},
          {title: 'Numbered', value: 'number'},
        ],
      }),
    ],
  })
}

export const richTextField = richTextFieldFor('body', 'Body')

export const seoFields = [
  defineField({
    name: 'seoTitle',
    title: 'SEO Title',
    type: 'string',
    description: 'Optional title for search engines and social sharing.',
    validation: (rule) => rule.max(70),
  }),
  defineField({
    name: 'seoDescription',
    title: 'SEO Description',
    type: 'text',
    rows: 3,
    description: 'Optional summary for search engines and social sharing.',
    validation: (rule) => rule.max(160),
  }),
  defineField({
    name: 'seoImage',
    title: 'SEO Image',
    type: 'image',
    options: {hotspot: true},
    fields: [
      defineField({
        name: 'alt',
        title: 'Alt Text',
        type: 'string',
        description: 'Briefly describe the image for accessibility.',
      }),
    ],
  }),
]

export function imageWithAltField(name: string, title: string) {
  return defineField({
    name,
    title,
    type: 'image',
    options: {hotspot: true},
    fields: [
      defineField({
        name: 'alt',
        title: 'Alt Text',
        type: 'string',
        description: 'Briefly describe the image for accessibility.',
      }),
    ],
  })
}

import {LinkIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const externalLink = defineType({
  name: 'externalLink',
  title: 'External Link',
  type: 'document',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) =>
        rule
          .required()
          .uri({
            scheme: ['http', 'https', 'mailto', 'tel'],
          }),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Registration', value: 'registration'},
          {title: 'SYSA', value: 'sysa'},
          {title: 'Weather', value: 'weather'},
          {title: 'Coaches', value: 'coaches'},
          {title: 'Fields', value: 'fields'},
          {title: 'Safety', value: 'safety'},
        ],
      },
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Show this link on the website.',
      initialValue: true,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first.',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'url',
    },
  },
})

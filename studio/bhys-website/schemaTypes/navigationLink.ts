import {LinkIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const navigationLink = defineType({
  name: 'navigationLink',
  title: 'Navigation Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Use a full URL or a site path such as /register.',
      validation: (rule) =>
        rule
          .required()
          .uri({
            allowRelative: true,
            scheme: ['http', 'https', 'mailto', 'tel'],
          }),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Quick Links', value: 'quickLinks'},
          {title: 'Resources', value: 'resources'},
          {title: 'Social', value: 'social'},
          {title: 'Contact', value: 'contact'},
        ],
      },
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first.',
      initialValue: 0,
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Show this link on the website.',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'category',
    },
  },
})

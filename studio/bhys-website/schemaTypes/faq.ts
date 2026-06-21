import {HelpCircleIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {richTextFieldFor} from './shared/fields'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    richTextFieldFor('answer', 'Answer'),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Registration', value: 'registration'},
          {title: 'Scholarships', value: 'scholarships'},
          {title: 'Parents', value: 'parents'},
          {title: 'Coaches', value: 'coaches'},
          {title: 'Volunteers', value: 'volunteers'},
          {title: 'Weather', value: 'weather'},
          {title: 'General', value: 'general'},
        ],
      },
      initialValue: 'general',
    }),
    defineField({
      name: 'relatedPage',
      title: 'Related Page',
      type: 'reference',
      to: [{type: 'page'}],
    }),
    defineField({
      name: 'relatedRegistrationGuide',
      title: 'Related Registration Guide',
      type: 'reference',
      to: [{type: 'registrationGuide'}],
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Show this FAQ on the website.',
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
      title: 'question',
      subtitle: 'category',
    },
  },
})

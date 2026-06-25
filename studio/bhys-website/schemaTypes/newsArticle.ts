import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {imageWithAltField, richTextField, seoFields} from './shared/fields'

export const newsArticle = defineType({
  name: 'newsArticle',
  title: 'News Article',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Show this article on the website.',
      initialValue: true,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Registration', value: 'registration'},
          {title: 'Club News', value: 'clubNews'},
          {title: 'Community', value: 'community'},
          {title: 'Sponsors', value: 'sponsors'},
          {title: 'Volunteers', value: 'volunteers'},
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Feature this article in highlighted news areas.',
      initialValue: false,
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(200),
    }),
    imageWithAltField('mainImage', 'Main Image'),
    richTextField,
    ...seoFields,
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
      media: 'mainImage',
    },
  },
})

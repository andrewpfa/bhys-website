import {StarIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

import {imageWithAltField} from './shared/fields'

export const sponsor = defineType({
  name: 'sponsor',
  title: 'Sponsor',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    imageWithAltField('logo', 'Logo'),
    defineField({
      name: 'websiteUrl',
      title: 'Website URL',
      type: 'url',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'sponsorLevel',
      title: 'Sponsor Level',
      type: 'string',
      options: {
        list: [
          {title: 'Premier Sponsor', value: 'premierSponsor'},
          {title: 'Community Sponsor', value: 'communitySponsor'},
          {title: 'Supporting Sponsor', value: 'supportingSponsor'},
          {title: 'Partner', value: 'partner'},
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Show this sponsor on the website.',
      initialValue: true,
    }),
    defineField({
      name: 'featuredOnHomepage',
      title: 'Featured On Homepage',
      type: 'boolean',
      description: 'Show this sponsor in homepage sponsor areas.',
      initialValue: false,
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
      title: 'name',
      subtitle: 'sponsorLevel',
      media: 'logo',
    },
  },
})

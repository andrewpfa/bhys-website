import {HomeIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

import {imageWithAltField, richTextField} from './shared/fields'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroText',
      title: 'Hero Text',
      type: 'text',
      rows: 3,
    }),
    imageWithAltField('heroImage', 'Hero Image'),
    defineField({
      name: 'primaryButton',
      title: 'Primary Button',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
        }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'url',
          validation: (rule) =>
            rule.uri({
              allowRelative: true,
              scheme: ['http', 'https', 'mailto', 'tel'],
            }),
        }),
      ],
    }),
    defineField({
      name: 'secondaryButton',
      title: 'Secondary Button',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
        }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'url',
          validation: (rule) =>
            rule.uri({
              allowRelative: true,
              scheme: ['http', 'https', 'mailto', 'tel'],
            }),
        }),
      ],
    }),
    defineField({
      name: 'introTitle',
      title: 'Intro Title',
      type: 'string',
    }),
    defineField({
      name: 'registrationSectionTitle',
      title: 'Registration Section Title',
      type: 'string',
    }),
    defineField({
      name: 'registrationSectionText',
      title: 'Registration Section Text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'registrationCards',
      title: 'Registration Cards',
      type: 'array',
      description: 'Choose up to three registration guides to feature as homepage cards.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'registrationGuide'}]})],
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: 'registrationSectionCtaLabel',
      title: 'Registration Section CTA Label',
      type: 'string',
      description: 'Button text for the registration section, such as Register Today.',
    }),
    defineField({
      name: 'registrationSectionCtaLink',
      title: 'Registration Section CTA Link',
      type: 'url',
      validation: (rule) =>
        rule.uri({
          allowRelative: true,
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
    defineField({
      name: 'aboutSectionTitle',
      title: 'About Section Title',
      type: 'string',
    }),
    defineField({
      name: 'aboutSectionText',
      title: 'About Section Text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      description: 'Short homepage stats such as players served or years in the community.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'The number or short value to highlight.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'value',
              subtitle: 'label',
            },
          },
        }),
      ],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: 'donateSectionTitle',
      title: 'Donate Section Title',
      type: 'string',
    }),
    defineField({
      name: 'donateSectionText',
      title: 'Donate Section Text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'donateSectionCtaLabel',
      title: 'Donate Section CTA Label',
      type: 'string',
      description: 'Button text for the donation section, such as Donate Today.',
    }),
    defineField({
      name: 'donateSectionCtaLink',
      title: 'Donate Section CTA Link',
      type: 'url',
      validation: (rule) =>
        rule.uri({
          allowRelative: true,
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
    defineField({
      name: 'volunteerSectionTitle',
      title: 'Volunteer Section Title',
      type: 'string',
    }),
    defineField({
      name: 'volunteerSectionText',
      title: 'Volunteer Section Text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'volunteerOpportunities',
      title: 'Volunteer Opportunities',
      type: 'array',
      description: 'Homepage volunteer cards such as Coach, Team Manager, or Board Member.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'ctaLabel',
              title: 'CTA Label',
              type: 'string',
            }),
            defineField({
              name: 'ctaLink',
              title: 'CTA Link',
              type: 'url',
              validation: (rule) =>
                rule.uri({
                  allowRelative: true,
                  scheme: ['http', 'https', 'mailto', 'tel'],
                }),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'ctaLabel',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'volunteerSectionCtaLabel',
      title: 'Volunteer Section CTA Label',
      type: 'string',
      description: 'Button text for the volunteer section, such as Get Involved.',
    }),
    defineField({
      name: 'volunteerSectionCtaLink',
      title: 'Volunteer Section CTA Link',
      type: 'url',
      validation: (rule) =>
        rule.uri({
          allowRelative: true,
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
    defineField({
      name: 'newsSectionTitle',
      title: 'News Section Title',
      type: 'string',
      description: 'Heading for the latest news area.',
    }),
    defineField({
      name: 'newsSectionCtaLabel',
      title: 'News Section CTA Label',
      type: 'string',
      description: 'Button text for the news section, such as View All News.',
    }),
    defineField({
      name: 'newsSectionCtaLink',
      title: 'News Section CTA Link',
      type: 'url',
      validation: (rule) =>
        rule.uri({
          allowRelative: true,
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
    defineField({
      name: 'featuredNewsLimit',
      title: 'Featured News Limit',
      type: 'number',
      description: 'Number of featured news articles to show on the homepage.',
      initialValue: 3,
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'sponsorsSectionTitle',
      title: 'Sponsors Section Title',
      type: 'string',
      description: 'Heading for the sponsor logo strip.',
    }),
    defineField({
      name: 'sponsorsSectionCtaLabel',
      title: 'Sponsors Section CTA Label',
      type: 'string',
      description: 'Button text for the sponsor section, such as Become A Sponsor.',
    }),
    defineField({
      name: 'sponsorsSectionCtaLink',
      title: 'Sponsors Section CTA Link',
      type: 'url',
      validation: (rule) =>
        rule.uri({
          allowRelative: true,
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
    defineField({
      name: 'featuredSponsorsLimit',
      title: 'Featured Sponsors Limit',
      type: 'number',
      description: 'Number of featured sponsors to show on the homepage.',
      initialValue: 6,
      validation: (rule) => rule.min(0),
    }),
    richTextField,
    defineField({
      name: 'featuredRegistrationGuide',
      title: 'Featured Registration Guide',
      type: 'reference',
      to: [{type: 'registrationGuide'}],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Homepage',
      }
    },
  },
})

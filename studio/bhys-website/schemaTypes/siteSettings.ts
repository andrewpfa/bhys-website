import {CogIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

import {imageWithAltField} from './shared/fields'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'currentSeason',
      title: 'Current Season',
      type: 'string',
      description: 'For example: Fall 2026 or Spring 2027.',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }),
    imageWithAltField('logo', 'Logo'),
    defineField({
      name: 'mainRegistrationUrl',
      title: 'Main Registration URL',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'fallRegistrationUrl',
      title: 'Fall Registration URL',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'springRegistrationUrl',
      title: 'Spring Registration URL',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'donationUrl',
      title: 'Donation URL',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'volunteerFormUrl',
      title: 'Volunteer Form URL',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'sponsorEnquiryFormUrl',
      title: 'Sponsor Enquiry Form URL',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'mobileRegisterCtaLabel',
      title: 'Mobile Register CTA Label',
      type: 'string',
      description: 'Short button label for the persistent mobile registration action.',
    }),
    defineField({
      name: 'mobileRegisterCtaUrl',
      title: 'Mobile Register CTA URL',
      type: 'url',
      description: 'Where the persistent mobile registration button should go.',
      validation: (rule) =>
        rule.uri({
          allowRelative: true,
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'email',
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'mailingAddress',
      title: 'Mailing Address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'alertBannerEnabled',
      title: 'Alert Banner Enabled',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'alertBannerText',
      title: 'Alert Banner Text',
      type: 'string',
      hidden: ({document}) => !document?.alertBannerEnabled,
    }),
    defineField({
      name: 'alertBannerLink',
      title: 'Alert Banner Link',
      type: 'url',
      hidden: ({document}) => !document?.alertBannerEnabled,
      validation: (rule) =>
        rule.uri({
          allowRelative: true,
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
    defineField({
      name: 'mainNavigation',
      title: 'Main Navigation',
      type: 'array',
      description: 'Primary header navigation links shown on every page.',
      of: [defineArrayMember({type: 'navigationLink'})],
    }),
    defineField({
      name: 'footerLinks',
      title: 'Footer Links',
      type: 'array',
      description: 'Reusable footer links grouped by Quick Links, Resources, Social, and Contact.',
      of: [defineArrayMember({type: 'navigationLink'})],
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle',
      subtitle: 'tagline',
    },
  },
})

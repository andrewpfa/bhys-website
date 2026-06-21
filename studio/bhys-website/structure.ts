import {
  ClipboardIcon,
  CogIcon,
  DocumentIcon,
  DocumentTextIcon,
  HelpCircleIcon,
  HomeIcon,
  LinkIcon,
  StarIcon,
  UserIcon,
} from '@sanity/icons'
import type {ComponentType} from 'react'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'

function singletonListItem(
  S: StructureBuilder,
  typeName: string,
  title: string,
  icon: ComponentType,
) {
  return S.listItem()
    .title(title)
    .icon(icon)
    .child(S.document().schemaType(typeName).documentId(typeName).title(title))
}

export const singletonTypes = ['siteSettings', 'homepage']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('BHYS Content')
    .items([
      S.listItem()
        .title('Global')
        .child(
          S.list()
            .title('Global')
            .items([
              singletonListItem(S, 'siteSettings', 'Site Settings', CogIcon),
              singletonListItem(S, 'homepage', 'Homepage', HomeIcon),
            ]),
        ),
      S.listItem()
        .title('Website Pages')
        .child(
          S.list()
            .title('Website Pages')
            .items([
              S.documentTypeListItem('page').title('Pages').icon(DocumentIcon),
              S.documentTypeListItem('registrationGuide')
                .title('Registration Guides')
                .icon(ClipboardIcon),
              S.documentTypeListItem('faq').title('FAQs').icon(HelpCircleIcon),
            ]),
        ),
      S.listItem()
        .title('Updates')
        .child(
          S.list()
            .title('Updates')
            .items([
              S.documentTypeListItem('newsArticle').title('News Articles').icon(DocumentTextIcon),
            ]),
        ),
      S.listItem()
        .title('People & Partners')
        .child(
          S.list()
            .title('People & Partners')
            .items([
              S.documentTypeListItem('sponsor').title('Sponsors').icon(StarIcon),
              S.documentTypeListItem('boardMember').title('Board Members').icon(UserIcon),
            ]),
        ),
      S.listItem()
        .title('Links')
        .child(
          S.list()
            .title('Links')
            .items([S.documentTypeListItem('externalLink').title('External Links').icon(LinkIcon)]),
        ),
    ])

import {boardMember} from './boardMember'
import {externalLink} from './externalLink'
import {faq} from './faq'
import {homepage} from './homepage'
import {navigationLink} from './navigationLink'
import {newsArticle} from './newsArticle'
import {page} from './page'
import {registrationGuide} from './registrationGuide'
import {siteSettings} from './siteSettings'
import {sponsor} from './sponsor'

export const schemaTypes = [
  siteSettings,
  homepage,
  navigationLink,
  page,
  registrationGuide,
  faq,
  newsArticle,
  sponsor,
  boardMember,
  externalLink,
]

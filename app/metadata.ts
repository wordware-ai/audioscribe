import { getURL } from '@/lib/config'

const siteMetadata = {
  title: 'Audioscribe · AI-powered Record-to-Text tool built by Wordware',
  author: 'Wordware',
  headerTitle: 'Audioscribe',
  description:
    'Audioscribe is an AI-powered tool for turning audio recordings into text. It uses cutting-edge AI to transcribe audio and help you with your work.',
  language: 'en-us',
  theme: 'light',
  siteUrl: new URL(getURL()),
  socialBanner: '/social/og.png',
  locale: 'en-US',
}

export default siteMetadata

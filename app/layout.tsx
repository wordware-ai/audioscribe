import { Toaster } from 'sonner'

import { TailwindIndicator } from '@/components/ui/tailwind-indicator'
import { getURL } from '@/lib/config'

import { poppins } from './fonts'

import './globals.css'

import Providers from '@/lib/providers'

import siteMetadata from './metadata'

export const metadata = {
  metadataBase: new URL(getURL()),
  title: {
    template: `%s • Audioscribe`,
    default: siteMetadata.title,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    creator: 'wordware',
    images: [siteMetadata.socialBanner],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <Toaster
            richColors
            position="top-right"
          />
          {children}
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  )
}

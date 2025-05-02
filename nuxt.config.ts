// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";
import { defineOrganization } from 'nuxt-schema-org/schema'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    private: {
      CONTENTFUL_CONTENT_KEY: process.env.CONTENTFUL_CONTENT_KEY,
      CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
      CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    },
    public: {
      CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
      // Read-only Content Delivery API access token
      CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
      CONTENTFUL_PREVIEW_ACCESS_TOKEN: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
    }
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui',
    '@nuxtjs/seo',
  ],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      templateParams: {
        separator: '•',
      }
    }
  },

  site: {
    url: 'https://nuxt-contentful-starter-five.vercel.app',
    name: 'Contentful Site',
    indexable: false, // Disable robots
  },

  seo: {
    meta: {
      description: "We're just here, starting with Contentful",
      themeColor: [
        { content: '#030712', media: '(prefers-color-scheme: dark)' },
        { content: 'white', media: '(prefers-color-scheme: light)' },
      ],
      twitterCreator: '@mytwitter',
      twitterSite: '@mysite',
      author: 'Christine',
      colorScheme: 'dark light',
      applicationName: 'Contentful Site',
    }
  },

  // https://nuxtseo.com/docs/schema-org/guides/setup-identity
  schemaOrg: {
    identity: defineOrganization({

      // Basic Information (Required)
      'name': 'Contentful Starter',
      'description': "We're just here, starting with Contentful",
      'url': 'https://nuxt-contentful-starter-five.vercel.app',

      // Location (Required)
      'address': {
        streetAddress: '114 NW Canal St, Ste 200',
        addressLocality: 'Seattle',
        addressRegion: 'WA',
        postalCode: '98107',
        addressCountry: 'US'
      },
    }),
  },

  sitemap: {
    sources: [
      '/api/__sitemap__/urls',
    ],
    xslColumns: [
      { label: 'URL', width: '60%' },
      { label: 'Last Modified', select: 'lastmod', width: '25%' },
      { label: 'Priority', select: 'priority', width: '15%' }
    ],
    defaults: {
      changefreq: 'weekly',
      priority: 0.8
    }
  },

  css: ['~/assets/css/main.css'],
  
  image: {
    ipx: {},
    provider: 'contentful',
    contentful: {
      baseURL: 'https://images.ctfassets.net',
      modifiers: {
        format: 'webp',
        quality: '85',
      }
    },
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1440,
      '2xl': 1440,
      '3xl': 1536,
    },
    presets: {
      placeholder: {
        provider: 'contentful',
        modifiers: {
          format: 'jpg',
          fit: 'thumbnail',
          width: 10,
          height: 10,
          quality: 70,
        }
      }
    }
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

})
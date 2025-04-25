// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

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
    }
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
  ],

  app: {
    head: {
      title: 'Starter | Contentful', // default fallback title
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' },
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
      xxl: 1536,
      '2xl': 1536,
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

  // Disable robots
  site: { indexable: false },

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

})
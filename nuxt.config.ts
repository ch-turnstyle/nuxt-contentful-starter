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
    '@nuxt/ui'
  ],

  css: ['~/assets/css/main.css'],
  
  image: {
    domains: ['//images.ctfassets.net'],
    quality: 90,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536
    }
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

})
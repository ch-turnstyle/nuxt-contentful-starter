import { createClient } from 'contentful';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  
  const client = createClient({
    space: import.meta.server ? config.private?.CONTENTFUL_SPACE_ID : config.public.CONTENTFUL_SPACE_ID,
    accessToken: import.meta.server ? config.private?.CONTENTFUL_ACCESS_TOKEN : config.public.CONTENTFUL_ACCESS_TOKEN,
  });

  nuxtApp.provide('contentfulClient', client);
});

import { ContentfulClientApi } from 'contentful';

declare module '#app' {
  interface NuxtApp {
    $contentfulClient: ContentfulClientApi;
  }
}

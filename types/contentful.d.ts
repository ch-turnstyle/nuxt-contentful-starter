import * as Contentful from 'contentful';

declare module '#app' {
  interface NuxtApp {
    $contentfulClient: Contentful.ContentfulClientApi;
  }
}

export interface CtfMenuGroup {
  fields: {
    groupName: string;
    groupLink?: {
      fields: {
        slug: string;
      };
    };
    featuredPages?: Array<{
      fields: {
        pageName: string;
        internalName: string;
        slug: string;
      };
    }>;
  };
}

export interface CtfLandingPage {
  fields: {
    pageName: string;
    slug: string;
    topSection?: Array<{
      fields: {};
      sys: {}
    }>;
    pageContent?: Array<{
      fields: {};
      sys: {};
    }>;
    extraSection?: Array<{
      fields: {};
      sys: {};
    }>;
  };
}

export interface RichTextOptions {
  renderMark: {};
  renderNode: {};
}

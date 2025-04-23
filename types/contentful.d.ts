import * as Contentful from 'contentful';

declare module '#app' {
  interface NuxtApp {
    $contentfulClient: Contentful.ContentfulClientApi;
  }
}

export interface ContentfulMenuGroup {
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

export interface ContentfulLandingPage {
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

export interface ContentfulImage {
  fields: {
    description?: string;
    file: {
      url: string;
      width?: number;
      height?: number;
      fileName?: string;
      details: {
        image: {
          height: number;
          width: number;
        };
      };
    };
    title?: string;
  };
}

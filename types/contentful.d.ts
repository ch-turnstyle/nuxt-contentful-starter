import * as Contentful from 'contentful';

declare module '#app' {
  interface NuxtApp {
    $contentfulClient: Contentful.ContentfulClientApi;
    $contentfulPreview: () => {
      isPreview: Ref<boolean>
    }
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

export interface SeoFields {
  name: string;
  title?: string;
  description?: string;
  image?: {
    fields: {
      file: {
        url: string;
      }
    }
  };
  robots: string;
  canonicalUrl?: string;
}

export interface PageFields {
  pageName: string;
  slug: string;
  topSection?: Array<{
    fields: {};
    sys: {
      id: string;
      contentType: {
        fields: {};
        sys: {
          id: string;
        }
      }
    };
  }>;
  pageContent?: Array<{
    fields: {};
    sys: {};
  }>;
  extraSection?: Array<{
    fields: {};
    sys: {};
  }>;
  seo?: {
    fields: SeoFields;
  }
}

export interface ContentfulEntry<T> {
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
    contentType: {
      sys: {
        id: string;
      }
    }
  };
  fields: T;
}

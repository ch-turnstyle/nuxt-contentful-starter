import type { ContentfulImage } from '~/types/contentful';

interface ImageOptions {
  width?: number;
  height?: number;
  alt?: string;
  sizes?: string;
  sizesPreset?: 'hero' | 'card';
  provider?: string;
  placeholder?: boolean;
  loading?: 'lazy' | 'eager';
  format?: string;
  class?: string; // Class for the picture element
  imgAttrs?: {    // Attributes specifically for the img element
    class?: string;
    [key: string]: any;
  };
}

export const useContentfulImage = () => {
  const renderImage = (image: ContentfulImage | undefined, options: ImageOptions = {}) => {
    if (!image || !image.fields.file.url) return null;
    let sizesValues = '100vw xs:100vw sm:100vw md:100vw lg:100vw xl:100vw 2xl:100vw';
    if (options.sizesPreset === 'card') {
      sizesValues = '100vw xs:100vw sm:100vw md:75vw lg:60vw xl:50vw';
    }
    
    // Extract Contentful image URL
    const imageUrl = image.fields.file.url;

    // Default options
    const defaultOptions: ImageOptions = {
      width: image.fields.file.details.image.width,
      height: image.fields.file.details.image.height,
      alt: image.fields.title || '',
      sizes: sizesValues,
      provider: 'contentful',
      placeholder: true,
      loading: 'lazy',
      class: '',
      imgAttrs: {
        class: ''
      }
    };

    const imageOptions = { 
      ...defaultOptions, 
      ...options,
      imgAttrs: {
        ...defaultOptions.imgAttrs,
        ...(options.imgAttrs || {})
      }
    };
    
    return {
      src: imageUrl,
      ...imageOptions
    };
  };
  
  return {
    renderImage
  };
};

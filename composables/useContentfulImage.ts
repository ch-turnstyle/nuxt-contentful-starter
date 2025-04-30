import type { ContentfulImage } from '~/types/contentful';

interface ImageOptions {
  width?: number;
  height?: number;
  alt?: string;
  sizes?: string;
  class?: string;
  type?: string;
  sizesPreset?: 'hero' | 'card';
}

enum ImageSizes {
  hero = 'xs:100vw sm:100vw md:100vw lg:100vw xl:100vw 2xl:100vw 100vw',
  card = 'xs:100vw sm:100vw md:75vw lg:60vw xl:50vw 100vw',
}

export const useContentfulImage = () => {
  // Generate a tiny placeholder URL from Contentful
  const getPlaceholderUrl = (imageUrl: string) => {
    // Ensure the URL starts with https:
    const baseUrl = imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl;
    // Add the Contentful resize parameters
    return `${baseUrl}?w=10&h=10&fit=thumb&q=10`;
  };

  const renderLazyImage = (image: ContentfulImage | undefined, options: ImageOptions = {}) => {
    if (!image || !image.fields.file.url) return null;
    
    // Use NuxtImg helper to render sizes, srcset, src
    const $img = useImage();
    let srcValues = $img.getSizes(image.fields.file.url, {
      sizes: ImageSizes[options.sizesPreset || 'hero']
    });
    
    // Extract Contentful image URL
    const imageUrl = image.fields.file.url;
    const placeholderUrl = getPlaceholderUrl(imageUrl);

    // Default options
    const defaultOptions: ImageOptions = {
      width: image.fields.file.details.image.width,
      height: image.fields.file.details.image.height,
      alt: image.fields.title || '',
      class: '',
      type: 'image/webp',
    };

    const imageOptions = { 
      ...defaultOptions, 
      ...options
    };
    
    return {
      ...srcValues,
      srcPlaceholder: placeholderUrl,
      alt: imageOptions.alt,
      width: imageOptions.width,
      height: imageOptions.height,
      class: imageOptions.class,
      type: imageOptions.type,
      srcData: {
        ...srcValues,
        type: imageOptions.type,
      }
    };
  };
  
  return {
    renderLazyImage,
    getPlaceholderUrl
  };
};

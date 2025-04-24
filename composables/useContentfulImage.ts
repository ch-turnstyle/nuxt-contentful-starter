import type { ContentfulImage } from '~/types/contentful';

interface ImageOptions {
  width?: number;
  height?: number;
  alt?: string;
  sizes?: string;
  class?: string;
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
    
    // Extract Contentful image URL
    const imageUrl = image.fields.file.url;
    const placeholderUrl = getPlaceholderUrl(imageUrl);

    // Default options
    const defaultOptions: ImageOptions = {
      width: image.fields.file.details.image.width,
      height: image.fields.file.details.image.height,
      alt: image.fields.title || '',
      class: '',
    };

    const imageOptions = { 
      ...defaultOptions, 
      ...options
    };
    
    return {
      src: imageUrl,
      srcPlaceholder: placeholderUrl,
      alt: imageOptions.alt,
      width: imageOptions.width,
      height: imageOptions.height,
      class: imageOptions.class
    };
  };
  
  return {
    renderLazyImage,
    getPlaceholderUrl
  };
};

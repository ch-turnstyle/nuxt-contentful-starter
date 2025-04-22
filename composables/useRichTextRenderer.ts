// composables/useRichTextRenderer.ts
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import type { Document } from '@contentful/rich-text-types';
import type { RichTextOptions } from '~/types/contentful';

export const useRichTextRenderer = () => {
  // Default rendering options
  const defaultOptions: RichTextOptions = {
    renderMark: {
      [MARKS.BOLD]: (text: string): string => `<strong class="font-bold">${text}</strong>`,
      [MARKS.ITALIC]: (text: string): string => `<em class="italic">${text}</em>`,
      [MARKS.UNDERLINE]: (text: string): string => `<u class="underline">${text}</u>`,
      [MARKS.CODE]: (text: string): string => `<code class="font-mono bg-gray-100 p-1 rounded">${text}</code>`,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, next: Function): string => 
        `<p class="mb-4">${next(node.content)}</p>`,
      [BLOCKS.HEADING_1]: (node: any, next: Function): string => 
        `<h1 class="text-4xl font-bold mb-6">${next(node.content)}</h1>`,
      [BLOCKS.HEADING_2]: (node: any, next: Function): string => 
        `<h2 class="text-3xl font-bold mb-4">${next(node.content)}</h2>`,
      [BLOCKS.HEADING_3]: (node: any, next: Function): string => 
        `<h3 class="text-2xl font-bold mb-3">${next(node.content)}</h3>`,
      [BLOCKS.HEADING_4]: (node: any, next: Function): string => 
        `<h4 class="text-xl font-bold mb-2">${next(node.content)}</h4>`,
      [BLOCKS.HEADING_5]: (node: any, next: Function): string => 
        `<h5 class="text-lg font-bold mb-2">${next(node.content)}</h5>`,
      [BLOCKS.HEADING_6]: (node: any, next: Function): string => 
        `<h6 class="text-base font-bold mb-2">${next(node.content)}</h6>`,
      [BLOCKS.UL_LIST]: (node: any, next: Function): string => 
        `<ul class="list-disc pl-6 mb-4">${next(node.content)}</ul>`,
      [BLOCKS.OL_LIST]: (node: any, next: Function): string => 
        `<ol class="list-decimal pl-6 mb-4">${next(node.content)}</ol>`,
      [BLOCKS.LIST_ITEM]: (node: any, next: Function): string => 
        `<li class="mb-1">${next(node.content)}</li>`,
      [BLOCKS.QUOTE]: (node: any, next: Function): string => 
        `<blockquote class="border-l-4 border-gray-300 pl-4 italic my-4">${next(node.content)}</blockquote>`,
      [BLOCKS.HR]: (): string => 
        `<hr class="my-6 border-t border-gray-300" />`,
      [BLOCKS.EMBEDDED_ASSET]: (node: any): string => {
        // Handle embedded assets (like images)
        if (node.data?.target?.fields) {
          const { file, title, description } = node.data.target.fields;
          return `<img src="${file?.url}" alt="${description || title || ''}" class="max-w-full my-4" />`;
        }
        return '';
      },
      [INLINES.HYPERLINK]: (node: any, next: Function): string => {
        const { uri } = node.data;
        return `<a href="${uri}" class="text-blue-600 hover:underline" target="${uri.startsWith('http') ? '_blank' : '_self'}" rel="${uri.startsWith('http') ? 'noopener noreferrer' : ''}">${next(node.content)}</a>`;
      },
      [INLINES.ENTRY_HYPERLINK]: (node: any, next: Function): string => {
        // Handle links to other Contentful entries
        if (node.data?.target) {
          const { id } = node.data.target.sys;
          const contentType = node.data.target.sys.contentType?.sys.id;
          // You might want to generate NuxtLink here based on entry type
          return `<nuxt-link to="/entries/${contentType}/${id}" class="text-blue-600 hover:underline">${next(node.content)}</nuxt-link>`;
        }
        return next(node.content);
      },
    },
  };

  // Function to render rich text to HTML
  const renderRichText = (document: Document | null | undefined, options: Partial<RichTextOptions> = {}): string => {
    if (!document) return '';
    
    // Merge default options with custom options
    const mergedOptions: RichTextOptions = {
      renderMark: { ...defaultOptions.renderMark, ...options.renderMark },
      renderNode: { ...defaultOptions.renderNode, ...options.renderNode },
    };
    
    return documentToHtmlString(document, mergedOptions);
  };

  return {
    renderRichText
  };
};
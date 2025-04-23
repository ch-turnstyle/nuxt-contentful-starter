import type { ContentfulEntry, PageFields, SeoFields } from '~/types/contentful'

interface SeoData {
  title: string;
  description: string;
  image: string | null;
  keywords: string;
  canonical: string;
}

export function useSeo(data: Ref<ContentfulEntry<PageFields> | null>) {
  const route = useRoute()
  
  const seoData = computed<SeoData>(() => {
    if (!data.value) {
      return {
        title: 'Contentful Site',
        description: "We're just here, starting with Contentful",
        image: null,
        keywords: '',
        canonical: `https://yourdomain.com${route.path}`
      }
    }
    
    const fields = data.value.fields
    const seoFields = fields.seo?.fields || {} as SeoFields

    return {
      title: `${seoFields.title || seoFields.name || fields.pageName} | Contentful Site` || 'Contentful Site',
      description: seoFields.description || "We're just here, starting with Contentful",
      image: seoFields.image?.fields?.file?.url || null,
      keywords: seoFields.keywords || '',
      canonical: seoFields.canonical || `https://yourdomain.com${route.path}`
    }
  })
  
  useHead(() => ({
    title: seoData.value.title,
    meta: [
      { name: 'description', content: seoData.value.description },
      { name: 'keywords', content: seoData.value.keywords },
      
      // Open Graph
      { property: 'og:title', content: seoData.value.title },
      { property: 'og:description', content: seoData.value.description },
      { property: 'og:image', content: seoData.value.image ? `https:${seoData.value.image}` : null },
      { property: 'og:url', content: seoData.value.canonical },
      { property: 'og:type', content: 'website' },
      
      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: seoData.value.title },
      { name: 'twitter:description', content: seoData.value.description },
      { name: 'twitter:image', content: seoData.value.image ? `https:${seoData.value.image}` : null },
    ],
    link: [
      { rel: 'canonical', href: seoData.value.canonical }
    ]
  }))
  
  return {
    seoData
  }
}

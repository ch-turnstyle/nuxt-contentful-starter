import type { ContentfulEntry, LandingPageFields, SeoFields } from '~/types/contentful'

interface SeoData {
  title: string;
  description: string;
  image: string | null;
  robots: string;
  canonical: string;
}

export function useSeo(data: Ref<ContentfulEntry<LandingPageFields> | null>) {
  const route = useRoute()
  
  const seoData = computed<SeoData>(() => {
    if (!data.value) {
      return {
        title: 'Contentful Site',
        description: `We're just here, starting with Contentful`,
        image: null,
        robots: 'all',
        canonical: `https://nuxt-contentful-starter-five.vercel.app${route.path}`
      }
    }
    
    const fields = data.value.fields
    const seoFields = fields.seoSettings?.fields || {} as SeoFields

    return {
      title: `${seoFields.title || fields.title}`,
      description: seoFields.description || `We're just here, starting with Contentful`,
      image: seoFields.image?.fields?.file?.url || null,
      robots: seoFields.robots,
      canonical: seoFields.canonicalUrl || `https://nuxt-contentful-starter-five.vercel.app${route.path}`
    }
  })
  
  useHead(() => ({
    title: seoData.value.title,
    meta: [
      { name: 'description', content: seoData.value.description },
      { name: 'robots', content: seoData.value.robots },
      
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

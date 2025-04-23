import { defineSitemapEventHandler } from '#imports'
import type { SitemapUrlInput } from '#sitemap/types'
import { createClient } from 'contentful'

export default defineSitemapEventHandler(async () => {
  // Create Contentful client
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
    environment: process.env.CONTENTFUL_ENVIRONMENT as string || 'master'
  })
  
  try {
    // Fetch landing pages with SEO-relevant fields
    const response = await client.getEntries({
      content_type: 'page',
      select: ['sys.id', 'sys.updatedAt', 'fields.slug', 'fields.pageName', 'fields.seo'],
      limit: 1000
    })
    
    // Transform content into sitemap format
    const sitemapUrls: SitemapUrlInput[] = response.items.map(page => {
      const slug = page.fields.slug ? (page.fields.slug as string) : page.sys.id
      
      // Optional SEO-specific sitemap properties
      //const priority = page.fields.seoMetadata?.priority || 0.8
      const priority = 0.8;
      //const changefreq = page.fields.seoMetadata?.changefreq || 'weekly'
      const changefreq = 'weekly';
      
      return {
        loc: `/${slug}`,
        lastmod: page.sys.updatedAt as string,
        changefreq: changefreq as 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never',
        priority,
        _sitemap: 'pages'
      }
    })
    
    // Add any static pages or other content types if needed
    // For example:
    //sitemapUrls.push({
    //  loc: '/',
    //  lastmod: new Date().toISOString(),
    //  changefreq: 'daily',
    //  priority: 1.0,
    //  _sitemap: 'pages'
    //})
    
    return sitemapUrls
  } catch (error) {
    console.error('Error generating sitemap from Contentful:', error)
    
    // Return at least some basic URLs if Contentful fetch fails
    return [
      {
        loc: '/',
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: 1.0,
        _sitemap: 'pages'
      }
    ] satisfies SitemapUrlInput[]
  }
});

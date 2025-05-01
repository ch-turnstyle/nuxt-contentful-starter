import { createClient } from 'contentful'
import { defineEventHandler, getQuery, setCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  // Get query parameters
  const query = getQuery(event)
  const slug = query.slug as string

  // Make sure the slug exists
  if (!slug) {
    return {
      statusCode: 401,
      body: 'No slug provided'
    }
  }

  // Create Contentful preview client
  const previewClient = createClient({
    space: import.meta.server ? config.private?.CONTENTFUL_SPACE_ID : config.public.CONTENTFUL_SPACE_ID,
    accessToken: config.public.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
    host: 'preview.contentful.com' // Important: This uses the preview API
  })

  try {
    // Get the entry using the provided slug
    // Adjust this query to match your content model
    const entries = await previewClient.getEntries({
      content_type: 'page', // Replace with your content type ID
      'fields.slug': slug,
      limit: 1
    })

    if (entries.items.length === 0) {
      return {
        statusCode: 404,
        body: 'Entry not found'
      }
    }

    // Set the preview cookie
    setCookie(event, 'contentful-preview', 'true', {
      path: '/',
      httpOnly: false,
      maxAge: 60 * 60, // 1 hour
      sameSite: 'lax'
    })

    // Redirect to the page with the entry
    let redirectUrl = `/${slug}?preview=true`
    if (query.redirectPath) {
      redirectUrl = `/${query.redirectPath}?preview=true` as string
    }

    await sendRedirect(event, redirectUrl, 307);

  } catch (error) {
    console.error('Preview error:', error)
    return {
      statusCode: 500,
      body: 'Error in preview'
    }
  }
})

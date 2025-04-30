import { createClient } from 'contentful'
import { defineEventHandler, getQuery, setCookie } from 'h3'

export default defineEventHandler(async (event) => {
  // Get query parameters
  const query = getQuery(event)
  const secret = query.secret as string
  const slug = query.slug as string

  // Validate the preview secret 
  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return {
      statusCode: 401,
      body: 'Invalid token'
    }
  }

  // Make sure the slug exists
  if (!slug) {
    return {
      statusCode: 401,
      body: 'No slug provided'
    }
  }

  // Create Contentful preview client
  const previewClient = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN as string,
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
    let redirectUrl = `/${slug}`
    if (query.redirectPath) {
      redirectUrl = query.redirectPath as string
    }

    return {
      statusCode: 307,
      headers: {
        Location: redirectUrl
      }
    }
  } catch (error) {
    console.error('Preview error:', error)
    return {
      statusCode: 500,
      body: 'Error in preview'
    }
  }
})

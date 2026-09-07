import { loadCatalog } from '../server/catalog-feed.mjs'

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    response.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const catalog = await loadCatalog()
    response.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=86400')
    response.status(200).json(catalog)
  } catch (error) {
    response.status(502).json({ error: 'Catalog feed unavailable', detail: error.message })
  }
}

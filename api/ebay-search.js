import { searchEbay } from '../server/ebay.mjs'

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    response.status(405).json({ error: 'Method not allowed' })
    return
  }

  const query = request.query?.q ?? new URL(request.url, 'http://localhost').searchParams.get('q')
  const limit = request.query?.limit ?? new URL(request.url, 'http://localhost').searchParams.get('limit')
  const marketplace = request.query?.marketplace ?? new URL(request.url, 'http://localhost').searchParams.get('marketplace')

  try {
    const result = await searchEbay({ query, limit, marketplace })
    response.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=86400')
    response.status(200).json(result)
  } catch (error) {
    const status = error.message.includes('not configured') ? 503 : error.message.includes('required') ? 400 : 502
    response.status(status).json({ error: 'eBay search unavailable', detail: error.message })
  }
}

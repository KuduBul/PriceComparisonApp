import { products } from '../server/products.mjs'

export default function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    response.status(405).json({ error: 'Method not allowed' })
    return
  }

  response.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=86400')
  response.status(200).json({
    products,
    source: 'mvp-catalog',
    updatedAt: new Date().toISOString(),
  })
}

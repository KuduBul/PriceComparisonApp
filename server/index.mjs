import { createServer } from 'node:http'
import { loadCatalog } from './catalog-feed.mjs'

const port = Number(process.env.API_PORT ?? 8787)

const server = createServer(async (request, response) => {
  if (request.method === 'GET' && request.url === '/api/health') {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify({ status: 'ok', service: 'catalog-api' }))
    return
  }

  if (request.method === 'GET' && request.url === '/api/products') {
    try {
      const catalog = await loadCatalog()
      response.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' })
      response.end(JSON.stringify(catalog))
    } catch (error) {
      response.writeHead(502, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify({ error: 'Catalog feed unavailable', detail: error.message }))
    }
    return
  }

  response.writeHead(404, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify({ error: 'Not found' }))
})

server.listen(port, () => {
  console.log(`Catalog API listening on http://localhost:${port}`)
})

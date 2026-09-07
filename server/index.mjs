import { createServer } from 'node:http'
import { products } from './products.mjs'

const port = Number(process.env.API_PORT ?? 8787)

const server = createServer((request, response) => {
  if (request.method === 'GET' && request.url === '/api/health') {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify({ status: 'ok', service: 'catalog-api' }))
    return
  }

  if (request.method === 'GET' && request.url === '/api/products') {
    response.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' })
    response.end(JSON.stringify({ products, source: 'mvp-catalog', updatedAt: new Date().toISOString() }))
    return
  }

  response.writeHead(404, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify({ error: 'Not found' }))
})

server.listen(port, () => {
  console.log(`Catalog API listening on http://localhost:${port}`)
})

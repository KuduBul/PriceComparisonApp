import { products as fallbackProducts } from './products.mjs'

const feedUrl = process.env.CATALOG_FEED_URL
const feedToken = process.env.CATALOG_FEED_TOKEN
const timeoutMs = Number(process.env.CATALOG_FEED_TIMEOUT_MS ?? 5000)

function isValidUrl(value) {
  try {
    const url = new URL(value)
    return url.protocol === 'https:'
  } catch {
    return false
  }
}

function firstDefined(...values) {
  return values.find((value) => value !== undefined && value !== null && value !== '')
}

function toNumber(value, fallback = 0) {
  const number = Number(value)
  return Number.isFinite(number) ? number : fallback
}

function normalizeProduct(item, index) {
  const localOffer = item.localOffer ?? item.local ?? {}
  const importOffer = item.importOffer ?? item.import ?? {}
  const name = String(firstDefined(item.name, item.title, 'Unnamed product'))
  const brand = String(firstDefined(item.brand, 'Unknown brand'))

  return {
    id: Number(firstDefined(item.id, item.gtin, item.mpn, index + 1)),
    name,
    brand,
    image: String(firstDefined(item.image, item.imageUrl, item.image_link, '')),
    rating: toNumber(firstDefined(item.rating, item.userRating), 0),
    reviews: toNumber(firstDefined(item.reviews, item.reviewCount), 0),
    tag: String(firstDefined(item.tag, 'Live offer')),
    score: toNumber(firstDefined(item.score, item.qualityScore), 0),
    localPrice: toNumber(firstDefined(localOffer.price, item.localPrice)),
    importPrice: toNumber(firstDefined(importOffer.price, item.importPrice)),
    importShipping: toNumber(firstDefined(importOffer.shipping, item.importShipping)),
    battery: String(firstDefined(item.battery, item.batteryLife, 'Not supplied')),
    weight: String(firstDefined(item.weight, 'Not supplied')),
    anc: String(firstDefined(item.anc, item.noiseCancellation, 'Not supplied')),
    localStore: String(firstDefined(localOffer.store, item.localStore, 'Local retailer')),
    importStore: String(firstDefined(importOffer.store, item.importStore, 'International retailer')),
    localUrl: String(firstDefined(localOffer.url, item.localUrl, '')),
    importUrl: String(firstDefined(importOffer.url, item.importUrl, '')),
    accent: String(firstDefined(item.accent, '#d8f45a')),
    availability: String(firstDefined(item.availability, localOffer.availability, importOffer.availability, 'unknown')),
    updatedAt: String(firstDefined(item.updatedAt, localOffer.updatedAt, importOffer.updatedAt, new Date().toISOString())),
  }
}

function validateProducts(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Feed must contain a non-empty products array')
  }

  const products = items.map(normalizeProduct)
  const invalid = products.find((product) => !product.id || !product.name || !product.localUrl && !product.importUrl)
  if (invalid) {
    throw new Error(`Feed product ${invalid.name || 'unknown'} is missing an id, name, or offer URL`)
  }

  return products
}

export async function loadCatalog() {
  if (!feedUrl) {
    return { products: fallbackProducts, source: 'local fallback', updatedAt: new Date().toISOString(), warning: 'CATALOG_FEED_URL is not configured' }
  }

  if (!isValidUrl(feedUrl)) {
    throw new Error('CATALOG_FEED_URL must be an HTTPS URL')
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const headers = { Accept: 'application/json' }
    if (feedToken) headers.Authorization = `Bearer ${feedToken}`
    const response = await fetch(feedUrl, { headers, signal: controller.signal })
    if (!response.ok) throw new Error(`Feed returned HTTP ${response.status}`)
    const payload = await response.json()
    const items = payload.products ?? payload.items ?? payload
    return { products: validateProducts(items), source: new URL(feedUrl).hostname, updatedAt: new Date().toISOString() }
  } finally {
    clearTimeout(timeout)
  }
}

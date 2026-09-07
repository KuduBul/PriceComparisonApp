const apiBaseUrl = process.env.EBAY_API_BASE_URL ?? 'https://api.ebay.com'
const clientId = process.env.EBAY_CLIENT_ID
const clientSecret = process.env.EBAY_CLIENT_SECRET
const marketplaceId = process.env.EBAY_MARKETPLACE_ID ?? 'EBAY_US'
const timeoutMs = Number(process.env.EBAY_TIMEOUT_MS ?? 7000)

let accessToken
let tokenExpiresAt = 0

function requiredConfiguration() {
  if (!clientId || !clientSecret) {
    throw new Error('EBAY_CLIENT_ID and EBAY_CLIENT_SECRET are not configured')
  }
}

async function request(url, options = {}) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(url, { ...options, signal: controller.signal })
    if (!response.ok) {
      const body = await response.text()
      throw new Error(`eBay returned HTTP ${response.status}: ${body.slice(0, 180)}`)
    }
    return response.json()
  } finally {
    clearTimeout(timeout)
  }
}

async function getAccessToken() {
  requiredConfiguration()
  if (accessToken && Date.now() < tokenExpiresAt) return accessToken

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  const payload = await request(`${apiBaseUrl}/identity/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope',
  })

  accessToken = payload.access_token
  tokenExpiresAt = Date.now() + Math.max(60, Number(payload.expires_in ?? 7200) - 60) * 1000
  return accessToken
}

function normalizeOffer(item) {
  const price = Number(item.price?.value)
  const shipping = Number(item.shippingOptions?.[0]?.shippingCost?.value ?? 0)
  return {
    id: item.itemId,
    title: item.title,
    image: item.image?.imageUrl ?? '',
    url: item.itemAffiliateWebUrl ?? item.itemWebUrl ?? '',
    price: Number.isFinite(price) ? price : null,
    currency: item.price?.currency ?? null,
    shipping,
    condition: item.condition ?? 'Unknown',
    availability: item.buyingOptions?.length ? 'in_stock' : 'unknown',
    seller: item.seller?.username ?? 'eBay seller',
    sellerFeedback: item.seller?.feedbackPercentage ?? null,
    location: item.itemLocation?.country ?? null,
    categories: item.categories ?? [],
    source: 'eBay Browse API',
  }
}

export async function searchEbay({ query, limit = 20, marketplace = marketplaceId }) {
  const trimmedQuery = String(query ?? '').trim()
  if (!trimmedQuery) throw new Error('A search query is required')
  const token = await getAccessToken()
  const params = new URLSearchParams({ q: trimmedQuery, limit: String(Math.min(Math.max(Number(limit) || 20, 1), 50)) })
  const payload = await request(`${apiBaseUrl}/buy/browse/v1/item_summary/search?${params}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-EBAY-C-MARKETPLACE-ID': marketplace,
      Accept: 'application/json',
    },
  })

  return {
    query: trimmedQuery,
    marketplace,
    total: payload.total ?? 0,
    offers: (payload.itemSummaries ?? []).map(normalizeOffer),
    source: 'eBay Browse API',
    updatedAt: new Date().toISOString(),
  }
}

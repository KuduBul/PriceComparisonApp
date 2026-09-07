# Sift

South African product comparison prototype focused on realistic ZAR cost, product quality, and import decisions.

## Current MVP Slice

- Over-ear headphone catalogue.
- Search and ZAR budget filtering.
- Local versus imported offer estimates.
- Editable landed-cost calculator.
- Product comparison tray.
- Local catalogue API with frontend fallback.
- Configurable permitted HTTPS feed adapter.

## Run Locally

Install dependencies:

```bash
npm install
```

Start the catalogue API in one terminal:

```bash
npm run dev:api
```

Start the frontend in another terminal:

```bash
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/).

The API is available at:

- `GET http://localhost:8787/api/health`
- `GET http://localhost:8787/api/products`

The frontend proxies `/api` requests to port 8787. If the API is unavailable, the UI uses the local seed catalogue so the prototype remains usable.

## Configure a Permitted Live Feed

Set `CATALOG_FEED_URL` to an HTTPS JSON feed supplied by a retailer, affiliate network, manufacturer, or licensed data provider. Do not point it at a retailer page or scrape a site without permission.

```bash
cp .env.example .env
```

The feed contract is documented in [docs/live-feed-contract.md](docs/live-feed-contract.md). `CATALOG_FEED_TOKEN` can be used for a provider that requires bearer authentication. On Vercel, configure these as Project Environment Variables for Preview and Production; do not commit the values.

When `CATALOG_FEED_URL` is not configured, the API deliberately reports `local fallback` so the deployment does not present fixture data as live retailer data.

When deployed to Vercel, the files in `api/` provide the same endpoints as native Vercel serverless functions, so no long-running Node process is required in production.

## Verification

```bash
npm run lint
npm run build
```

## Project Documents

- [Business requirements](BRD.md)
- [Development tasks](DEVELOPMENT_TASKS.md)

## Next Implementation Boundary

The feed adapter is now in place. The next boundary is to obtain a permitted retailer or affiliate feed, configure `CATALOG_FEED_URL` in Vercel, and then persist products, offers, price observations, and landed-cost rule versions in a database. The current `server/products.mjs` file remains a deliberate local fallback until a provider feed is configured.

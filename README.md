# Sift

South African product comparison prototype focused on realistic ZAR cost, product quality, and import decisions.

## Current MVP Slice

- Over-ear headphone catalogue.
- Search and ZAR budget filtering.
- Local versus imported offer estimates.
- Editable landed-cost calculator.
- Product comparison tray.
- Local catalogue API with frontend fallback.

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

## Verification

```bash
npm run lint
npm run build
```

## Project Documents

- [Business requirements](BRD.md)
- [Development tasks](DEVELOPMENT_TASKS.md)

## Next Implementation Boundary

Replace the MVP catalogue records with permitted retailer feeds and persist products, offers, price observations, and landed-cost rule versions in a database. The current `server/products.mjs` file is intentionally a small backend fixture for validating that boundary.

# Live Feed Contract

The app accepts a permitted HTTPS JSON feed through `CATALOG_FEED_URL`. The feed must be supplied by a retailer, affiliate network, manufacturer, or licensed data provider under terms that allow this use.

The response may be either:

```json
{
  "products": []
}
```

or a direct JSON array of product records. `items` is also accepted as the array property.

## Required fields

Each product must include:

- `id`: stable numeric product identifier.
- `name` or `title`.
- At least one offer URL: `localOffer.url`, `importOffer.url`, `localUrl`, or `importUrl`.

## Recommended product fields

```json
{
  "id": 123,
  "name": "WH-1000XM5",
  "brand": "Sony",
  "gtin": "4548736136493",
  "mpn": "WH1000XM5B.CE7",
  "image": "https://cdn.example.com/product.jpg",
  "rating": 4.8,
  "reviews": 328,
  "score": 92,
  "battery": "30 hrs",
  "weight": "250 g",
  "anc": "Excellent",
  "availability": "in_stock",
  "localOffer": {
    "store": "Local retailer",
    "url": "https://retailer.example.za/product/123",
    "price": 6499,
    "currency": "ZAR",
    "shipping": 0,
    "availability": "in_stock",
    "updatedAt": "2026-09-07T09:00:00Z"
  },
  "importOffer": {
    "store": "International retailer",
    "url": "https://retailer.example/product/123",
    "price": 3560,
    "currency": "USD",
    "shipping": 480,
    "availability": "in_stock",
    "updatedAt": "2026-09-07T09:00:00Z"
  }
}
```

## Feed safety rules

- The URL must use HTTPS.
- The app does not scrape retailer pages.
- The provider must have permission to supply the data.
- Product IDs must remain stable between refreshes.
- Prices must include their source currency.
- Offer URLs must point to the product or permitted affiliate destination.
- Missing or malformed feeds return an error rather than silently replacing live data.

The current adapter also accepts flat compatibility fields such as `localPrice`, `localUrl`, `importPrice`, and `importUrl` while providers migrate to the offer structure.

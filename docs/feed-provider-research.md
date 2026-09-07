# Live Feed Provider Research

**Date:** 2026-09-07  
**Use case:** South African product comparison, starting with headphones  
**Requirement:** Permitted machine-readable product and offer data with product URLs, prices, availability, images, and affiliate attribution where available.

## Executive Finding

There is no verified public Takealot or PriceCheck JSON feed URL that can be configured immediately without an approved partner account. The practical options are authenticated APIs or private feed URLs issued after approval by an affiliate network or marketplace.

The best first integration candidate is **eBay Browse API** because its official documentation exposes a concrete JSON search endpoint and clearly documents prices, images, item URLs, shipping summaries, marketplace context, and affiliate URLs. For a broader multi-retailer catalogue, **CJ Product Feed API** or **Awin** should be evaluated after publisher approval and advertiser-program access.

## Provider Comparison

| Provider | Access model | Machine-readable product data | Purchase / affiliate link | South Africa fit | Recommendation |
|---|---|---|---|---|---|
| eBay Browse API | Developer account plus OAuth client-credentials token | JSON REST API; search by keyword, category, GTIN, product, filters, price, condition, aspects | `itemAffiliateWebUrl` is documented for eBay Partner Network commission tracking | Useful for international/import offers; destination, shipping, and currency need validation per marketplace | Best first technical integration |
| CJ Affiliate | Publisher account, advertiser/program approval, API credentials | Product Feed GraphQL API; searches by price, currency, country, serviceable area, UPC | CJ links and advertiser relationships are provided through publisher APIs/tools | Potentially broad; depends on advertisers available to the publisher and SA targeting | Best multi-retailer network candidate |
| Awin | Approved publisher account and advertiser/program relationships | Product feeds and affiliate tools are available through the Awin platform; feed URLs are account/program-specific | Tracking links and advertiser-approved product destinations | Awin operates internationally, but SA retailer/program availability must be checked after signup | Strong affiliate-network candidate |
| Admitad | Publisher account and campaign approval | Product feeds/tools are available inside the platform; public feed URL not found | Deeplinks and affiliate tracking are account/campaign-specific | Global network; local coverage must be verified in its advertiser directory | Secondary network candidate |
| Amazon Associates / Creators API | Associates account, qualifying requirements, API credentials | Product advertising/Creators API; access and marketplace eligibility are account-dependent | Amazon affiliate links | Good international import source, but API access and marketplace rules require approval | Apply separately for import inventory |
| Takealot | Retailer affiliate/partner route | No public JSON feed or API documentation was verified from official accessible pages | Affiliate route may be available after partner approval | Highest local relevance | Contact Takealot directly; do not scrape |
| PriceCheck | Local comparison service | No public feed/API documentation was verified; site access was restricted during research | Partnership terms would need direct confirmation | High local relevance if partnership is available | Contact directly; do not scrape |

## Official Documentation

### eBay

- [Browse API overview](https://developer.ebay.com/api-docs/buy/browse/overview.html)
- [Item summary search](https://developer.ebay.com/api-docs/buy/browse/resources/item_summary/methods/search.html)
- [OAuth client-credentials flow](https://developer.ebay.com/develop/guides-v2/authorization/authorization)
- [eBay API licence agreement](https://developer.ebay.com/join/api-license-agreement)

The official search documentation states that the endpoint is:

```text
GET https://api.ebay.com/buy/browse/v1/item_summary/search
```

It supports keyword, category, GTIN, price, condition, aspects, pagination, and sorting. The API requires an `Authorization` header and an application access token. For affiliate commission, the documentation says to forward the buyer using `itemAffiliateWebUrl`.

Important limitations:

- This is an authenticated API, not an anonymous feed URL.
- It returns listings, not necessarily canonical product records.
- Product matching and variant deduplication remain application responsibilities.
- Shipping, marketplace, importability, and delivery to South Africa need to be checked per item.

### CJ Affiliate

- [CJ Developer Portal](https://developers.cj.com/)
- [CJ authentication](https://developers.cj.com/authentication/overview)
- [Product Feed GraphQL reference](https://developers.cj.com/graphql/reference/Product%20Feed)
- [Link Search API](https://developers.cj.com/docs/rest-apis/link-search)
- [Advertiser Lookup API](https://developers.cj.com/docs/rest-apis/advertiser-lookup)
- [CJ publisher platform](https://www.cj.com/publisher)

CJ's official developer portal describes the Product Feed API as a GraphQL API that can search products by criteria including price, currency, country, serviceable area, and UPC. It also exposes advertiser lookup, link search, authentication, and product-feed documentation.

Important limitations:

- Requires publisher credentials and access to approved advertiser programs.
- A product feed is not available as a public unauthenticated URL.
- Individual advertiser terms determine whether price, stock, images, and destinations may be displayed.

### Awin

- [Awin publisher/editorial media sites](https://www.awin.com/gb/publishers/editorial-media-sites)
- [Awin publisher signup](https://ui.awin.com/publisher-signup/en/awin/step1)
- [Awin developer documentation](https://help.awin.com/developers/docs)
- [Awin FAQ](https://www.awin.com/gb/faqs)
- [Awin compliance](https://www.awin.com/gb/compliance)

Awin states that publishers can join advertiser programs, use affiliate links, and access partner tools. Its developer documentation covers integration and product-level tracking. Feed URLs and permissions are expected to be generated per publisher/advertiser relationship rather than published publicly.

Important limitations:

- Must be accepted as a publisher and approved for relevant advertisers.
- Product data availability varies by advertiser.
- Affiliate disclosures and Awin compliance requirements apply.

### Admitad

- [Admitad publisher registration](https://store.admitad.com/en/webmaster/registration/)
- [Admitad publisher platform](https://store.admitad.com/en/webmaster/)
- [Admitad main site](https://www.admitad.com/)

Admitad describes a global affiliate ecosystem and publisher tooling, but the product-feed details are account-gated in the accessible documentation. Treat it as a fallback network candidate rather than the first technical integration.

### Amazon

- [Amazon Creators API deprecation notice](https://affiliate-program.amazon.com/creatorsapi/docs/en-us/paapiv5-deprecation)
- [Amazon Associates API entry point](https://affiliate-program.amazon.com/gp/advertising/api/detail/main.html)

Amazon's older Product Advertising API documentation now redirects to a Creators API transition/deprecation notice. Amazon access is therefore not recommended as the first integration until an Associates account confirms the currently supported API, marketplace, and quota terms.

## Recommended Sequence

1. Apply to eBay Developers and eBay Partner Network.
2. Implement eBay Browse API as the first international offer provider.
3. Apply to CJ as a publisher and inspect South Africa-relevant electronics advertisers.
4. Apply to Awin and inspect local or internationally shipping electronics programs.
5. Contact Takealot and PriceCheck directly for a local feed or partnership agreement.
6. Add each approved source as a separate adapter rather than forcing all providers into one unverified scraping path.

## Data Required from Each Approved Provider

The adapter should request or map:

- Stable product/listing ID.
- Brand, title, model, MPN, GTIN/EAN.
- Product image URL.
- Product URL and affiliate URL.
- Price and ISO currency.
- Sale price and effective dates, if applicable.
- Availability and last-update time.
- Seller and seller location.
- Condition.
- Shipping cost, destination, and delivery estimate.
- Return and warranty information where available.
- Feed/API attribution and commercial disclosure metadata.

The application feed contract is documented in [live-feed-contract.md](live-feed-contract.md). It accepts an approved HTTPS feed URL, but eBay and CJ will more likely be integrated through authenticated server-side adapters rather than a single static feed URL.

## Decision

Proceed with **eBay Browse API** as the first live provider because it has the clearest official API contract and supports affiliate forwarding. Do not configure a fake URL or scrape Takealot/PriceCheck. The next implementation task is an authenticated eBay adapter with environment variables for client credentials and marketplace selection.

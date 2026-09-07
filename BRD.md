# Business Requirements Document
## South African Product Comparison and Landed-Cost Platform

**Status:** Draft  
**Date:** 2026-09-07  
**MVP category:** Over-ear headphones  
**Market:** South Africa  
**Currency:** ZAR

## 1. Vision

Help South African shoppers make informed product decisions by comparing quality, local and international prices, delivery, warranty, seller trust, and realistic landed cost in one place.

The differentiator is a transparent answer to: **What will this product really cost me in South Africa, and is importing it worth the risk?**

## 2. Problem

Shoppers currently need to combine retailer pages, review sites, currency conversion, shipping estimates, customs information, and warranty research manually. A foreign sticker price converted to rand is often misleading because shipping, import VAT, duties, courier fees, exchange-rate movement, and warranty limitations can change the decision.

## 3. MVP Scope

- Search and browse over-ear headphones.
- Category-specific filters and specifications.
- Local and international retailer offers.
- ZAR currency conversion.
- Itemised landed-cost ranges for imported products.
- Independent review, expert review, and user-rating signals.
- Separate quality, price, and value scores.
- Side-by-side comparison of two to five products.
- Price history and alerts.
- Saved products and shortlists.
- Retailer, seller, warranty, and return indicators.
- Freshness timestamps and source provenance.
- Responsive web experience.

## 4. Landed-Cost Model

```text
Product price
+ international shipping
+ insurance, where applicable
+ estimated customs duty
+ import VAT
+ courier clearance or disbursement fees
+ payment or foreign-exchange fees
+ local delivery
= estimated landed cost in ZAR
```

The platform must show best-case, likely, and worst-case estimates, confidence, assumptions, confirmed costs, estimated costs, and unknown costs. Estimates are not tax or legal advice and must link to official sources. Tariff classification must remain configurable rather than hardcoded to a universal rate.

## 5. Core Requirements

### Product and offer comparison

Every offer should show retailer, seller, condition, price, currency, conversion rate, shipping, delivery estimate, stock, warranty, returns, source link, and last updated time. Local fulfilment and international fulfilment must be clearly separated.

### Quality and recommendations

For headphones, support sound quality, noise cancellation, comfort, microphone, battery, ease of use, and build quality where source-backed. Recommendations should include Best Overall, Best Under Budget, Best Local, Best Imported, Best Quality, Best Use Case, and Worth Paying More For.

### Trust and transparency

Sponsored placements must be labelled. Commercial relationships must not silently change organic rankings. Product matching must use identifiers and variants and must expose uncertainty rather than silently merging products.

## 6. Non-functional Requirements

- Price and stock freshness timestamps.
- Reproducible calculation inputs and versioned rules.
- Auditable ranking and scoring.
- POPIA-aware data minimisation and consent.
- Accessible keyboard and mobile experience.
- Retailer data used through permitted APIs, feeds, affiliate programmes, licences, or compliant crawling.
- Explicit unavailable or estimated states when data is missing.

## 7. Success Metrics

- Search-to-comparison rate.
- Comparison-to-retailer-click rate.
- Product-match accuracy.
- Percentage of fresh offers.
- Landed-cost estimate accuracy where actual charges are reported.
- Price-alert engagement.
- User-reported savings.
- Repeat usage.
- User understanding of local versus imported total cost.

## 8. Risks

Incorrect import estimates, stale prices, mismatched variants, counterfeit or grey-import offers, data licensing restrictions, exchange-rate volatility, review manipulation, and perceived ranking bias. Mitigations include ranges, timestamps, source provenance, seller indicators, clear disclosures, and a data-quality review queue.

## 9. Reference Benchmarks

- [idealo](https://www.idealo.co.uk/): price comparison, history, alerts, reviews, and retailer transparency.
- [PriceRunner](https://www.pricerunner.com/): broad product and retailer comparison.
- [Google Merchant product specification](https://support.google.com/merchants/answer/7052112): identifiers, variants, price, shipping, returns, and availability model.
- [Which? headphones](https://www.which.co.uk/reviews/headphones): independent tests, pros and cons, filters, and buying guides.
- [RTINGS](https://www.rtings.com/about/methodology): repeatable testing and category-specific sub-scores.
- [PriceCheck](https://www.pricecheck.co.za/): South African comparison reference.
- [SARS importation guidance](https://www.sars.gov.za/customs-and-excise/import-export-and-transit/importation/): official source for customs requirements.

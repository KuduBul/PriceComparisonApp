# Development Tasks
## Product Comparison App MVP

**Related document:** [BRD](BRD.md)  
**MVP:** South African over-ear headphone comparison with ZAR landed-cost estimates

## Priority

- **P0:** Required for first usable release.
- **P1:** Important for pilot; can follow the first vertical slice.
- **P2:** Post-MVP enhancement.

## Foundations

- [ ] **TASK-001 P0** Confirm user journeys: search, filter, detail, compare, import check, save, alert.
- [ ] **TASK-002 P0** Finalise headphone category schema and units.
- [ ] **TASK-003 P0** Choose architecture, hosting, database, search, jobs, and deployment workflow.
- [ ] **TASK-004 P0** Document local setup, environment variables, formatting, linting, tests, and CI.
- [ ] **TASK-005 P0** Establish responsive design system and shared UI components.

## Product and Retailer Data

- [ ] **TASK-006 P0** Identify permitted retailer, manufacturer, review, exchange-rate, and import-cost sources.
- [ ] **TASK-007 P0** Create models for products, variants, identifiers, specifications, retailers, sellers, offers, reviews, warranties, returns, and price observations.
- [ ] **TASK-008 P0** Implement product and variant matching using brand, model, MPN, GTIN/EAN, SKU, URL, images, and variant attributes.
- [ ] **TASK-009 P0** Load an initial catalogue of at least 50 verified headphone products.
- [ ] **TASK-010 P0** Build local retailer offer ingestion.
- [ ] **TASK-011 P0** Build international retailer offer ingestion.
- [ ] **TASK-012 P0** Add refresh jobs, retries, rate limits, stale suppression, and failure handling.
- [ ] **TASK-013 P1** Build an internal data-quality queue for duplicates, conflicts, stale offers, unusual prices, and unresolved matches.
- [ ] **TASK-014 P0** Store source URL, source type, retrieval time, confidence, and transformation history.

## Currency and Landed Cost

- [ ] **TASK-015 P0** Integrate an exchange-rate provider and store rate timestamps.
- [ ] **TASK-016 P0** Define versioned import-cost rules and assumptions.
- [ ] **TASK-017 P0** Implement itemised best-case, likely, and worst-case landed-cost service.
- [ ] **TASK-018 P0** Build the editable landed-cost calculator interface.
- [ ] **TASK-019 P1** Add sensitivity analysis for shipping, duties, VAT, courier fees, and exchange rates.
- [ ] **TASK-020 P0** Add estimate disclaimers and official-source links.

## Search and Comparison Experience

- [ ] **TASK-021 P0** Implement product search API.
- [ ] **TASK-022 P0** Implement category-aware filters and sorting.
- [ ] **TASK-023 P0** Build search and category pages with loading, empty, error, and stale-data states.
- [ ] **TASK-024 P0** Build product detail page with offers, specs, scores, reviews, history, and landed cost.
- [ ] **TASK-025 P0** Build two-to-five product side-by-side comparison page.
- [ ] **TASK-026 P1** Add saved products, shortlists, notes, and shareable comparisons.

## Quality, Value, and Trust

- [ ] **TASK-027 P0** Store expert and independent review references with source, date, score, pros, cons, and methodology.
- [ ] **TASK-028 P0** Implement headphone quality sub-scores.
- [ ] **TASK-029 P0** Implement separate price, quality, and value scores.
- [ ] **TASK-030 P1** Add user preference weighting for price, quality, delivery, warranty, comfort, ANC, and import certainty.
- [ ] **TASK-031 P0** Implement recommendation cards and explanations.
- [ ] **TASK-032 P1** Add review-quality controls and suspicious-rating flags.
- [ ] **TASK-033 P1** Create retailer and seller trust profiles.
- [ ] **TASK-034 P0** Add sponsored and affiliate disclosures.
- [ ] **TASK-035 P0** Implement auditable offer ranking rules.

## Price History and Alerts

- [ ] **TASK-036 P0** Store local and international price observations.
- [ ] **TASK-037 P0** Build 30, 90, and 365-day price-history views.
- [ ] **TASK-038 P1** Implement product-price, landed-cost, percentage-drop, and back-in-stock alert rules.
- [ ] **TASK-039 P1** Add email alerts with pause, edit, and delete controls.

## Security, Testing, and Launch

- [ ] **TASK-040 P1** Implement privacy-conscious authentication and account deletion.
- [ ] **TASK-041 P0** Add POPIA-aware privacy, consent, terms, and cookie controls.
- [ ] **TASK-042 P1** Build an administration dashboard and role-based access control.
- [ ] **TASK-043 P0** Create fixtures for local, imported, stale, out-of-stock, variant, sponsored, refurbished, and uncertain-cost cases.
- [ ] **TASK-044 P0** Test product matching and unresolved states.
- [ ] **TASK-045 P0** Test landed-cost calculations and rounding.
- [ ] **TASK-046 P0** Test scoring, ranking, missing data, user weights, and sponsorship.
- [ ] **TASK-047 P0** Add end-to-end tests for search, comparison, calculator, saving, and alerts.
- [ ] **TASK-048 P0** Test accessibility and responsive layouts.
- [ ] **TASK-049 P0** Perform security and privacy review.
- [ ] **TASK-050 P0** Add monitoring for errors, source health, jobs, calculations, search, and notifications.
- [ ] **TASK-051 P0** Add product and data-quality analytics.
- [ ] **TASK-052 P1** Create user correction and support workflow.
- [ ] **TASK-053 P0** Prepare production checklist, backups, rollback, source permissions, and support contact.
- [ ] **TASK-054 P0** Run a controlled pilot with South African electronics shoppers.

## Current Prototype Tasks

- [x] Scaffold React TypeScript Vite app.
- [x] Add responsive Sift comparison dashboard.
- [x] Add search and budget filter interactions.
- [x] Add local and imported offer cards.
- [x] Add compare tray selection interaction.
- [x] Add editable landed-cost calculator drawer.
- [x] Add source and estimate transparency copy.
- [ ] Replace prototype data with permitted live feeds.
- [ ] Add real persistence and backend services.

## MVP Release Gate

The first version should not be released publicly until at least 50 products are searchable, local and international offers are separate, all offers have source and freshness metadata, imported totals show itemised ranges, quality/price/value scores are explainable, three-product comparison works, alerts work, sponsorship is disclosed, critical tests pass, and monitoring is active.

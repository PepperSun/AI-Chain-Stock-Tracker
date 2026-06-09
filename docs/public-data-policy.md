# Public Data Policy

This repository uses synthetic demo data only.

## Rules

- Do not commit production ticker lists.
- Do not commit production segment or subsegment names.
- Do not commit production weighting, ranking, aggregation, or sorting logic.
- Do not commit original research spreadsheets, PRDs, or design drafts.
- Do not commit local secrets, Cloudflare local state, or production Cloudflare
  resource identifiers.

## Acceptable Public Data

- Synthetic display-unit codes such as `A-01` or `B-02`.
- Generic display group labels such as `Display Group Alpha`.
- Precomputed toy values with no relationship to production behavior.
- Documentation that explains the public/private boundary.

## Review Before Publishing

Run:

```bash
npm test
rg -uu 'private-data-marker-placeholder' .
```

Then manually inspect README, docs, tests, and JavaScript files before making a
repository public.

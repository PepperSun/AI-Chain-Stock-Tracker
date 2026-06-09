# Testing Strategy

The showcase repository uses lightweight Node tests.

## Test Goals

- Confirm the demo data is internally consistent.
- Confirm the demo helpers format display values correctly.
- Guard against accidentally committing private production markers.
- Keep the repository usable without external services.

## Commands

```bash
npm test
```

For a local browser preview:

```bash
npm run serve
```

## Boundary

The tests do not validate production market-data behavior. Production data
providers, private ranking logic, and private aggregation methods are outside
the scope of this public repository.


# Spectrum. Marketplace redesign

This revision keeps the existing client-side marketplace domain model and upgrades the experience around it. The application now presents three explicit workspace choices in the shared header: **Buyer** for discovery, wishlist, cart, checkout, and order tracking; **Seller** for product listing and merchant preview; and **Admin** for analytics, inventory, orders, color studio, and promotions.

The visual system uses a warm paper background, ink/graphite surfaces, thin low-contrast borders, a lime-mint primary accent, soft lavender seller state, and restrained shadows. The new shared shell includes grouped utilities, a focused search field with keyboard `/` shortcut, category pills, responsive wrapping, and page-level entrance motion. Nonessential motion is disabled under `prefers-reduced-motion`.

Important repairs include the previously unreachable `color-hub` renderer path, defensively capped cart quantities, out-of-stock handling, and coupon minimum-spend messaging formatted in the active currency. The implementation is still client-side and uses the existing localStorage-backed commerce context.

## Validation

```bash
pnpm install --ignore-scripts
pnpm exec tsc --noEmit
pnpm run build
```

The final type check and Vite production build pass successfully.

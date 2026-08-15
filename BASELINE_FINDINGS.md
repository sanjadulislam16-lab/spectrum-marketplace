# Spectrum Marketplace baseline findings

## Current stack
- React 19 + Vite + TypeScript
- Tailwind CSS 4 utilities, lucide-react icons, Motion package installed
- Client-side state in `src/context/CommerceContext.tsx`, persisted to localStorage
- 11 seeded products, cart, wishlist, orders, coupons, color presets

## Current strengths
- Existing buyer catalog, product detail, cart, checkout, wishlist, order history, color hub, seller portal, and admin dashboard components
- Existing bilingual UI (Bangla/English), currency switching, theme switching, search, filters, coupon application, product CRUD, and order status updates
- Product imagery and metadata are already seeded with coherent marketplace content

## Confirmed issues / risks
- `App.tsx` compares `activeView === 'colors'`, but `AppView` defines `color-hub`; Color Hub is therefore unreachable from the main renderer.
- Existing header exposes seller and admin actions, but there is no clear three-role selector or buyer entry point.
- Header is visually dense: too many controls compete in one row and the navigation does not clearly communicate the primary persona.
- Visual language is inconsistent across storefront, seller, and admin areas (amber/rose/indigo/surface combinations, mixed radii, and mixed spacing).
- Existing global CSS only sets the font and dark color scheme; motion, focus styles, gradients, reduced-motion behavior, and surface tokens are not centralized.
- Existing app has no obvious route/address state, so role switching should remain in the shared context and preserve the current client-side flow.
- `pnpm install` required `--ignore-scripts` in the sandbox because package build scripts are blocked; the app can still be type-checked/built after dependency setup is complete.

## Redesign direction
Use a calm minimalist system: warm paper background, ink typography, soft graphite surfaces, one electric mint accent, thin borders, restrained shadows, and high-quality transform/opacity motion. Add a visible role switcher for Buyer, Seller, and Admin and preserve all current domain functionality behind those entry points.

## Browser verification after redesign
The refreshed storefront now exposes a visible three-way role switcher labeled Buyer/ক্রেতা, Seller/সেলার, and Admin/অ্যাডমিন. Seller switches to the existing listing workflow, Admin switches to the analytics/inventory dashboard, and Color Studio now renders because the `color-hub` route comparison was corrected. The updated header is visibly calmer, with a compact logo, centered search, grouped utility controls, and category pills. The existing storefront, seller form, admin dashboard, and color palette views all render without visible runtime errors in the browser.

The Buyer role returns to the storefront correctly. A direct attempt to trigger the catalog quick-add action did not increment the visible bag count in the current browser state, so the next step is to verify the product-card action targeting and fix it if the issue is reproducible.

The quick-add interaction is working: the overlay is intentionally revealed on card hover, and once visible the button increments the bag count from 0 to 1 and shows an “Added to Bag” toast. The first attempt was only a targeting issue because the overlay was not visible until the card was hovered.

## Final QA notes
The browser console showed only standard React DevTools informational messages and no runtime errors. TypeScript compilation is clean after the state hardening, and the production build completes successfully with Vite.

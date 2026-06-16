# Changelog / Fixes

## 2026-06-16 — GitHub repository setup package

- Created professional GitHub-ready repository structure.
- Moved approved static demo into `demo-static/`.
- Added root `index.html` redirect for GitHub Pages root deployment.
- Added `.nojekyll` for safer static asset handling.
- Added root README, license, gitignore, documentation, future-app placeholders, roadmap, QA checklist, and deployment plan.
- Preserved existing static demo files, branding, green-glass theme, sidebar/topbar layout, navigation style, and file names inside `demo-static/`.
- No backend code added in this setup phase.
- No frontend framework added in this setup phase.
- No UI redesign performed.

## Existing static demo fixes

The uploaded static demo already includes the final QA fixes from the previous prototype phase, including:

- saved invoice edit/re-edit flow
- draft invoice flow
- terminal hold/recall sale flow
- invoice product-name display fix
- salesman placement in invoice sales/footer info instead of repeated product column
- customer receivable demo flow
- stock deduction demo flow
- salesman targets and commission demo flow

The original static demo changelog is preserved inside `demo-static/CHANGELOG-FIXES.md`.

## 2026-06-16 — Product Add Flow + Tax 0% Static Demo Fix

- Fixed Add New Product so saved products are upserted into the existing localStorage product catalog by SKU.
- Added stable Add Product field IDs and reliable save selectors.
- Converted the New Sale product grid from hard-coded cards to dynamic rendering from the same product catalog used by Products List and POS search.
- Product search now supports product name, SKU, barcode and partial catalog matching.
- New products can be added to New Sale cart and Terminal search/scan flows.
- Sale completion and Terminal sale completion continue to deduct stock through the shared stock movement logic.
- Added central tax helpers in `js/app-data.js`: `getDefaultTaxRate()`, `getTaxLabel()` and tax-label update handling.
- Fixed Tax Settings so default tax rate and enabled/disabled status are really saved to localStorage.
- New Sale and Terminal now use the saved tax rate, including `0%`, instead of hard-coded 5% calculation.
- Invoice item `taxRate`, invoice tax amount, saved invoice totals and invoice preview/print data now respect the saved tax rate.
- Updated the service worker cache name to prevent GitHub Pages users from seeing stale cached JS/HTML.

## QA performed for this fix

- `node --check demo-static/js/main.js` passed.
- `node --check demo-static/js/app-data.js` passed.
- `node --check demo-static/js/retail-advanced.js` passed.
- `node --check demo-static/js/invoice-templates.js` passed.
- `node --check demo-static/js/charts.js` passed.
- `node --check demo-static/sw.js` passed.
- Searched the requested files for hard-coded `taxRate:5`, `taxRate: 5`, `Tax 5%`, `.05` and `0.05`; no matching sale-tax hard-code remains.
- Ran a static DOM/unit QA script confirming tax 0 helper behavior, dynamic product grid rendering by barcode, and stock deduction from 10 to 9.

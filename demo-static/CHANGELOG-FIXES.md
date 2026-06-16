# CHANGELOG-FIXES — Final Static QA Cleanup for GitHub Demo

## Scope

This pass keeps the project as a static HTML/CSS/JavaScript demo. No redesign, no backend conversion, no npm/build tools, and no framework migration were added.

## Files changed

- `sales.html`
- `customer.html`
- `products.html`
- `js/app-data.js`
- `js/retail-advanced.js`
- `sw.js`
- `README.md`
- `CHANGELOG-FIXES.md`

## Bugs fixed / improvements added

### 1. Unique invoice numbers

- Replaced the simple `INV-1048` reserve logic with a reusable generator that scans existing saved invoices and customer credit invoice rows.
- New invoice numbers now skip existing values such as seeded `INV-1048` and move to the next available number.
- New Sale and Terminal both use the safer generator.
- Editing an invoice preserves the original invoice number.

### 2. New Sale payment modal

- Added clear payment modal field IDs:
  - `paymentModalMethod`
  - `paymentModalAmount`
  - `paymentModalAccount`
  - `paymentModalReference`
  - `paymentModalCustomerCredit`
  - `paymentModalBalance`
- Complete Sale now reads actual modal values instead of ignoring the modal.
- Saved invoice rows now include `paid`, `balance`, `paymentMethod`, `paymentType`, `status`, `reference`, and `account`.
- Paid, credit and partial-payment statuses are calculated from actual amount received.

### 3. Customer receivable flow

- Added shared receivable sync logic for invoices with open balances.
- Credit and partially-paid invoices now create/update a matching `customerCreditInvoices` row.
- Fully-paid invoices close their receivable row safely.
- Customer receive-payment allocation now also updates the related saved invoice balance/status.
- Duplicate receivable rows for the same invoice number are avoided.

### 4. Stock movement logic

- Added `stockMovements` localStorage history.
- New Sale and Terminal sales deduct product stock.
- Invoice edit now reverses old stock first, then applies the updated stock movement.
- Return restock flow records stock back into inventory where possible.
- Insufficient stock blocks sale completion unless a demo negative-stock setting is enabled.
- Product status updates to `Out of stock`, `Low`, or `In stock` after movement.

### 5. New Sale cart safety

- Removed the dangerous first-load auto-filled demo cart.
- New Sale now starts empty unless a draft is resumed or a saved invoice is being edited.
- Product add buttons, SKU search, draft resume and invoice edit loading still work.

### 6. Invoice edit/re-edit safety

- Saved invoice edit still loads invoice items, customer, payment method and salesman.
- Updating replaces the original invoice row and does not create duplicates.
- Stock, receivable and commission basis data are recalculated on update.
- Cancel Edit clears edit mode and cart without deleting the saved invoice.

### 7. Draft conversion cleanup

- Draft resume stores a separate resumed-draft marker.
- Completing a resumed draft converts it into a real invoice and removes the stale draft row.
- Draft resume and invoice edit mode remain separate.

### 8. Terminal payment/balance/status

- Terminal now separates actual paid tender from credit balance.
- Cash/card/bank count as paid; customer credit remains open balance.
- Terminal invoices save correct `paid`, `balance`, `status`, `paymentMethod`, salesman and item data.
- Terminal sales deduct stock and sync customer receivables for balances due.
- Held sale/recall flow remains intact.

### 9. Customer/product save double toast

- Removed the generic `data-demo-action` save hook from customer/product save buttons.
- Added dedicated save button IDs:
  - `saveCustomerBtn`
  - `saveProductBtn`
- Customer save now stores name, phone, email, type, opening balance, credit limit and address.
- Product save now stores name, SKU, barcode, category, sale price, opening stock and status.

### 10. Data safety / XSS hardening

- Added and reused escaping helpers for key dynamic table output.
- Escaped customer/product/invoice/payment values in the most important localStorage-rendered tables.
- This is a demo hardening pass; final production must also escape/sanitize on the backend and template layer.

### 11. PWA / GitHub static readiness

- Updated service worker cache version to `axtor-pos-cloud-static-demo-v4`.
- Removed silent empty JS/CSS offline fallbacks that could hide real asset errors.
- Local static assets remain cached for basic offline refresh support.
- CDN assets remain live dependencies for the static demo.

## QA performed

- `node --check js/main.js` passed.
- `node --check js/app-data.js` passed.
- `node --check js/retail-advanced.js` passed.
- `node --check js/invoice-templates.js` passed.
- `node --check js/charts.js` passed.
- `node --check sw.js` passed.
- Verified key static references for payment modal IDs, customer/product save IDs and empty New Sale cart markup.

## Manual test checklist

### New Sale

1. Open `sales.html#new-sale`.
2. Confirm cart starts empty.
3. Add product by button or SKU search.
4. Complete cash sale and confirm saved invoice appears.
5. Complete credit/partial sale and confirm it appears in `sales.html#receive-payment` for that customer.
6. Confirm invoice number does not duplicate `INV-1048`.
7. Confirm product stock reduces in `products.html`.

### Saved Invoice Edit

1. Open `sales.html#saved-invoices`.
2. Click Edit on a completed invoice.
3. Change qty/rate/discount.
4. Update invoice.
5. Confirm the same invoice number remains and no duplicate row is created.
6. Confirm receivable and stock are recalculated.

### Draft

1. Add products in New Sale.
2. Save Draft.
3. Resume Draft.
4. Complete sale.
5. Confirm the old draft row is removed after conversion.

### Terminal

1. Open `terminal.html`.
2. Add product.
3. Hold sale and recall it.
4. Complete cash/card sale.
5. Complete credit/partial sale.
6. Confirm invoice saved, stock deducted and receivable updated where balance exists.

### Customer Payment

1. Create a credit/partial invoice for a non-walk-in customer.
2. Open Receive Payment.
3. Allocate payment.
4. Confirm customer balance and invoice status update.

### Invoice Print

1. View/print saved invoices.
2. Confirm product names show correctly.
3. Confirm salesman is not repeated as an item-column value.
4. Confirm company/customer signature boxes remain visible.

## Remaining demo-only limitations

- localStorage is still not a real database.
- Front-end login/permissions are demo-only.
- Service worker supports static demo caching only; real offline sync needs backend conflict handling.
- Invoice numbering must be server-enforced in production.
- Stock ledger, receivables, payables and audit trails need server-side integrity for a live SaaS product.
- PDF/WhatsApp/SMS/email/payment integrations are still demo simulations.

## 2026-06-16 — Product Add Flow + Tax 0% Static Demo Fix

### Files changed

- `products.html`
- `sales.html`
- `settings.html`
- `terminal.html`
- `js/app-data.js`
- `js/retail-advanced.js`
- `js/invoice-templates.js`
- `sw.js`

### Bugs fixed

- Add New Product now saves into the shared localStorage product catalog and updates existing products when the SKU already exists.
- New products immediately render in Products List and the New Sale product grid.
- New Sale product cards now read from the shared catalog instead of static hard-coded product cards.
- Product search supports name, SKU and barcode in New Sale and Terminal flows.
- Saved products can be added to cart, sold, saved into invoices, and deducted from stock.
- Tax Settings now persists default tax rate and enabled/disabled tax status to localStorage.
- New Sale and Terminal now show dynamic labels such as `Tax 0%` and calculate tax using the saved rate.
- Cart items, invoice items, saved invoices and invoice print/preview data now use the saved tax rate instead of hard-coded 5%.
- Service worker cache was bumped so GitHub Pages does not keep serving old cached files.

### QA performed

- `node --check js/main.js` passed.
- `node --check js/app-data.js` passed.
- `node --check js/retail-advanced.js` passed.
- `node --check js/invoice-templates.js` passed.
- `node --check js/charts.js` passed.
- `node --check sw.js` passed.
- Static QA confirmed `Tax 0%` helper behavior, dynamic product grid rendering by barcode, and stock deduction from 10 to 9.

(function(){
  const searchIndex = [
    ['Dashboard','Sales summary, charts, activity','index.html','bi-speedometer2'],
    ['POS Terminal','Fast cashier screen with barcode scan','terminal.html','bi-upc-scan'],
    ['Fast Checkout','Barcode scan, cart and split payment','terminal.html','bi-lightning-charge'],
    ['Barcode Scan','Scan SKU into the POS terminal','terminal.html','bi-upc'],
    ['Hold Sale','Hold current terminal cart','terminal.html','bi-pause-circle'],
    ['Recall Sale','Recall held sale from terminal','terminal.html','bi-arrow-clockwise'],
    ['New Sale','POS cart, save draft, payment','sales.html#new-sale','bi-cart-plus'],
    ['Saved Invoices','Invoice view and print','sales.html#saved-invoices','bi-receipt'],
    ['Sales Returns','Process returns','sales.html#returns','bi-arrow-counterclockwise'],
    ['Returns Exchange','Advanced return and exchange workflow','sales.html#returns','bi-arrow-left-right'],
    ['Customer Receive Payment','Search customer invoices and allocate receipt','sales.html#receive-payment','bi-cash-coin'],
    ['INV-1001','Al Noor Garage credit invoice balance','sales.html#receive-payment','bi-receipt-cutoff'],
    ['Shift Closing','Cashier shift closing and cash count','shifts.html','bi-clock-history'],
    ['Open Shift','Start cashier shift with opening cash','shifts.html#open-shift','bi-play-circle'],
    ['Close Shift','Close shift and print day closing report','shifts.html#close-shift','bi-stop-circle'],
    ['Day Closing','Cash count, card settlement, manager approval','shifts.html#close-shift','bi-calendar-check'],
    ['Cash Count','Expected cash and short/excess','shifts.html#cash-count','bi-cash-stack'],
    ['Branch Management','Branches, counters and warehouses','branches.html','bi-building'],
    ['Counter Management','Manage POS counters by branch','branches.html#counters','bi-pc-display'],
    ['Warehouse','Warehouse stock management','branches.html#warehouses','bi-boxes'],
    ['Van Stock','Delivery van stock location','branches.html#van-stock','bi-truck'],
    ['Branch Transfer','Inter-branch stock transfer','branches.html#transfers','bi-arrow-left-right'],
    ['Customers','Customer list and account balance','customer.html#customers-list','bi-people'],
    ['Add Customer','Create new customer form','customer.html#add-customer','bi-person-plus'],
    ['Customer SOA','Statement of account','customer.html#customer-soa','bi-file-earmark-spreadsheet'],
    ['Salesmen','Manage sales team and staff','salesmen.html','bi-people'],
    ['Targets','Set monthly sales targets for salesmen','salesmen.html#targets','bi-bullseye'],
    ['Commission','Calculate and pay salesman commission','salesmen.html#payouts','bi-cash-coin'],
    ['Incentive','Salesman incentive and bonus setup','salesmen.html#targets','bi-trophy'],
    ['Performance','Salesman performance dashboard','salesmen.html#performance','bi-graph-up-arrow'],
    ['Credit Control','Customer credit limit and blocks','customer.html#credit-control','bi-shield-exclamation'],
    ['Credit Aging','Customer receivable aging report','reports.html#credit-aging','bi-hourglass-split'],
    ['Overdue Customers','Customer overdue balances','customer.html#credit-control','bi-exclamation-octagon'],
    ['Credit Limit','Limit and credit days setup','customer.html#credit-control','bi-credit-card'],
    ['Products','Products and stock','products.html#products-list','bi-box-seam'],
    ['Add Product','New item form','products.html#add-product','bi-plus-square'],
    ['Barcode Labels','Product label printing','barcode-labels.html','bi-tags'],
    ['Label Printing','Print product barcode labels','barcode-labels.html','bi-printer'],
    ['Print Product Labels','Choose size and quantity','barcode-labels.html','bi-tags-fill'],
    ['Inventory','Stock adjustment, ledger, transfer','inventory.html#stock-adjustment','bi-boxes'],
    ['Warehouse Management','Warehouses and transfers','inventory.html#warehouse-management','bi-building'],
    ['Stock Count','Physical inventory count','inventory.html#stock-count','bi-clipboard-check'],
    ['Physical Inventory','Counted quantity vs system stock','inventory.html#stock-count','bi-clipboard-data'],
    ['Cycle Count','Stock count session','inventory.html#stock-count','bi-arrow-repeat'],
    ['Smart Reorder','Purchase suggestions for low stock','inventory.html#smart-reorder','bi-magic'],
    ['Purchase Suggestion','Create PO from reorder suggestion','inventory.html#smart-reorder','bi-bag-plus'],
    ['Reorder Alert','Low stock reorder alerts','inventory.html#smart-reorder','bi-exclamation-triangle'],
    ['Expiry Alerts','Products nearing expiry date','inventory.html#stock-adjustment','bi-calendar-x'],
    ['Purchases','New purchase and suppliers','purchase.html#new-purchase','bi-bag-plus'],
    ['Purchase Order','Full PO workflow','purchase.html#purchase-order','bi-file-earmark-check'],
    ['Purchase Request','Create PR and convert to PO','purchase.html#purchase-request','bi-file-earmark-plus'],
    ['Goods Received Note','Receive goods from PO','purchase.html#goods-received','bi-truck'],
    ['Supplier Bill','Convert GRN to payable bill','purchase.html#supplier-bill','bi-receipt'],
    ['Supplier SOA','Supplier account statement','purchase.html#supplier-soa','bi-journal-text'],
    ['Pay Supplier','Allocate supplier payment to purchase invoices','purchase.html#pay-supplier','bi-bank'],
    ['Supplier Aging','Supplier payable aging report','reports.html#supplier-aging','bi-hourglass-bottom'],
    ['Supplier Payable','Payable aging and supplier notes','purchase.html#supplier-aging','bi-cash-stack'],
    ['PI-2001','Starlux Paints purchase invoice balance','purchase.html#pay-supplier','bi-bag-check'],
    ['Promotions','Discount engine and coupon setup','promotions.html','bi-percent'],
    ['Coupon','Validate demo coupon code','promotions.html#coupon-demo','bi-ticket-perforated'],
    ['Buy 2 Get 1','Promotion type','promotions.html','bi-gift'],
    ['Loyalty','Customer points and reward wallet','loyalty.html','bi-gem'],
    ['Customer Points','Earn and redeem points','loyalty.html','bi-stars'],
    ['Reward Wallet','Customer reward balance','loyalty.html','bi-wallet2'],
    ['Redeem Points','Redeem customer points','loyalty.html','bi-gift'],
    ['Approvals','Manager approval center','approvals.html','bi-shield-check'],
    ['Manager PIN','PIN based approval demo','approvals.html','bi-key'],
    ['Pending Approval','Pending discount/return/stock approvals','approvals.html','bi-hourglass-split'],
    ['Discount Approval','Discount above 10% approval','approvals.html','bi-percent'],
    ['Reports','Profit & loss, tax, trial balance','reports.html','bi-bar-chart-line'],
    ['Accounts','Bank, cash, reconciliation','accounts.html#bank-accounts','bi-bank'],
    ['Expenses','Expenses and ledger entries','expenses.html#expense-list','bi-wallet2'],
    ['Roles Permissions','User roles and permission matrix','settings.html#users-roles','bi-person-lock'],
    ['Hardware Settings','Printers, scanner, cash drawer','settings.html#hardware-settings','bi-printer'],
    ['Offline Sync','Offline mode and pending sync queue','settings.html#offline-sync','bi-cloud-arrow-up'],

    ['Invoice Settings','Invoice numbering, print flags, footer, bank details','settings.html#invoice-settings','bi-receipt-cutoff'],
    ['Invoice Templates','Template gallery, preview and print samples','settings.html#invoice-templates','bi-layout-text-window'],
    ['Invoice Designer','Custom invoice style and column controls','invoice-designer.html','bi-file-earmark-richtext'],
    ['Custom Invoice','Custom invoice designer','invoice-designer.html','bi-pencil-square'],
    ['Invoice Style','Colors, header, footer and density','invoice-designer.html','bi-palette'],
    ['Print Template','A4, A5 and thermal print templates','settings.html#invoice-templates','bi-printer'],
    ['A4 Invoice','Modern and compact A4 invoice templates','settings.html#invoice-templates','bi-file-earmark'],
    ['A5 Invoice','A5 print size setting','settings.html#invoice-settings','bi-file-earmark'],
    ['Thermal Receipt','80mm POS receipt template','settings.html#invoice-templates','bi-receipt'],
    ['Tax Invoice','VAT ready invoice structure','settings.html#invoice-templates','bi-percent'],
    ['Paint Store Invoice','Automotive paint invoice template','settings.html#invoice-templates','bi-palette2'],
    ['Bilingual Invoice','English Arabic invoice template','settings.html#invoice-templates','bi-translate'],
    ['Quotation Template','Quotation print template','quotations.html','bi-file-earmark-text'],
    ['Delivery Invoice','Delivery note print template','delivery.html','bi-truck'],
    ['Company Logo','Upload company logo for invoices','settings.html#company-profile','bi-image'],
    ['Stamp','Upload stamp placeholder','settings.html#company-profile','bi-patch-check'],
    ['Signature','Upload invoice signature image','settings.html#company-profile','bi-pen'],
    ['Bank Details','Invoice bank details and IBAN','settings.html#company-profile','bi-bank'],
    ['Terms Conditions','Invoice footer terms and conditions','settings.html#company-profile','bi-card-text'],
    ['Invoice Columns','Show hide invoice columns','invoice-designer.html','bi-columns-gap'],
    ['Customer Invoice Settings','Customer wise template preferences','customer.html#customer-invoice-settings','bi-person-lines-fill'],
    ['WhatsApp Invoice','Prepare WhatsApp invoice message','communications.html','bi-whatsapp'],
    ['Print Invoice','Print selected template','sales.html#saved-invoices','bi-printer'],
    ['Preview Invoice','Invoice preview modal','settings.html#invoice-templates','bi-eye'],
    ['Share Invoice Link','Open print-friendly invoice-view URL','invoice-view.html','bi-link-45deg'],
    ['Settings','Company, users, appearance, security','settings.html','bi-gear'],
    ['Appearance','Theme switcher','settings.html#appearance','bi-palette'],
    ['Setup Wizard','Industry selection and setup','setup.html','bi-magic'],
    ['Industry Selection','Retail, grocery, pharmacy, paint store','setup.html','bi-ui-checks-grid'],
    ['Business Type','Choose business industry','setup.html','bi-shop'],
    ['Notifications','Tasks, alerts, audit trail','notifications.html','bi-bell'],
    ['Audit Trail','Advanced audit log','notifications.html#audit-trail','bi-list-check']
  ];

  function qs(sel, root=document){ return root.querySelector(sel); }
  function qsa(sel, root=document){ return [...root.querySelectorAll(sel)]; }

  function setTheme(theme){
    theme = theme || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    try{ localStorage.setItem('axtorTheme', theme); }catch(e){}
    qsa('[data-theme-choice]').forEach(el => el.classList.toggle('active', el.dataset.themeChoice === theme));
  }

  function initTheme(){
    let savedTheme = 'light';
    try{ savedTheme = localStorage.getItem('axtorTheme') || 'light'; }catch(e){}
    setTheme(savedTheme);
    qsa('[data-theme-choice]').forEach(btn => btn.addEventListener('click', () => setTheme(btn.dataset.themeChoice)));
  }

  function initSidebar(){
    const shell = qs('.app-shell');
    qsa('[data-sidebar-toggle]').forEach(btn => btn.addEventListener('click', () => shell?.classList.toggle('sidebar-open')));
    qs('.sidebar-backdrop')?.addEventListener('click', () => shell?.classList.remove('sidebar-open'));
  }


  function initBootstrapFallback(){
    if(window.bootstrap && window.bootstrap.Modal && window.bootstrap.Tab) return;
    const instances = new WeakMap();
    function fire(el, name){ try{ el.dispatchEvent(new Event(name, {bubbles:true})); }catch(e){} }
    function backdrop(show){
      let bd = qs('.modal-backdrop.axtor-fallback-backdrop');
      if(show && !bd){ bd=document.createElement('div'); bd.className='modal-backdrop fade show axtor-fallback-backdrop'; document.body.appendChild(bd); }
      if(!show && bd) bd.remove();
    }
    class ModalFallback{
      constructor(el){ this.el=typeof el==='string'?qs(el):el; if(this.el) instances.set(this.el,this); }
      show(){ if(!this.el) return; fire(this.el,'show.bs.modal'); this.el.style.display='block'; this.el.removeAttribute('aria-hidden'); this.el.classList.add('show'); document.body.classList.add('modal-open'); backdrop(true); fire(this.el,'shown.bs.modal'); }
      hide(){ if(!this.el) return; fire(this.el,'hide.bs.modal'); this.el.classList.remove('show'); this.el.style.display='none'; this.el.setAttribute('aria-hidden','true'); document.body.classList.remove('modal-open'); backdrop(false); fire(this.el,'hidden.bs.modal'); }
      static getOrCreateInstance(el){ el=typeof el==='string'?qs(el):el; if(!el) return new ModalFallback(null); return instances.get(el) || new ModalFallback(el); }
      static getInstance(el){ el=typeof el==='string'?qs(el):el; return el ? instances.get(el) || null : null; }
    }
    class TabFallback{
      constructor(el){ this.el=typeof el==='string'?qs(el):el; }
      show(){
        const trigger=this.el; if(!trigger) return;
        const targetSel=trigger.getAttribute('data-bs-target') || trigger.getAttribute('href');
        const target=targetSel ? qs(targetSel) : null; if(!target) return;
        const list=trigger.closest('.nav, [role="tablist"]') || document;
        qsa('.nav-link.active,[data-bs-toggle="tab"].active', list).forEach(x=>x.classList.remove('active'));
        trigger.classList.add('active');
        const content=target.closest('.tab-content') || document;
        qsa('.tab-pane', content).forEach(p=>p.classList.remove('active','show'));
        target.classList.add('active','show');
        fire(trigger,'shown.bs.tab');
      }
    }
    window.bootstrap = Object.assign({}, window.bootstrap || {}, {Modal: ModalFallback, Tab: TabFallback});
    document.addEventListener('click', e=>{
      const modalBtn=e.target.closest('[data-bs-toggle="modal"][data-bs-target]');
      if(modalBtn){ const m=qs(modalBtn.getAttribute('data-bs-target')); if(m){ e.preventDefault(); ModalFallback.getOrCreateInstance(m).show(); } }
      const dismiss=e.target.closest('[data-bs-dismiss="modal"]');
      if(dismiss){ const m=dismiss.closest('.modal'); if(m){ e.preventDefault(); ModalFallback.getOrCreateInstance(m).hide(); } }
      const tab=e.target.closest('[data-bs-toggle="tab"]');
      if(tab){ e.preventDefault(); new TabFallback(tab).show(); }
    });
  }

  function activateHashTab(){
    const hash = window.location.hash;
    if(hash && window.bootstrap){
      const trigger = qs(`[data-bs-target="${hash}"]`);
      if(trigger) new bootstrap.Tab(trigger).show();
      const target = qs(hash);
      if(target) setTimeout(()=>target.scrollIntoView({block:'start', behavior:'smooth'}), 80);
    }
  }
  window.AxtorActivateHash = activateHashTab;

  function initSearch(){
    const overlay = qs('#globalSearch');
    const input = qs('#globalSearchInput');
    const results = qs('#globalSearchResults');
    if(!overlay || !input || !results) return;
    function render(term=''){
      const t = term.trim().toLowerCase();
      const filtered = searchIndex.filter(x => !t || `${x[0]} ${x[1]}`.toLowerCase().includes(t)).slice(0, 12);
      results.innerHTML = filtered.map(x => `
        <a class="search-result" href="${x[2]}" data-search-href="${x[2]}">
          <i class="bi ${x[3]}"></i>
          <div><strong>${x[0]}</strong><br><small>${x[1]}</small></div>
        </a>`).join('') || '<div class="p-4 text-muted">No result found. Try terminal, shift, invoice, customer, stock, reports, settings.</div>';
    }
    function openSearch(){ overlay.classList.add('open'); render(input.value); setTimeout(()=>input.focus(), 20); }
    function closeSearch(){ overlay.classList.remove('open'); }
    qsa('[data-search-open]').forEach(el => el.addEventListener('click', openSearch));
    qs('[data-search-close]')?.addEventListener('click', closeSearch);
    input?.addEventListener('input', e => render(e.target.value));
    document.addEventListener('keydown', e => {
      if(e.key === 'F8'){ e.preventDefault(); openSearch(); }
      if(e.key === 'Escape') closeSearch();
    });
    overlay?.addEventListener('click', e => { if(e.target === overlay) closeSearch(); });
    results?.addEventListener('click', e => {
      const a=e.target.closest('a[data-search-href]');
      if(!a) return;
      closeSearch();
      const href=a.getAttribute('href');
      const u=new URL(href, location.href);
      if(u.pathname.split('/').pop() === location.pathname.split('/').pop()){
        e.preventDefault();
        if(location.hash !== u.hash) history.pushState(null,'',u.hash || location.pathname);
        activateHashTab();
      }
    });
    render('');
  }

  function initHashTabs(){
    activateHashTab();
    window.addEventListener('hashchange', activateHashTab);
    window.addEventListener('popstate', activateHashTab);
    qsa('[data-bs-toggle="tab"]').forEach(btn => btn.addEventListener('shown.bs.tab', e => {
      const target = e.target.getAttribute('data-bs-target');
      if(target) history.replaceState(null, '', target);
    }));
  }


  function showAppToast(msg, type='warning'){
    const toast = document.createElement('div');
    toast.className = `position-fixed bottom-0 end-0 m-3 alert alert-${type} shadow`;
    toast.style.zIndex = 9999;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(()=>toast.remove(), 2600);
  }

  function initAccessControl(){
    const pageAccess = {
      'settings.html': ['Owner', 'Manager'],
      'reports.html': ['Owner', 'Manager', 'Accountant'],
      'accounts.html': ['Owner', 'Accountant'],
      'expenses.html': ['Owner', 'Manager', 'Accountant'],
      'approvals.html': ['Owner', 'Manager'],
      'purchase.html': ['Owner', 'Manager', 'Purchaser']
    };
    const page = location.pathname.split('/').pop() || 'index.html';
    let currentUser = { name: 'Demo Owner', role: 'Owner' };
    try { currentUser = JSON.parse(localStorage.getItem('currentUser') || localStorage.getItem('axtorCurrentUser') || JSON.stringify(currentUser)) || currentUser; } catch(e) {}
    const allowed = pageAccess[page];
    if(allowed && !allowed.includes(currentUser.role)){
      sessionStorage.setItem('axtorAccessDenied', '1');
      location.href = 'index.html?blocked=1';
      return false;
    }
    if(page === 'index.html' && (new URLSearchParams(location.search).get('blocked') === '1' || sessionStorage.getItem('axtorAccessDenied'))){
      sessionStorage.removeItem('axtorAccessDenied');
      setTimeout(()=>showAppToast('Access denied. Contact your manager.', 'danger'), 120);
      history.replaceState(null, '', 'index.html');
    }
    if(currentUser.role === 'Salesman'){
      qsa('.nav-linkx').forEach(link => {
        const href = link.getAttribute('href') || '';
        if(!href.includes('salesmen.html') && !href.includes('index.html')) link.style.display = 'none';
      });
    }
    qsa('.user-chip .fw-bold').forEach(el => { if(currentUser.name) el.textContent = currentUser.name.split(' ')[0]; });
    return true;
  }

  function initDateYear(){ qsa('[data-year]').forEach(el => el.textContent = new Date().getFullYear()); }

  function initToasts(){
    qsa('[data-demo-action]').forEach(btn => btn.addEventListener('click', () => {
      const msg = btn.dataset.demoAction || 'Action saved in demo mode';
      try{
        const section = btn.closest('section, .tab-pane, .cardx') || document.body;
        const fields = qsa('input, select, textarea', section).map(el => ({
          name: el.name || el.id || el.placeholder || el.getAttribute('data-company-setting') || el.getAttribute('data-invoice-setting') || el.getAttribute('data-demo-field') || el.type || 'field',
          value: el.type === 'checkbox' ? el.checked : el.value
        }));
        const logs = JSON.parse(localStorage.getItem('axtorDemoActionLog') || '[]') || [];
        logs.unshift({time:new Date().toLocaleString(), page:location.pathname.split('/').pop() || 'index.html', hash:location.hash, action:msg, button:btn.textContent.trim(), fields});
        localStorage.setItem('axtorDemoActionLog', JSON.stringify(logs.slice(0,100)));
      }catch(e){}
      const toast = document.createElement('div');
      toast.className = 'position-fixed bottom-0 end-0 m-3 alert alert-success shadow';
      toast.style.zIndex = 9999;
      toast.textContent = msg;
      document.body.appendChild(toast);
      setTimeout(()=>toast.remove(), 2200);
    }));
  }

  function init(){ if(initAccessControl() === false) return; initBootstrapFallback(); initTheme(); initSidebar(); initSearch(); initHashTabs(); initDateYear(); initToasts(); }
  document.addEventListener('DOMContentLoaded', init);
})();

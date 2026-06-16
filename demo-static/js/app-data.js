/* Advanced demo layer: localStorage DB + POS cart + customer/supplier payment allocations */
(function(){
  const KEY='axtorAdvancedDemoDB';
  const DEFAULT_TAX_RATE=5;
  const CART='axtorPosCart';
  const EDIT_KEY='axtorEditingInvoiceNo';
  const EDIT_CUSTOMER_KEY='axtorEditingCustomer';
  const EDIT_PAYMENT_KEY='axtorEditingPayment';
  const seed={
    customers:[
      {name:'Al Noor Garage', phone:'7779 0896', type:'Credit', balance:18500, status:'Due'},
      {name:'Doha Auto Works', phone:'5522 4411', type:'Wholesale', balance:6000, status:'Due'},
      {name:'Walk-in Customer', phone:'-', type:'Retail', balance:0, status:'Cash'}
    ],
    products:[
      {sku:'AX-2K-101', name:'2K Solid Paint', category:'Automotive', price:95, stock:128, status:'In stock', expiryDate:'2026-08-25'},
      {sku:'CC-HS-1L', name:'HS Clear Coat 1L', category:'Clear Coat', price:55, stock:72, status:'In stock', expiryDate:'2026-09-10'},
      {sku:'EP-PR-4L', name:'Epoxy Primer 4L', category:'Industrial', price:165, stock:4, status:'Low', expiryDate:'2026-07-30'},
      {sku:'TN-NC-5L', name:'NC Thinner 5L', category:'Thinner', price:45, stock:310, status:'In stock', expiryDate:'2026-10-15'},
      {sku:'AX-EN-4L', name:'Enamel Paint 4L', category:'Industrial', price:88, stock:54, status:'In stock', expiryDate:'2026-11-20'}
    ],
    salesmen:[
      {id:'SM001', name:'Ahmed Al-Rashidi', phone:'77790001', email:'ahmed@axtorpos.com', branch:'Main Branch', active:true, joinDate:'2024-01-01'},
      {id:'SM002', name:'Sara Khalid', phone:'77790002', email:'sara@axtorpos.com', branch:'Main Branch', active:true, joinDate:'2024-03-15'}
    ],
    salesmanTargets:[
      {id:'TGT001', salesmanId:'SM001', month:'2026-06', targetAmount:50000, targetInvoices:100, commissionTiers:[{from:0,to:50,rate:0},{from:50,to:75,rate:2},{from:75,to:100,rate:3.5},{from:100,to:999,rate:5}], bonusOnTarget:500, notes:''},
      {id:'TGT002', salesmanId:'SM002', month:'2026-06', targetAmount:30000, targetInvoices:65, commissionTiers:[{from:0,to:50,rate:0},{from:50,to:75,rate:2},{from:75,to:100,rate:3.5},{from:100,to:999,rate:5}], bonusOnTarget:500, notes:''}
    ],
    commissionPayouts:[
      {id:'PAY001', salesmanId:'SM001', month:'2026-05', grossSales:48000, achievementPct:96, commissionRate:3.5, commissionAmount:1680, bonusAmount:0, totalPayout:1680, status:'paid', approvedBy:'Owner', paidDate:'2026-06-01', paymentMethod:'Bank Transfer', notes:''}
    ],
    invoices:[
      {no:'INV-1048', customer:'Walk-in Customer', customerPhone:'77790000', date:'13 Jun 2026', amount:304.50, total:304.50, subtotal:290, tax:14.50, salesmanId:'SM001', status:'Paid', items:[
        {sku:'AX-2K-101', brand:'Starlux', name:'2K Solid Paint', product:'2K Solid Paint', productName:'2K Solid Paint', colorCode:'Toyota 040', unit:'LTR', qty:2, rate:95, price:95, discount:0, taxRate:DEFAULT_TAX_RATE},
        {sku:'CC-HS-1L', brand:'Cosmo Coating', name:'HS Clear Coat 1L', product:'HS Clear Coat 1L', productName:'HS Clear Coat 1L', colorCode:'Clear', unit:'PCS', qty:1, rate:55, price:55, discount:0, taxRate:DEFAULT_TAX_RATE},
        {sku:'TN-NC-5L', brand:'Diamond Paints', name:'NC Thinner 5L', product:'NC Thinner 5L', productName:'NC Thinner 5L', colorCode:'N/A', unit:'PCS', qty:1, rate:45, price:45, discount:0, taxRate:DEFAULT_TAX_RATE}
      ]},
      {no:'INV-1047', customer:'Al Noor Garage', customerPhone:'7779 0896', date:'13 Jun 2026', amount:1480, total:1480, subtotal:1480, tax:0, salesmanId:'SM002', status:'Credit', items:[
        {sku:'EP-PR-4L', brand:'Starlux', name:'Epoxy Primer 4L', product:'Epoxy Primer 4L', productName:'Epoxy Primer 4L', colorCode:'Grey', unit:'PCS', qty:4, rate:165, price:165, discount:0, taxRate:0},
        {sku:'AX-2K-101', brand:'Starlux', name:'2K Solid Paint', product:'2K Solid Paint', productName:'2K Solid Paint', colorCode:'Toyota 040', unit:'LTR', qty:5, rate:95, price:95, discount:0, taxRate:0},
        {sku:'CC-HS-1L', brand:'Cosmo Coating', name:'HS Clear Coat 1L', product:'HS Clear Coat 1L', productName:'HS Clear Coat 1L', colorCode:'Clear', unit:'PCS', qty:3, rate:55, price:55, discount:0, taxRate:0},
        {sku:'TN-NC-5L', brand:'Diamond Paints', name:'NC Thinner 5L', product:'NC Thinner 5L', productName:'NC Thinner 5L', colorCode:'N/A', unit:'PCS', qty:4, rate:45, price:45, discount:0, taxRate:0}
      ]},
      {no:'DRAFT-091', customer:'Doha Auto Works', customerPhone:'5522 4411', date:'12 Jun 2026', amount:750, total:750, salesmanId:'SM001', status:'Draft', draftItems:[
        {sku:'AX-EN-4L', name:'Enamel Paint 4L', product:'Enamel Paint 4L', productName:'Enamel Paint 4L', qty:5, price:88, rate:88},
        {sku:'AX-2K-101', name:'2K Solid Paint', product:'2K Solid Paint', productName:'2K Solid Paint', qty:2, price:95, rate:95}
      ]}
    ],
    customerCreditInvoices:[
      {no:'INV-1001', customer:'Al Noor Garage', date:'01 Jun 2026', due:'01 Jul 2026', total:10000, paid:0},
      {no:'INV-1002', customer:'Al Noor Garage', date:'05 Jun 2026', due:'05 Jul 2026', total:8500, paid:0},
      {no:'INV-1003', customer:'Al Noor Garage', date:'10 Jun 2026', due:'10 Jul 2026', total:6000, paid:0},
      {no:'INV-1011', customer:'Doha Auto Works', date:'08 Jun 2026', due:'08 Jul 2026', total:6000, paid:0}
    ],
    supplierBills:[
      {no:'PI-2001', supplier:'Starlux Paints', date:'01 Jun 2026', due:'01 Jul 2026', total:12000, paid:0},
      {no:'PI-2002', supplier:'Starlux Paints', date:'04 Jun 2026', due:'04 Jul 2026', total:8500, paid:0},
      {no:'PI-2003', supplier:'Diamond Paints', date:'07 Jun 2026', due:'07 Jul 2026', total:6000, paid:0},
      {no:'PI-2004', supplier:'Starlux Paints', date:'11 Jun 2026', due:'11 Jul 2026', total:4500, paid:0}
    ],
    customerPayments:[],
    supplierPayments:[],
    stockMovements:[],
    activity:[
      'Advanced localStorage demo initialized',
      'Customer invoice allocation ready',
      'Supplier payment allocation ready'
    ]
  };
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  function companySettings(){try{return JSON.parse(localStorage.getItem('companySettings')||'{}')||{}}catch(e){return {}}}
  const money=n=>(companySettings().currencySymbol||'QAR ')+Number(n||0).toLocaleString(undefined,{minimumFractionDigits:Number(n)%1?2:0,maximumFractionDigits:2});
  const number=n=>Number(n||0);
  const safeText=v=>String(v??'').replace(/[&<>'\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','\"':'&quot;'}[c]));
  function deepClone(x){return JSON.parse(JSON.stringify(x));}
  function db(){ try{return JSON.parse(localStorage.getItem(KEY))||deepClone(seed)}catch(e){return deepClone(seed)} }
  function save(data){ localStorage.setItem(KEY,JSON.stringify(data)); }
  function ensure(){
    const data=db(); let changed=false;
    Object.keys(seed).forEach(k=>{ if(!Array.isArray(data[k])){ data[k]=deepClone(seed[k]); changed=true; } });
    (seed.products||[]).forEach(sp=>{ if(!(data.products||[]).some(p=>p.sku===sp.sku)){ data.products.push(deepClone(sp)); changed=true; } });
    if(Array.isArray(data.invoices)) data.invoices.forEach((inv,i)=>{ if(inv.salesmanId===undefined){ inv.salesmanId=i%2===0?'SM001':'SM002'; changed=true; } if(inv.total===undefined && inv.amount!==undefined){ inv.total=inv.amount; changed=true; } if(inv.paid===undefined && String(inv.status||'').toLowerCase()!=='draft'){ inv.paid=String(inv.status||'').toLowerCase()==='credit'?0:number(inv.total||inv.amount); changed=true; } if(inv.balance===undefined && String(inv.status||'').toLowerCase()!=='draft'){ inv.balance=Math.max(0,number(inv.total||inv.amount)-number(inv.paid)); changed=true; } if(String(inv.status||'').toLowerCase()==='credit' || number(inv.balance)>0){ syncCustomerReceivable(data,inv); changed=true; } });
    updateCustomerBalances(data);
    if(!localStorage.getItem(KEY) || changed) save(data);
  }
  function toast(msg,type='success'){
    const el=document.createElement('div');
    el.className=`position-fixed bottom-0 end-0 m-3 alert alert-${type} shadow`;
    el.style.zIndex=10000; el.textContent=msg; document.body.appendChild(el); setTimeout(()=>el.remove(),2600);
  }
  function audit(action, icon='bi-list-check'){ const data=db(); data.auditEvents=data.auditEvents||[]; data.auditEvents.unshift({user:'Demo User',action,before:icon,after:'-',time:new Date().toLocaleString(),device:'Browser demo / localStorage',approval:'Not required'}); save(data); }
  function badge(status){
    const map={Paid:'badge-paid',Clear:'badge-paid','In stock':'badge-paid',Cash:'badge-paid',Due:'badge-pending',Credit:'badge-pending',Draft:'badge-draft',Low:'badge-danger-soft','Partially Paid':'badge-pending',Unpaid:'badge-danger-soft',Payable:'badge-pending'};
    return `<span class="badge-soft ${map[status]||'badge-draft'}">${status}</span>`;
  }
  function invoiceStatus(x){ const bal=number(x.total)-number(x.paid); return bal<=0?'Paid':x.paid>0?'Partially Paid':'Unpaid'; }
  function balance(x){ return Math.max(0, number(x.total)-number(x.paid)); }
  function receiptNo(prefix, count){ return `${prefix}-${String(1001+count).padStart(4,'0')}`; }

  function readInvoiceSettings(){
    let s={};
    try{s=JSON.parse(localStorage.getItem('invoiceSettings')||'{}')||{};}catch(e){s={};}
    return s;
  }
  function writeInvoiceSettings(s){ localStorage.setItem('invoiceSettings', JSON.stringify(s||{})); }
  function parseTaxRateValue(v){
    const raw=String(v??'').replace('%','').trim();
    const n=Number(raw);
    return Number.isFinite(n) && n>=0 ? n : DEFAULT_TAX_RATE;
  }
  function isTaxEnabled(){
    const s=readInvoiceSettings();
    return s.vatEnabled!==false && s.taxEnabled!==false && s.taxDisabled!==true;
  }
  function getDefaultTaxRate(){
    const s=readInvoiceSettings();
    if(!isTaxEnabled()) return 0;
    const value=s.taxRate!==undefined ? s.taxRate : (s.defaultTaxRate!==undefined ? s.defaultTaxRate : DEFAULT_TAX_RATE);
    return parseTaxRateValue(value);
  }
  function getTaxLabel(){ return `Tax ${getDefaultTaxRate()}%`; }
  function updateTaxLabels(){
    const label=getTaxLabel();
    const pos=$('#posTaxLabel'); if(pos) pos.textContent=label;
    const term=$('#terminalTaxLabel'); if(term) term.textContent=label;
  }
  function applyCurrentTaxRateToCart(cart){
    const rate=getDefaultTaxRate();
    return (cart||[]).map(x=>({...x,taxRate:rate}));
  }

  function invoiceSettings(){ const s=readInvoiceSettings(); s.invoicePrefix=s.invoicePrefix||'INV-'; s.nextInvoiceNumber=s.nextInvoiceNumber||'1048'; if(s.taxRate===undefined) s.taxRate=DEFAULT_TAX_RATE; if(s.vatEnabled===undefined) s.vatEnabled=true; return s; }
  function reserveInvoiceNumber(dataArg){
    const data=dataArg||db();
    const s=invoiceSettings();
    const prefix=s.invoicePrefix||'INV-';
    const used=new Set();
    (data.invoices||[]).concat(data.customerCreditInvoices||[]).forEach(x=>{ const no=String(x?.no||x?.invoiceNo||x?.id||''); if(no && !no.startsWith('DRAFT')) used.add(no); });
    let next=Number(String(s.nextInvoiceNumber||'1048').replace(/\D/g,''))||1048;
    (data.invoices||[]).forEach(x=>{ const no=String(x?.no||x?.invoiceNo||x?.id||''); if(no.startsWith(prefix)){ const n=Number(no.slice(prefix.length).replace(/\D/g,'')); if(n>=next) next=n+1; } });
    let invNo=prefix+next;
    while(used.has(invNo)){ next+=1; invNo=prefix+next; }
    s.nextInvoiceNumber=String(next+1);
    localStorage.setItem('invoiceSettings',JSON.stringify(s));
    return invNo;
  }
  function dueDateFrom(dateValue){ const d=new Date(); d.setDate(d.getDate()+30); return d.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}); }
  function invoiceBalance(inv){ return Math.max(0, number(inv?.balance!==undefined?inv.balance:(number(inv?.total??inv?.amount??inv?.grand)-number(inv?.paid)))); }
  function syncCustomerReceivable(data, inv){
    data.customerCreditInvoices=data.customerCreditInvoices||[];
    if(!inv) return;
    const no=String(inv.no||inv.invoiceNo||inv.id||'');
    if(!no || no.startsWith('DRAFT')) return;
    const total=number(inv.total??inv.amount??inv.grand);
    const paid=number(inv.paid);
    const bal=Math.max(0,total-paid);
    data.customerCreditInvoices=data.customerCreditInvoices.filter((x,i,arr)=>String(x.no)!==no || arr.findIndex(y=>String(y.no)===no)===i);
    let row=data.customerCreditInvoices.find(x=>String(x.no)===no);
    if(bal>0 && inv.customer && inv.customer!=='Walk-in Customer'){
      if(!row){ row={no}; data.customerCreditInvoices.unshift(row); }
      row.customer=inv.customer; row.date=inv.date||new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}); row.due=row.due||dueDateFrom(row.date); row.total=total; row.paid=paid; row.balance=bal; row.status=paid>0?'Partially Paid':'Open'; row.paymentMethod=inv.paymentMethod||inv.paymentType||'Customer credit';
    } else if(row){
      row.customer=inv.customer||row.customer; row.total=total; row.paid=total; row.balance=0; row.status='Closed';
    }
  }
  function productMatch(product,item){ const sku=String(item?.sku||'').trim(); const name=itemDisplayName(item); return (sku && String(product.sku||'')===sku) || (!sku && String(product.name||'')===name); }
  function negativeStockAllowed(){ try{ const cs=companySettings(); return cs.allowNegativeStock===true || localStorage.getItem('allowNegativeStock')==='1' || localStorage.getItem('axtorAllowNegativeStock')==='1'; }catch(e){ return false; } }
  function moveStockForInvoice(data, inv, type, direction){
    data.products=data.products||[]; data.stockMovements=data.stockMovements||[];
    const items=invoiceSourceItems(inv); const no=String(inv?.no||inv?.invoiceNo||inv?.id||'');
    const allowNegative=negativeStockAllowed();
    if(direction<0 && !allowNegative){
      for(const it of items){ const qty=number(it.qty)||0; if(qty<=0) continue; const p=data.products.find(prod=>productMatch(prod,it)); if(p && number(p.stock)<qty){ return {ok:false,message:`Insufficient stock for ${itemDisplayName(it)}. Available ${number(p.stock)}, requested ${qty}.`}; } }
    }
    items.forEach(it=>{
      const qty=number(it.qty)||0; if(qty<=0) return;
      const p=data.products.find(prod=>productMatch(prod,it)); if(!p) return;
      const before=number(p.stock); const after=before+(direction*qty); p.stock=allowNegative?after:Math.max(0,after); p.status=number(p.stock)<=0?'Out of stock':number(p.stock)<10?'Low':'In stock';
      data.stockMovements.unshift({dateTime:new Date().toLocaleString(),type,invoiceNo:no,sku:p.sku||it.sku||'',productName:p.name||itemDisplayName(it),quantity:direction<0?-qty:qty,beforeStock:before,afterStock:p.stock});
    });
    return {ok:true};
  }
  function applyInvoiceStock(data, inv, type='sale'){ return moveStockForInvoice(data, inv, type, -1); }
  function reverseInvoiceStock(data, inv, type='edit-reversal'){ return moveStockForInvoice(data, inv, type, 1); }
  function restockInvoiceItem(data, invNo, itemName){
    const inv=(data.invoices||[]).find(x=>String(x.no||x.invoiceNo||x.id)===String(invNo));
    const item=(invoiceSourceItems(inv)||[]).find(x=>itemDisplayName(x)===itemName) || {name:itemName,qty:1};
    return moveStockForInvoice(data,{no:invNo,items:[item]},'return',1);
  }

  function updateCustomerBalances(data){
    data.customers.forEach(c=>{
      if(c.name==='Walk-in Customer') return;
      const bal=data.customerCreditInvoices.filter(i=>i.customer===c.name).reduce((a,i)=>a+balance(i),0);
      c.balance=bal; c.status=bal>0?'Due':'Clear';
    });
  }
  function updateSupplierBalancesUI(data){
    const body=$('#supplierListBody'); if(!body) return;
    const suppliers=[...new Set(data.supplierBills.map(b=>b.supplier))];
    body.innerHTML=suppliers.map(name=>{
      const bal=data.supplierBills.filter(b=>b.supplier===name).reduce((a,b)=>a+balance(b),0);
      return `<tr><td>${name}</td><td>${name==='Starlux Paints'?'4411 9922':'4488 3377'}</td><td>${money(bal)}</td><td>${badge(bal>0?'Payable':'Clear')}</td></tr>`;
    }).join('');
  }

  function renderCustomers(){
    const body=$('#customersTableBody'); if(!body) return;
    const data=db(); updateCustomerBalances(data); save(data);
    body.innerHTML=data.customers.map(c=>`<tr><td>${safeText(c.name)}</td><td>${safeText(c.phone)}</td><td>${safeText(c.type)}</td><td>${money(c.balance)}</td><td>${badge(c.status)}</td></tr>`).join('');
  }
  function renderProducts(){
    const body=$('#productsTableBody'); if(!body) return;
    body.innerHTML=db().products.map(p=>`<tr><td>${safeText(p.sku)}</td><td>${safeText(p.name)}</td><td>${safeText(p.category)}</td><td>${money(p.price)}</td><td>${number(p.stock)}</td><td>${badge(p.status)}</td></tr>`).join('');
  }
  function renderInvoices(){
    const body=$('#savedInvoicesBody'); if(!body) return;
    body.innerHTML=(db().invoices||[]).map(inv=>{
      const no=inv.no||inv.invoiceNo||inv.id||'';
      const isDraft=String(inv.status||'').toLowerCase()==='draft' || String(no).startsWith('DRAFT');
      const action=isDraft
        ? `<button class="btn btn-sm btn-brand" type="button" data-resume-draft="${safeText(no)}"><i class="bi bi-arrow-clockwise"></i> Resume Draft</button>`
        : `<div class="d-flex gap-1 flex-wrap"><button class="btn btn-sm btn-soft" type="button" data-view-invoice="${safeText(no)}"><i class="bi bi-eye"></i> View</button><button class="btn btn-sm btn-brand" type="button" data-print-invoice="${safeText(no)}"><i class="bi bi-printer"></i> Print</button><button class="btn btn-sm btn-soft" type="button" data-edit-invoice="${safeText(no)}"><i class="bi bi-pencil-square"></i> Edit</button></div>`;
      return `<tr><td>${safeText(no)}</td><td>${safeText(inv.customer||'-')}</td><td>${safeText(inv.date||'-')}</td><td>${money(inv.amount||inv.total||inv.grand)}</td><td>${badge(inv.status||'Paid')}</td><td>${action}</td></tr>`;
    }).join('');
  }

  function itemDisplayName(x){ return String(x?.name||x?.product||x?.productName||x?.itemName||x?.description||'Item').trim() || 'Item'; }
  function getEditingInvoiceNo(){ return sessionStorage.getItem(EDIT_KEY) || localStorage.getItem(EDIT_KEY) || ''; }
  function findInvoiceByNo(no){ return (db().invoices||[]).find(x=>String(x.no||x.invoiceNo||x.id)===String(no)); }
  function clearInvoiceEditMode(clearCart=false){
    sessionStorage.removeItem(EDIT_KEY); localStorage.removeItem(EDIT_KEY); sessionStorage.removeItem(EDIT_CUSTOMER_KEY); sessionStorage.removeItem(EDIT_PAYMENT_KEY); localStorage.removeItem('axtorResumeSalesmanId');
    if(clearCart) sessionStorage.setItem(CART,'[]');
    updateEditModeUi();
  }
  function invoiceSourceItems(inv){
    if(Array.isArray(inv?.items) && inv.items.length) return inv.items;
    if(Array.isArray(inv?.draftItems) && inv.draftItems.length) return inv.draftItems;
    return [];
  }
  function normalizeCartItem(x){
    const itemName=itemDisplayName(x);
    const price=number(x?.price ?? x?.rate ?? x?.unitPrice);
    return {sku:x?.sku||'', barcode:x?.barcode||'', brand:x?.brand||'', category:x?.category||'', colorCode:x?.colorCode||'', shade:x?.shade||x?.formula||'', batchNo:x?.batchNo||'', expiryDate:x?.expiryDate||'', warehouse:x?.warehouse||'', unit:x?.unit||'PCS', name:itemName, product:itemName, productName:itemName, itemName:itemName, description:itemName, qty:number(x?.qty)||1, price, rate:price, discount:number(x?.discount), taxRate:getDefaultTaxRate()};
  }
  function buildInvoiceItemsFromCart(cart){
    return (cart||[]).map(x=>{ const itemName=itemDisplayName(x); const qty=number(x.qty)||1; const price=number(x.price ?? x.rate); const discount=number(x.discount); const taxRate=getDefaultTaxRate(); const taxable=Math.max(0,(qty*price)-discount); return {sku:x.sku||'', barcode:x.barcode||'', brand:x.brand||'', category:x.category||'', colorCode:x.colorCode||'', shade:x.shade||'', batchNo:x.batchNo||'', expiryDate:x.expiryDate||'', warehouse:x.warehouse||'', name:itemName, product:itemName, productName:itemName, itemName:itemName, description:itemName, unit:x.unit||'PCS', qty, rate:price, price, discount, taxRate, tax:taxable*(taxRate/100), total:taxable+(taxable*(taxRate/100))}; });
  }
  function populateNewSaleMetaControls(inv){
    ensureNewSaleEditControls();
    const editing=!!getEditingInvoiceNo();
    const c=$('#newSaleCustomer');
    if(c){ const stored=sessionStorage.getItem(EDIT_CUSTOMER_KEY); const current=editing ? (stored || inv?.customer || c.value || 'Walk-in Customer') : (c.value || stored || inv?.customer || 'Walk-in Customer'); const names=[...new Set(['Walk-in Customer'].concat((db().customers||[]).map(x=>x.name)).filter(Boolean))]; c.innerHTML=names.map(name=>`<option ${name===current?'selected':''}>${safeText(name)}</option>`).join(''); c.value=current; }
    const p=$('#newSalePaymentMethod');
    if(p){ const stored=sessionStorage.getItem(EDIT_PAYMENT_KEY); const val=editing ? (stored || inv?.paymentMethod || inv?.paymentType || (String(inv?.status||'').toLowerCase()==='credit'?'Customer credit':'Cash')) : (stored || p.value || 'Cash'); p.value=val; }
  }
  function ensureNewSaleEditControls(){
    const salesEl=$('#newSaleSalesmanId'); if(!salesEl) return;
    const card=salesEl.closest('.cardx'); if(!card) return;
    const title=card.querySelector('.cardx-title');
    if(title && !$('#invoiceEditModeBanner')) title.insertAdjacentHTML('afterend', `<div id="invoiceEditModeBanner" class="alert alert-warning d-none mt-2 mb-3"><div class="d-flex flex-wrap align-items-center justify-content-between gap-2"><div><i class="bi bi-pencil-square me-1"></i><strong>Editing Invoice:</strong> <span id="invoiceEditModeNo" class="mono"></span><div class="small text-muted">Updating will keep the same invoice number and replace the saved invoice data.</div></div><button type="button" class="btn btn-sm btn-soft" data-cancel-invoice-edit><i class="bi bi-x-circle"></i> Cancel Edit</button></div></div>`);
    const salesRow=salesEl.closest('.row');
    if(salesRow && !$('#newSaleCustomer')) salesRow.insertAdjacentHTML('beforebegin', `<div class="row g-2 mb-3" id="newSaleMetaRow"><div class="col-md-6"><label class="form-label fw-semibold"><i class="bi bi-person me-1"></i>Customer</label><select id="newSaleCustomer" class="form-select"></select></div><div class="col-md-6"><label class="form-label fw-semibold"><i class="bi bi-credit-card me-1"></i>Payment</label><select id="newSalePaymentMethod" class="form-select"><option>Cash</option><option>Card</option><option>Bank transfer</option><option>Customer credit</option><option>Cash/Card</option></select></div></div>`);
  }
  function updateEditModeUi(){
    ensureNewSaleEditControls();
    const no=getEditingInvoiceNo(); const banner=$('#invoiceEditModeBanner');
    if(banner){ banner.classList.toggle('d-none',!no); const label=$('#invoiceEditModeNo'); if(label) label.textContent=no; }
    const btn=$('#completeSaleBtn'); if(btn) btn.innerHTML=no?'<i class="bi bi-check2-circle"></i> Update Invoice':'Complete Sale';
    const title=$('#paymentModal .modal-title'); if(title) title.textContent=no?`Update Invoice ${no}`:'Payment Details';
    const inv=no?findInvoiceByNo(no):null; populateNewSaleMetaControls(inv||{}); updateNewSaleSalesmanSummary();
  }
  function activateNewSaleTab(){
    if(location.hash!=='#new-sale') history.pushState(null,'','#new-sale');
    if(window.AxtorActivateHash) window.AxtorActivateHash();
    const trigger=document.querySelector('[data-bs-target="#new-sale"]'); if(trigger && window.bootstrap?.Tab) new bootstrap.Tab(trigger).show();
  }
  function startInvoiceEdit(no){
    const inv=findInvoiceByNo(no);
    if(!inv){ toast('Invoice not found','warning'); return; }
    const isDraft=String(inv.status||'').toLowerCase()==='draft' || String(inv.no||inv.invoiceNo||inv.id||'').startsWith('DRAFT');
    if(isDraft){ clearInvoiceEditMode(false); resumeDraft(inv.no||inv.invoiceNo||inv.id||no); return; }
    const items=invoiceSourceItems(inv);
    if(!items.length){ toast('This invoice has no saved items to edit. Nothing was changed.','warning'); return; }
    const invNo=inv.no||inv.invoiceNo||inv.id||no;
    sessionStorage.setItem(CART,JSON.stringify(items.map(normalizeCartItem)));
    sessionStorage.setItem(EDIT_KEY,invNo); localStorage.setItem(EDIT_KEY,invNo);
    sessionStorage.setItem(EDIT_CUSTOMER_KEY,inv.customer||'Walk-in Customer');
    sessionStorage.setItem(EDIT_PAYMENT_KEY,inv.paymentMethod||inv.paymentType||(String(inv.status||'').toLowerCase()==='credit'?'Customer credit':'Cash'));
    if(inv.salesmanId) localStorage.setItem('axtorResumeSalesmanId', inv.salesmanId); else localStorage.removeItem('axtorResumeSalesmanId');
    if(location.pathname.split('/').pop()==='sales.html' || location.pathname.split('/').pop()===''){
      activateNewSaleTab(); populateNewSaleMetaControls(inv); if($('#newSaleSalesmanId')) $('#newSaleSalesmanId').value=inv.salesmanId||''; updateNewSaleSalesmanSummary(); renderCart(); updateEditModeUi(); toast(`Editing invoice ${invNo}`);
    } else {
      location.href='sales.html#new-sale';
    }
  }
  function invoiceCustomerPhone(inv){
    const direct=String(inv?.customerPhone||inv?.customerMobile||inv?.phone||inv?.mobile||'').trim();
    if(direct && direct!=='-') return direct;
    const c=(db().customers||[]).find(x=>x.name===inv?.customer);
    const ph=String(c?.phone||'').trim();
    return ph && ph!=='-' ? ph : (inv?.customer==='Walk-in Customer'?'77790000':'');
  }
  function fallbackInvoiceItems(inv){
    const no=String(inv?.no||inv?.invoiceNo||inv?.id||'');
    if(no==='INV-1048') return [
      {sku:'AX-2K-101',brand:'Starlux',name:'2K Solid Paint',product:'2K Solid Paint',productName:'2K Solid Paint',colorCode:'Toyota 040',unit:'LTR',qty:2,rate:95,price:95,discount:0,taxRate:DEFAULT_TAX_RATE},
      {sku:'CC-HS-1L',brand:'Cosmo Coating',name:'HS Clear Coat 1L',product:'HS Clear Coat 1L',productName:'HS Clear Coat 1L',colorCode:'Clear',unit:'PCS',qty:1,rate:55,price:55,discount:0,taxRate:DEFAULT_TAX_RATE},
      {sku:'TN-NC-5L',brand:'Diamond Paints',name:'NC Thinner 5L',product:'NC Thinner 5L',productName:'NC Thinner 5L',colorCode:'N/A',unit:'PCS',qty:1,rate:45,price:45,discount:0,taxRate:DEFAULT_TAX_RATE}
    ];
    if(no==='INV-1047') return [
      {sku:'EP-PR-4L',brand:'Starlux',name:'Epoxy Primer 4L',product:'Epoxy Primer 4L',productName:'Epoxy Primer 4L',colorCode:'Grey',unit:'PCS',qty:4,rate:165,price:165,discount:0,taxRate:0},
      {sku:'AX-2K-101',brand:'Starlux',name:'2K Solid Paint',product:'2K Solid Paint',productName:'2K Solid Paint',colorCode:'Toyota 040',unit:'LTR',qty:5,rate:95,price:95,discount:0,taxRate:0},
      {sku:'CC-HS-1L',brand:'Cosmo Coating',name:'HS Clear Coat 1L',product:'HS Clear Coat 1L',productName:'HS Clear Coat 1L',colorCode:'Clear',unit:'PCS',qty:3,rate:55,price:55,discount:0,taxRate:0},
      {sku:'TN-NC-5L',brand:'Diamond Paints',name:'NC Thinner 5L',product:'NC Thinner 5L',productName:'NC Thinner 5L',colorCode:'N/A',unit:'PCS',qty:4,rate:45,price:45,discount:0,taxRate:0}
    ];
    const total=number(inv?.grand ?? inv?.total ?? inv?.amount);
    return [{sku:no,brand:'',name:'Invoice sale item',product:'Invoice sale item',productName:'Invoice sale item',unit:'Invoice',qty:1,rate:total,price:total,discount:0,taxRate:0,total}];
  }

  function invoicePrintData(inv){
    if(!inv) return null;
    const total=number(inv.grand ?? inv.total ?? inv.amount);
    const tax=number(inv.tax ?? inv.taxAmount);
    const rawItems=Array.isArray(inv.items) && inv.items.length ? inv.items : (Array.isArray(inv.draftItems) && inv.draftItems.length ? inv.draftItems : fallbackInvoiceItems(inv));
    const items=rawItems.map(x=>{ const itemName=itemDisplayName(x); return {
      sku:x.sku||'', barcode:x.barcode||'', brand:x.brand||'', category:x.category||'', colorCode:x.colorCode||'', shade:x.shade||x.formula||'', batchNo:x.batchNo||'', expiryDate:x.expiryDate||'', warehouse:x.warehouse||'',
      name:itemName, product:x.product||x.productName||itemName, productName:x.productName||itemName, itemName:x.itemName||itemName, description:x.description||itemName, unit:x.unit||'PCS', qty:number(x.qty)||1, rate:number(x.rate ?? x.price ?? x.unitPrice), price:number(x.price ?? x.rate ?? x.unitPrice), discount:number(x.discount), taxRate:x.taxRate!==undefined?number(x.taxRate):getDefaultTaxRate(), tax:x.tax, total:x.total
    }; });
    return {
      invoiceNo:inv.invoiceNo||inv.no||inv.id,
      no:inv.no||inv.invoiceNo||inv.id,
      date:inv.date||new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}),
      time:inv.time||new Date().toLocaleTimeString(),
      customer:inv.customer||'Walk-in Customer',
      customerPhone:invoiceCustomerPhone(inv),
      salesmanId:inv.salesmanId||'',
      salesman:salesmanName(inv.salesmanId)||inv.salesman||'',
      branch:inv.branch||'Main Branch',
      cashier:inv.cashier||'Counter User',
      paymentMethod:inv.paymentMethod||inv.paymentType||inv.status||'Cash/Card',
      paymentType:inv.paymentType||inv.paymentMethod||'',
      subtotal:inv.subtotal,
      discount:inv.discount,
      tax:tax,
      total:total,
      amount:total,
      grand:total,
      paid:inv.paid!==undefined?number(inv.paid):(String(inv.status).toLowerCase()==='credit'?0:total),
      balance:inv.balance!==undefined?number(inv.balance):(String(inv.status).toLowerCase()==='credit'?total:0),
      status:inv.status||'Paid',
      customerTax:inv.customerTax||'',
      customerBalance:inv.customerBalance||0,
      deliveryAddress:inv.deliveryAddress||'Doha, Qatar',
      vehicleRef:inv.vehicleRef||'',
      colorMatchingNote:inv.colorMatchingNote||'',
      thinnerRatio:inv.thinnerRatio||'',
      invoiceDiscount:inv.invoiceDiscount||0,
      items
    };
  }

  function openSavedInvoice(no, printMode=false){
    const inv=(db().invoices||[]).find(x=>String(x.no||x.invoiceNo||x.id)===String(no));
    if(!inv){ toast('Invoice not found','warning'); return; }
    const isDraft=String(inv.status||'').toLowerCase()==='draft' || String(inv.no||'').startsWith('DRAFT');
    if(isDraft){ resumeDraft(inv.no||no); return; }
    if(!window.AxtorInvoice){ toast('Invoice engine is not loaded yet','warning'); return; }
    const data=invoicePrintData(inv);
    const template=window.AxtorInvoice.selectedTemplate?.(data.customer) || localStorage.getItem('selectedInvoiceTemplate') || 'modern-a4';
    if(printMode) window.AxtorInvoice.print(template,{data}); else window.AxtorInvoice.preview(template,{data});
  }

  function renderCustomerPayments(){
    const body=$('#customerPaymentInvoicesBody'); if(!body) return;
    const data=db(); const customer=$('#customerPaymentCustomer')?.value || 'Al Noor Garage';
    const rows=data.customerCreditInvoices.filter(i=>i.customer===customer && balance(i)>0);
    body.innerHTML=rows.map(i=>`<tr data-invoice="${safeText(i.no)}"><td><input class="form-check-input" type="checkbox" data-customer-check checked></td><td><strong>${safeText(i.no)}</strong><br><small class="text-muted">${safeText(i.date)}</small></td><td>${safeText(i.due)}</td><td>${money(i.total)}</td><td>${money(i.paid)}</td><td>${money(balance(i))}</td><td><input class="form-control form-control-sm allocation-input" data-customer-apply="${safeText(i.no)}" type="number" min="0" max="${balance(i)}" value="0"></td></tr>`).join('') || '<tr><td colspan="7" class="text-center text-muted py-4">No open invoices for this customer.</td></tr>';
    renderCustomerPaymentHistory(); updateCustomerPaymentSummary();
  }
  function updateCustomerPaymentSummary(){
    const data=db(); const customer=$('#customerPaymentCustomer')?.value || 'Al Noor Garage';
    const currentBalance=data.customerCreditInvoices.filter(i=>i.customer===customer).reduce((a,i)=>a+balance(i),0);
    const allocated=$$('[data-customer-apply]').reduce((a,input)=>a+number(input.value),0);
    const received=number($('#customerReceivedTotal')?.value||allocated);
    $('#customerCurrentBalance') && ($('#customerCurrentBalance').textContent=money(currentBalance));
    $('#customerAllocatedTotal') && ($('#customerAllocatedTotal').textContent=money(allocated));
    $('#customerUnallocated') && ($('#customerUnallocated').textContent=money(Math.max(0,received-allocated)));
    $('#customerBalanceAfter') && ($('#customerBalanceAfter').textContent=money(Math.max(0,currentBalance-allocated)));
  }
  function renderCustomerPaymentHistory(){
    const body=$('#customerPaymentHistoryBody'); if(!body) return;
    const data=db(); const customer=$('#customerPaymentCustomer')?.value || 'Al Noor Garage';
    body.innerHTML=data.customerPayments.filter(p=>p.customer===customer).map(p=>`<tr><td>${safeText(p.no)}</td><td>${safeText(p.date)}</td><td>${money(p.total)}</td><td>${safeText(p.method)}</td><td>${p.allocations.map(a=>safeText(a.invoiceNo)+': '+money(a.amount)).join('<br>')}</td></tr>`).join('') || '<tr><td colspan="5" class="text-center text-muted py-3">No payments recorded yet.</td></tr>';
  }
  function autoAllocateCustomer(){
    let remaining=number($('#customerReceivedTotal')?.value); if(remaining<=0) return toast('Enter received amount first','warning');
    $$('[data-customer-apply]').forEach(input=>{ const max=number(input.max); const apply=Math.min(max,remaining); input.value=apply||0; remaining-=apply; });
    updateCustomerPaymentSummary();
  }
  function saveCustomerPayment(){
    const data=db(); const customer=$('#customerPaymentCustomer')?.value || 'Al Noor Garage';
    const allocations=[];
    $$('[data-customer-apply]').forEach(input=>{
      const amount=number(input.value); if(amount<=0) return;
      const inv=data.customerCreditInvoices.find(i=>i.no===input.dataset.customerApply); if(!inv) return;
      const applied=Math.min(amount,balance(inv));
      if(applied>0){
        inv.paid=number(inv.paid)+applied; inv.balance=Math.max(0,number(inv.total)-number(inv.paid)); inv.status=inv.balance>0?'Partially Paid':'Closed';
        const saved=(data.invoices||[]).find(x=>String(x.no||x.invoiceNo||x.id)===String(inv.no));
        if(saved){ saved.paid=Math.min(number(saved.total||saved.amount), number(saved.paid)+applied); saved.balance=Math.max(0,number(saved.total||saved.amount)-number(saved.paid)); saved.status=saved.balance<=0?'Paid':'Partially Paid'; }
        allocations.push({invoiceNo:inv.no,amount:applied});
      }
    });
    const total=allocations.reduce((a,x)=>a+x.amount,0); if(total<=0) return toast('Allocate payment to at least one invoice','warning');
    const payment={no:receiptNo('REC',data.customerPayments.length),customer,date:$('#customerPaymentDate')?.value||new Date().toISOString().slice(0,10),method:$('#customerPaymentMethod')?.value||'Cash',account:$('#customerPaymentAccount')?.value||'Cash Account',ref:$('#customerPaymentRef')?.value||'',total,allocations};
    data.customerPayments.unshift(payment); data.activity.unshift(`${payment.no} received from ${customer} for ${money(total)}`); updateCustomerBalances(data); save(data);
    renderCustomers(); renderCustomerPayments(); renderInvoices(); toast(`${payment.no} saved. Customer balance updated.`);
  }

  function renderSupplierPayments(){
    const body=$('#supplierPaymentBillsBody'); if(!body) return;
    const data=db(); const supplier=$('#supplierPaymentSupplier')?.value || 'Starlux Paints';
    const rows=data.supplierBills.filter(b=>b.supplier===supplier && balance(b)>0);
    body.innerHTML=rows.map(b=>`<tr data-bill="${b.no}"><td><input class="form-check-input" type="checkbox" data-supplier-check checked></td><td><strong>${b.no}</strong><br><small class="text-muted">${b.date}</small></td><td>${b.due}</td><td>${money(b.total)}</td><td>${money(b.paid)}</td><td>${money(balance(b))}</td><td><input class="form-control form-control-sm allocation-input" data-supplier-apply="${b.no}" type="number" min="0" max="${balance(b)}" value="0"></td></tr>`).join('') || '<tr><td colspan="7" class="text-center text-muted py-4">No open purchase invoices for this supplier.</td></tr>';
    renderSupplierPaymentHistory(); updateSupplierPaymentSummary(); updateSupplierBalancesUI(data);
  }
  function updateSupplierPaymentSummary(){
    const data=db(); const supplier=$('#supplierPaymentSupplier')?.value || 'Starlux Paints';
    const currentBalance=data.supplierBills.filter(b=>b.supplier===supplier).reduce((a,b)=>a+balance(b),0);
    const allocated=$$('[data-supplier-apply]').reduce((a,input)=>a+number(input.value),0);
    const paid=number($('#supplierPaidTotal')?.value||allocated);
    $('#supplierCurrentBalance') && ($('#supplierCurrentBalance').textContent=money(currentBalance));
    $('#supplierAllocatedTotal') && ($('#supplierAllocatedTotal').textContent=money(allocated));
    $('#supplierUnallocated') && ($('#supplierUnallocated').textContent=money(Math.max(0,paid-allocated)));
    $('#supplierBalanceAfter') && ($('#supplierBalanceAfter').textContent=money(Math.max(0,currentBalance-allocated)));
  }
  function renderSupplierPaymentHistory(){
    const body=$('#supplierPaymentHistoryBody'); if(!body) return;
    const data=db(); const supplier=$('#supplierPaymentSupplier')?.value || 'Starlux Paints';
    body.innerHTML=data.supplierPayments.filter(p=>p.supplier===supplier).map(p=>`<tr><td>${p.no}</td><td>${p.date}</td><td>${money(p.total)}</td><td>${p.method}</td><td>${p.allocations.map(a=>a.billNo+': '+money(a.amount)).join('<br>')}</td></tr>`).join('') || '<tr><td colspan="5" class="text-center text-muted py-3">No supplier payments recorded yet.</td></tr>';
  }
  function autoAllocateSupplier(){
    let remaining=number($('#supplierPaidTotal')?.value); if(remaining<=0) return toast('Enter paid amount first','warning');
    $$('[data-supplier-apply]').forEach(input=>{ const max=number(input.max); const apply=Math.min(max,remaining); input.value=apply||0; remaining-=apply; });
    updateSupplierPaymentSummary();
  }
  function saveSupplierPayment(){
    const data=db(); const supplier=$('#supplierPaymentSupplier')?.value || 'Starlux Paints';
    const allocations=[];
    $$('[data-supplier-apply]').forEach(input=>{
      const amount=number(input.value); if(amount<=0) return;
      const bill=data.supplierBills.find(b=>b.no===input.dataset.supplierApply); if(!bill) return;
      const applied=Math.min(amount,balance(bill)); if(applied>0){ bill.paid=number(bill.paid)+applied; allocations.push({billNo:bill.no,amount:applied}); }
    });
    const total=allocations.reduce((a,x)=>a+x.amount,0); if(total<=0) return toast('Allocate payment to at least one purchase invoice','warning');
    const payment={no:receiptNo('SP',data.supplierPayments.length),supplier,date:$('#supplierPaymentDate')?.value||new Date().toISOString().slice(0,10),method:$('#supplierPaymentMethod')?.value||'Bank Transfer',account:$('#supplierPaymentAccount')?.value||'CBQ Bank',ref:$('#supplierPaymentRef')?.value||'',total,allocations};
    data.supplierPayments.unshift(payment); data.activity.unshift(`${payment.no} paid to ${supplier} for ${money(total)}`); save(data);
    renderSupplierPayments(); toast(`${payment.no} saved. Supplier balance updated.`);
  }

  function productCatalog(){
    const data=db();
    const extra=[{sku:'TN-NC-5L',name:'NC Thinner 5L',category:'Thinner',price:45,stock:310,status:'In stock'},{sku:'AX-EN-4L',name:'Enamel Paint 4L',category:'Industrial',price:88,stock:54,status:'In stock'}];
    const bySku={};
    (data.products||[]).concat(extra).forEach(p=>{ if(p && p.sku) bySku[p.sku]=p; });
    return Object.values(bySku);
  }
  function findProduct(query){
    const q=String(query||'').trim().toLowerCase();
    if(!q) return null;
    const list=productCatalog();
    return list.find(p=>String(p.sku||'').toLowerCase()===q)
      || list.find(p=>String(p.barcode||'').toLowerCase()===q)
      || list.find(p=>String(p.name||'').toLowerCase()===q)
      || list.find(p=>`${p.sku||''} ${p.barcode||''} ${p.name||''} ${p.category||''}`.toLowerCase().includes(q))
      || null;
  }
  function productIconClass(p){
    const text=`${p?.category||''} ${p?.name||''}`.toLowerCase();
    if(text.includes('clear')) return 'bi bi-bucket';
    if(text.includes('thinner') || text.includes('fuel')) return 'bi bi-fuel-pump';
    if(text.includes('primer') || text.includes('industrial')) return 'bi bi-paint-bucket';
    return 'bi bi-droplet';
  }
  function renderNewSaleProductGrid(term=''){
    const grid=$('#newSaleProductGrid');
    if(!grid) return;
    const q=String(term||'').trim().toLowerCase();
    const list=productCatalog().filter(p=>!q || `${p.sku||''} ${p.barcode||''} ${p.name||''} ${p.category||''}`.toLowerCase().includes(q));
    grid.innerHTML=list.map(p=>`<div class="col-md-4"><div class="pos-product"><div class="pos-img"><i class="${productIconClass(p)}"></i></div><strong>${safeText(p.name)}</strong><small class="text-muted">SKU ${safeText(p.sku||'-')}${p.barcode?` • ${safeText(p.barcode)}`:''}</small><div class="d-flex justify-content-between"><span class="fw-bold">${money(p.price)}</span><button class="btn btn-sm btn-brand" data-add-cart data-sku="${safeText(p.sku||'')}" data-name="${safeText(p.name)}" data-price="${number(p.price)}">Add</button></div></div></div>`).join('') || '<div class="col-12"><div class="text-muted text-center py-4">No product found.</div></div>';
  }
  function getCart(){ try{ const raw=sessionStorage.getItem(CART); return raw===null ? [] : applyCurrentTaxRateToCart(JSON.parse(raw)||[]); }catch(e){return[]} }
  function setCart(cart){ sessionStorage.setItem(CART,JSON.stringify(applyCurrentTaxRateToCart(cart||[]))); renderCart(); }
  function addSaleItem(query){
    const p=findProduct(query);
    if(!p){ toast('Product not found in demo list','warning'); return false; }
    let cart=getCart(); const found=cart.find(x=>(x.sku&&x.sku===p.sku) || x.name===p.name);
    if(found) found.qty=number(found.qty)+1; else cart.push({sku:p.sku,barcode:p.barcode||'',brand:p.brand||'',category:p.category||'',name:p.name,product:p.name,productName:p.name,itemName:p.name,description:p.name,price:number(p.price),rate:number(p.price),qty:1,discount:0,taxRate:getDefaultTaxRate()});
    setCart(cart); toast(`${p.name} added to cart`); return true;
  }
  function cartTotals(cart=getCart()){
    const sub=cart.reduce((a,x)=>a+(number(x.qty)*number(x.price ?? x.rate)),0);
    const discount=cart.reduce((a,x)=>a+number(x.discount),0);
    const tax=cart.reduce((a,x)=>{ const base=Math.max(0,(number(x.qty)*number(x.price ?? x.rate))-number(x.discount)); const rate=getDefaultTaxRate(); return a+(base*(rate/100)); },0);
    const total=Math.max(0,sub-discount)+tax;
    return {sub,discount,tax,total};
  }
  function renderCart(){
    const body=$('#posCartBody'); if(!body) return;
    let cart=getCart();
    const editing=!!getEditingInvoiceNo();
    const table=body.closest('table'); const head=table?.querySelector('thead tr');
    if(head) head.innerHTML=editing?'<th>Item</th><th>Qty</th><th>Rate</th><th>Discount</th><th>Total</th><th></th>':'<th>Item</th><th>Qty</th><th>Total</th>';
    body.innerHTML=cart.map((x,i)=>{ const itemName=itemDisplayName(x); const qty=number(x.qty)||1; const price=number(x.price ?? x.rate); const disc=number(x.discount); const taxRate=getDefaultTaxRate(); const taxable=Math.max(0,(qty*price)-disc); const lineTotal=taxable+(taxable*(taxRate/100)); return editing
      ? `<tr><td>${safeText(itemName)}${x.sku?`<br><small class="text-muted mono">${safeText(x.sku)}</small>`:''}</td><td><input class="form-control form-control-sm text-center" type="number" min="0" step="1" data-cart-qty-input="${i}" value="${qty}" style="width:76px"></td><td><input class="form-control form-control-sm" type="number" min="0" step="0.01" data-cart-price-input="${i}" value="${price}" style="width:96px"></td><td><input class="form-control form-control-sm" type="number" min="0" step="0.01" data-cart-discount-input="${i}" value="${disc}" style="width:96px"></td><td class="fw-semibold">${money(lineTotal)}</td><td><button class="btn btn-sm btn-soft text-danger" type="button" data-cart-remove="${i}"><i class="bi bi-x-lg"></i></button></td></tr>`
      : `<tr><td>${safeText(itemName)}${x.sku?`<br><small class="text-muted mono">${safeText(x.sku)}</small>`:''}</td><td><button class="btn btn-sm btn-soft" data-cart-minus="${i}">−</button> <span class="mx-1">${qty}</span> <button class="btn btn-sm btn-soft" data-cart-plus="${i}">+</button></td><td>${money(qty*price)}</td></tr>`; }).join('') || `<tr><td colspan="${editing?6:3}" class="text-muted">Cart is empty. Scan SKU or add product.</td></tr>`;
    const t=cartTotals(cart);
    updateTaxLabels();
    $('#posSubtotal') && ($('#posSubtotal').textContent=money(t.sub)); $('#posTax') && ($('#posTax').textContent=money(t.tax)); $('#posTotal') && ($('#posTotal').textContent=money(t.total)); $('[data-payment-total]') && ($('[data-payment-total]').textContent=money(t.total));
    updateEditModeUi();
  }

  function salesmanName(id){ const sm=(db().salesmen||[]).find(s=>s.id===id); return sm?sm.name:''; }
  function populateSalesmanDropdown(){
    const opts=['<option value="">— No Salesman Assigned —</option>'].concat((db().salesmen||[]).filter(s=>s.active).map(s=>`<option value="${safeText(s.id)}">${safeText(s.name)}${s.branch?' — '+safeText(s.branch):''}</option>`)).join('');
    ['newSaleSalesmanId'].forEach(id=>{ const el=$('#'+id); if(el){ const current=el.value; el.innerHTML=opts; const resume=localStorage.getItem('axtorResumeSalesmanId'); const editNo=getEditingInvoiceNo() || new URLSearchParams(location.search).get('edit'); const inv=editNo?findInvoiceByNo(editNo):null; if(resume){ el.value=resume; localStorage.removeItem('axtorResumeSalesmanId'); } else if(current){ el.value=current; } else if(inv?.salesmanId){ el.value=inv.salesmanId; } } });
  }
  function updateNewSaleSalesmanSummary(){ const id=$('#newSaleSalesmanId')?.value||''; const sm=salesmanName(id); const row=$('#posSalesmanSummary'); if(row) row.innerHTML=sm?`<div class="d-flex justify-content-between"><span>Salesman</span><strong><i class="bi bi-person-badge me-1 text-brand"></i>${sm}</strong></div>`:''; }

  function saveDraftInvoice(){
    if(getEditingInvoiceNo()) return toast('Update or cancel the current invoice edit before saving a new draft.','warning');
    const cart=getCart(); if(!cart.length) return toast('Cart is empty. Add items before saving draft.','warning');
    const totals=cartTotals(cart); const data=db(); data.invoices=data.invoices||[];
    let no='DRAFT-'+Date.now().toString().slice(-6);
    while(data.invoices.some(x=>x.no===no)) no='DRAFT-'+Math.floor(1000+Math.random()*9000);
    const salesmanId=$('#newSaleSalesmanId')?.value||'';
    const customer=$('#newSaleCustomer')?.value||sessionStorage.getItem(EDIT_CUSTOMER_KEY)||'Walk-in Customer'; const paymentMethod=$('#newSalePaymentMethod')?.value||sessionStorage.getItem(EDIT_PAYMENT_KEY)||'Cash'; const draft={no,customer,date:new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}),amount:totals.total,total:totals.total,subtotal:totals.sub,discount:totals.discount,tax:totals.tax,salesmanId,paymentMethod,paymentType:paymentMethod,status:'Draft',draftItems:cart.map(x=>({sku:x.sku||'',name:itemDisplayName(x),product:itemDisplayName(x),productName:itemDisplayName(x),itemName:itemDisplayName(x),description:itemDisplayName(x),qty:number(x.qty),price:number(x.price),rate:number(x.price),discount:number(x.discount),taxRate:getDefaultTaxRate()}))};
    data.invoices.unshift(draft); data.activity=data.activity||[]; data.activity.unshift(`${no} draft saved for ${money(totals.total)}${salesmanId?' by '+salesmanName(salesmanId):''}`); save(data); renderInvoices(); toast(`${no} saved as draft`);
  }
  function resumeDraft(no){
    clearInvoiceEditMode(false);
    const inv=(db().invoices||[]).find(x=>x.no===no && String(x.status).toLowerCase()==='draft');
    if(!inv){ toast('Draft invoice not found','warning'); return; }
    const items=(inv.draftItems||inv.items||[]).map(x=>{ const itemName=itemDisplayName(x); return {sku:x.sku||'',name:itemName,product:itemName,productName:itemName,itemName:itemName,description:itemName,qty:number(x.qty)||1,price:number(x.price||x.rate)}; });
    sessionStorage.setItem(CART,JSON.stringify(items));
    sessionStorage.setItem('axtorResumingDraftNo', no);
    sessionStorage.setItem(EDIT_CUSTOMER_KEY, inv.customer||'Walk-in Customer');
    sessionStorage.setItem(EDIT_PAYMENT_KEY, inv.paymentMethod||inv.paymentType||'Cash');
    if(inv.salesmanId) localStorage.setItem('axtorResumeSalesmanId', inv.salesmanId);
    if(location.pathname.split('/').pop()==='sales.html' || location.pathname.split('/').pop()===''){
      if($('#newSaleSalesmanId') && inv.salesmanId){ $('#newSaleSalesmanId').value=inv.salesmanId; updateNewSaleSalesmanSummary(); }
      renderCart();
      if(location.hash!=='#new-sale') history.pushState(null,'','#new-sale');
      if(window.AxtorActivateHash) window.AxtorActivateHash();
      toast('Draft resumed');
    } else {
      location.href='sales.html#new-sale';
    }
  }

  function updatePaymentModalTotals(force=false){
    const total=cartTotals(getCart()).total;
    const totalEl=$('[data-payment-total]'); if(totalEl) totalEl.textContent=money(total);
    const method=$('#paymentModalMethod'); const amount=$('#paymentModalAmount'); const bal=$('#paymentModalBalance');
    if(method && $('#newSalePaymentMethod') && !force) method.value=$('#newSalePaymentMethod').value || method.value || 'Cash';
    if(amount && String(method?.value||'').toLowerCase().includes('credit')) amount.value='0.00';
    else if(amount && amount.value==='') amount.value='0.00';
    const paid=String(method?.value||'').toLowerCase().includes('credit') ? 0 : Math.min(total, number(amount?.value));
    if(bal) bal.textContent=money(Math.max(0,total-paid));
  }
  function readNewSalePayment(totals, oldInv={}){
    const modalMethod=$('#paymentModalMethod')?.value;
    const pageMethod=$('#newSalePaymentMethod')?.value || sessionStorage.getItem(EDIT_PAYMENT_KEY);
    const paymentMethod=modalMethod || pageMethod || oldInv.paymentMethod || oldInv.paymentType || 'Cash';
    const isFullCredit=String(paymentMethod).toLowerCase().includes('credit');
    const rawAmount=$('#paymentModalAmount')?.value;
    const amountEntered=rawAmount===''||rawAmount===undefined ? totals.total : number(rawAmount);
    const paid=isFullCredit ? 0 : Math.min(totals.total, Math.max(0, amountEntered));
    const balanceDue=Math.max(0, totals.total-paid);
    const status=balanceDue<=0?'Paid':(paid>0?'Partially Paid':'Credit');
    return {paymentMethod, paymentType:paymentMethod, paid, balance:balanceDue, status, reference:$('#paymentModalReference')?.value||oldInv.reference||'', account:$('#paymentModalAccount')?.value||oldInv.account||''};
  }

  function initCart(){
    renderNewSaleProductGrid();
    document.addEventListener('click',e=>{
      const addBtn=e.target.closest('[data-add-cart]');
      if(addBtn){ e.preventDefault(); const key=addBtn.dataset.sku || addBtn.dataset.barcode || addBtn.dataset.name; if(!addSaleItem(key)){ const name=addBtn.dataset.name, price=number(addBtn.dataset.price); let cart=getCart(); const found=cart.find(x=>x.name===name); found?found.qty++:cart.push({name,product:name,productName:name,itemName:name,description:name,price,rate:price,qty:1,discount:0,taxRate:getDefaultTaxRate()}); setCart(cart); toast(`${name} added to cart`); } return; }
      const plus=e.target.closest('[data-cart-plus]'), minus=e.target.closest('[data-cart-minus]');
      if(plus||minus){ let cart=getCart(); const i=Number((plus||minus).dataset.cartPlus ?? (plus||minus).dataset.cartMinus); if(!cart[i]) return; if(plus) cart[i].qty=number(cart[i].qty)+1; if(minus){ cart[i].qty=number(cart[i].qty)-1; if(cart[i].qty<=0) cart.splice(i,1); } setCart(cart); return; }
      const remove=e.target.closest('[data-cart-remove]');
      if(remove){ let cart=getCart(); const i=Number(remove.dataset.cartRemove); if(cart[i]){ cart.splice(i,1); setCart(cart); } return; }
      const cancel=e.target.closest('[data-cancel-invoice-edit]');
      if(cancel){ e.preventDefault(); clearInvoiceEditMode(true); if($('#newSaleSalesmanId')) $('#newSaleSalesmanId').value=''; if($('#newSaleCustomer')) $('#newSaleCustomer').value='Walk-in Customer'; updateNewSaleSalesmanSummary(); renderCart(); toast('Invoice edit cancelled'); return; }
      const edit=e.target.closest('[data-edit-invoice]');
      if(edit){ e.preventDefault(); startInvoiceEdit(edit.dataset.editInvoice); return; }
      const resume=e.target.closest('[data-resume-draft]'); if(resume){ e.preventDefault(); resumeDraft(resume.dataset.resumeDraft); return; }
      const view=e.target.closest('[data-view-invoice]'); if(view){ e.preventDefault(); openSavedInvoice(view.dataset.viewInvoice,false); return; }
      const print=e.target.closest('[data-print-invoice]'); if(print){ e.preventDefault(); openSavedInvoice(print.dataset.printInvoice,true); return; }
    });
    document.addEventListener('change',e=>{
      const qty=e.target.closest('[data-cart-qty-input]'), price=e.target.closest('[data-cart-price-input]'), disc=e.target.closest('[data-cart-discount-input]');
      if(qty||price||disc){ const input=qty||price||disc; let cart=getCart(); const i=Number(input.dataset.cartQtyInput ?? input.dataset.cartPriceInput ?? input.dataset.cartDiscountInput); if(!cart[i]) return; if(qty) cart[i].qty=Math.max(0,number(input.value)); if(price){ cart[i].price=Math.max(0,number(input.value)); cart[i].rate=cart[i].price; } if(disc) cart[i].discount=Math.max(0,number(input.value)); if(number(cart[i].qty)<=0) cart.splice(i,1); setCart(cart); }
      if(e.target.matches('#newSaleCustomer')) sessionStorage.setItem(EDIT_CUSTOMER_KEY,e.target.value||'Walk-in Customer');
      if(e.target.matches('#newSalePaymentMethod')) sessionStorage.setItem(EDIT_PAYMENT_KEY,e.target.value||'Cash');
    });
    $('#newSaleProductSearch')?.addEventListener('input',e=>renderNewSaleProductGrid(e.currentTarget.value));
    $('#newSaleProductSearch')?.addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.preventDefault(); const input=e.currentTarget; if(addSaleItem(input.value.trim())){ input.value=''; renderNewSaleProductGrid(); } }});
    $('#paymentModal')?.addEventListener('show.bs.modal',()=>updatePaymentModalTotals(true));
    $('#paymentModalMethod')?.addEventListener('change',()=>{ if($('#newSalePaymentMethod')) $('#newSalePaymentMethod').value=$('#paymentModalMethod').value; updatePaymentModalTotals(true); });
    $('#paymentModalAmount')?.addEventListener('input',()=>updatePaymentModalTotals(false));
    $('#saveDraftBtn')?.addEventListener('click',saveDraftInvoice);
    $('#completeSaleBtn')?.addEventListener('click',()=>{
      const cart=getCart(); if(!cart.length) return toast('Cart is empty','warning');
      const totals=cartTotals(cart); const data=db(); data.invoices=data.invoices||[]; data.activity=data.activity||[];
      const editingNo=getEditingInvoiceNo(); const existingIndex=editingNo?data.invoices.findIndex(x=>String(x.no||x.invoiceNo||x.id)===String(editingNo)):-1;
      if(editingNo && existingIndex<0){ toast('Cannot update. Original invoice was not found.','warning'); return; }
      const oldInv=editingNo?data.invoices[existingIndex]:{};
      const no=editingNo || reserveInvoiceNumber(data);
      const salesmanId=$('#newSaleSalesmanId')?.value||oldInv.salesmanId||'';
      const customer=$('#newSaleCustomer')?.value||sessionStorage.getItem(EDIT_CUSTOMER_KEY)||oldInv.customer||'Walk-in Customer';
      const pay=readNewSalePayment(totals, oldInv);
      const invoice={...oldInv,no,invoiceNo:oldInv.invoiceNo||no,customer,date:oldInv.date||new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}),time:oldInv.time||new Date().toLocaleTimeString(),updatedAt:editingNo?new Date().toLocaleString('en-GB',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}):oldInv.updatedAt,amount:totals.total,total:totals.total,subtotal:totals.sub,discount:totals.discount,tax:totals.tax,grand:totals.total,paid:pay.paid,balance:pay.balance,salesmanId,salesman:salesmanName(salesmanId),status:pay.status,paymentType:pay.paymentType,paymentMethod:pay.paymentMethod,reference:pay.reference,account:pay.account,items:buildInvoiceItemsFromCart(cart)};
      delete invoice.draftItems;
      const stockData=deepClone(data);
      let stockResult;
      if(editingNo){ reverseInvoiceStock(stockData, oldInv, 'edit-reversal'); stockResult=applyInvoiceStock(stockData, invoice, 'edit-new'); }
      else { stockResult=applyInvoiceStock(stockData, invoice, 'sale'); }
      if(!stockResult.ok){ toast(stockResult.message||'Insufficient stock','warning'); return; }
      data.products=stockData.products; data.stockMovements=stockData.stockMovements;
      syncCustomerReceivable(data, invoice); updateCustomerBalances(data);
      const resumedDraft=sessionStorage.getItem('axtorResumingDraftNo');
      if(editingNo){
        data.invoices[existingIndex]=invoice;
        data.activity.unshift(`${no} updated for ${money(totals.total)}${salesmanId?' by '+salesmanName(salesmanId):''}`);
        save(data); audit(`Invoice ${no} updated${salesmanId?' with salesman '+salesmanName(salesmanId):''}`,'bi-pencil-square'); clearInvoiceEditMode(false); sessionStorage.setItem(CART,'[]');
        if($('#newSaleSalesmanId')) $('#newSaleSalesmanId').value=''; updateNewSaleSalesmanSummary(); renderCustomers(); renderProducts(); renderCustomerPayments(); renderInvoices(); renderCart(); toast(`${no} updated without duplicate`); if(window.AxtorInvoice && invoiceSettings().autoPreview){ setTimeout(()=>openSavedInvoice(no,false),80); } return;
      }
      if(resumedDraft){ const draftIndex=data.invoices.findIndex(x=>String(x.no||x.invoiceNo||x.id)===String(resumedDraft) && String(x.status||'').toLowerCase()==='draft'); if(draftIndex>=0) data.invoices.splice(draftIndex,1); sessionStorage.removeItem('axtorResumingDraftNo'); }
      data.invoices.unshift(invoice); data.activity.unshift(`${no} completed for ${money(totals.total)}${salesmanId?' by '+salesmanName(salesmanId):''}`); save(data); audit(`Invoice ${no} completed${salesmanId?' with salesman '+salesmanName(salesmanId):''}`,'bi-receipt'); sessionStorage.setItem(CART,'[]'); if($('#newSaleSalesmanId')) $('#newSaleSalesmanId').value=''; updateNewSaleSalesmanSummary(); renderCustomers(); renderProducts(); renderCustomerPayments(); renderInvoices(); renderCart(); toast(`${no} completed and saved`); if(window.AxtorInvoice && invoiceSettings().autoPreview){ setTimeout(()=>openSavedInvoice(no,false),80); }
    });
    $('#newSaleSalesmanId')?.addEventListener('change',updateNewSaleSalesmanSummary); ensureNewSaleEditControls(); populateSalesmanDropdown(); populateNewSaleMetaControls(findInvoiceByNo(getEditingInvoiceNo())||{}); updateNewSaleSalesmanSummary(); renderCart(); updateEditModeUi();
  }
  function initCustomerSave(){ const btn=$('#saveCustomerBtn') || $('#add-customer .btn-brand'); if(!btn) return; btn.addEventListener('click',e=>{ e.preventDefault(); e.stopImmediatePropagation(); const pane=$('#add-customer'), inputs=$$('.form-control',pane), type=$('.form-select',pane)?.value||'Retail'; const name=inputs[0]?.value?.trim(); if(!name) return toast('Customer name required','warning'); const opening=number(inputs[3]?.value); const data=db(); const row={name,phone:inputs[1]?.value?.trim()||'-',email:inputs[2]?.value?.trim()||'',type,openingBalance:opening,balance:opening,creditLimit:number(inputs[4]?.value),address:$('textarea',pane)?.value?.trim()||'',status:opening>0?'Due':'Clear'}; data.customers=data.customers||[]; const existing=data.customers.findIndex(c=>String(c.name).toLowerCase()===name.toLowerCase()); if(existing>=0) data.customers[existing]={...data.customers[existing],...row}; else data.customers.unshift(row); if(opening>0){ syncCustomerReceivable(data,{no:'OPEN-'+Date.now().toString().slice(-6),customer:name,date:new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}),total:opening,paid:0,balance:opening,status:'Credit',paymentMethod:'Opening balance'}); } updateCustomerBalances(data); save(data); renderCustomers(); toast('Customer saved to localStorage'); }); }
  function initProductSave(){
    const btn=$('#saveProductBtn') || $('#add-product .btn-brand');
    if(!btn) return;
    btn.addEventListener('click',e=>{
      e.preventDefault(); e.stopImmediatePropagation();
      const pane=$('#add-product');
      const inputs=$$('.form-control',pane);
      const name=($('#productNameInput')?.value ?? inputs[0]?.value ?? '').trim();
      if(!name) return toast('Product name required','warning');
      const sku=($('#productSkuInput')?.value ?? inputs[1]?.value ?? '').trim() || 'SKU-'+Date.now().toString().slice(-6);
      const barcode=($('#productBarcodeInput')?.value ?? inputs[2]?.value ?? '').trim();
      const category=$('#productCategoryInput')?.value || $('.form-select',pane)?.value || 'General';
      const price=number($('#productSalePriceInput')?.value ?? inputs[3]?.value);
      const stock=number($('#productOpeningStockInput')?.value ?? inputs[4]?.value);
      const row={sku,name,barcode,category,price,stock,status:stock<=0?'Out of stock':stock<10?'Low':'In stock'};
      const data=db(); data.products=data.products||[];
      const existing=data.products.findIndex(p=>String(p.sku||'').toLowerCase()===String(row.sku).toLowerCase());
      const action=existing>=0?'updated':'saved';
      if(existing>=0) data.products[existing]={...data.products[existing],...row}; else data.products.unshift(row);
      save(data); renderProducts(); renderNewSaleProductGrid($('#newSaleProductSearch')?.value||'');
      toast(`Product ${action}: ${row.name}`);
    });
  }
  function initTaxSettings(){
    const section=$('#tax-settings');
    if(!section) return;
    const rateInput=$('#defaultTaxRateInput') || section.querySelector('input.form-control');
    const enabledInput=$('#taxEnabledInput');
    const modeInput=$('#taxModeInput') || section.querySelector('select.form-select');
    const saveBtn=$('#saveTaxSettingsBtn') || section.querySelector('.btn-brand');
    function load(){
      const s=invoiceSettings();
      if(rateInput) rateInput.value=String(s.taxRate!==undefined?s.taxRate:DEFAULT_TAX_RATE);
      if(enabledInput) enabledInput.checked=s.vatEnabled!==false && s.taxEnabled!==false && s.taxDisabled!==true;
      if(modeInput && s.taxMode) modeInput.value=s.taxMode;
      updateTaxLabels();
    }
    saveBtn?.addEventListener('click',e=>{
      e.preventDefault(); e.stopImmediatePropagation();
      const s=invoiceSettings();
      s.taxRate=parseTaxRateValue(rateInput?.value);
      s.defaultTaxRate=s.taxRate;
      s.vatEnabled=enabledInput ? !!enabledInput.checked : true;
      s.taxEnabled=s.vatEnabled;
      s.taxMode=modeInput?.value || s.taxMode || 'Tax exclusive';
      writeInvoiceSettings(s);
      setCart(getCart());
      updateTaxLabels();
      toast(`Tax settings saved — ${s.vatEnabled?`Tax ${s.taxRate}%`:'Tax disabled'}`);
    });
    load();
  }

  function initDataTools(){ $('#exportDataBtn')?.addEventListener('click',()=>{ const blob=new Blob([JSON.stringify(db(),null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='axtor-pos-demo-data.json'; a.click(); URL.revokeObjectURL(a.href); }); $('#resetDataBtn')?.addEventListener('click',()=>{ localStorage.removeItem(KEY); sessionStorage.removeItem(CART); ensure(); populateSalesmanDropdown(); renderCustomers(); renderProducts(); renderInvoices(); renderCustomerPayments(); renderSupplierPayments(); renderCart(); toast('Demo data reset'); }); $('#importDataInput')?.addEventListener('change',e=>{ const file=e.target.files[0]; if(!file) return; const reader=new FileReader(); reader.onload=()=>{ try{ save(JSON.parse(reader.result)); toast('Data imported'); location.reload(); }catch(err){ toast('Invalid JSON file','danger'); } }; reader.readAsText(file); }); }
  function initPaymentModules(){
    $('#customerPaymentCustomer')?.addEventListener('change',renderCustomerPayments); $('#customerReceivedTotal')?.addEventListener('input',updateCustomerPaymentSummary); document.addEventListener('input',e=>{ if(e.target.matches('[data-customer-apply]')) updateCustomerPaymentSummary(); if(e.target.matches('[data-supplier-apply]')) updateSupplierPaymentSummary(); }); $('#customerAutoAllocateBtn')?.addEventListener('click',autoAllocateCustomer); $('#saveCustomerPaymentBtn')?.addEventListener('click',saveCustomerPayment);
    $('#supplierPaymentSupplier')?.addEventListener('change',renderSupplierPayments); $('#supplierPaidTotal')?.addEventListener('input',updateSupplierPaymentSummary); $('#supplierAutoAllocateBtn')?.addEventListener('click',autoAllocateSupplier); $('#saveSupplierPaymentBtn')?.addEventListener('click',saveSupplierPayment);
  }
  function initShortcuts(){ document.addEventListener('keydown',e=>{ if(!e.ctrlKey || !e.altKey) return; const k=e.key.toLowerCase(); if(k==='n') location.href='sales.html#new-sale'; if(k==='c') location.href='customer.html#add-customer'; if(k==='p') location.href='products.html#add-product'; if(k==='r') location.href='sales.html#receive-payment'; if(k==='s') location.href='purchase.html#pay-supplier'; }); }
  function initPWA(){ if('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(()=>{}); }
  ensure();
  window.AxtorDemoData={db,save,reserveInvoiceNumber,syncCustomerReceivable,updateCustomerBalances,applyInvoiceStock,reverseInvoiceStock,restockInvoiceItem,safeText,money,number,getDefaultTaxRate,getTaxLabel,updateTaxLabels,renderNewSaleProductGrid};
  document.addEventListener('DOMContentLoaded',()=>{ ensure(); renderCustomers(); renderProducts(); renderInvoices(); renderCustomerPayments(); renderSupplierPayments(); initCart(); initCustomerSave(); initProductSave(); initTaxSettings(); initDataTools(); initPaymentModules(); initShortcuts(); initPWA(); });
})();


/* Big retail advanced seed merge. This extends the existing demo DB without overwriting old localStorage data. */
(function(){
  const KEY='axtorAdvancedDemoDB';
  const DEFAULT_TAX_RATE=5;
  const advancedSeed={
    terminalCart:[], heldSales:[{no:'HOLD-1001',customer:'Walk-in Customer',time:'Today 12:20',items:2,total:245}], shiftRecords:[{no:'SHIFT-1001',cashier:'Counter User',opened:'13 Jun 2026 09:00',closed:'13 Jun 2026 21:10',openingCash:500,cashSales:4850,cardSales:3200,creditSales:1500,expenses:180,expectedCash:5170,actualCash:5150,difference:-20,status:'Closed'}], currentShift:null,
    branches:[{name:'Main Branch',type:'Retail',manager:'Danish',status:'Active'},{name:'Industrial Area Branch',type:'Retail',manager:'Counter User',status:'Active'},{name:'Warehouse',type:'Warehouse',manager:'Warehouse User',status:'Active'},{name:'Delivery Van Stock',type:'Van',manager:'Salesman',status:'Active'}],
    counters:[{name:'Counter 1',branch:'Main Branch',cashier:'Counter User',status:'Online'},{name:'Counter 2',branch:'Industrial Area Branch',cashier:'Cashier 2',status:'Offline'}], warehouses:[{name:'Main Warehouse',branch:'Warehouse',stockValue:284000},{name:'Van Stock',branch:'Delivery Van Stock',stockValue:42000}], stockTransfers:[],
    barcodeTemplates:[{size:'40x30 mm'},{size:'50x25 mm'},{size:'80x40 mm'}], stockCountSessions:[],
    reorderSuggestions:[{product:'Epoxy Primer 4L',sku:'EP-PR-4L',salesSpeed:'12 pcs/week',currentStock:8,minStock:20,suggestedQty:40,supplier:'Starlux Paints'},{product:'NC Thinner 5L',sku:'TN-NC-5L',salesSpeed:'18 pcs/week',currentStock:14,minStock:35,suggestedQty:70,supplier:'Diamond Paints'},{product:'HS Clear Coat 1L',sku:'CC-HS-1L',salesSpeed:'9 pcs/week',currentStock:16,minStock:25,suggestedQty:36,supplier:'Cosmo Coating'}],
    promotions:[{name:'Buy 2 HS Clear Coat, get 10% off',type:'Product-level discount',value:'10%',active:true,code:'HS10'},{name:'Wholesale customers get 7% discount',type:'Customer group discount',value:'7%',active:true,code:'WHOLESALE7'},{name:'Weekend offer: 5% invoice discount',type:'Weekend offer',value:'5%',active:false,code:'WEEKEND5'}],
    loyaltyPoints:[{customer:'Al Noor Garage',balance:12500,points:1850,tier:'Gold'},{customer:'Doha Auto Works',balance:6000,points:740,tier:'Silver'},{customer:'Walk-in Customer',balance:0,points:120,tier:'Silver'}], loyaltyHistory:[],
    approvalRequests:[{id:'APR-1001',type:'Discount Approval',detail:'Cashier 1 requested 15% discount on INV-1047',amount:1480,status:'Pending'},{id:'APR-1002',type:'Return Approval',detail:'Return above QAR 500 for INV-1039',amount:650,status:'Pending'},{id:'APR-1003',type:'Stock Adjustment',detail:'Warehouse count difference for NC Thinner +5',amount:0,status:'Pending'}], approvalHistory:[],
    rolesPermissions:{Owner:{},Manager:{},Cashier:{},Accountant:{},'Warehouse User':{},Salesman:{},Purchaser:{},Auditor:{}}, userRoles:[{user:'Danish Bhatti',role:'Owner'},{user:'Counter User',role:'Cashier'},{user:'Warehouse User',role:'Warehouse User'}],
    returnsExchanges:[{no:'RET-018',invoice:'INV-1030',item:'2K Solid Paint',reason:'Wrong item',refundMethod:'Cash',amount:95,restock:'Return to stock',status:'Approved'}],
    creditAging:[{customer:'Al Noor Garage',limit:10000,days:30,d0:6000,d31:4500,d60:2000,total:12500,status:'Over Limit'},{customer:'Doha Auto Works',limit:8000,days:30,d0:2500,d31:1200,d60:0,total:3700,status:'OK'}], creditReminders:[],
    supplierAging:[{supplier:'Starlux Paints',d0:12000,d31:8500,d60:0,total:20500,note:'Confirm statement before month-end'},{supplier:'Diamond Paints',d0:6000,d31:0,d60:1500,total:7500,note:'Cheque under preparation'}], supplierNotes:[],
    purchaseFlow:{requests:[{no:'PR-1001',item:'Epoxy Primer 4L',qty:40,status:'Open'}],pos:[{no:'PO-2204',supplier:'Starlux Paints',item:'Epoxy Primer 4L',qty:40,status:'Approved'}],grns:[{no:'GRN-3001',po:'PO-2204',receivedQty:40,status:'Received'}],bills:[{no:'BILL-4001',supplier:'Starlux Paints',amount:6600,status:'Payable'}],returns:[]},
    hardwareSettings:[{name:'Receipt printer',status:'Demo Mode'},{name:'Barcode scanner',status:'Connected'},{name:'Cash drawer',status:'Demo Mode'},{name:'Customer display',status:'Not Connected'},{name:'Weighing scale',status:'Not Connected'},{name:'Card terminal',status:'Demo Mode'},{name:'Label printer',status:'Demo Mode'}],
    syncStatus:{online:true,lastSync:'2 minutes ago'}, syncQueue:[{type:'Invoice',ref:'INV-1048',status:'Pending'},{type:'Payment',ref:'REC-1007',status:'Pending'},{type:'Stock',ref:'ADJ-004',status:'Pending'},{type:'Shift',ref:'SHIFT-1002',status:'Pending'}],
    auditEvents:[{user:'Cashier 1',action:'Changed discount',before:'5%',after:'15%',time:'13 Jun 2026 12:44',device:'Chrome / 192.168.1.24',approval:'Pending'},{user:'Manager',action:'Approved return',before:'Pending QAR 650',after:'Approved',time:'13 Jun 2026 12:55',device:'Chrome / 192.168.1.10',approval:'Approved'},{user:'Admin',action:'Changed product price',before:'QAR 90',after:'QAR 95',time:'13 Jun 2026 13:10',device:'Chrome / 192.168.1.11',approval:'Not required'}],
    selectedIndustry:'Paint Store'
  };
  function clone(x){return JSON.parse(JSON.stringify(x));}
  function merge(target,seed){let changed=false; Object.keys(seed).forEach(k=>{ if(target[k]===undefined){ target[k]=clone(seed[k]); changed=true; } else if(seed[k] && typeof seed[k]==='object' && !Array.isArray(seed[k]) && target[k] && typeof target[k]==='object' && !Array.isArray(target[k])){ Object.keys(seed[k]).forEach(sk=>{ if(target[k][sk]===undefined){ target[k][sk]=clone(seed[k][sk]); changed=true; } }); }}); return changed;}
  try{ const data=JSON.parse(localStorage.getItem(KEY)||'{}'); if(merge(data,advancedSeed) || !localStorage.getItem(KEY)) localStorage.setItem(KEY,JSON.stringify(data)); }catch(e){ localStorage.setItem(KEY,JSON.stringify(clone(advancedSeed))); }
})();

/* Axtor POS Cloud — canonical localStorage data layer
   Loaded first on every page. All modules use these shared helpers. */
const AXTOR_DB_KEY = 'axtorAdvancedDemoDB';
const DEFAULT_TAX_RATE = 5;
const AXTOR_BASE_SEED = {
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
const AXTOR_ADVANCED_SEED = {
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

function clone(x){ return JSON.parse(JSON.stringify(x)); }
function save(data){ localStorage.setItem(AXTOR_DB_KEY, JSON.stringify(data || {})); }
function num(v){ const n = Number(v); return Number.isFinite(n) ? n : 0; }
function readCompanySettings(){ try{ return JSON.parse(localStorage.getItem('companySettings') || '{}') || {}; }catch(e){ return {}; } }
function money(v){ const currency = readCompanySettings().currencySymbol || 'QAR '; const n = num(v); return currency + n.toLocaleString(undefined, {minimumFractionDigits:n%1?2:0, maximumFractionDigits:2}); }
function esc(v){ return String(v ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function toast(msg, type='success'){ const el=document.createElement('div'); el.className=`position-fixed bottom-0 end-0 m-3 alert alert-${type} shadow`; el.style.zIndex=10000; el.textContent=msg; document.body.appendChild(el); setTimeout(()=>el.remove(),2600); }
function nextNo(prefix, arr){ const nums=(arr||[]).map(x=>parseInt(String(x?.id||x?.no||'').replace(/\D/g,''),10)||0); return prefix+'-'+String((nums.length?Math.max(...nums):1000)+1).padStart(4,'0'); }
function promoStableId(){ return 'PROMO-' + Date.now().toString(36) + Math.random().toString(36).slice(2,6); }

function mergeSeed(target, src){
  let changed=false;
  Object.keys(src||{}).forEach(k=>{
    if(target[k]===undefined){ target[k]=clone(src[k]); changed=true; }
    else if(src[k] && typeof src[k]==='object' && !Array.isArray(src[k]) && target[k] && typeof target[k]==='object' && !Array.isArray(target[k])){
      Object.keys(src[k]).forEach(sk=>{ if(target[k][sk]===undefined){ target[k][sk]=clone(src[k][sk]); changed=true; } });
    }
  });
  return changed;
}

function normalizePromotionFields(d){
  let changed=false;
  (d.promotions||[]).forEach(p=>{
    if(!p.id){ p.id = promoStableId(); changed=true; }
    if(p.discountValue === undefined && p.value){
      const parsed = parseFloat(String(p.value).replace(/[^0-9.]/g,''));
      if(!isNaN(parsed)){ p.discountValue = parsed; changed=true; }
      if(!p.discountType){ p.discountType = String(p.value).includes('%') ? 'Percentage' : 'Fixed amount'; changed=true; }
    }
    if(!p.discountType){ p.discountType='Percentage'; changed=true; }
    if(p.deleted===undefined){ p.deleted=false; changed=true; }
  });
  return changed;
}

function dueDateFrom(dateValue){ const d=new Date(); d.setDate(d.getDate()+30); return d.toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}); }
function syncCustomerReceivableCore(data, inv){
  data.customerCreditInvoices=data.customerCreditInvoices||[];
  if(!inv) return false;
  const no=String(inv.no||inv.invoiceNo||inv.id||'');
  if(!no || no.startsWith('DRAFT')) return false;
  const total=num(inv.total??inv.amount??inv.grand);
  const paid=num(inv.paid);
  const bal=Math.max(0,total-paid);
  const before=JSON.stringify(data.customerCreditInvoices.filter(x=>String(x.no)===no));
  data.customerCreditInvoices=data.customerCreditInvoices.filter((x,i,arr)=>String(x.no)!==no || arr.findIndex(y=>String(y.no)===no)===i);
  let row=data.customerCreditInvoices.find(x=>String(x.no)===no);
  if(bal>0 && inv.customer && inv.customer!=='Walk-in Customer'){
    if(!row){ row={no}; data.customerCreditInvoices.unshift(row); }
    row.customer=inv.customer;
    row.date=inv.date||new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'});
    row.due=row.due||dueDateFrom(row.date);
    row.total=total;
    row.paid=paid;
    row.balance=bal;
    row.status=paid>0?'Partially Paid':'Open';
    row.paymentMethod=inv.paymentMethod||inv.paymentType||'Customer credit';
  } else if(row){
    row.customer=inv.customer||row.customer;
    row.total=total;
    row.paid=total;
    row.balance=0;
    row.status='Closed';
  }
  return before!==JSON.stringify(data.customerCreditInvoices.filter(x=>String(x.no)===no));
}
function updateCustomerBalancesCore(data){
  let changed=false;
  (data.customers||[]).forEach(c=>{
    if(!c || c.name==='Walk-in Customer') return;
    const bal=(data.customerCreditInvoices||[]).filter(i=>i.customer===c.name).reduce((a,i)=>a+Math.max(0,num(i.total)-num(i.paid)),0);
    if(num(c.balance)!==bal || c.status!==(bal>0?'Due':'Clear')){ c.balance=bal; c.status=bal>0?'Due':'Clear'; changed=true; }
  });
  return changed;
}

function normalizeCoreCollections(d){
  let changed=false;
  ['customers','products','invoices','salesmen','salesmanTargets','commissionPayouts','supplierBills','customerCreditInvoices','customerPayments','supplierPayments','branches','promotions','expenses','returnsExchanges','productCategories','suppliers','stockMovements','activity'].forEach(k=>{
    if(!Array.isArray(d[k])){ d[k]=[]; changed=true; }
  });
  (AXTOR_BASE_SEED.products||[]).forEach(sp=>{
    if(!(d.products||[]).some(p=>p && p.sku===sp.sku)){ d.products.push(clone(sp)); changed=true; }
  });
  const catSet=new Set((d.productCategories||[]).map(c=>String(c).toLowerCase()));
  (d.products||[]).forEach(p=>{
    if(p && p.category && !catSet.has(String(p.category).toLowerCase())){ d.productCategories.push(p.category); catSet.add(String(p.category).toLowerCase()); changed=true; }
    if(p && p.deleted===undefined){ p.deleted=false; changed=true; }
  });
  ['Automotive Paint','Industrial Coating','Wood Coating','Thinner','Clear Coat','Automotive','Industrial'].forEach(c=>{
    if(!catSet.has(c.toLowerCase())){ d.productCategories.push(c); catSet.add(c.toLowerCase()); changed=true; }
  });
  const supplierNames=new Set((d.suppliers||[]).map(s=>String(s.name||'').toLowerCase()));
  (d.supplierBills||[]).forEach(b=>{
    if(b.supplier && !supplierNames.has(String(b.supplier).toLowerCase())){
      d.suppliers.push({id:'SUP-'+String(d.suppliers.length+1).padStart(3,'0'), name:b.supplier, phone:b.supplier==='Starlux Paints'?'4411 9922':'4488 3377', email:'', company:b.supplier, address:'', openingBalance:0, creditDays:30, active:true});
      supplierNames.add(String(b.supplier).toLowerCase()); changed=true;
    }
  });
  (d.customers||[]).forEach(c=>{ if(c && !c.creditDays){ c.creditDays=30; changed=true; } });
  if(!d.selectedIndustry){ d.selectedIndustry=localStorage.getItem('axtorSelectedIndustry')||'Paint Store'; changed=true; }
  if(!(d.expenses||[]).length){ d.expenses=[{id:'EXP-1001',date:'2026-06-05',category:'Rent',description:'Shop rent demo',amount:6500,branch:'Main Branch'},{id:'EXP-1002',date:'2026-06-07',category:'Salary',description:'Staff salary demo',amount:12000,branch:'Main Branch'},{id:'EXP-1003',date:'2026-06-10',category:'Fuel',description:'Delivery fuel demo',amount:850,branch:'Industrial Area Branch'}]; changed=true; }
  if(!(d.branches||[]).length){ d.branches=[{name:'Main Branch',status:'Active'},{name:'Industrial Area Branch',status:'Active'}]; changed=true; }
  (d.invoices||[]).forEach((inv,i)=>{
    if(inv.salesmanId===undefined){ inv.salesmanId=i%2===0?'SM001':'SM002'; changed=true; }
    if(inv.total===undefined && inv.amount!==undefined){ inv.total=inv.amount; changed=true; }
    if(!inv.branch){ inv.branch=i%2?'Industrial Area Branch':'Main Branch'; changed=true; }
    if(inv.paid===undefined && String(inv.status||'').toLowerCase()!=='draft'){ inv.paid=String(inv.status||'').toLowerCase()==='credit'?0:num(inv.total||inv.amount); changed=true; }
    if(inv.balance===undefined && String(inv.status||'').toLowerCase()!=='draft'){ inv.balance=Math.max(0,num(inv.total||inv.amount)-num(inv.paid)); changed=true; }
    if(String(inv.status||'').toLowerCase()==='credit' || num(inv.balance)>0){ if(syncCustomerReceivableCore(d,inv)) changed=true; }
  });
  if(updateCustomerBalancesCore(d)) changed=true;
  if(normalizePromotionFields(d)) changed=true;
  return changed;
}

function db(){
  let data={};
  try{ data=JSON.parse(localStorage.getItem(AXTOR_DB_KEY)||'{}')||{}; }catch(e){ data={}; }
  let changed=false;
  if(mergeSeed(data, AXTOR_BASE_SEED)) changed=true;
  if(mergeSeed(data, AXTOR_ADVANCED_SEED)) changed=true;
  if(normalizeCoreCollections(data)) changed=true;
  if(changed || !localStorage.getItem(AXTOR_DB_KEY)) save(data);
  return data;
}

function runMigrations(){
  const d=db();
  if(num(d._schemaVersion) >= 2){
    if(normalizePromotionFields(d)) save(d);
    return d;
  }
  // Schema v2: stable promotion IDs + discount field normalization, core array guards,
  // invoice balance/branch patching, product/category/supplier normalization, and no fabricated product costs.
  normalizeCoreCollections(d);
  normalizePromotionFields(d);
  d._schemaVersion = 2;
  save(d);
  return d;
}

window.AxtorCoreData={db,save,num,money,esc,toast,nextNo,runMigrations,promoStableId};
window.AxtorToast = toast;
window.runMigrations = runMigrations;
runMigrations();

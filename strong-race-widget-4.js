(function() {

  // ── Assets (override con window.SR_ASSETS_BASE antes de cargar el script) ──
  const A = window.SR_ASSETS_BASE || 'https://cdn.jsdelivr.net/gh/gerardvacascantero-hue/strong-race-widgets@v1.1.0/assets/';

  // ── Inject fonts + CSS once ──────────────────────────────
  if (!document.getElementById('sr-styles')) {
    const s = document.createElement('style');
    s.id = 'sr-styles';
    s.textContent = `
      @font-face {font-family:'Panton';src:url('${A}fonts/panton-700.otf') format('opentype');font-weight:700;font-style:normal;font-display:swap}
      @font-face {font-family:'Panton';src:url('${A}fonts/panton-400.otf') format('opentype');font-weight:400;font-style:normal;font-display:swap}
      :root{--sr-ff:'Panton',system-ui,sans-serif;--sr-ac:#8ECDFA;--sr-bg:#000;--sr-card:#050505;--sr-tab:#161616;--sr-text:#fff;--sr-muted:#9a9a9a;--sr-border:#1e1e1e}
      .sr-widget *,.sr-widget *::before,.sr-widget *::after{box-sizing:border-box;margin:0;padding:0}
      .sr-widget{width:100%;background:var(--sr-bg);color:var(--sr-text);font-family:var(--sr-ff);font-weight:400;display:block}
      .sr-section{display:block;width:100%;padding:clamp(24px,4vw,48px) clamp(16px,4vw,48px);border-top:1px solid var(--sr-border)}
      .sr-section:first-child{border-top:none}
      .sr-head{margin-bottom:28px}
      .sr-step-row{display:flex;align-items:center;gap:14px;padding-bottom:14px;border-bottom:1px solid #1a3a5c;margin-bottom:10px}
      .sr-step-num{flex-shrink:0;width:36px;height:36px;background:var(--sr-ac);color:#000;font-weight:700;font-size:18px;display:flex;align-items:center;justify-content:center}
      .sr-head h2{font-weight:700;font-size:clamp(15px,2.4vw,20px);text-transform:uppercase;letter-spacing:.1em;line-height:1;color:var(--sr-ac)}
      .sr-head p{font-weight:400;font-size:13px;color:var(--sr-muted);line-height:1.6;margin-top:8px}
      .p2-cities{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:28px}
      .p2-city{cursor:pointer;background:var(--sr-tab);color:var(--sr-muted);font-weight:700;font-size:13px;letter-spacing:.1em;text-transform:uppercase;padding:10px 18px;transition:all .15s;user-select:none;white-space:nowrap}
      .p2-city:hover{color:#ccc;background:#1e1e1e}
      .p2-city.active{background:var(--sr-ac);color:#000}
      .p2-hint{font-weight:400;color:var(--sr-muted);font-size:13px}
      .p2-hint b{color:var(--sr-ac);font-weight:700}
      .p2-grid{display:none;grid-template-columns:1.1fr 1fr 1fr;gap:20px;margin-top:24px;align-items:stretch}
      .p2-grid.on{display:grid}
      .p2-card{background:var(--sr-card);border:1px solid var(--sr-ac);display:flex;flex-direction:column}
      .p2-card .inner{padding:22px 22px 18px;flex:1;display:flex;flex-direction:column;gap:6px}
      .p2-promo{font-weight:700;font-size:14px;letter-spacing:.06em;text-transform:uppercase;color:#fff}
      .p2-title{font-weight:700;font-size:clamp(18px,2.5vw,24px);letter-spacing:.06em;text-transform:uppercase;color:var(--sr-ac);line-height:1.05}
      .p2-route{font-weight:700;font-size:15px;letter-spacing:.08em;text-transform:uppercase;color:var(--sr-ac)}
      .p2-meta{font-weight:400;font-size:12px;color:var(--sr-muted);line-height:1.55;flex:1}
      .p2-meta b{color:#ddd;font-weight:700}
      .p2-btn{display:block;text-align:center;background:var(--sr-ac);color:#000;text-decoration:none;font-weight:700;font-size:17px;letter-spacing:.1em;text-transform:uppercase;padding:14px 10px;transition:opacity .15s}
      .p2-btn:hover{opacity:.85}
      .p3-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;align-items:stretch}
      .p3-card{background:var(--sr-card);border:1px solid var(--sr-ac);display:flex;flex-direction:column;overflow:hidden}
      .p3-ph{position:relative;height:clamp(160px,20vw,260px);background:#0d0d0d;overflow:hidden}
      .p3-ph img{width:100%;height:100%;object-fit:cover;display:block}
      .p3-badge{position:absolute;top:0;left:0;background:var(--sr-ac);color:#000;font-weight:700;font-size:15px;letter-spacing:.08em;text-transform:uppercase;padding:8px 16px}
      .p3-bd{padding:20px 20px 0;display:flex;flex-direction:column;flex:1}
      .p3-name{font-weight:700;font-size:22px;letter-spacing:.06em;text-transform:uppercase;color:#fff;margin-bottom:8px;line-height:1.1}
      .p3-sub{display:flex;align-items:center;gap:10px;margin-bottom:12px}
      .p3-zone{font-weight:700;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--sr-ac)}
      .p3-stars{color:var(--sr-ac);font-size:13px;letter-spacing:2px}
      .p3-desc{font-weight:400;font-size:12.5px;color:var(--sr-muted);line-height:1.6;flex:1;margin-bottom:16px}
      .p3-price{display:flex;align-items:baseline;gap:10px;margin-bottom:20px}
      .p3-now{font-weight:700;font-size:clamp(22px,3vw,32px);color:var(--sr-ac);line-height:1}
      .p3-unit{font-weight:700;font-size:14px;letter-spacing:.06em;text-transform:uppercase;color:var(--sr-muted)}
      .p3-btn{display:block;text-align:center;background:var(--sr-ac);color:#000;text-decoration:none;font-weight:700;font-size:18px;letter-spacing:.1em;text-transform:uppercase;padding:14px 10px;transition:opacity .15s;margin-top:auto}
      .p3-btn:hover{opacity:.85}
      .p4-body{display:flex;height:clamp(380px,55vw,620px);border:1px solid var(--sr-border);overflow:hidden;width:100%}
      .p4-map{flex:1;min-width:0;background:#050505}
      .p4-list{width:38%;min-width:260px;max-width:380px;flex-shrink:0;background:var(--sr-bg);border-left:1px solid var(--sr-border);overflow-y:auto}
      .p4-list::-webkit-scrollbar{width:3px}
      .p4-list::-webkit-scrollbar-thumb{background:#2a2a2a}
      .p4-item{padding:17px 22px;cursor:pointer;transition:background .15s;border:1px solid transparent;border-bottom-color:var(--sr-border)}
      .p4-item:hover{background:#0a0a0a}
      .p4-item.active{border:1px solid var(--sr-ac);background:#050b10}
      .p4-item .t{font-weight:700;font-size:14px;letter-spacing:.06em;text-transform:uppercase;color:var(--sr-ac);margin-bottom:3px}
      .p4-item .d{font-weight:400;font-size:12px;color:var(--sr-muted)}
      .leaflet-control-attribution{display:none!important}
      .leaflet-control-zoom a{background:#1a1a1a!important;color:#fff!important;border-color:#333!important;border-radius:0!important}
      .leaflet-control-zoom a:hover{background:var(--sr-ac)!important;color:#000!important}
      .leaflet-popup-content-wrapper{background:#050505!important;border:1px solid var(--sr-ac)!important;border-radius:0!important;box-shadow:0 8px 30px rgba(0,0,0,.7)!important;color:#fff!important;padding:0!important}
      .leaflet-popup-content{margin:0!important;width:240px!important}
      .leaflet-popup-tip{background:#050505!important}
      .leaflet-popup-close-button{color:var(--sr-ac)!important;font-size:18px!important;top:6px!important;right:8px!important}
      .pp-img{width:100%;height:130px;object-fit:cover;display:block}
      .pp-bd{padding:14px 16px}
      .pp-t{font-weight:700;font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:#fff;margin-bottom:3px}
      .pp-d{font-weight:400;font-size:12px;color:#9a9a9a;margin-bottom:8px}
      .pp-lk{font-weight:700;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#8ECDFA;text-decoration:underline;text-underline-offset:3px}
      @media(min-width:641px) and (max-width:900px){.p2-grid{grid-template-columns:1fr 1fr}.p3-grid{grid-template-columns:1fr 1fr}}
      @media(max-width:640px){.p2-grid,.p3-grid{grid-template-columns:1fr}.p4-body{flex-direction:column;height:auto}.p4-list{width:100%;max-width:100%;min-width:unset;height:260px;border-left:none;border-top:1px solid var(--sr-border)}.p4-map{height:320px;flex:none}}
    `;
    document.head.appendChild(s);
  }

  // ── Find mount point ─────────────────────────────────────
  const root = document.getElementById('strong-race-widget');
  if (!root) { console.error('[StrongRace] No se encontró #strong-race-widget'); return; }
  root.className = 'sr-widget';

  // ── Inject HTML ──────────────────────────────────────────
  root.innerHTML = `
    <section class="sr-section" id="sr-paso2">
      <div class="sr-head">
        <div class="sr-step-row"><div class="sr-step-num">2</div><h2>Mira tus opciones de viaje</h2></div>
        <p>Elige tu ciudad y te llevamos directo a la búsqueda con fechas ya puestas (6 → 9 nov).</p>
      </div>
      <div class="p2-cities" id="sr-cities"></div>
      <div class="p2-hint" id="sr-hint">↑ Elige tu ciudad de origen. Mostramos solo ciudades con <b>vuelo directo</b> a Palma.</div>
      <div class="p2-grid" id="sr-grid"></div>
    </section>
    <section class="sr-section" id="sr-paso3">
      <div class="sr-head">
        <div class="sr-step-row"><div class="sr-step-num">3</div><h2>Dónde dormir · precios Strong Race</h2></div>
        <p>Alojamientos recomendados cerca del Velódromo con tarifa especial para participantes.</p>
      </div>
      <div class="p3-grid" id="sr-hotels"></div>
    </section>
    <section class="sr-section" id="sr-paso4">
      <div class="sr-head">
        <div class="sr-step-row"><div class="sr-step-num">4</div><h2>Qué ver en Mallorca</h2></div>
        <p>Ya que cruzas el charco, hazlo finde completo. Toca un punto del mapa o de la lista.</p>
      </div>
      <div class="p4-body">
        <div class="p4-map" id="sr-map"></div>
        <div class="p4-list" id="sr-poi"></div>
      </div>
    </section>
  `;

  // ── PASO 2 ───────────────────────────────────────────────
  const FECHAS='261106/261109', AE_URL='https://www.aireuropa.com/es/es/home?promocode=UXSTRONGRACE26';
  const CITIES=[
    {k:'mad',n:'Madrid',ferry:null},
    {k:'bcn',n:'Barcelona',ferry:{op:'Baleària / Trasmed / GNV',dur:'7-8 h · nocturno · con coche',url:'https://www.balearia.com/'}},
    {k:'vlc',n:'Valencia',ferry:{op:'Baleària / Trasmed',dur:'7-8 h · nocturno · con coche',url:'https://www.balearia.com/'}},
    {k:'alc',n:'Alicante',ferry:{op:'Baleària (vía Dénia, a ~1 h)',dur:'desde Dénia · con coche',url:'https://www.balearia.com/'}},
    {k:'agp',n:'Málaga',ferry:null},{k:'svq',n:'Sevilla',ferry:null},{k:'zaz',n:'Zaragoza',ferry:null},
    {k:'bio',n:'Bilbao',ferry:null},{k:'scq',n:'Santiago de Compostela',ferry:null},
    {k:'ovd',n:'Asturias',ferry:null},{k:'grx',n:'Granada',ferry:null},
    {k:'xry',n:'Jerez',ferry:null},{k:'sdr',n:'Santander',ferry:null},
  ];
  function sky(c){return'https://www.skyscanner.es/transporte/vuelos/'+c+'/pmi/'+FECHAS+'/';}
  const citiesEl=document.getElementById('sr-cities');
  CITIES.forEach(c=>{
    const b=document.createElement('div');
    b.className='p2-city';b.textContent=c.n+' ('+c.k.toUpperCase()+')';
    b.onclick=()=>selCity(c,b);citiesEl.appendChild(b);
  });
  function selCity(c,el){
    document.querySelectorAll('.p2-city').forEach(x=>x.classList.remove('active'));
    el.classList.add('active');document.getElementById('sr-hint').style.display='none';
    const K=c.k.toUpperCase();
    const fc=c.ferry
      ?`<div class="p2-card"><div class="inner"><div class="p2-title">Ferry</div><div class="p2-route">${c.n} → Palma</div><div class="p2-meta">${c.ferry.op} · ${c.ferry.dur}</div></div><a class="p2-btn" href="${c.ferry.url}" target="_blank" rel="noopener">Ver en Baleària</a></div>`
      :`<div class="p2-card"><div class="inner"><div class="p2-title">Ferry</div><div class="p2-route">${c.n} → Palma</div><div class="p2-meta">Sin ferry directo desde <b>${c.n}</b>. Con coche: ferry desde Barcelona, Valencia o Dénia.</div></div><a class="p2-btn" href="https://www.balearia.com/" target="_blank" rel="noopener">Ver puertos de salida</a></div>`;
    const g=document.getElementById('sr-grid');
    g.innerHTML=`
      <div class="p2-card"><div class="inner"><div class="p2-promo">- 10% Exclusivo</div><div class="p2-title">Air Europa</div><div class="p2-route">${c.n} (${K}) → Palma (PMI)</div><div class="p2-meta">Vuelo directo · fechas del evento ya puestas (6 → 9 nov)</div></div><a class="p2-btn" href="${AE_URL}" target="_blank" rel="noopener">Ver vuelos</a></div>
      <div class="p2-card"><div class="inner"><div class="p2-title">Otras aerolíneas</div><div class="p2-route">${c.n} (${K}) → Palma (PMI)</div><div class="p2-meta">Fechas del evento ya puestas (6 → 9 nov)</div></div><a class="p2-btn" href="${sky(c.k)}" target="_blank" rel="noopener">Ver en Skyscanner</a></div>
      ${fc}`;
    g.classList.add('on');
  }

  // ── PASO 3 ───────────────────────────────────────────────
  const HOTELS=[
  {badge:'-15% Strong Race',name:'Meliá Palma Marina',zone:'Paseo Marítimo',stars:4,desc:'Tan cerca de la ciudad como tan cerca del mar.',now:'Desde 128€',img:A+'hotels/melia-palma-marina.jpg',url:'https://events.melia.com/es/events/palma-port/Strong-Race0'},
  {badge:'-15% Strong Race',name:'INNSiDE Palma Bosque',zone:'Palma',stars:4,desc:'Descubre la bonita y cosmopolita ciudad de Palma.',now:'Desde 116€',img:A+'hotels/innside-palma-bosque.jpg',url:'https://events.melia.com/es/events/palma-port/Strong-Race0'},
  {badge:'-15% Strong Race',name:'INNSiDE Palma Center',zone:'Centro',stars:4,desc:'Diseño urbano en el cielo de Palma.',now:'Desde 141€',img:A+'hotels/innside-palma-center.jpg',url:'https://events.melia.com/es/events/palma-port/Strong-Race0'},
  {badge:'-15% Strong Race',name:'Hotel Amic Horizonte',zone:'Palma',stars:3,desc:'Aplica el código STRONGRACE en amic-hotels.com al buscar habitación y obtén un 10% de descuento.',now:'Código: STRONGRACE',img:A+'hotels/hotel-amic-horizonte.jpg',url:'https://www.amic-hotels.com/'},
  {badge:'-15% Strong Race',name:'Hotel Amic Colón',zone:'Centro · Solo alojamiento',stars:3,desc:'Aplica el código STRONGRACE en amic-hotels.com al buscar habitación y obtén un 10% de descuento.',now:'Código: STRONGRACE',img:A+'hotels/hotel-amic-colon.jpg',url:'https://www.amic-hotels.com/'},
];
  document.getElementById('sr-hotels').innerHTML=HOTELS.map(h=>`
    <div class="p3-card">
      <div class="p3-ph"><img src="${h.img}" alt="${h.name}" loading="lazy"><div class="p3-badge">${h.badge}</div></div>
      <div class="p3-bd">
        <div class="p3-name">${h.name}</div>
        <div class="p3-sub"><span class="p3-zone">${h.zone}</span><span class="p3-stars">${'★'.repeat(h.stars)}</span></div>
        <p class="p3-desc">${h.desc}</p>
        <div class="p3-price"><span class="p3-now">${h.now}</span><span class="p3-unit">/noche</span></div>
      </div>
      <a class="p3-btn" href="${h.url}" target="_blank" rel="noopener">Reservar</a>
    </div>`).join('');

  // ── PASO 4 ───────────────────────────────────────────────
  const POIS=[
  {n:'Velódromo Illes Balears',d:'SEDE de la carrera',ll:[39.6095,2.6712],venue:true,gm:'https://www.google.com/maps/search/Velódromo+Illes+Balears+Palma',img:A+'pois/velodromo-illes-balears.jpg'},
  {n:'Catedral de Mallorca (La Seu)',d:'El icono de Palma',ll:[39.5663,2.6486],venue:false,gm:'https://www.google.com/maps/search/Catedral+de+Palma+de+Mallorca',img:A+'pois/catedral-de-mallorca-la-seu.jpg'},
  {n:'Passeig del Born',d:'Compras, terrazas y tapas',ll:[39.571,2.6478],venue:false,gm:'https://www.google.com/maps/search/Passeig+del+Born+Palma',img:A+'pois/passeig-del-born.jpg'},
  {n:'Casco antiguo de Palma',d:'La Palma auténtica',ll:[39.5695,2.6505],venue:false,gm:'https://www.google.com/maps/search/Casco+antiguo+Palma+de+Mallorca',img:A+'pois/casco-antiguo-de-palma.jpg'},
  {n:'Castell de Bellver',d:'Vistas 360º sobre la bahía',ll:[39.5636,2.6199],venue:false,gm:'https://www.google.com/maps/search/Castell+de+Bellver+Palma',img:A+'pois/castell-de-bellver.jpg'},
  {n:'Platja de Palma',d:'Recuperación activa con vistas',ll:[39.5169,2.737],venue:false,gm:'https://www.google.com/maps/search/Platja+de+Palma+Mallorca',img:A+'pois/platja-de-palma.jpg'},
  {n:'Far de Cap Blanc',d:'Acantilados salvajes del sur',ll:[39.3484,2.7813],venue:false,gm:'https://www.google.com/maps/search/Far+de+Cap+Blanc+Mallorca',img:A+'pois/far-de-cap-blanc.jpg'},
  {n:'Es Trenc',d:'El Caribe mallorquín',ll:[39.358,3.02],venue:false,gm:'https://www.google.com/maps/search/Es+Trenc+Mallorca',img:A+'pois/es-trenc.jpg'},
  {n:'Caló des Moro',d:'La cala más espectacular de la isla',ll:[39.343,3.168],venue:false,gm:'https://www.google.com/maps/search/Caló+des+Moro+Mallorca',img:A+'pois/calo-des-moro.jpg'},
  {n:'Cala S\'Almunia',d:'La Mallorca más auténtica',ll:[39.346,3.161],venue:false,gm:'https://www.google.com/maps/search/Cala+S+Almunia+Mallorca',img:A+'pois/cala-s-almunia.jpg'},
  {n:'Deià',d:'El pueblo de artistas',ll:[39.7483,2.6485],venue:false,gm:'https://www.google.com/maps/search/Deià+Mallorca',img:A+'pois/deia.jpg'},
  {n:'Sa Foradada',d:'El mejor atardecer de Mallorca',ll:[39.735,2.59],venue:false,gm:'https://www.google.com/maps/search/Sa+Foradada+Mallorca',img:A+'pois/sa-foradada.jpg'},
  {n:'Valldemossa',d:'Pueblo de la Tramuntana',ll:[39.7099,2.6225],venue:false,gm:'https://www.google.com/maps/search/Valldemossa+Mallorca',img:A+'pois/valldemossa.jpg'},
  {n:'Jardins d\'Alfàbia',d:'Un oasis histórico en la Serra',ll:[39.7355,2.709],venue:false,gm:'https://www.google.com/maps/search/Jardins+d+Alfàbia+Mallorca',img:A+'pois/jardins-d-alfabia.jpg'},
  {n:'Fornalutx',d:'El pueblo más bonito de la Serra',ll:[39.7683,2.7397],venue:false,gm:'https://www.google.com/maps/search/Fornalutx+Mallorca',img:A+'pois/fornalutx.jpg'},
  {n:'Sóller',d:'Tradición y modernismo',ll:[39.7667,2.7167],venue:false,gm:'https://www.google.com/maps/search/Sóller+Mallorca',img:A+'pois/soller.jpg'},
  {n:'Mirador de Ses Barques',d:'Vista panorámica del valle de Sóller',ll:[39.805,2.745],venue:false,gm:'https://www.google.com/maps/search/Mirador+de+Ses+Barques+Mallorca',img:A+'pois/mirador-de-ses-barques.jpg'},
  {n:'Port de Sóller',d:'Pueblo costero · tranvía histórico',ll:[39.7958,2.6936],venue:false,gm:'https://www.google.com/maps/search/Port+de+Sóller+Mallorca',img:A+'pois/port-de-soller.jpg'},
  {n:'Santuari de Lluc',d:'El corazón espiritual de Mallorca',ll:[39.8255,2.886],venue:false,gm:'https://www.google.com/maps/search/Santuari+de+Lluc+Mallorca',img:A+'pois/santuari-de-lluc.jpg'},
  {n:'Torrent de Pareis',d:'La Catedral Natural de Mallorca',ll:[39.857,2.809],venue:false,gm:'https://www.google.com/maps/search/Torrent+de+Pareis+Mallorca',img:A+'pois/torrent-de-pareis.jpg'},
  {n:'Sa Calobra',d:'La carretera más espectacular de Mallorca',ll:[39.851,2.811],venue:false,gm:'https://www.google.com/maps/search/Sa+Calobra+Mallorca',img:A+'pois/sa-calobra.jpg'},
  {n:'Pollença',d:'Historia y encanto mallorquín',ll:[39.8786,3.0139],venue:false,gm:'https://www.google.com/maps/search/Pollença+Mallorca',img:A+'pois/pollenca.jpg'},
  {n:'Calvari de Pollença',d:'Las mejores vistas del pueblo',ll:[39.883,3.011],venue:false,gm:'https://www.google.com/maps/search/Calvari+de+Pollença+Mallorca',img:A+'pois/calvari-de-pollenca.jpg'},
  {n:'Alcúdia',d:'La ciudad amurallada',ll:[39.8508,3.1226],venue:false,gm:'https://www.google.com/maps/search/Alcúdia+Mallorca',img:A+'pois/alcudia.jpg'},
  {n:'Ermita de la Victòria',d:'El mirador secreto del norte',ll:[39.875,3.2],venue:false,gm:'https://www.google.com/maps/search/Ermita+de+la+Victòria+Alcúdia+Mallorca',img:A+'pois/ermita-de-la-victoria.jpg'},
  {n:'Mirador Es Colomer',d:'La postal más famosa de Mallorca',ll:[39.927,3.194],venue:false,gm:'https://www.google.com/maps/search/Mirador+Es+Colomer+Formentor+Mallorca',img:A+'pois/mirador-es-colomer.jpg'},
  {n:'Playa de Formentor',d:'La playa más elegante de Mallorca',ll:[39.934,3.187],venue:false,gm:'https://www.google.com/maps/search/Playa+de+Formentor+Mallorca',img:A+'pois/playa-de-formentor.jpg'},
  {n:'Cap de Formentor',d:'El fin del mundo mallorquín',ll:[39.959,3.213],venue:false,gm:'https://www.google.com/maps/search/Cap+de+Formentor+Mallorca',img:A+'pois/cap-de-formentor.jpg'}
];

  function loadLeaflet(cb){
    if(window.L){cb();return;}
    const css=document.createElement('link');css.rel='stylesheet';
    css.href='https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
    document.head.appendChild(css);
    const s=document.createElement('script');
    s.src='https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
    s.onload=cb;document.head.appendChild(s);
  }

  loadLeaflet(function(){
    const mapEl=document.getElementById('sr-map');
    const map=L.map(mapEl,{scrollWheelZoom:false,attributionControl:false}).setView([39.62,2.80],9);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',{subdomains:'abcd',maxZoom:19}).addTo(map);
    new ResizeObserver(()=>map.invalidateSize()).observe(mapEl);

    function pinIcon(a){
      const c=a?'#fff':'#8ECDFA';
      return L.divIcon({className:'',iconSize:[28,38],iconAnchor:[14,38],popupAnchor:[0,-42],
        html:`<div style="filter:drop-shadow(0 3px 8px rgba(0,0,0,.6))"><svg width="28" height="38" viewBox="0 0 28 38" xmlns="http://www.w3.org/2000/svg"><path d="M14 0C6.27 0 0 6.27 0 14c0 10.5 14 24 14 24s14-13.5 14-24C28 6.27 21.73 0 14 0z" fill="${c}"/><circle cx="14" cy="14" r="5" fill="rgba(0,0,0,.3)"/></svg></div>`
      });
    }

    function popHtml(p){
      return `<img class="pp-img" src="${p.img}" alt="${p.n}">
        <div class="pp-bd">
          <div class="pp-t">${p.n}</div>
          <div class="pp-d">${p.d}</div>
          <a class="pp-lk" href="${p.gm}" target="_blank" rel="noopener">Cómo llegar</a>
        </div>`;
    }

    const mks={},its={};
    const listEl=document.getElementById('sr-poi');
    POIS.forEach((p,i)=>{
      const mk=L.marker(p.ll,{icon:pinIcon(false)}).addTo(map);
      mk.bindPopup(popHtml(p),{maxWidth:240,minWidth:240});
      mk.on('click',()=>sel(i,false));mks[i]=mk;
      const it=document.createElement('div');it.className='p4-item';
      it.innerHTML=`<div class="t">${p.n}</div><div class="d">${p.d}</div>`;
      it.onclick=()=>sel(i,true);its[i]=it;listEl.appendChild(it);
    });

    function sel(i,fly){
      Object.values(its).forEach(x=>x.classList.remove('active'));its[i].classList.add('active');
      Object.entries(mks).forEach(([k,m])=>m.setIcon(pinIcon(+k===i)));
      if(fly)map.flyTo(POIS[i].ll,POIS[i].venue?13:14,{duration:.8});
      mks[i].openPopup();its[i].scrollIntoView({behavior:'smooth',block:'nearest'});
    }
    setTimeout(()=>sel(0,false),400);
  });

})();

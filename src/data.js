/* ─────────────────────────────────────────────────────────────────────
   brah — content i18n
   Headlines: EN by default per brand book ("headlines EN, info PT").
   ───────────────────────────────────────────────────────────────────── */

window.BRAH = {
  brand: {
    address: "Rua dos Ferreiros 3A, 2655-279 Ericeira",
    phone: "+351 912 023 822",
    ubereats: "https://www.ubereats.com/pt/store/brah-smash-burger/Zeh4R32AXUuF1RrxdX1iSw",
    instagram: "https://www.instagram.com/brah_smashburger/",
    hours: [
      { d: { en: "Mon — Thu",      pt: "Seg — Qui" },        h: "10:00 — 23:30" },
      { d: { en: "Fri & Sat",      pt: "Sex e Sáb" },         h: "10:00 — 00:00" },
      { d: { en: "Sunday",         pt: "Domingo" },           h: "10:00 — 23:00" },
    ],
  },

  /* Products — no prices, per client. Headlines stay EN. */
  products: [
    {
      id: "classic",
      name: "Classic Brah",
      tag:  { en: "the og",        pt: "o original" },
      ing:  { en: "Smashed patty · American cheese · lettuce · tomato · house sauce · brioche",
              pt: "Hambúrguer smashed · queijo americano · alface · tomate · molho da casa · brioche" },
      img: "assets/product-classic-brah.jpg",
      ubereats: "https://www.ubereats.com/pt/store/brah-smash-burger/Zeh4R32AXUuF1RrxdX1iSw?diningMode=PICKUP&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%252265e87847-7d80-5d4b-85d5-1af1757d624b%2522%252C%2522sectionUuid%2522%253A%2522a782eeb8-8a84-578a-9518-1134a9d7644e%2522%252C%2522subsectionUuid%2522%253A%2522b4c1385a-5597-49ed-89ab-f8a12ee501c5%2522%252C%2522itemUuid%2522%253A%252232dbb536-b9f6-4ae0-85fe-6a82ab284d98%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D",
    },
    {
      id: "cheese",
      name: "Cheese Brah",
      tag:  { en: "best seller",   pt: "mais pedido" },
      ing:  { en: "Double smashed patty · double American · pickles · onion · ketchup + mustard",
              pt: "Dois hambúrgueres smashed · queijo americano duplo · pickles · cebola · ketchup e mostarda" },
      img: "assets/product-cheese-brah.jpg",
      ubereats: "https://www.ubereats.com/pt/store/brah-smash-burger/Zeh4R32AXUuF1RrxdX1iSw?diningMode=PICKUP&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%252265e87847-7d80-5d4b-85d5-1af1757d624b%2522%252C%2522sectionUuid%2522%253A%2522a782eeb8-8a84-578a-9518-1134a9d7644e%2522%252C%2522subsectionUuid%2522%253A%2522b4c1385a-5597-49ed-89ab-f8a12ee501c5%2522%252C%2522itemUuid%2522%253A%2522b05c0728-9b82-519a-a558-6ed99c1d8df1%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D",
    },
    {
      id: "bacon",
      name: "Bacon Brah",
      tag:  { en: "loaded",        pt: "carregado" },
      ing:  { en: "Double smashed patty · double cheddar · bacon · house sauce",
              pt: "Dois hambúrgueres smashed · cheddar duplo · bacon · molho da casa" },
      img: "assets/product-bacon-brah.jpg",
      ubereats: "https://www.ubereats.com/pt/store/brah-smash-burger/Zeh4R32AXUuF1RrxdX1iSw?diningMode=PICKUP&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%252265e87847-7d80-5d4b-85d5-1af1757d624b%2522%252C%2522sectionUuid%2522%253A%2522a782eeb8-8a84-578a-9518-1134a9d7644e%2522%252C%2522subsectionUuid%2522%253A%2522b4c1385a-5597-49ed-89ab-f8a12ee501c5%2522%252C%2522itemUuid%2522%253A%2522b8ea3640-4c6b-514f-a5f3-3a6717917fc8%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D",
    },
    {
      id: "vegan",
      name: "Vegan Brah",
      tag:  { en: "vegan",         pt: "vegan" },
      ing:  { en: "Plant-based patty · vegan cheddar · lettuce · tomato · vegan house sauce",
              pt: "Hambúrguer vegetal · cheddar vegan · alface · tomate · molho da casa vegan" },
      img: "assets/product-vegan-brah.jpg",
      ubereats: "https://www.ubereats.com/pt/store/brah-smash-burger/Zeh4R32AXUuF1RrxdX1iSw?diningMode=PICKUP&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%252265e87847-7d80-5d4b-85d5-1af1757d624b%2522%252C%2522sectionUuid%2522%253A%2522a782eeb8-8a84-578a-9518-1134a9d7644e%2522%252C%2522subsectionUuid%2522%253A%25222440cd35-b8a0-4bc3-8ff6-d01633f172f8%2522%252C%2522itemUuid%2522%253A%252231103cb3-d9c0-495a-8e43-a187c504bb16%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D",
    },
  ],

  sides: [
    { name: "Smashed Fries",   note: { en: "double-fried · sea salt",           pt: "frita duas vezes · sal marinho" } },
    { name: "Loaded Fries",    note: { en: "cheese · bacon bits · house sauce", pt: "queijo · bacon · molho da casa" } },
    { name: "Crispy Pickles",  note: { en: "buttermilk batter · ranch dip",     pt: "polme buttermilk · molho ranch" } },
    { name: "Onion Rings",     note: { en: "thick-cut · panko crust",           pt: "corte grosso · crosta panko" } },
  ],

  drinks: [
    { name: "Brah Lemonade",   note: { en: "homemade · mint",                   pt: "caseira · hortelã" } },
    { name: "Iced Coffee",     note: { en: "single origin · oat available",     pt: "single origin · com leite de aveia" } },
    { name: "Sagres",          note: { en: "always cold",                       pt: "sempre fresca" } },
    { name: "Heineken",        note: { en: "0% available",                      pt: "também 0%" } },
  ],

  /* Pages and labels */
  nav: {
    home:     { en: "home",        pt: "início" },
    menu:     { en: "menu",        pt: "menu" },
    story:    { en: "our story",   pt: "a nossa história" },
    visit:    { en: "visit us",    pt: "visita-nos" },
    events:   { en: "events",      pt: "eventos" },
    gallery:  { en: "gallery",     pt: "galeria" },
    catering: { en: "catering",    pt: "catering" },
  },

  /* Hero copy (kept in EN per brandbook; subtitle in PT optional) */
  hero: {
    tag:      { en: "FROM ERICEIRA · PORTUGAL",         pt: "DA ERICEIRA · PORTUGAL" },
    headline: { en: "Everybody\nneeds a brah.",         pt: "Toda a gente\nprecisa de um brah." },
    sub:      { en: "Catch the wave — taste the smash.",pt: "Apanha a onda — prova o smash." },
    note:     { en: "Open everyday!\n10:00 — 23:30",    pt: "Aberto todos os dias!\n10:00 — 23:30" },
  },

  /* Story */
  story: {
    over:   { en: "OUR STORY", pt: "A NOSSA HISTÓRIA" },
    quote:  { en: '"I can\'t turn water into wine, but I can turn burger into breakfast."',
              pt: '"Não transformo água em vinho, mas transformo um burger em pequeno-almoço."' },
    body:   { en: "We started in a tiny corner of Rua dos Ferreiros with one griddle, one playlist and a vague idea that a really good smash burger doesn't need to be a big deal. Thin patties. Lacy crust. American cheese, melting like it owes you money. That's it. That's the brah.",
              pt: "Começámos num cantinho da Rua dos Ferreiros com uma chapa, uma playlist e a ideia vaga de que um bom smash burger não precisa de ser nenhuma cerimónia. Hambúrgueres finos. Crosta rendilhada. Queijo americano a derreter como se te devesse dinheiro. É isto. Isto é o brah." },
  },

  /* Visit */
  visit: {
    over:    { en: "VISIT US",     pt: "VISITA-NOS" },
    h2:      { en: "Rua dos Ferreiros, 3A — Ericeira.", pt: "Rua dos Ferreiros, 3A — Ericeira." },
    cta1:    { en: "get directions", pt: "como chegar" },
    cta2:    { en: "call us",        pt: "liga-nos" },
  },

  /* Events */
  events: {
    over:    { en: "POP-UPS & EVENTS",  pt: "POP-UPS E EVENTOS" },
    h2:      { en: "We bring the smash to the party.", pt: "Levamos o smash até à festa." },
    items: [
      { date: { en: "SAT · JUN 14",  pt: "SÁB · 14 JUN" }, title: "BRAH × NADADOR",     where: { en: "Ericeira · World Surf Reserve", pt: "Ericeira · Reserva Mundial de Surf" }, img: "assets/lifestyle-event.jpg" },
      { date: { en: "FRI · JUL 04",  pt: "SEX · 04 JUL" }, title: "BRAH × KALOHA",      where: { en: "Pop-up · Foz do Lizandro",       pt: "Pop-up · Foz do Lizandro" },               img: "assets/lifestyle-popup.jpg" },
      { date: { en: "SUN · AUG 17",  pt: "DOM · 17 AGO" }, title: "BRAH AFTER DARK",    where: { en: "Late-night smash · 22:00 → late", pt: "Smash até tarde · 22:00 → tarde" },       img: "assets/lifestyle-night.jpg" },
      { date: { en: "SAT · SEP 06",  pt: "SÁB · 06 SET" }, title: "SURF & SMASH",       where: { en: "Praia do Norte · with Tutto Passa", pt: "Praia do Norte · com Tutto Passa" },     img: "assets/lifestyle-surfer.jpg" },
    ],
  },

  /* Gallery */
  gallery: {
    over:    { en: "GALLERY",  pt: "GALERIA" },
    h2:      { en: "Salt, char, and good company.", pt: "Sal, brasa e boa companhia." },
    images: [
      "assets/lifestyle-storefront.jpg",
      "assets/lifestyle-beach.jpg",
      "assets/lifestyle-going-out.jpg",
      "assets/lifestyle-interior.jpg",
      "assets/lifestyle-surfer.jpg",
      "assets/product-cheese-handoff.png",
      "assets/lifestyle-popup.jpg",
      "assets/product-mustard.jpg",
      "assets/lifestyle-night.jpg",
      "assets/product-griddle.jpg",
      "assets/photo-beach.jpg",
      "assets/photo-stack.jpg",
    ],
  },

  /* Catering */
  catering: {
    over:    { en: "CATERING & DELIVERY", pt: "CATERING E ENTREGAS" },
    h2:      { en: "Do it on the office table, couch or on your own bed.",
              pt: "Faz isso na mesa do escritório, no sofá ou na tua cama." },
    sub:     { en: "(you know what we mean right!?)", pt: "(percebes o que queremos dizer, certo!?)" },
    body:    { en: "We cater offices, parties, weddings and \"just because\" Tuesdays. Trays of 12, 24, 48. We pull up, we plug in the griddle, we smash on site. Minimum 48h notice.",
              pt: "Fazemos catering para escritórios, festas, casamentos e terças-feiras \"só porque sim\". Tabuleiros de 12, 24, 48. Chegamos, ligamos a chapa, smashamos no momento. Mínimo de 48h de antecedência." },
    options: [
      { title: { en: "Office Tray", pt: "Tabuleiro Escritório" }, n: { en: "12 · 24 · 48 brahs", pt: "12 · 24 · 48 brahs" }, note: { en: "delivered hot · paper trays", pt: "entregue quente · tabuleiros de papel" } },
      { title: { en: "Private Event", pt: "Evento Privado" },     n: { en: "50+ guests",         pt: "mais de 50 pessoas" }, note: { en: "we smash on-site · live griddle", pt: "smashamos no local · chapa ao vivo" } },
      { title: { en: "Weddings",   pt: "Casamentos" },            n: { en: "100+ guests",        pt: "mais de 100 pessoas" }, note: { en: "custom menu · ask us anything", pt: "menu à medida · pergunta o que quiseres" } },
    ],
  },
};

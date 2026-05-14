// brah — shared atoms used across directions
const { useState, useEffect, useRef } = React;

/* ─── Convenience: pick localized string ─── */
function tr(field, lang) {
  if (field == null) return "";
  if (typeof field === "string") return field;
  return field[lang] ?? field.en ?? "";
}
window.tr = tr;

/* ─────────────────────────────────────────────────────────────────────
   MetaBar — fixed top strip running ALL-CAPS: address + hours + socials
   Persistent across all directions (placement/style varies per direction)
   ───────────────────────────────────────────────────────────────────── */
function MetaBar({ variant = "cream", lang, onLang }) {
  const bg = variant === "dark" ? "var(--brah-black)" : variant === "tomato" ? "var(--brah-tomato)" : "var(--brah-cream)";
  const fg = variant === "cream" ? "var(--brah-ink)" : "var(--brah-cream)";
  const line = variant === "cream" ? "var(--brah-line)" : "rgba(255,252,228,0.18)";
  return (
    <div style={{background: bg, color: fg, borderBottom: `1px solid ${line}`, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase"}}>
      <div className="brah-metabar-inner" style={{maxWidth: 1600, margin: "0 auto", padding: "9px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap"}}>
        <span className="brah-metabar-text">BRAH · ERICEIRA · PORTUGAL</span>
        <span className="brah-metabar-text" style={{opacity: 0.75}}>{lang === "en" ? "OPEN EVERYDAY · 10:00 — 23:30" : "ABERTO TODOS OS DIAS · 10:00 — 23:30"}</span>
        <span style={{display: "flex", gap: 12, alignItems: "center"}}>
          <a href={window.BRAH?.brand?.instagram || "https://instagram.com/brah_smashburger"} target="_blank" rel="noreferrer" style={{textDecoration: "none", color: "inherit", display: "flex", alignItems: "center"}} title="@brah_smashburger">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
          </a>
          <span style={{opacity: 0.3}}>·</span>
          <LangPill lang={lang} onLang={onLang} variant={variant}/>
        </span>
      </div>
    </div>
  );
}

function LangPill({ lang, onLang, variant }) {
  const isDark = variant === "dark" || variant === "tomato";
  const activeBg  = isDark ? "var(--brah-cream)"  : "var(--brah-ink)";
  const activeFg  = isDark ? "var(--brah-black)"  : "var(--brah-cream)";
  const borderCol = isDark ? "var(--brah-cream)"  : "var(--brah-ink)";
  return (
    <span style={{display: "inline-flex", border: `1px solid ${borderCol}`, padding: "1px"}}>
      {["en", "pt"].map(L => (
        <button
          key={L}
          onClick={() => onLang(L)}
          style={{
            background: lang === L ? activeBg : "transparent",
            color: lang === L ? activeFg : "inherit",
            border: "none",
            font: "inherit",
            padding: "3px 8px",
            cursor: "pointer",
            letterSpacing: "0.18em",
          }}>
          {L.toUpperCase()}
        </button>
      ))}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Wordmark — image of brah logo. Adjusts color via filter.
   ───────────────────────────────────────────────────────────────────── */
function Wordmark({ height = 32, color = "black", onClick }) {
  const filters = {
    black:  "none",
    cream:  "brightness(0) invert(1)",
    tomato: "brightness(0) saturate(100%) invert(54%) sepia(40%) saturate(2200%) hue-rotate(346deg) brightness(98%) contrast(90%)",
  };
  return (
    <a onClick={onClick} style={{display: "inline-block", height, cursor: onClick ? "pointer" : "default"}}>
      <img src="assets/logo-brah-wordmark.png" alt="brah" style={{height: "100%", display: "block", filter: filters[color] || filters.black}}/>
    </a>
  );
}

/* ─── Sun glyph as inline SVG (used as section divider, loyalty stamp) ─── */
function Sun({ size = 24, color = "currentColor", spin = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{display: "inline-block", animation: spin ? "brah-spin 18s linear infinite" : "none"}}>
      <circle cx="12" cy="12" r="4" fill={color}/>
      {Array.from({length: 12}, (_, i) => {
        const a = (i * 30) * Math.PI / 180;
        const x1 = 12 + Math.cos(a) * 7;
        const y1 = 12 + Math.sin(a) * 7;
        const x2 = 12 + Math.cos(a) * 10;
        const y2 = 12 + Math.sin(a) * 10;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.5" strokeLinecap="round"/>;
      })}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Footer (shared) — variants per direction
   ───────────────────────────────────────────────────────────────────── */
function Footer({ lang, variant = "dark", onNav }) {
  const isDark = variant === "dark";
  const bg = isDark ? "var(--brah-black)" : "var(--brah-cream)";
  const fg = isDark ? "var(--brah-cream)" : "var(--brah-black)";
  const line = isDark ? "rgba(255,252,228,0.18)" : "var(--brah-line)";
  const labels = {
    visit:  { en: "VISIT",   pt: "VISITAR" },
    follow: { en: "FOLLOW",  pt: "SEGUE-NOS" },
    sayHi:  { en: "SAY HI",  pt: "DIZ OLÁ" },
    rights: { en: "made in Ericeira", pt: "feito na Ericeira" },
  };
  const navItems = [
    { id: "home",     l: { en: "home",       pt: "início" } },
    { id: "menu",     l: { en: "menu",       pt: "menu" } },
    { id: "story",    l: { en: "our story",  pt: "história" } },
    { id: "events",   l: { en: "events",     pt: "eventos" } },
    { id: "gallery",  l: { en: "gallery",    pt: "galeria" } },
    { id: "catering", l: { en: "catering",   pt: "catering" } },
    { id: "visit",    l: { en: "visit us",   pt: "visita-nos" } },
  ];
  return (
    <footer style={{background: bg, color: fg, paddingTop: 80, paddingBottom: 28}}>
      <div style={{maxWidth: 1320, margin: "0 auto", padding: "0 32px"}}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, gap: 32}}>
          <Wordmark height={isDark ? 100 : 80} color={isDark ? "cream" : "black"}/>
          <div className="hand" style={{fontFamily: "var(--font-hand)", fontSize: 28, lineHeight: 1.1, transform: "rotate(-3deg)", textAlign: "right", maxWidth: 280}}>
            {lang === "en" ? "Gone to have a brah." : "Fui ter um brah."}
          </div>
        </div>
        <div style={{display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, paddingBottom: 40, borderBottom: `1px solid ${line}`}}>
          <div>
            <div style={overStyle("var(--brah-tomato)")}>{lang === "en" ? "EVERYBODY NEEDS A BRAH" : "TODA A GENTE PRECISA DE UM BRAH"}</div>
            <p style={{marginTop: 14, opacity: 0.85, maxWidth: 360}}>
              Rua dos Ferreiros 3A<br/>2655-279 Ericeira, Portugal<br/>
              <em style={{opacity: 0.7, fontStyle: "italic"}}>
                {lang === "en" ? '"Our return policy is simple. You will return."' : '"A política de devolução é simples. Tu vais voltar."'}
              </em>
            </p>
          </div>
          <div>
            <div style={overStyle(isDark ? "rgba(255,252,228,0.5)" : "var(--brah-ink-soft)")}>{labels.visit[lang]}</div>
            <ul style={ulReset()}>
              {navItems.map(it => (
                <li key={it.id}>
                  <a onClick={() => onNav?.(it.id)} style={{cursor: "pointer", textDecoration: "none", color: "inherit"}}>{it.l[lang]}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div style={overStyle(isDark ? "rgba(255,252,228,0.5)" : "var(--brah-ink-soft)")}>{labels.follow[lang]}</div>
            <ul style={ulReset()}>
              <li><a href={window.BRAH.brand.instagram} target="_blank" rel="noreferrer" style={{textDecoration: "none", color: "inherit"}}>instagram · @brah_smashburger</a></li>
              <li><a href={window.BRAH.brand.ubereats} target="_blank" rel="noreferrer" style={{textDecoration: "none", color: "inherit"}}>uber eats · pede já</a></li>
            </ul>
          </div>
          <div>
            <div style={overStyle(isDark ? "rgba(255,252,228,0.5)" : "var(--brah-ink-soft)")}>{labels.sayHi[lang]}</div>
            <ul style={ulReset()}>
              <li><a href={`tel:${window.BRAH.brand.phone.replace(/\s/g,'')}`} style={{textDecoration: "none", color: "inherit"}}>{window.BRAH.brand.phone}</a></li>
              <li>Rua dos Ferreiros 3A · Ericeira</li>
            </ul>
          </div>
        </div>
        <div style={{display: "flex", justifyContent: "space-between", marginTop: 24, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.65, flexWrap: "wrap", gap: 12}}>
          <span>© brah {new Date().getFullYear()} · {labels.rights[lang]}</span>
          <span>From Ericeira · Portugal · est. 2024</span>
        </div>
      </div>
    </footer>
  );
}

function overStyle(color) {
  return {fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color};
}
function ulReset() {
  return {listStyle: "none", padding: 0, margin: "14px 0 0", display: "flex", flexDirection: "column", gap: 8, fontSize: 14};
}

/* ─────────────────────────────────────────────────────────────────────
   InstagramFeed — dedicated section (same on all directions, light theming)
   Uses lifestyle photos as fake feed tiles.
   ───────────────────────────────────────────────────────────────────── */
function InstagramFeed({ lang, variant = "cream" }) {
  const tiles = [
    { img: "assets/lifestyle-storefront.jpg", caption: { en: "Saturday smash. Sun's out.", pt: "Smash de sábado. Sol na rua." } },
    { img: "assets/product-cheese-handoff.png", caption: { en: "Cheese, melting like it owes you money.", pt: "Queijo a derreter como se te devesse dinheiro." } },
    { img: "assets/lifestyle-beach.jpg", caption: { en: "a brah or a bra?", pt: "um brah ou um sutiã?" } },
    { img: "assets/lifestyle-popup.jpg", caption: { en: "Pop-up @ Foz do Lizandro.", pt: "Pop-up @ Foz do Lizandro." } },
    { img: "assets/product-mustard.jpg", caption: { en: "Mustard hits different.", pt: "Mostarda faz diferença." } },
    { img: "assets/lifestyle-night.jpg", caption: { en: "BRAH after dark.", pt: "BRAH depois de escurecer." } },
  ];
  const cream = variant === "cream";
  return (
    <section style={{background: cream ? "var(--brah-cream)" : "var(--brah-cream-2)", padding: "96px 0", position: "relative"}}>
      <div style={{maxWidth: 1320, margin: "0 auto", padding: "0 32px"}}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 24}}>
          <div>
            <div style={overStyle("var(--brah-stamp-red)")}>{lang === "en" ? "FROM THE FEED" : "DO INSTAGRAM"}</div>
            <h3 style={{fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4.5vw, 64px)", lineHeight: 0.98, margin: "12px 0 0", letterSpacing: "-0.02em"}}>
              @brah_smashburger
            </h3>
          </div>
          <a href={window.BRAH?.brand?.instagram || "https://instagram.com/brah_smashburger"} target="_blank" rel="noreferrer" className="btn btn-dark" style={{padding: "12px 18px", fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none"}}>
            {lang === "en" ? "follow on instagram" : "segue no instagram"} →
          </a>
        </div>
        <div style={{display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8}}>
          {tiles.map((t, i) => (
            <a key={i} href="#" onClick={e=>e.preventDefault()} style={{position: "relative", display: "block", aspectRatio: "1/1", overflow: "hidden", background: "#000", cursor: "pointer"}}>
              <img src={t.img} alt="" style={{width: "100%", height: "100%", objectFit: "cover", transition: "transform var(--t-base) var(--ease-out)"}}
                   onMouseEnter={e=>e.currentTarget.style.transform="scale(1.06)"}
                   onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}/>
              <div style={{position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.65))", opacity: 0, transition: "opacity var(--t-base)"}}
                   onMouseEnter={e=>e.currentTarget.style.opacity=1}
                   onMouseLeave={e=>e.currentTarget.style.opacity=0}>
                <div style={{position: "absolute", bottom: 10, left: 12, right: 12, color: "var(--brah-cream)", fontSize: 11, letterSpacing: "0.08em"}}>
                  {t.caption[lang]}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Marquee strip (lightweight, shared) ─── */
function Marquee({ items, variant = "tomato" }) {
  const doubled = [...items, ...items, ...items];
  const bg = variant === "tomato" ? "var(--brah-tomato)" : variant === "dark" ? "var(--brah-black)" : "var(--brah-sky)";
  const fg = variant === "sky" ? "var(--brah-black)" : "var(--brah-cream)";
  return (
    <div style={{background: bg, color: fg, padding: "10px 0", overflow: "hidden", fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", borderTop: "1px solid rgba(0,0,0,0.08)", borderBottom: "1px solid rgba(0,0,0,0.08)"}}>
      <div style={{display: "flex", gap: 28, whiteSpace: "nowrap", animation: "brah-marquee 38s linear infinite", willChange: "transform"}}>
        {doubled.map((t, i) => (
          <span key={i} style={{display: "inline-flex", gap: 28, alignItems: "center"}}>
            {t}
            <span style={{display: "inline-block", width: 6, height: 6, background: "currentColor", borderRadius: "50%"}}></span>
          </span>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { MetaBar, LangPill, Wordmark, Sun, Footer, overStyle, ulReset, InstagramFeed, Marquee, Reviews, HandNote, HardCard, useReveal });

/* ─────────────────────────────────────────────────────────────────────
   Reveal — scroll-triggered fade up. IntersectionObserver-based.
   ───────────────────────────────────────────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      });
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─── Handwritten colored note — sticker, slight rotation, drop shadow ─── */
function HandNote({ children, color = "tomato", rotate = -4, size = 32, style }) {
  const palette = {
    tomato: "var(--brah-stamp-red)",
    indigo: "var(--brah-indigo)",
    yellow: "#B8920F",
    sky:    "#3A5A88",
    black:  "var(--brah-ink)",
  };
  return (
    <span style={{
      fontFamily: "var(--font-hand)", fontSize: size, lineHeight: 1.1,
      color: palette[color] || palette.tomato,
      transform: `rotate(${rotate}deg)`, display: "inline-block",
      ...style,
    }}>{children}</span>
  );
}

/* ─── HardCard — Street-Smash style card with offset shadow ─── */
function HardCard({ children, bg = "var(--brah-cream)", offset = 6, color = "var(--brah-black)", style, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <div onClick={onClick}
         onMouseEnter={() => setHover(true)}
         onMouseLeave={() => setHover(false)}
         style={{
           background: bg, border: `2px solid ${color}`,
           boxShadow: `${hover ? offset+2 : offset}px ${hover ? offset+2 : offset}px 0 ${color}`,
           transition: "box-shadow var(--t-base) var(--ease-out), transform var(--t-base) var(--ease-out)",
           transform: hover && onClick ? "translate(-2px,-2px)" : "translate(0,0)",
           cursor: onClick ? "pointer" : "default",
           ...style,
         }}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Reviews — auto-scrolling carousel. Fetches from Google Places API if
   BRAH_GOOGLE_PLACE_ID is set on window; falls back to static seed data.
   ───────────────────────────────────────────────────────────────────── */

// Reviews reais extraídas do Google — Brah Smash Burger (4.8★ · 165 avaliações)
const STATIC_REVIEWS = [
  { name: "Katharina Gary",   src: "Google", date: "5 dias atrás",   rating: 5, avatar: "assets/reviews/av-katharina.jpg", photo: "assets/reviews/katharina.jpg", text: { en: "Kind service, good burgers and sweet potato fries and also veggie options. Thank you!", pt: "Serviço simpático, bons burgers e batatas-doces fritas com opções vegetarianas. Obrigada!" } },
  { name: "Camili Elias",     src: "Google", date: "3 sem. atrás",   rating: 5, avatar: "assets/reviews/av-camili.jpg",    photo: "assets/reviews/camili.jpg",    text: { en: "From the service to the burgers, everything was amazing!", pt: "Desde o atendimento aos burgers, tudo ótimo!" } },
  { name: "re17",             src: "Google", date: "1 mês atrás",    rating: 5, avatar: null,                              photo: "assets/reviews/re17.jpg",       text: { en: "I really like the atmosphere here, the staff is also kind and friendly.", pt: "Adoro o ambiente aqui, o staff também é simpático e amigável." } },
  { name: "pedro cunha",      src: "Google", date: "2 meses atrás",  rating: 5, avatar: "assets/reviews/av-pedro.jpg",    photo: "assets/reviews/pedro.jpg",      text: { en: "Best smash burger in town. Must visit in Ericeira.", pt: "Melhor smash burger da cidade. Visita obrigatória na Ericeira." } },
  { name: "Miguel Júlio A.",  src: "Google", date: "2 meses atrás",  rating: 5, avatar: "assets/reviews/av-miguel.jpg",   photo: "assets/reviews/miguel.jpg",     text: { en: "First time at a Smash Burger in Ericeira. Amazing ingredients, good fries and an authentic special mayo sauce.", pt: "Primeira vez no Smash Burger na Ericeira. Ingredientes de deixar água na boca, boas batatas e um autêntico molho especial de maionese." } },
  { name: "Prompt Command",   src: "Google", date: "8 meses atrás",  rating: 5, avatar: "assets/reviews/av-prompt.jpg",   photo: "assets/reviews/prompt.jpg",     text: { en: "So good we came back the next day too! Perfectly cooked with gorgeous sweet potato fries. Small menu but definitely perfected!", pt: "Tão bom que voltámos no dia seguinte! Perfeitamente confecionado com batatas-doces incríveis. Menu pequeno mas claramente perfecionado!" } },
  { name: "Maite 13",         src: "Google", date: "8 meses atrás",  rating: 5, avatar: "assets/reviews/av-maite.jpg",    photo: "assets/reviews/maite.jpg",      text: { en: "It was all amazing, the secret sauce was delicious. The service makes you feel comfortable. Very recommended!", pt: "Foi tudo incrível, o molho secreto estava delicioso. O serviço faz-nos sentir confortáveis. Muito recomendado!" } },
  { name: "Inês Picaró",      src: "Google", date: "8 meses atrás",  rating: 5, avatar: "assets/reviews/av-ines.jpg",     photo: "assets/reviews/ines.jpg",       text: { en: "Everything incredible! Very tasty smash burgers, crispy fries and super friendly service!", pt: "Tudo incrível! Smash burgers muito saborosos, batatas estaladiças e atendimento super simpático!" } },
  { name: "Tomás Almas",      src: "Google", date: "9 meses atrás",  rating: 5, avatar: "assets/reviews/av-tomas.jpg",    photo: "assets/reviews/tomas.jpg",      text: { en: "Best smash burger I've ever had! I'm going to start going to Ericeira more often just to go there.", pt: "Melhor smash burger que já comi! Vou começar a ir mais vezes à Ericeira só para lá ir." } },
  { name: "Olga Jankowska",   src: "Google", date: "9 meses atrás",  rating: 5, avatar: "assets/reviews/av-olga.jpg",     photo: "assets/reviews/olga.jpg",       text: { en: "Tried both the cheese burger and the bacon one — both really good and bigger than expected. Will be back for sure.", pt: "Experimentei o cheese burger e o bacon — ambos muito bons e maiores do que esperava. Com certeza voltarei." } },
  { name: "Peter Meyers",     src: "Google", date: "10 meses atrás", rating: 5, avatar: "assets/reviews/av-peter.jpg",    photo: "assets/product-fries.jpg",      text: { en: "Great tasting burgers, get the special sauce on the side.", pt: "Burgers com um sabor incrível. Pede o molho especial à parte." } },
  { name: "Agnieszka S.",     src: "Google", date: "1 sem. atrás",   rating: 5, avatar: "assets/reviews/av-agnieszka.jpg", photo: null, text: { en: "Very tasty, fresh and simple. Ordered a couple of times and never felt heavy. Love this place!", pt: "Muito saboroso, fresco e simples. Pedi várias vezes e nunca me senti pesada. Adoro este sítio!" } },
  { name: "Marcos Júnior",    src: "Google", date: "9 dias atrás",   rating: 5, avatar: "assets/reviews/av-marcos.jpg",    photo: null, text: { en: "Calm place, delicious food. One of the best burgers I've ever eaten.", pt: "Lugar calminho, comida deliciosa. Um dos melhores hambúrgueres que já comi." } },
  { name: "Victoria Belvisi", src: "Google", date: "11 dias atrás",  rating: 5, avatar: "assets/reviews/av-victoria.jpg",  photo: null, text: { en: "Delicious smash burgers. Not too heavy. Their truffle mayo is a must.", pt: "Smash burgers deliciosos. Não são pesados. A mayo de trufa é obrigatória." } },
  { name: "Aaron Gesierich",  src: "Google", date: "3 sem. atrás",   rating: 5, avatar: "assets/reviews/av-aaron.jpg",     photo: null, text: { en: "This burger and fries taste better than anything I've had in a long time.", pt: "Este burger e estas batatas têm um sabor melhor do que qualquer coisa que comi há muito tempo." } },
  { name: "Giulia",           src: "Google", date: "12 dias atrás",  rating: 5, avatar: "assets/reviews/av-giulia.jpg",    photo: null, text: { en: "Top place to eat a burger in Ericeira. Love the vibe.", pt: "Sítio top para comer um burger na Ericeira. Adoro a vibe." } },
];

const SRC_ICONS = {
  Google: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  ),
  TripAdvisor: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#00AF87">
      <circle cx="6.5" cy="12" r="3"/><circle cx="17.5" cy="12" r="3"/>
      <path d="M12 6C8.5 6 5.5 7.5 3.5 10l3 2a5.5 5.5 0 0 1 11 0l3-2C18.5 7.5 15.5 6 12 6z"/>
    </svg>
  ),
  Instagram: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E1306C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.5"/>
      <circle cx="17.5" cy="6.5" r="1" fill="#E1306C" stroke="none"/>
    </svg>
  ),
};

function ReviewAvatar({ name, photo }) {
  const [failed, setFailed] = useState(false);
  const initials = name.replace("@","").split(/\s|\./).filter(Boolean).slice(0,2).map(s=>s[0].toUpperCase()).join("");
  const colors = ["var(--brah-tomato)","var(--brah-indigo)","var(--brah-stamp-red)","var(--brah-sky)"];
  const bg = colors[name.charCodeAt(0) % colors.length];
  if (photo && !failed) return <img src={photo} alt={name} onError={()=>setFailed(true)} style={{width:40,height:40,borderRadius:"50%",objectFit:"cover",flexShrink:0,border:"2px solid var(--brah-line)"}}/>;
  return <div style={{width:40,height:40,borderRadius:"50%",background:bg,color:"var(--brah-cream)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:14,flexShrink:0}}>{initials}</div>;
}

function ReviewCard({ r, lang }) {
  return (
    <div style={{width: r.photo ? 300 : 260, flexShrink:0, background:"var(--brah-cream)", border:"1.5px solid var(--brah-line)", padding:0, display:"flex", flexDirection:"column", overflow:"hidden"}}>
      {r.photo && <img src={r.photo} alt="" style={{width:"100%",height:160,objectFit:"cover",flexShrink:0}}/>}
      <div style={{padding: r.photo ? 18 : "14px 16px", display:"flex", flexDirection:"column", gap:8, flex:1}}>
      <div style={{color:"var(--brah-stamp-red)",fontSize:15,letterSpacing:"0.06em"}}>{"★".repeat(r.rating)}</div>
      <p style={{margin:0,fontSize:13,lineHeight:1.6,color:"var(--brah-ink)",flex:1}}>"{r.text[lang] || r.text.en}"</p>
      <div style={{borderTop:"1px solid var(--brah-line)",paddingTop:12,display:"flex",alignItems:"center",gap:10}}>
        <ReviewAvatar name={r.name} photo={r.avatar}/>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontWeight:700,fontSize:13,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{r.name}</div>
          <div style={{fontSize:11,color:"var(--brah-ink-soft)",display:"flex",alignItems:"center",gap:5,marginTop:2}}>
            {SRC_ICONS[r.src] || null}
            <span>{r.date}</span>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

function Reviews({ lang, variant = "clean", bg = "var(--brah-cream-2)" }) {
  const [reviews, setReviews] = useState(STATIC_REVIEWS);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef(null);

  // Fetch from Google Places if API key available
  useEffect(() => {
    const placeId = window.BRAH_GOOGLE_PLACE_ID;
    const apiKey  = window.BRAH_GOOGLE_API_KEY;
    if (!placeId || !apiKey) return;
    fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`)
      .then(r => r.json())
      .then(data => {
        const r = data.result?.reviews;
        if (r?.length) {
          setReviews(r.map(rv => ({
            name: rv.author_name, src: "Google",
            date: rv.relative_time_description, rating: rv.rating,
            avatar: rv.profile_photo_url, photo: null,
            text: { en: rv.text, pt: rv.text },
          })));
        }
      }).catch(() => {});
  }, []);

  // quadruplica para garantir loop contínuo mesmo com poucas reviews
  const doubled = [...reviews, ...reviews, ...reviews, ...reviews];

  return (
    <section style={{background: bg, padding: "80px 0", borderTop: "1px solid var(--brah-line)", borderBottom: "1px solid var(--brah-line)", overflow: "hidden"}}>
      {/* header */}
      <div style={{maxWidth: 1320, margin: "0 auto", padding: "0 32px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16}}>
        <div>
          <div style={overStyle("var(--brah-stamp-red)")}>{lang === "en" ? "WHAT PEOPLE SAY" : "O QUE DIZEM"}</div>
          <h3 style={{fontFamily: "var(--font-display)", fontSize: "clamp(32px, 4vw, 60px)", lineHeight: 0.98, letterSpacing: "-0.02em", margin: "12px 0 0"}}>
            {lang === "en" ? <>Don't take our word for it. <em style={{color:"var(--brah-stamp-red)"}}>Take theirs.</em></> : <>Não acredites em nós. <em style={{color:"var(--brah-stamp-red)"}}>Acredita neles.</em></>}
          </h3>
        </div>
        <div style={{textAlign: "right"}}>
          <div style={{fontFamily: "var(--font-display)", fontSize: 48, lineHeight: 1, letterSpacing: "-0.02em"}}>4.8 <span style={{color:"var(--brah-stamp-red)"}}>★</span></div>
          <div style={{fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--brah-ink-soft)", marginTop: 4}}>
            {lang === "en" ? "165 reviews · Google" : "165 avaliações · Google"}
          </div>
        </div>
      </div>

      {/* carousel */}
      <div
        style={{userSelect: "none"}}
      >
        <style>{`
          @keyframes brah-reviews-scroll {
            from { transform: translateX(0); }
            to   { transform: translateX(-25%); }
          }
        `}</style>
        <div
          ref={trackRef}
          style={{
            display: "flex", gap: 16, paddingLeft: 32, alignItems: "flex-start",
            animation: `brah-reviews-scroll ${Math.max(reviews.length * 4, 30)}s linear infinite`,
            animationPlayState: "running",
            width: "max-content",
          }}
        >
          {doubled.map((r, i) => <ReviewCard key={i} r={r} lang={lang}/>)}
        </div>
      </div>
    </section>
  );
}

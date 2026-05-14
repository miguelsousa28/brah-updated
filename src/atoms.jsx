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
      <div style={{maxWidth: 1600, margin: "0 auto", padding: "9px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap"}}>
        <span>BRAH · ERICEIRA · PORTUGAL</span>
        <span style={{opacity: 0.75}}>{lang === "en" ? "OPEN EVERYDAY · 10:00 — 23:30" : "ABERTO TODOS OS DIAS · 10:00 — 23:30"}</span>
        <span style={{display: "flex", gap: 14, alignItems: "center"}}>
          <a href="#" style={{textDecoration: "none", color: "inherit"}} onClick={e=>e.preventDefault()}>IG · @brah.ericeira</a>
          <span style={{opacity: 0.4}}>·</span>
          <a href="#" style={{textDecoration: "none", color: "inherit"}} onClick={e=>e.preventDefault()}>FB · brah.ericeira</a>
          <span style={{opacity: 0.4}}>·</span>
          <LangPill lang={lang} onLang={onLang} variant={variant}/>
        </span>
      </div>
    </div>
  );
}

function LangPill({ lang, onLang, variant }) {
  const onCream = variant === "cream" || variant == null;
  return (
    <span style={{display: "inline-flex", border: `1px solid currentColor`, padding: "1px"}}>
      {["en", "pt"].map(L => (
        <button
          key={L}
          onClick={() => onLang(L)}
          style={{
            background: lang === L ? "currentColor" : "transparent",
            color: lang === L ? (onCream ? "var(--brah-cream)" : "var(--brah-black)") : "inherit",
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
              <li><a href="#" onClick={e=>e.preventDefault()} style={{textDecoration: "none", color: "inherit"}}>instagram · @brah.ericeira</a></li>
              <li><a href="#" onClick={e=>e.preventDefault()} style={{textDecoration: "none", color: "inherit"}}>facebook · brah.ericeira</a></li>
              <li><a href="#" onClick={e=>e.preventDefault()} style={{textDecoration: "none", color: "inherit"}}>tiktok · @brah</a></li>
            </ul>
          </div>
          <div>
            <div style={overStyle(isDark ? "rgba(255,252,228,0.5)" : "var(--brah-ink-soft)")}>{labels.sayHi[lang]}</div>
            <ul style={ulReset()}>
              <li>brah@ericeira.pt</li>
              <li>+351 261 000 000</li>
              <li>Rua dos Ferreiros 3A</li>
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
              @brah.ericeira
            </h3>
          </div>
          <a href="#" onClick={e=>e.preventDefault()} className="btn btn-dark" style={{padding: "12px 18px", fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none"}}>
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
   Reviews — Google review-style cards. Variant: clean or hard-shadow.
   ───────────────────────────────────────────────────────────────────── */
function Reviews({ lang, variant = "clean", bg = "var(--brah-cream-2)" }) {
  const items = [
    { name: "Sofia M.",      src: "Google", date: "2 weeks ago", rating: 5, text: { en: "Best smash in Ericeira hands down. The cheese brah is unreal, and the staff is the warmest. Walked in barefoot from the beach and felt like a regular.", pt: "O melhor smash da Ericeira, sem dúvida. O cheese brah é absurdo e o staff é o mais simpático que há. Entrei descalça da praia e senti-me em casa." } },
    { name: "Tiago R.",      src: "Google", date: "1 month ago", rating: 5, text: { en: "Stopped by after a surf at Ribeira d'Ilhas. Quick, hot, exactly what I needed. The fries are double-fried and crispy as hell.", pt: "Passei depois de uma sessão na Ribeira d'Ilhas. Rápido, quente, exatamente o que precisava. As batatas são fritas duas vezes e estão estaladiças." } },
    { name: "Marie L.",      src: "TripAdvisor", date: "3 weeks ago", rating: 5, text: { en: '"Our return policy is simple. You will return." — they were right. Third visit this trip. The vegan brah converted my boyfriend.', pt: '"A política de devolução é simples. Tu vais voltar." — tinham razão. Terceira vez esta viagem. O vegan brah converteu o meu namorado.' } },
    { name: "@joaopedrosurfa", src: "Instagram", date: "5 days ago", rating: 5, text: { en: "post-surf brah hits different. that house sauce should be illegal.", pt: "brah pós-surf é outra coisa. esse molho da casa devia ser ilegal." } },
  ];
  const isHard = variant === "hard";
  return (
    <section style={{background: bg, padding: "96px 0", borderTop: "1px solid var(--brah-line)", borderBottom: "1px solid var(--brah-line)"}}>
      <div style={{maxWidth: 1320, margin: "0 auto", padding: "0 32px"}}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 16}}>
          <div>
            <div style={overStyle("var(--brah-stamp-red)")}>{lang === "en" ? "WHAT PEOPLE SAY" : "O QUE DIZEM"}</div>
            <h3 style={{fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4.5vw, 64px)", lineHeight: 0.98, letterSpacing: "-0.02em", margin: "12px 0 0", maxWidth: 720}}>
              {lang === "en" ? <>Don't take our word for it. <em style={{color:"var(--brah-stamp-red)"}}>Take theirs.</em></> : <>Não acredites em nós. <em style={{color:"var(--brah-stamp-red)"}}>Acredita neles.</em></>}
            </h3>
          </div>
          <div style={{textAlign: "right"}}>
            <div style={{fontFamily: "var(--font-display)", fontSize: 48, lineHeight: 1, letterSpacing: "-0.02em"}}>
              4.9 <span style={{color: "var(--brah-stamp-red)"}}>★</span>
            </div>
            <div style={{fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--brah-ink-soft)", marginTop: 4}}>
              {lang === "en" ? "based on 412 reviews" : "com base em 412 avaliações"}
            </div>
          </div>
        </div>
        <div style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: isHard ? 20 : 12}}>
          {items.map((r, i) => (
            isHard
              ? <HardCard key={i} offset={5}><ReviewBody r={r} lang={lang}/></HardCard>
              : <div key={i} style={{border: "1px solid var(--brah-line)", background: "var(--brah-cream)", padding: 0}}><ReviewBody r={r} lang={lang}/></div>
          ))}
        </div>
      </div>
    </section>
  );
}
function ReviewBody({ r, lang }) {
  return (
    <div style={{padding: 22}}>
      <div style={{display: "flex", gap: 6, color: "var(--brah-stamp-red)", fontSize: 16, letterSpacing: "0.06em"}}>
        {"★★★★★".slice(0, r.rating)}
      </div>
      <p style={{margin: "12px 0 18px", fontSize: 14, lineHeight: 1.55, color: "var(--brah-ink)"}}>"{r.text[lang]}"</p>
      <div style={{borderTop: "1px solid var(--brah-line)", paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8}}>
        <div>
          <div style={{fontWeight: 700, fontSize: 13}}>{r.name}</div>
          <div style={{fontSize: 11, color: "var(--brah-ink-soft)"}}>{r.date} · {r.src}</div>
        </div>
      </div>
    </div>
  );
}

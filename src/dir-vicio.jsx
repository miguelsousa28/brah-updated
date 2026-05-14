// brah — Direction: VÍCIO-leaning
// Product-first. Big serif headlines. Confident, burger-first.
// Cream + black + tomato accents. Minimal UI, lots of negative space.

const { useState: useStateV } = React;

function VicioSite({ page, lang, onNav, onLang }) {
  return (
    <div style={{background: "var(--brah-cream)", color: "var(--brah-ink)", minHeight: "100vh"}}>
      <MetaBar variant="cream" lang={lang} onLang={onLang}/>
      <VicioHeader page={page} onNav={onNav} lang={lang}/>
      <main>
        {page === "home"     && <VicioHome     lang={lang} onNav={onNav}/>}
        {page === "menu"     && <VicioMenu     lang={lang} onNav={onNav}/>}
        {page === "story"    && <VicioStory    lang={lang} onNav={onNav}/>}
        {page === "visit"    && <VicioVisit    lang={lang} onNav={onNav}/>}
        {page === "events"   && <VicioEvents   lang={lang} onNav={onNav}/>}
        {page === "gallery"  && <VicioGallery  lang={lang} onNav={onNav}/>}
        {page === "catering" && <VicioCatering lang={lang} onNav={onNav}/>}
      </main>
      <InstagramFeed lang={lang} variant="cream"/>
      <Reviews lang={lang} variant="clean" bg="var(--brah-cream-2)"/>
      <Footer lang={lang} variant="dark" onNav={onNav}/>
    </div>
  );
}

/* ─── Header — minimal, sticky, big wordmark ─── */
function VicioHeader({ page, onNav, lang }) {
  const items = ["home", "menu", "story", "events", "gallery", "catering", "visit"];
  return (
    <header style={{background: "var(--brah-cream)", borderBottom: "1px solid var(--brah-ink)", position: "sticky", top: 0, zIndex: 30}}>
      <div style={{maxWidth: 1600, margin: "0 auto", padding: "0 24px", height: 76, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24}}>
        <Wordmark height={36} onClick={() => onNav("home")}/>
        <nav style={{display: "flex", gap: 28, flexWrap: "wrap", justifyContent: "center"}}>
          {items.map(id => (
            <a key={id} onClick={() => onNav(id)} style={{
              cursor: "pointer", fontSize: 13, fontWeight: 600, letterSpacing: "0.02em", textTransform: "lowercase",
              borderBottom: page === id ? "2px solid var(--brah-stamp-red)" : "2px solid transparent",
              paddingBottom: 2, color: page === id ? "var(--brah-stamp-red)" : "inherit",
              transition: "color var(--t-fast)"
            }}>
              {window.BRAH.nav[id][lang]}
            </a>
          ))}
        </nav>
        <button onClick={() => onNav("menu")} style={btnDark}>
          {lang === "en" ? "see the menu" : "ver o menu"} →
        </button>
      </div>
    </header>
  );
}

const btnDark = {
  background: "var(--brah-black)", color: "var(--brah-cream)", border: "none",
  padding: "12px 18px", fontFamily: "var(--font-body)", fontWeight: 700,
  fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase",
  cursor: "pointer", transition: "background var(--t-base) var(--ease-out)",
};
const btnGhost = {
  background: "transparent", color: "var(--brah-black)", border: "1.5px solid var(--brah-black)",
  padding: "10.5px 18px", fontFamily: "var(--font-body)", fontWeight: 700,
  fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase",
  cursor: "pointer", transition: "all var(--t-base) var(--ease-out)",
};
const btnTomato = {
  ...btnDark, background: "var(--brah-tomato)",
};

/* ─── Home — gigantic serif + single hero product ─── */
function VicioHome({ lang, onNav }) {
  const H = window.BRAH.hero;
  return (
    <>
      {/* Hero — split: type left, product right */}
      <section style={{padding: "64px 24px 96px", maxWidth: 1600, margin: "0 auto"}}>
        <div style={{display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 64, alignItems: "center", minHeight: 580}}>
          <div>
            <div style={{...overStyle("var(--brah-stamp-red)"), marginBottom: 24}}>{H.tag[lang]}</div>
            <h1 style={{fontFamily: "var(--font-display)", fontSize: "clamp(72px, 11vw, 184px)", lineHeight: 0.86, letterSpacing: "-0.035em", margin: 0, whiteSpace: "pre-line"}}>
              {H.headline[lang]}
            </h1>
            <p style={{fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 26, marginTop: 32, color: "var(--brah-ink-soft)", maxWidth: 520, lineHeight: 1.25}}>
              {H.sub[lang]}
            </p>
            <div style={{display: "flex", gap: 14, marginTop: 36, flexWrap: "wrap"}}>
              <button onClick={() => onNav("menu")} style={btnTomato}>{lang === "en" ? "the menu" : "o menu"} →</button>
              <button onClick={() => onNav("visit")} style={btnGhost}>{lang === "en" ? "find us" : "encontra-nos"}</button>
            </div>
          </div>
          <div style={{position: "relative"}}>
            <img src="assets/product-cheese-handoff.png" alt="" style={{width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block"}}/>
            <div style={{position: "absolute", right: -16, bottom: 40, fontFamily: "var(--font-hand)", fontSize: 32, lineHeight: 1.05, transform: "rotate(-6deg)", background: "var(--brah-cream)", padding: "12px 18px", border: "2px solid var(--brah-tomato)", whiteSpace: "pre-line", maxWidth: 220, textAlign: "center"}}>
              {H.note[lang]}
            </div>
          </div>
        </div>
      </section>

      <Marquee variant="tomato" items={["EVERYBODY NEEDS A BRAH", "CATCH THE WAVE — TASTE THE SMASH", "OPEN EVERYDAY 10:00 — 23:30", "FROM ERICEIRA · PORTUGAL"]} />

      {/* The collection — 4 product list */}
      <VicioCollection lang={lang} onNav={onNav}/>

      {/* Story preview */}
      <section style={{padding: "120px 32px", maxWidth: 1320, margin: "0 auto"}}>
        <div style={{display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 80, alignItems: "center"}}>
          <div>
            <div style={overStyle("var(--brah-stamp-red)")}>{window.BRAH.story.over[lang]}</div>
            <h2 style={{fontFamily: "var(--font-display)", fontSize: "clamp(40px, 5.5vw, 88px)", lineHeight: 0.96, letterSpacing: "-0.02em", margin: "16px 0 24px", fontStyle: "italic"}}>
              {window.BRAH.story.quote[lang]}
            </h2>
            <p style={{fontSize: 18, lineHeight: 1.5, color: "var(--brah-ink-soft)", maxWidth: 540}}>
              {window.BRAH.story.body[lang]}
            </p>
            <button onClick={() => onNav("story")} style={{...btnDark, marginTop: 32}}>{lang === "en" ? "our story" : "a nossa história"} →</button>
          </div>
          <img src="assets/product-bag.jpg" alt="" style={{width: "100%", aspectRatio: "3/4", objectFit: "cover"}}/>
        </div>
      </section>
    </>
  );
}

/* ─── Collection — 4 burger names in big serif list ─── */
function VicioCollection({ lang, onNav }) {
  const products = window.BRAH.products;
  const [active, setActive] = useStateV(0);
  return (
    <section style={{background: "var(--brah-cream-2)", padding: "120px 0", borderTop: "1px solid var(--brah-ink)", borderBottom: "1px solid var(--brah-ink)"}}>
      <div style={{maxWidth: 1600, margin: "0 auto", padding: "0 32px"}}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 16}}>
          <div>
            <div style={overStyle("var(--brah-stamp-red)")}>{lang === "en" ? "THE BRAH COLLECTION" : "A COLEÇÃO BRAH"}</div>
            <h2 style={{fontFamily: "var(--font-display)", fontSize: "clamp(40px, 5vw, 80px)", lineHeight: 0.95, letterSpacing: "-0.02em", margin: "12px 0 0", maxWidth: 800}}>
              {lang === "en" ? <>Smashed thin. <em>Made to be eaten standing up.</em></> : <>Smashed fino. <em>Para comer de pé.</em></>}
            </h2>
          </div>
          <button onClick={() => onNav("menu")} style={btnDark}>{lang === "en" ? "full menu" : "ver tudo"} →</button>
        </div>

        <div style={{display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 56, alignItems: "stretch"}}>
          {/* Burger names list */}
          <ul style={{listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid var(--brah-ink)"}}>
            {products.map((p, i) => (
              <li key={p.id}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => onNav("menu")}
                  style={{
                    borderBottom: "1px solid var(--brah-ink)",
                    padding: "28px 0",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: 24,
                    transition: "padding var(--t-base) var(--ease-out)",
                    paddingLeft: active === i ? 18 : 0,
                  }}>
                <div style={{display: "flex", alignItems: "baseline", gap: 24, flex: 1, minWidth: 0}}>
                  <span style={{fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: "var(--brah-ink-soft)", width: 32}}>0{i+1}</span>
                  <span style={{fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4.5vw, 64px)", lineHeight: 0.95, letterSpacing: "-0.02em", fontStyle: active === i ? "italic" : "normal", color: active === i ? "var(--brah-stamp-red)" : "var(--brah-ink)", transition: "color var(--t-base), font-style var(--t-base)"}}>
                    {p.name}
                  </span>
                </div>
                <span style={{fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--brah-ink-soft)", whiteSpace: "nowrap"}}>
                  {p.tag[lang]}
                </span>
              </li>
            ))}
          </ul>
          {/* Active product image */}
          <div style={{position: "relative", aspectRatio: "4/5", background: "var(--brah-cream)", border: "1px solid var(--brah-ink)", overflow: "hidden"}}>
            {products.map((p, i) => (
              <img key={p.id} src={p.img} alt=""
                style={{
                  position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
                  opacity: active === i ? 1 : 0,
                  transform: active === i ? "scale(1)" : "scale(1.04)",
                  transition: "opacity var(--t-slow) var(--ease-out), transform var(--t-slow) var(--ease-out)",
                }}/>
            ))}
            <div style={{position: "absolute", bottom: 20, left: 20, right: 20, background: "var(--brah-cream)", border: "1px solid var(--brah-ink)", padding: "14px 16px"}}>
              <div style={{...overStyle("var(--brah-stamp-red)"), fontSize: 10}}>{products[active].tag[lang]}</div>
              <div style={{fontFamily: "var(--font-display)", fontSize: 26, lineHeight: 1, marginTop: 4}}>{products[active].name}</div>
              <div style={{marginTop: 6, fontSize: 13, color: "var(--brah-ink-soft)", lineHeight: 1.4}}>{products[active].ing[lang]}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Menu page — full list, large serif, no prices ─── */
function VicioMenu({ lang, onNav }) {
  const products = window.BRAH.products;
  return (
    <>
      <section style={{padding: "80px 32px 40px", maxWidth: 1320, margin: "0 auto"}}>
        <div style={overStyle("var(--brah-stamp-red)")}>{lang === "en" ? "THE BRAH COLLECTION" : "A COLEÇÃO BRAH"}</div>
        <h1 style={{fontFamily: "var(--font-display)", fontSize: "clamp(56px, 8vw, 144px)", lineHeight: 0.92, letterSpacing: "-0.03em", margin: "16px 0 0", maxWidth: 1100}}>
          {lang === "en" ? <>The menu, smashed. <em style={{color:"var(--brah-stamp-red)"}}>Pick your brah.</em></> : <>O menu, smashado. <em style={{color:"var(--brah-stamp-red)"}}>Escolhe o teu brah.</em></>}
        </h1>
        <p style={{fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 22, marginTop: 24, color: "var(--brah-ink-soft)", maxWidth: 640}}>
          {lang === "en" ? "Four burgers. Two sides we're proud of. A drink for every weather." : "Quatro hambúrgueres. Acompanhamentos sem desculpa. Uma bebida para qualquer dia."}
        </p>
      </section>

      <section style={{padding: "32px 32px 80px", maxWidth: 1320, margin: "0 auto"}}>
        <div style={{borderTop: "1px solid var(--brah-ink)"}}>
          {products.map((p, i) => (
            <article key={p.id} style={{padding: "72px 0", borderBottom: "1px solid var(--brah-ink)"}}>
              <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center"}}>
                <div style={{order: i % 2 === 0 ? 1 : 2, position: "relative"}}>
                  <div style={{aspectRatio: "4/5", overflow: "hidden", background: "var(--brah-cream-2)"}}>
                    <img src={p.img} alt="" style={{width: "100%", height: "100%", objectFit: "cover", transition: "transform var(--t-slow) var(--ease-out)"}}
                         onMouseEnter={e=>e.currentTarget.style.transform="scale(1.04)"}
                         onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}/>
                  </div>
                  <span style={{position: "absolute", top: 12, [i % 2 === 0 ? "left" : "right"]: 12, background: "var(--brah-cream)", border: "1px solid var(--brah-ink)", padding: "6px 10px", fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase"}}>FIG. 0{i+1} / 04</span>
                </div>
                <div style={{order: i % 2 === 0 ? 2 : 1}}>
                  <div style={{...overStyle("var(--brah-stamp-red)"), fontSize: 12, marginBottom: 14}}>{p.tag[lang]}</div>
                  <h2 style={{fontFamily: "var(--font-display)", fontSize: "clamp(56px, 7vw, 120px)", lineHeight: 0.92, letterSpacing: "-0.03em", margin: 0}}>{p.name}</h2>
                  <p style={{marginTop: 24, fontSize: 18, lineHeight: 1.65, color: "var(--brah-ink-soft)", maxWidth: 480}}>{p.ing[lang]}</p>
                  <div style={{marginTop: 28, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--brah-ink-soft)"}}>
                    {lang === "en" ? "ask in store · or call " : "pergunta na loja · ou liga "}
                    <span style={{color: "var(--brah-ink)", fontWeight: 700}}>+351 261 000 000</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Sides + drinks */}
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, marginTop: 80}}>
          <VicioListCard title={lang === "en" ? "Sides" : "Acompanhamentos"} items={window.BRAH.sides} lang={lang}/>
          <VicioListCard title={lang === "en" ? "Drinks" : "Bebidas"} items={window.BRAH.drinks} lang={lang}/>
        </div>

        <div style={{marginTop: 64, padding: "32px", background: "var(--brah-cream-2)", border: "1px solid var(--brah-line)", textAlign: "center"}}>
          <div style={overStyle("var(--brah-stamp-red)")}>{lang === "en" ? "GOT QUESTIONS?" : "ALGUMA DÚVIDA?"}</div>
          <h3 style={{fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3vw, 48px)", margin: "12px 0 16px", lineHeight: 1.05}}>
            {lang === "en" ? "Walk in. We'll show you." : "Aparece. Mostramos-te."}
          </h3>
          <button onClick={() => onNav("visit")} style={btnDark}>{lang === "en" ? "find us in Ericeira" : "encontra-nos na Ericeira"} →</button>
        </div>
      </section>
    </>
  );
}

function VicioListCard({ title, items, lang }) {
  return (
    <div>
      <h3 style={{fontFamily: "var(--font-display)", fontSize: 44, lineHeight: 1, letterSpacing: "-0.02em", margin: "0 0 20px"}}>{title}</h3>
      <ul style={{listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid var(--brah-ink)"}}>
        {items.map((it, i) => (
          <li key={i} style={{padding: "16px 0", borderBottom: "1px solid var(--brah-line)", display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 18}}>
            <span style={{fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: "-0.01em"}}>{it.name}</span>
            <span style={{fontSize: 13, color: "var(--brah-ink-soft)", fontStyle: "italic", textAlign: "right"}}>{it.note[lang]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Story page — full editorial spread ─── */
function VicioStory({ lang, onNav }) {
  const S = window.BRAH.story;
  return (
    <>
      <section style={{position: "relative", height: "min(70vh, 560px)", overflow: "hidden"}} className="grain">
        <img src="assets/lifestyle-storefront.jpg" alt="" style={{position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover"}}/>
        <div style={{position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5))"}}></div>
        <div style={{position: "relative", height: "100%", maxWidth: 1320, margin: "0 auto", padding: "0 32px 56px", display: "flex", flexDirection: "column", justifyContent: "flex-end", zIndex: 2, color: "var(--brah-cream)"}}>
          <div style={{...overStyle("var(--brah-cream)"), opacity: 0.85}}>{S.over[lang]}</div>
          <h1 style={{fontFamily: "var(--font-display)", fontSize: "clamp(56px, 8vw, 144px)", lineHeight: 0.9, letterSpacing: "-0.03em", margin: "12px 0 0", maxWidth: 1100, color: "var(--brah-cream)"}}>
            {lang === "en" ? "One griddle. One playlist." : "Uma chapa. Uma playlist."}
          </h1>
        </div>
      </section>

      <section style={{padding: "96px 32px", maxWidth: 960, margin: "0 auto"}}>
        <h2 style={{fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(36px, 4.5vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0}}>
          {S.quote[lang]}
        </h2>
        <p style={{marginTop: 32, fontSize: 19, lineHeight: 1.55, color: "var(--brah-ink-soft)"}}>
          {S.body[lang]}
        </p>
        <p style={{marginTop: 24, fontSize: 19, lineHeight: 1.55, color: "var(--brah-ink-soft)"}}>
          {lang === "en"
            ? "Ericeira is a World Surfing Reserve. Our customers walk in barefoot, sand on their feet. We feed surfers at 11am, builders at 2pm, families at 7pm, and the after-hours crowd at 23:00. Same burger. Same standard. Same brah."
            : "A Ericeira é Reserva Mundial de Surf. Os nossos clientes entram descalços, com areia nos pés. Servimos surfistas às 11h, trabalhadores às 14h, famílias às 19h e o pessoal das tantas às 23h. Mesmo hambúrguer. Mesma régua. Mesmo brah."}
        </p>
      </section>

      <section style={{padding: "0 32px 96px", maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12}}>
        <img src="assets/product-griddle.jpg" alt="" style={{width: "100%", aspectRatio: "3/4", objectFit: "cover"}}/>
        <img src="assets/lifestyle-interior.jpg" alt="" style={{width: "100%", aspectRatio: "3/4", objectFit: "cover"}}/>
        <img src="assets/product-cheese-handoff.png" alt="" style={{width: "100%", aspectRatio: "3/4", objectFit: "cover"}}/>
      </section>
    </>
  );
}

/* ─── Visit page ─── */
function VicioVisit({ lang, onNav }) {
  const V = window.BRAH.visit;
  return (
    <section style={{padding: "80px 32px 120px", maxWidth: 1320, margin: "0 auto"}}>
      <div style={{display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 80, alignItems: "center"}}>
        <div>
          <div style={overStyle("var(--brah-stamp-red)")}>{V.over[lang]}</div>
          <h1 style={{fontFamily: "var(--font-display)", fontSize: "clamp(56px, 7vw, 112px)", lineHeight: 0.92, letterSpacing: "-0.03em", margin: "16px 0 24px"}}>
            Rua dos Ferreiros, 3A.<br/>
            <em style={{color: "var(--brah-stamp-red)"}}>Ericeira.</em>
          </h1>
          <table style={{borderCollapse: "collapse", width: "100%", maxWidth: 480, marginTop: 16}}>
            <tbody>
              {window.BRAH.brand.hours.map((h, i) => (
                <tr key={i} style={{borderTop: i === 0 ? "1px solid var(--brah-ink)" : "1px solid var(--brah-line)", borderBottom: i === window.BRAH.brand.hours.length - 1 ? "1px solid var(--brah-ink)" : "none"}}>
                  <td style={{padding: "16px 0", fontWeight: 600, fontSize: 15}}>{h.d[lang]}</td>
                  <td style={{padding: "16px 0", textAlign: "right", fontFamily: "ui-monospace, SF Mono, Menlo, monospace", fontSize: 15}}>{h.h}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap"}}>
            <button style={btnTomato}>{V.cta1[lang]} →</button>
            <button style={btnGhost}>+351 261 000 000</button>
          </div>
        </div>
        <FauxMap/>
      </div>
    </section>
  );
}

function FauxMap() {
  return (
    <div style={{position: "relative", aspectRatio: "4/5"}}>
      <svg viewBox="0 0 400 500" style={{position: "absolute", inset: 0, width: "100%", height: "100%", border: "1px solid var(--brah-ink)"}}>
        <rect width="400" height="500" fill="var(--brah-lavender)"/>
        <path d="M0,200 Q100,180 200,220 T400,210 L400,500 L0,500 Z" fill="var(--brah-peach)" opacity="0.5"/>
        <path d="M0,260 Q120,240 220,280 T400,270" stroke="var(--brah-sky)" fill="none" strokeWidth="40" opacity="0.55"/>
        <g stroke="var(--brah-ink)" strokeWidth="1.5" fill="none">
          <line x1="20" y1="100" x2="380" y2="120"/>
          <line x1="60" y1="60" x2="160" y2="280"/>
          <line x1="240" y1="40" x2="200" y2="360"/>
          <line x1="0" y1="340" x2="400" y2="320"/>
          <line x1="120" y1="0" x2="100" y2="500"/>
          <line x1="300" y1="80" x2="280" y2="440"/>
        </g>
        <circle cx="210" cy="290" r="14" fill="var(--brah-stamp-red)"/>
        <circle cx="210" cy="290" r="6" fill="var(--brah-cream)"/>
        <text x="220" y="320" fontFamily="var(--font-body)" fontSize="13" fontWeight="700" letterSpacing="0.15em" fill="var(--brah-black)">brah</text>
      </svg>
      <div style={{position: "absolute", bottom: 16, left: 16, right: 16, padding: 14, background: "var(--brah-cream)", border: "1px solid var(--brah-black)"}}>
        <div style={{...overStyle("var(--brah-stamp-red)"), fontSize: 10}}>YOU ARE HERE</div>
        <div style={{fontWeight: 700, fontSize: 15, marginTop: 4}}>Rua dos Ferreiros 3A · 2655-279 Ericeira</div>
      </div>
    </div>
  );
}

/* ─── Events ─── */
function VicioEvents({ lang, onNav }) {
  const E = window.BRAH.events;
  return (
    <section style={{padding: "80px 32px 120px", maxWidth: 1320, margin: "0 auto"}}>
      <div style={overStyle("var(--brah-stamp-red)")}>{E.over[lang]}</div>
      <h1 style={{fontFamily: "var(--font-display)", fontSize: "clamp(48px, 7vw, 120px)", lineHeight: 0.92, letterSpacing: "-0.03em", margin: "16px 0 56px", maxWidth: 1100}}>{E.h2[lang]}</h1>
      <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32}}>
        {E.items.map((ev, i) => (
          <article key={i} style={{border: "1px solid var(--brah-ink)", background: "var(--brah-cream)", overflow: "hidden", display: "flex", flexDirection: "column"}}>
            <div style={{aspectRatio: "16/10", overflow: "hidden", borderBottom: "1px solid var(--brah-ink)"}}>
              <img src={ev.img} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}}/>
            </div>
            <div style={{padding: 24}}>
              <div style={{...overStyle("var(--brah-stamp-red)"), fontSize: 12}}>{ev.date[lang]}</div>
              <h3 style={{fontFamily: "var(--font-display)", fontSize: 40, lineHeight: 1, letterSpacing: "-0.02em", margin: "8px 0 6px"}}>{ev.title}</h3>
              <div style={{fontSize: 14, color: "var(--brah-ink-soft)"}}>{ev.where[lang]}</div>
              <button style={{...btnGhost, marginTop: 18}}>{lang === "en" ? "save the date" : "guarda a data"} →</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ─── Gallery ─── */
function VicioGallery({ lang }) {
  const G = window.BRAH.gallery;
  return (
    <section style={{padding: "80px 32px 120px", maxWidth: 1600, margin: "0 auto"}}>
      <div style={overStyle("var(--brah-stamp-red)")}>{G.over[lang]}</div>
      <h1 style={{fontFamily: "var(--font-display)", fontSize: "clamp(48px, 7vw, 120px)", lineHeight: 0.92, letterSpacing: "-0.03em", margin: "16px 0 48px", maxWidth: 1100}}>{G.h2[lang]}</h1>
      <div style={{columnCount: 3, columnGap: 12}}>
        {G.images.map((src, i) => (
          <img key={i} src={src} alt="" style={{width: "100%", marginBottom: 12, display: "block"}}/>
        ))}
      </div>
    </section>
  );
}

/* ─── Catering ─── */
function VicioCatering({ lang }) {
  const C = window.BRAH.catering;
  return (
    <section style={{padding: "80px 32px 120px", maxWidth: 1320, margin: "0 auto"}}>
      <div style={overStyle("var(--brah-stamp-red)")}>{C.over[lang]}</div>
      <h1 style={{fontFamily: "var(--font-display)", fontSize: "clamp(48px, 6.5vw, 112px)", lineHeight: 0.92, letterSpacing: "-0.03em", margin: "16px 0 8px", maxWidth: 1100}}>{C.h2[lang]}</h1>
      <div style={{fontFamily: "var(--font-hand)", fontSize: 24, color: "var(--brah-ink-soft)", marginBottom: 32, transform: "rotate(-2deg)", display: "inline-block"}}>{C.sub[lang]}</div>
      <p style={{fontSize: 19, lineHeight: 1.55, color: "var(--brah-ink-soft)", maxWidth: 720, marginTop: 16}}>{C.body[lang]}</p>
      <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 56}}>
        {C.options.map((o, i) => (
          <div key={i} style={{border: "1px solid var(--brah-ink)", background: "var(--brah-cream)", padding: 28}}>
            <div style={{...overStyle("var(--brah-stamp-red)"), fontSize: 11}}>0{i+1}</div>
            <h3 style={{fontFamily: "var(--font-display)", fontSize: 36, lineHeight: 1, letterSpacing: "-0.02em", margin: "10px 0 8px"}}>{o.title[lang]}</h3>
            <div style={{fontWeight: 700, fontSize: 14}}>{o.n[lang]}</div>
            <div style={{marginTop: 8, fontSize: 14, color: "var(--brah-ink-soft)"}}>{o.note[lang]}</div>
          </div>
        ))}
      </div>
      <div style={{marginTop: 56, padding: 28, background: "var(--brah-tomato)", color: "var(--brah-cream)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap"}}>
        <div>
          <div style={{...overStyle("var(--brah-cream)"), opacity: 0.85}}>{lang === "en" ? "GET A QUOTE" : "PEDE ORÇAMENTO"}</div>
          <h3 style={{fontFamily: "var(--font-display)", fontSize: 36, lineHeight: 1.05, margin: "8px 0 0", color: "var(--brah-cream)"}}>brah@ericeira.pt</h3>
        </div>
        <button style={{...btnDark, background: "var(--brah-black)"}}>{lang === "en" ? "send a message" : "envia uma mensagem"} →</button>
      </div>
    </section>
  );
}

Object.assign(window, { VicioSite });

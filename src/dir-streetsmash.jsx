// brah — Direction: STREET SMASH-leaning
// Poster / event energy. Sky + lavender + tomato. Stamps, stickers, rotations.
// Loud, raw, more "concert flyer" than restaurant page.

const { useState: useStateS } = React;

function StreetSite({ page, lang, onNav, onLang }) {
  return (
    <div style={{background: "var(--brah-cream)", color: "var(--brah-ink)", minHeight: "100vh"}}>
      <MetaBar variant="tomato" lang={lang} onLang={onLang}/>
      <StreetHeader page={page} onNav={onNav} lang={lang}/>
      <main>
        {page === "home"     && <StreetHome     lang={lang} onNav={onNav}/>}
        {page === "menu"     && <StreetMenu     lang={lang} onNav={onNav}/>}
        {page === "story"    && <StreetStory    lang={lang} onNav={onNav}/>}
        {page === "visit"    && <StreetVisit    lang={lang} onNav={onNav}/>}
        {page === "events"   && <StreetEvents   lang={lang} onNav={onNav}/>}
        {page === "gallery"  && <StreetGallery  lang={lang} onNav={onNav}/>}
        {page === "catering" && <StreetCatering lang={lang} onNav={onNav}/>}
      </main>
      <Marquee variant="tomato" items={["FOLLOW @brah.ericeira", "TURN IT UP", "BRAH × NADADOR · BRAH × KALOHA", "POP-UPS ALL SUMMER", "EVERYBODY NEEDS A BRAH"]} />
      <Reviews lang={lang} variant="hard" bg="var(--brah-cream-2)"/>
      <InstagramFeed lang={lang} variant="alt"/>
      <Footer lang={lang} variant="dark" onNav={onNav}/>
    </div>
  );
}

/* ─── Header — chunky, all-caps, with rotating sun ─── */
function StreetHeader({ page, onNav, lang }) {
  const items = ["home", "menu", "story", "events", "gallery", "catering", "visit"];
  return (
    <header style={{background: "var(--brah-cream)", borderBottom: "2px solid var(--brah-black)", position: "sticky", top: 0, zIndex: 30}}>
      <div style={{maxWidth: 1600, margin: "0 auto", padding: "0 24px", height: 80, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24}}>
        <div style={{display: "flex", alignItems: "center", gap: 14}}>
          <Sun size={36} color="var(--brah-stamp-red)" spin/>
          <Wordmark height={32} onClick={() => onNav("home")}/>
        </div>
        <nav style={{display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center"}}>
          {items.map(id => (
            <a key={id} onClick={() => onNav(id)} style={{
              cursor: "pointer", fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase",
              padding: "8px 12px",
              background: page === id ? "var(--brah-black)" : "transparent",
              color: page === id ? "var(--brah-cream)" : "var(--brah-black)",
              transition: "all var(--t-fast)",
              border: "1px solid transparent",
            }}>
              {window.BRAH.nav[id][lang]}
            </a>
          ))}
        </nav>
        <div style={{display: "flex", gap: 10, alignItems: "center"}}>
          <a href="#" onClick={e=>e.preventDefault()} style={socialDot}>IG</a>
          <a href="#" onClick={e=>e.preventDefault()} style={socialDot}>FB</a>
          <button onClick={() => onNav("menu")} style={btnStreet}>
            {lang === "en" ? "the menu" : "o menu"}
          </button>
        </div>
      </div>
    </header>
  );
}

const socialDot = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  width: 30, height: 30, border: "1.5px solid var(--brah-black)", borderRadius: "50%",
  fontSize: 10, fontWeight: 800, letterSpacing: "0.06em", textDecoration: "none", color: "var(--brah-black)",
  background: "var(--brah-cream)",
};
const btnStreet = {
  background: "var(--brah-tomato)", color: "var(--brah-cream)", border: "2px solid var(--brah-black)",
  padding: "10px 16px", fontFamily: "var(--font-body)", fontWeight: 800,
  fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase",
  cursor: "pointer", boxShadow: "3px 3px 0 var(--brah-black)",
};
const btnStreetGhost = {
  background: "var(--brah-cream)", color: "var(--brah-black)", border: "2px solid var(--brah-black)",
  padding: "10px 16px", fontFamily: "var(--font-body)", fontWeight: 800,
  fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase",
  cursor: "pointer", boxShadow: "3px 3px 0 var(--brah-black)",
};

/* ─── Home — poster hero ─── */
function StreetHome({ lang, onNav }) {
  const H = window.BRAH.hero;
  return (
    <>
      {/* POSTER HERO */}
      <section style={{background: "var(--brah-sky)", position: "relative", overflow: "hidden", borderBottom: "2px solid var(--brah-black)"}} className="grain">
        <div style={{position: "absolute", top: 32, right: 56, transform: "rotate(8deg)"}}>
          <Sun size={120} color="var(--brah-stamp-red)" spin/>
        </div>
        <div style={{maxWidth: 1320, margin: "0 auto", padding: "80px 32px 96px", position: "relative", zIndex: 2}}>
          {/* Stamp corners */}
          <div style={{position: "absolute", top: 32, left: 32, fontSize: 11, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase"}}>
            {lang === "en" ? "FROM ERICEIRA · WORLD SURFING RESERVE" : "DA ERICEIRA · RESERVA MUNDIAL DE SURF"}
          </div>

          <div style={{marginTop: 56, textAlign: "center"}}>
            <div style={{display: "inline-block", border: "2px solid var(--brah-black)", padding: "6px 14px", fontSize: 11, fontWeight: 800, letterSpacing: "0.24em", textTransform: "uppercase", background: "var(--brah-cream)", marginBottom: 24}}>
              EST. 2024 · ERICEIRA · PT
            </div>
            <h1 style={{fontFamily: "var(--font-display)", fontSize: "clamp(80px, 16vw, 260px)", lineHeight: 0.84, letterSpacing: "-0.04em", margin: 0, whiteSpace: "pre-line", color: "var(--brah-black)"}}>
              {H.headline[lang].toLowerCase()}
            </h1>
            <div style={{fontFamily: "var(--font-hand)", fontSize: 56, lineHeight: 1, marginTop: 28, color: "var(--brah-stamp-red)", transform: "rotate(-3deg)", display: "inline-block"}}>
              {lang === "en" ? "catch the wave — taste the smash." : "apanha a onda — prova o smash."}
            </div>
          </div>

          <div style={{marginTop: 56, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24}}>
            <div style={{display: "flex", gap: 14, flexWrap: "wrap"}}>
              <button onClick={() => onNav("menu")} style={btnStreet}>{lang === "en" ? "the menu" : "o menu"}</button>
              <button onClick={() => onNav("events")} style={btnStreetGhost}>{lang === "en" ? "upcoming pop-ups" : "próximos pop-ups"}</button>
            </div>
            <div style={{display: "flex", gap: 24, alignItems: "center"}}>
              <Stamp label={lang === "en" ? "OPEN EVERYDAY" : "ABERTO TODOS OS DIAS"}/>
              <Stamp label="10:00 — 23:30"/>
            </div>
          </div>
        </div>
        {/* corner photo paste */}
        <div style={{position: "absolute", bottom: -16, left: -10, width: 260, transform: "rotate(-6deg)", border: "4px solid var(--brah-cream)", boxShadow: "var(--shadow-sticker)"}}>
          <img src="assets/product-cheese-handoff.png" alt="" style={{width: "100%", display: "block"}}/>
        </div>
      </section>

      {/* COLLECTION strip */}
      <StreetCollection lang={lang} onNav={onNav}/>

      {/* Events teaser */}
      <section style={{background: "var(--brah-black)", color: "var(--brah-cream)", padding: "96px 32px", position: "relative", overflow: "hidden"}}>
        <div style={{maxWidth: 1320, margin: "0 auto", position: "relative", zIndex: 2}}>
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 24}}>
            <div>
              <div style={{...overStyle("var(--brah-tomato)")}}>{window.BRAH.events.over[lang]}</div>
              <h2 style={{fontFamily: "var(--font-display)", fontSize: "clamp(48px, 7vw, 112px)", lineHeight: 0.95, letterSpacing: "-0.03em", margin: "12px 0 0", color: "var(--brah-cream)", maxWidth: 1000}}>
                {window.BRAH.events.h2[lang]}
              </h2>
            </div>
            <button onClick={() => onNav("events")} style={{...btnStreet, background: "var(--brah-tomato)", borderColor: "var(--brah-cream)", boxShadow: "3px 3px 0 var(--brah-tomato)"}}>{lang === "en" ? "all events" : "todos os eventos"} →</button>
          </div>
          <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16}}>
            {window.BRAH.events.items.slice(0, 3).map((ev, i) => <StreetEventTile key={i} ev={ev} lang={lang} dark/>)}
          </div>
        </div>
      </section>
    </>
  );
}

function Stamp({ label, color = "var(--brah-stamp-red)", bg = "var(--brah-cream)" }) {
  return (
    <span style={{display: "inline-block", border: `2px solid ${color}`, color, padding: "5px 10px", fontSize: 10, fontWeight: 800, letterSpacing: "0.24em", textTransform: "uppercase", background: bg}}>
      {label}
    </span>
  );
}

/* ─── Street collection — 2x2 poster cards with stamps ─── */
function StreetCollection({ lang, onNav }) {
  const products = window.BRAH.products;
  return (
    <section style={{padding: "96px 32px", maxWidth: 1320, margin: "0 auto"}}>
      <div style={{textAlign: "center", marginBottom: 48}}>
        <Stamp label={lang === "en" ? "THE BRAH COLLECTION" : "A COLEÇÃO BRAH"}/>
        <h2 style={{fontFamily: "var(--font-display)", fontSize: "clamp(48px, 6.5vw, 104px)", lineHeight: 0.95, letterSpacing: "-0.03em", margin: "20px 0 0"}}>
          {lang === "en" ? <>Four burgers. <em style={{color: "var(--brah-stamp-red)"}}>Zero compromises.</em></> : <>Quatro hambúrgueres. <em style={{color: "var(--brah-stamp-red)"}}>Zero compromissos.</em></>}
        </h2>
      </div>
      <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24}}>
        {products.map((p, i) => (
          <article key={p.id} style={{
            background: i % 2 === 0 ? "var(--brah-cream-2)" : "var(--brah-lavender)",
            border: "2px solid var(--brah-black)",
            padding: 28,
            position: "relative",
            boxShadow: "6px 6px 0 var(--brah-black)",
          }}>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16}}>
              <Stamp label={p.tag[lang]}/>
              <span style={{fontFamily: "var(--font-display)", fontSize: 22, color: "var(--brah-ink-soft)"}}>0{i+1}/04</span>
            </div>
            <div style={{display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 20, alignItems: "center"}}>
              <div>
                <h3 style={{fontFamily: "var(--font-display)", fontSize: "clamp(40px, 4.5vw, 68px)", lineHeight: 0.95, letterSpacing: "-0.02em", margin: 0}}>{p.name}</h3>
                <p style={{marginTop: 12, fontSize: 14, lineHeight: 1.5, color: "var(--brah-ink-soft)"}}>{p.ing[lang]}</p>
              </div>
              <div style={{aspectRatio: "1/1", overflow: "hidden", border: "2px solid var(--brah-black)"}}>
                <img src={p.img} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}}/>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ─── Event tile ─── */
function StreetEventTile({ ev, lang, dark, onClick }) {
  const isDark = !!dark;
  return (
    <article onClick={onClick} style={{
      background: isDark ? "var(--brah-cream)" : "var(--brah-cream)",
      color: "var(--brah-black)",
      border: "2px solid var(--brah-black)",
      boxShadow: isDark ? "6px 6px 0 var(--brah-tomato)" : "6px 6px 0 var(--brah-black)",
      overflow: "hidden",
      cursor: onClick ? "pointer" : "default",
      transition: "transform var(--t-base) var(--ease-out)",
      display: "flex", flexDirection: "column",
    }}
    onMouseEnter={e => onClick && (e.currentTarget.style.transform = "translate(-2px,-2px)")}
    onMouseLeave={e => onClick && (e.currentTarget.style.transform = "translate(0,0)")}
    >
      <div style={{aspectRatio: "5/4", overflow: "hidden", borderBottom: "2px solid var(--brah-black)", position: "relative"}}>
        <img src={ev.img} alt="" style={{width: "100%", height: "100%", objectFit: "cover", filter: "contrast(1.05) saturate(1.1)"}}/>
        <div style={{position: "absolute", top: 12, left: 12, background: "var(--brah-tomato)", color: "var(--brah-cream)", padding: "5px 10px", fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", border: "2px solid var(--brah-black)"}}>
          {ev.date[lang]}
        </div>
      </div>
      <div style={{padding: 20}}>
        <h3 style={{fontFamily: "var(--font-display)", fontSize: 32, lineHeight: 0.95, letterSpacing: "-0.02em", margin: 0}}>{ev.title}</h3>
        <div style={{marginTop: 8, fontSize: 13, color: "var(--brah-ink-soft)"}}>{ev.where[lang]}</div>
      </div>
    </article>
  );
}

/* ─── Menu page (Street version: more poster-y) ─── */
function StreetMenu({ lang }) {
  const products = window.BRAH.products;
  return (
    <>
      <section style={{padding: "80px 32px 0", maxWidth: 1320, margin: "0 auto", textAlign: "center"}}>
        <Stamp label={lang === "en" ? "MENU · NO PRICES · NO LIES" : "MENU · SEM PREÇOS · SEM ROMANCE"}/>
        <h1 style={{fontFamily: "var(--font-display)", fontSize: "clamp(64px, 10vw, 184px)", lineHeight: 0.88, letterSpacing: "-0.035em", margin: "20px 0 0"}}>
          {lang === "en" ? "the menu." : "o menu."}
        </h1>
        <p style={{fontFamily: "var(--font-hand)", fontSize: 36, color: "var(--brah-stamp-red)", marginTop: 16, transform: "rotate(-2deg)", display: "inline-block"}}>
          {lang === "en" ? "ask in store. we'll tell you." : "pergunta na loja. nós dizemos."}
        </p>
      </section>

      <section style={{padding: "64px 32px 96px", maxWidth: 1320, margin: "0 auto"}}>
        <div style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18}}>
          {products.map((p, i) => (
            <article key={p.id} style={{
              background: ["var(--brah-cream-2)", "var(--brah-lavender)", "var(--brah-pale-yellow)", "var(--brah-peach)"][i],
              border: "2px solid var(--brah-black)",
              overflow: "hidden",
              boxShadow: "5px 5px 0 var(--brah-black)",
            }}>
              <div style={{aspectRatio: "1/1", overflow: "hidden", borderBottom: "2px solid var(--brah-black)", position: "relative"}}>
                <img src={p.img} alt="" style={{width: "100%", height: "100%", objectFit: "cover"}}/>
                <div style={{position: "absolute", top: 10, left: 10}}>
                  <Stamp label={p.tag[lang]}/>
                </div>
              </div>
              <div style={{padding: 18}}>
                <h3 style={{fontFamily: "var(--font-display)", fontSize: 30, lineHeight: 0.95, letterSpacing: "-0.02em", margin: 0}}>{p.name}</h3>
                <p style={{marginTop: 10, fontSize: 13, color: "var(--brah-ink-soft)", lineHeight: 1.45}}>{p.ing[lang]}</p>
              </div>
            </article>
          ))}
        </div>

        <div style={{marginTop: 80, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32}}>
          <StreetListCard title={lang === "en" ? "SIDES" : "ACOMPANHAMENTOS"} items={window.BRAH.sides} lang={lang} bg="var(--brah-sky)"/>
          <StreetListCard title={lang === "en" ? "DRINKS" : "BEBIDAS"} items={window.BRAH.drinks} lang={lang} bg="var(--brah-pale-yellow)"/>
        </div>
      </section>
    </>
  );
}

function StreetListCard({ title, items, lang, bg }) {
  return (
    <div style={{background: bg, border: "2px solid var(--brah-black)", padding: 28, boxShadow: "5px 5px 0 var(--brah-black)"}}>
      <h3 style={{fontFamily: "var(--font-display)", fontSize: 48, lineHeight: 0.95, letterSpacing: "-0.02em", margin: "0 0 16px", textTransform: "lowercase"}}>{title.toLowerCase()}</h3>
      <ul style={{listStyle: "none", padding: 0, margin: 0}}>
        {items.map((it, i) => (
          <li key={i} style={{padding: "12px 0", borderTop: "1.5px dashed var(--brah-black)", display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 14}}>
            <span style={{fontWeight: 700, fontSize: 15}}>{it.name}</span>
            <span style={{fontSize: 12, fontStyle: "italic", color: "var(--brah-ink-soft)", textAlign: "right"}}>{it.note[lang]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Story (Street) ─── */
function StreetStory({ lang }) {
  const S = window.BRAH.story;
  return (
    <section style={{padding: "80px 32px 120px", maxWidth: 1320, margin: "0 auto"}}>
      <div style={{textAlign: "center", marginBottom: 56}}>
        <Stamp label={S.over[lang]}/>
        <h1 style={{fontFamily: "var(--font-display)", fontSize: "clamp(56px, 9vw, 160px)", lineHeight: 0.88, letterSpacing: "-0.035em", margin: "20px 0 0", fontStyle: "italic"}}>
          {S.quote[lang]}
        </h1>
      </div>
      <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, alignItems: "start"}}>
        <div style={{transform: "rotate(-2deg)"}}>
          <img src="assets/lifestyle-storefront.jpg" alt="" style={{width: "100%", border: "4px solid var(--brah-cream)", boxShadow: "var(--shadow-sticker)"}}/>
        </div>
        <div style={{padding: "16px 8px", fontSize: 18, lineHeight: 1.6}}>
          <p style={{marginTop: 0}}>{S.body[lang]}</p>
          <p style={{marginTop: 16, fontFamily: "var(--font-hand)", fontSize: 30, lineHeight: 1.1, transform: "rotate(-2deg)", color: "var(--brah-stamp-red)"}}>
            {lang === "en" ? "Sometimes all you need is a Brah!" : "Às vezes só precisas de um Brah!"}
          </p>
        </div>
        <div style={{transform: "rotate(3deg)", marginTop: 32}}>
          <img src="assets/product-bag.jpg" alt="" style={{width: "100%", border: "4px solid var(--brah-cream)", boxShadow: "var(--shadow-sticker)"}}/>
        </div>
      </div>
    </section>
  );
}

/* ─── Visit (Street) ─── */
function StreetVisit({ lang }) {
  const V = window.BRAH.visit;
  return (
    <section style={{padding: "80px 32px 120px", maxWidth: 1320, margin: "0 auto"}}>
      <div style={{textAlign: "center", marginBottom: 48}}>
        <Stamp label={V.over[lang]}/>
        <h1 style={{fontFamily: "var(--font-display)", fontSize: "clamp(56px, 9vw, 144px)", lineHeight: 0.9, letterSpacing: "-0.035em", margin: "20px 0 0"}}>
          {lang === "en" ? "find us in Ericeira." : "encontra-nos na Ericeira."}
        </h1>
      </div>
      <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56}}>
        <div style={{background: "var(--brah-cream-2)", border: "2px solid var(--brah-black)", padding: 32, boxShadow: "6px 6px 0 var(--brah-black)"}}>
          <h2 style={{fontFamily: "var(--font-display)", fontSize: 48, lineHeight: 0.95, margin: "0 0 16px"}}>Rua dos Ferreiros, 3A.</h2>
          <div style={{fontSize: 15, lineHeight: 1.6}}>2655-279 Ericeira, Portugal</div>
          <table style={{borderCollapse: "collapse", width: "100%", marginTop: 24}}>
            <tbody>
              {window.BRAH.brand.hours.map((h, i) => (
                <tr key={i} style={{borderTop: "1.5px dashed var(--brah-black)"}}>
                  <td style={{padding: "12px 0", fontWeight: 700, fontSize: 14}}>{h.d[lang]}</td>
                  <td style={{padding: "12px 0", textAlign: "right", fontFamily: "ui-monospace, SF Mono, Menlo, monospace", fontSize: 14}}>{h.h}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap"}}>
            <button style={btnStreet}>{V.cta1[lang]} →</button>
            <button style={btnStreetGhost}>{V.cta2[lang]}</button>
          </div>
        </div>
        <FauxMap/>
      </div>
    </section>
  );
}

/* ─── Events (Street) — the centerpiece ─── */
function StreetEvents({ lang, onNav }) {
  const E = window.BRAH.events;
  return (
    <>
      <section style={{background: "var(--brah-indigo)", color: "var(--brah-cream)", padding: "96px 32px", borderBottom: "2px solid var(--brah-black)", position: "relative", overflow: "hidden"}} className="grain">
        <div style={{position: "absolute", top: -40, right: -40, transform: "rotate(15deg)"}}>
          <Sun size={220} color="var(--brah-tomato)" spin/>
        </div>
        <div style={{maxWidth: 1320, margin: "0 auto", position: "relative", zIndex: 2}}>
          <Stamp label={E.over[lang]} color="var(--brah-cream)" bg="transparent"/>
          <h1 style={{fontFamily: "var(--font-display)", fontSize: "clamp(64px, 10vw, 184px)", lineHeight: 0.88, letterSpacing: "-0.035em", margin: "20px 0 0", color: "var(--brah-cream)", maxWidth: 1100}}>
            {E.h2[lang]}
          </h1>
          <p style={{fontFamily: "var(--font-hand)", fontSize: 36, color: "var(--brah-tomato)", marginTop: 16, transform: "rotate(-2deg)", display: "inline-block"}}>
            {lang === "en" ? "pop-ups · surf comps · beach parties" : "pop-ups · provas de surf · festas de praia"}
          </p>
        </div>
      </section>
      <section style={{padding: "64px 32px 120px", maxWidth: 1320, margin: "0 auto"}}>
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32}}>
          {E.items.map((ev, i) => <StreetEventTile key={i} ev={ev} lang={lang}/>)}
        </div>
        <div style={{marginTop: 80, padding: "32px", background: "var(--brah-tomato)", color: "var(--brah-cream)", border: "2px solid var(--brah-black)", boxShadow: "6px 6px 0 var(--brah-black)", textAlign: "center"}}>
          <div style={{...overStyle("var(--brah-cream)"), opacity: 0.9}}>{lang === "en" ? "WANT A POP-UP WITH US?" : "QUERES FAZER UM POP-UP CONNOSCO?"}</div>
          <h3 style={{fontFamily: "var(--font-display)", fontSize: 48, lineHeight: 1, margin: "12px 0 16px", color: "var(--brah-cream)"}}>{lang === "en" ? "Let's smash together." : "Vamos smashar juntos."}</h3>
          <button onClick={() => onNav("catering")} style={{...btnStreet, background: "var(--brah-black)", color: "var(--brah-cream)", borderColor: "var(--brah-cream)"}}>{lang === "en" ? "get in touch" : "fala connosco"} →</button>
        </div>
      </section>
    </>
  );
}

/* ─── Gallery (Street) — collage ─── */
function StreetGallery({ lang }) {
  const G = window.BRAH.gallery;
  return (
    <section style={{padding: "80px 32px 120px", maxWidth: 1600, margin: "0 auto"}}>
      <div style={{textAlign: "center", marginBottom: 48}}>
        <Stamp label={G.over[lang]}/>
        <h1 style={{fontFamily: "var(--font-display)", fontSize: "clamp(56px, 9vw, 144px)", lineHeight: 0.9, letterSpacing: "-0.035em", margin: "20px 0 0"}}>
          {G.h2[lang]}
        </h1>
      </div>
      <div style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16}}>
        {G.images.map((src, i) => (
          <div key={i} style={{transform: `rotate(${[-2,1,-1,2,-1.5,1.5,-2,2,-1,1,-2,1.5][i % 12]}deg)`, transition: "transform var(--t-base)", border: "4px solid var(--brah-cream)", boxShadow: "var(--shadow-sticker)"}}
               onMouseEnter={e=>e.currentTarget.style.transform="rotate(0) scale(1.03)"}
               onMouseLeave={e=>e.currentTarget.style.transform=`rotate(${[-2,1,-1,2,-1.5,1.5,-2,2,-1,1,-2,1.5][i % 12]}deg) scale(1)`}>
            <img src={src} alt="" style={{width: "100%", aspectRatio: "1/1", objectFit: "cover", display: "block"}}/>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Catering (Street) ─── */
function StreetCatering({ lang }) {
  const C = window.BRAH.catering;
  return (
    <section style={{padding: "80px 32px 120px", maxWidth: 1320, margin: "0 auto"}}>
      <div style={{textAlign: "center", marginBottom: 48}}>
        <Stamp label={C.over[lang]}/>
        <h1 style={{fontFamily: "var(--font-display)", fontSize: "clamp(56px, 8vw, 144px)", lineHeight: 0.9, letterSpacing: "-0.035em", margin: "20px 0 0"}}>
          {C.h2[lang]}
        </h1>
        <div style={{fontFamily: "var(--font-hand)", fontSize: 30, color: "var(--brah-stamp-red)", marginTop: 12, transform: "rotate(-2deg)", display: "inline-block"}}>{C.sub[lang]}</div>
      </div>
      <p style={{fontSize: 18, lineHeight: 1.6, color: "var(--brah-ink-soft)", maxWidth: 760, margin: "0 auto"}}>{C.body[lang]}</p>
      <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 56}}>
        {C.options.map((o, i) => (
          <div key={i} style={{background: ["var(--brah-pale-yellow)","var(--brah-peach)","var(--brah-lavender)"][i], border: "2px solid var(--brah-black)", padding: 24, boxShadow: "5px 5px 0 var(--brah-black)"}}>
            <Stamp label={"0" + (i+1)}/>
            <h3 style={{fontFamily: "var(--font-display)", fontSize: 32, lineHeight: 1, margin: "14px 0 8px"}}>{o.title[lang]}</h3>
            <div style={{fontWeight: 800, fontSize: 14}}>{o.n[lang]}</div>
            <div style={{marginTop: 8, fontSize: 14, color: "var(--brah-ink-soft)"}}>{o.note[lang]}</div>
          </div>
        ))}
      </div>
      <div style={{marginTop: 56, padding: 32, background: "var(--brah-black)", color: "var(--brah-cream)", textAlign: "center"}}>
        <div style={{...overStyle("var(--brah-tomato)")}}>{lang === "en" ? "BOOK IT" : "RESERVA"}</div>
        <h3 style={{fontFamily: "var(--font-display)", fontSize: 48, margin: "8px 0 16px", color: "var(--brah-cream)"}}>brah@ericeira.pt</h3>
        <button style={{...btnStreet, background: "var(--brah-tomato)"}}>{lang === "en" ? "send a message" : "envia mensagem"} →</button>
      </div>
    </section>
  );
}

Object.assign(window, { StreetSite });

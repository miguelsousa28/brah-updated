// brah — Direction: BLEND
// Vício clean base + Street Smash accents (stamps, handwritten notes,
// hard-shadow cards, rotated gallery). Events page = full Street Smash mode.
// Recommended hybrid.

const { useState: useStateB } = React;

function BlendSite({ page, lang, onNav, onLang }) {
  return (
    <div style={{background: "var(--brah-cream)", color: "var(--brah-ink)", minHeight: "100vh"}}>
      <MetaBar variant="tomato" lang={lang} onLang={onLang}/>
      <BlendHeader page={page} onNav={onNav} lang={lang}/>
      <main>
        {page === "home"     && <BlendHome     lang={lang} onNav={onNav}/>}
        {page === "menu"     && <BlendMenu     lang={lang} onNav={onNav}/>}
        {page === "story"    && <BlendStory    lang={lang} onNav={onNav}/>}
        {page === "visit"    && <BlendVisit    lang={lang} onNav={onNav}/>}
        {page === "events"   && <BlendEvents   lang={lang} onNav={onNav}/>}
        {page === "gallery"  && <BlendGallery  lang={lang} onNav={onNav}/>}
        {page === "catering" && <BlendCatering lang={lang} onNav={onNav}/>}
      </main>
      {page !== "events" && <Reviews lang={lang} variant="hard" bg="var(--brah-cream-2)"/>}
      <InstagramFeed lang={lang} variant="cream"/>
      <Footer lang={lang} variant="dark" onNav={onNav}/>
    </div>
  );
}

/* ─── Header — desktop nav + mobile hamburger (DOM toggle, sem React state) ─── */
function BlendHeader({ page, onNav, lang }) {
  const items = ["home", "menu", "story", "events", "gallery", "catering", "visit"];

  const toggleMenu = () => {
    const nav = document.getElementById("brah-mobile-nav");
    const bars = document.querySelectorAll(".brah-bar");
    if (!nav) return;
    const isOpen = nav.style.display === "block";
    nav.style.display = isOpen ? "none" : "block";
    if (bars[0]) bars[0].style.transform = isOpen ? "none" : "rotate(45deg) translate(5px,5px)";
    if (bars[1]) bars[1].style.opacity = isOpen ? "1" : "0";
    if (bars[2]) bars[2].style.transform = isOpen ? "none" : "rotate(-45deg) translate(5px,-5px)";
  };

  const go = (id) => {
    onNav(id);
    const nav = document.getElementById("brah-mobile-nav");
    const bars = document.querySelectorAll(".brah-bar");
    if (nav) nav.style.display = "none";
    if (bars[0]) bars[0].style.transform = "none";
    if (bars[1]) bars[1].style.opacity = "1";
    if (bars[2]) bars[2].style.transform = "none";
  };

  return (
    <header style={{background: "var(--brah-cream)", borderBottom: "1px solid var(--brah-ink)", position: "sticky", top: 0, zIndex: 30}}>
      <div style={{maxWidth: 1600, margin: "0 auto", padding: "0 24px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24}}>
        <div style={{display: "flex", alignItems: "center", gap: 12}}>
          <Sun size={28} color="var(--brah-stamp-red)" spin/>
          <Wordmark height={32} onClick={() => go("home")}/>
        </div>
        <nav className="brah-desktop-nav" style={{display: "flex", gap: 26, flexWrap: "wrap", justifyContent: "center"}}>
          {items.map(id => (
            <a key={id} onClick={() => go(id)} style={{
              cursor: "pointer", fontSize: 13, fontWeight: 600, textTransform: "lowercase",
              color: page === id ? "var(--brah-stamp-red)" : "var(--brah-ink)",
              borderBottom: page === id ? "2px solid var(--brah-stamp-red)" : "2px solid transparent",
              paddingBottom: 2, transition: "color var(--t-fast)",
            }}>{window.BRAH.nav[id][lang]}</a>
          ))}
        </nav>
        <div style={{display: "flex", gap: 10, alignItems: "center"}}>
          <button onClick={() => go("menu")} className="brah-desktop-nav" style={btnB}>{lang === "en" ? "the menu" : "o menu"} →</button>
          <button onClick={toggleMenu} className="brah-mobile-burger" aria-label="menu" style={{background:"none",border:"none",cursor:"pointer",padding:8,flexDirection:"column",gap:5}}>
            <span className="brah-bar" style={{display:"block",width:24,height:2,background:"var(--brah-ink)",transition:"all .25s"}}/>
            <span className="brah-bar" style={{display:"block",width:24,height:2,background:"var(--brah-ink)",transition:"all .25s"}}/>
            <span className="brah-bar" style={{display:"block",width:24,height:2,background:"var(--brah-ink)",transition:"all .25s"}}/>
          </button>
        </div>
      </div>
      <div id="brah-mobile-nav" style={{display:"none",background:"var(--brah-cream)",borderTop:"1px solid var(--brah-line)",padding:"12px 24px 24px"}}>
        {items.map(id => (
          <a key={id} onClick={() => go(id)} style={{display:"block",padding:"12px 0",fontSize:17,fontWeight:700,textTransform:"lowercase",cursor:"pointer",color:page===id?"var(--brah-stamp-red)":"var(--brah-ink)",borderBottom:"1px solid var(--brah-line)"}}>
            {window.BRAH.nav[id][lang]}
          </a>
        ))}
        <a href={window.BRAH.brand.ubereats} target="_blank" rel="noreferrer" style={{...btnB,display:"inline-flex",marginTop:18,textDecoration:"none"}}>
          {lang === "en" ? "order on uber eats" : "pede no uber eats"} →
        </a>
      </div>
    </header>
  );
}

const btnB = {
  background: "var(--brah-tomato)", color: "var(--brah-cream)", border: "2px solid var(--brah-black)",
  padding: "10px 16px", fontFamily: "var(--font-body)", fontWeight: 800,
  fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase",
  cursor: "pointer", boxShadow: "3px 3px 0 var(--brah-black)",
  transition: "all var(--t-base) var(--ease-out)",
};
const btnBghost = {
  background: "var(--brah-cream)", color: "var(--brah-black)", border: "2px solid var(--brah-black)",
  padding: "10px 16px", fontFamily: "var(--font-body)", fontWeight: 800,
  fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase",
  cursor: "pointer", boxShadow: "3px 3px 0 var(--brah-black)",
};
const overB = {fontSize: 11, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase"};
function StampB({ label, color = "var(--brah-stamp-red)", bg = "var(--brah-cream)" }) {
  return <span style={{display: "inline-block", border: `2px solid ${color}`, color, padding: "5px 10px", fontSize: 10, fontWeight: 800, letterSpacing: "0.24em", textTransform: "uppercase", background: bg}}>{label}</span>;
}

/* ─── Home ─── */
function BlendHome({ lang, onNav }) {
  const H = window.BRAH.hero;
  return (
    <>
      {/* HERO — clean split with sticker overlay */}
      <section style={{padding: "64px 24px 96px", maxWidth: 1600, margin: "0 auto", position: "relative"}}>
        <div style={{display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 64, alignItems: "center", minHeight: 580}}>
          <div>
            <div style={{...overB, color: "var(--brah-stamp-red)", marginBottom: 16}}>{H.tag[lang]}</div>
            <h1 style={{fontFamily: "var(--font-display)", fontSize: "clamp(72px, 11vw, 184px)", lineHeight: 0.86, letterSpacing: "-0.035em", margin: 0, whiteSpace: "pre-line"}}>
              {H.headline[lang]}
            </h1>
            <HandNote color="tomato" rotate={-3} size={36} style={{marginTop: 28}}>
              {H.sub[lang]}
            </HandNote>
            <div style={{display: "flex", gap: 14, marginTop: 36, flexWrap: "wrap"}}>
              <button onClick={() => onNav("menu")} style={btnB}>{lang === "en" ? "the menu" : "o menu"} →</button>
              <button onClick={() => onNav("visit")} style={btnBghost}>{lang === "en" ? "find us" : "encontra-nos"}</button>
            </div>
          </div>
          <div style={{position: "relative"}}>
            <HardCard offset={8} style={{padding: 0, overflow: "hidden"}}>
              <img src="assets/product-cheese-handoff.png" alt="" style={{width: "100%", aspectRatio: "4/5", objectFit: "cover", display: "block"}}/>
            </HardCard>
            <div style={{position: "absolute", right: -20, bottom: 40, transform: "rotate(-6deg)"}}>
              <StampB label={lang === "en" ? "OPEN 10:00 — 23:30" : "ABERTO 10:00 — 23:30"}/>
            </div>
          </div>
        </div>
      </section>

      <Marquee variant="tomato" items={["EVERYBODY NEEDS A BRAH", "CATCH THE WAVE — TASTE THE SMASH", "OPEN EVERYDAY 10:00 — 23:30", "FROM ERICEIRA · PORTUGAL"]} />

      {/* COLLECTION — Vício list + hard-shadow product card */}
      <BlendCollection lang={lang} onNav={onNav}/>

      {/* STORY PREVIEW */}
      <section style={{padding: "120px 32px", maxWidth: 1320, margin: "0 auto"}}>
        <div style={{display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 80, alignItems: "center"}}>
          <div>
            <div style={{...overB, color: "var(--brah-stamp-red)"}}>{window.BRAH.story.over[lang]}</div>
            <h2 style={{fontFamily: "var(--font-display)", fontSize: "clamp(40px, 5.5vw, 88px)", lineHeight: 0.96, letterSpacing: "-0.02em", margin: "16px 0 24px", fontStyle: "italic"}}>
              {window.BRAH.story.quote[lang]}
            </h2>
            <p style={{fontSize: 18, lineHeight: 1.5, color: "var(--brah-ink-soft)", maxWidth: 540}}>
              {window.BRAH.story.body[lang]}
            </p>
            <button onClick={() => onNav("story")} style={{...btnB, marginTop: 32}}>{lang === "en" ? "our story" : "a nossa história"} →</button>
          </div>
          <div style={{position: "relative"}}>
            <HardCard offset={6} style={{padding: 0, overflow: "hidden"}}>
              <img src="assets/product-bag.jpg" alt="" style={{width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block"}}/>
            </HardCard>
            <div style={{position: "absolute", bottom: -16, right: 24}}>
              <HandNote color="indigo" rotate={4} size={32}>
                {lang === "en" ? "Sometimes all\nyou need is a Brah!" : "Às vezes só\nprecisas de um Brah!"}
              </HandNote>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── Collection — list left + hard-shadow product card right ─── */
function BlendCollection({ lang, onNav }) {
  const products = window.BRAH.products;
  const [active, setActive] = useStateB(0);
  return (
    <section style={{background: "var(--brah-cream-2)", padding: "120px 0", borderTop: "1px solid var(--brah-ink)", borderBottom: "1px solid var(--brah-ink)"}}>
      <div style={{maxWidth: 1600, margin: "0 auto", padding: "0 32px"}}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 16}}>
          <div>
            <StampB label={lang === "en" ? "THE BRAH COLLECTION" : "A COLEÇÃO BRAH"}/>
            <h2 style={{fontFamily: "var(--font-display)", fontSize: "clamp(40px, 5vw, 80px)", lineHeight: 0.95, letterSpacing: "-0.02em", margin: "16px 0 0", maxWidth: 800}}>
              {lang === "en" ? <>Smashed thin. <em>Made to be eaten standing up.</em></> : <>Smashed fino. <em>Para comer de pé.</em></>}
            </h2>
          </div>
          <button onClick={() => onNav("menu")} style={btnB}>{lang === "en" ? "full menu" : "ver tudo"} →</button>
        </div>

        <div style={{display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 56, alignItems: "stretch"}}>
          <ul style={{listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid var(--brah-ink)"}}>
            {products.map((p, i) => (
              <li key={p.id}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => window.open(p.ubereats || window.BRAH.brand.ubereats, "_blank")}
                  style={{
                    borderBottom: "1px solid var(--brah-ink)",
                    padding: "28px 0",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: 24,
                    paddingLeft: active === i ? 18 : 0,
                    transition: "padding var(--t-base) var(--ease-out)",
                  }}>
                <div style={{display: "flex", alignItems: "baseline", gap: 24, flex: 1, minWidth: 0}}>
                  <span style={{fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 700, color: "var(--brah-ink-soft)", width: 32}}>0{i+1}</span>
                  <span style={{fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4.5vw, 64px)", lineHeight: 0.95, letterSpacing: "-0.02em", fontStyle: active === i ? "italic" : "normal", color: active === i ? "var(--brah-stamp-red)" : "var(--brah-ink)", transition: "color var(--t-base), font-style var(--t-base)"}}>
                    {p.name}
                  </span>
                </div>
                <StampB label={p.tag[lang]}/>
              </li>
            ))}
          </ul>
          <HardCard offset={6} style={{position: "relative", aspectRatio: "4/5", overflow: "hidden", padding: 0}}>
            {products.map((p, i) => (
              <img key={p.id} src={p.img} alt=""
                style={{
                  position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
                  opacity: active === i ? 1 : 0,
                  transform: active === i ? "scale(1)" : "scale(1.04)",
                  transition: "opacity var(--t-slow) var(--ease-out), transform var(--t-slow) var(--ease-out)",
                }}/>
            ))}
            <div style={{position: "absolute", bottom: 16, left: 16, right: 16, background: "var(--brah-cream)", border: "2px solid var(--brah-black)", padding: "12px 14px"}}>
              <div style={{...overB, fontSize: 10, color: "var(--brah-stamp-red)"}}>{products[active].tag[lang]}</div>
              <div style={{fontFamily: "var(--font-display)", fontSize: 26, lineHeight: 1, marginTop: 4}}>{products[active].name}</div>
              <div style={{marginTop: 6, fontSize: 13, color: "var(--brah-ink-soft)", lineHeight: 1.4}}>{products[active].ing[lang]}</div>
            </div>
          </HardCard>
        </div>
      </div>
    </section>
  );
}

/* ─── Menu — CINEMATIC: alternating full-bleed products, hard-shadow figure tag ─── */
function BlendMenu({ lang, onNav }) {
  const products = window.BRAH.products;
  return (
    <>
      <section style={{padding: "96px 32px 56px", maxWidth: 1320, margin: "0 auto", textAlign: "center"}}>
        <StampB label={lang === "en" ? "THE MENU · NO PRICES" : "O MENU · SEM PREÇOS"}/>
        <h1 style={{fontFamily: "var(--font-display)", fontSize: "clamp(64px, 10vw, 184px)", lineHeight: 0.88, letterSpacing: "-0.035em", margin: "20px 0 12px"}}>
          {lang === "en" ? "The menu." : "O menu."}
        </h1>
        <HandNote color="tomato" rotate={-2} size={32}>
          {lang === "en" ? "Four burgers. Pick yours." : "Quatro hambúrgueres. Escolhe o teu."}
        </HandNote>
      </section>

      <section style={{padding: "32px 0 96px"}}>
        {products.map((p, i) => (
          <div key={p.id} style={{padding: "64px 32px", borderTop: "1px solid var(--brah-ink)"}}>
            <div style={{maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center"}}>
              <div style={{order: i % 2 === 0 ? 1 : 2, position: "relative"}}>
                <HardCard offset={8} style={{padding: 0, overflow: "hidden"}}>
                  <img src={p.img} alt="" style={{width: "100%", aspectRatio: "1/1", objectFit: "cover", display: "block"}}/>
                </HardCard>
                <div style={{position: "absolute", top: -14, [i % 2 === 0 ? "left" : "right"]: -14, transform: `rotate(${i % 2 === 0 ? -4 : 4}deg)`}}>
                  <StampB label={`FIG. 0${i+1} / 04`}/>
                </div>
              </div>
              <div style={{order: i % 2 === 0 ? 2 : 1}}>
                <div style={{...overB, color: "var(--brah-stamp-red)", marginBottom: 12}}>{p.tag[lang]}</div>
                <h2 style={{fontFamily: "var(--font-display)", fontSize: "clamp(48px, 7vw, 112px)", lineHeight: 0.92, letterSpacing: "-0.03em", margin: 0}}>{p.name}</h2>
                <p style={{marginTop: 24, fontSize: 18, lineHeight: 1.65, color: "var(--brah-ink-soft)", maxWidth: 500}}>{p.ing[lang]}</p>
                {i === 0 && <HandNote color="tomato" rotate={-3} size={26} style={{marginTop: 18}}>{lang === "en" ? "the original. start here." : "o original. começa por aqui."}</HandNote>}
                {i === 1 && <HandNote color="indigo" rotate={2} size={26} style={{marginTop: 18}}>{lang === "en" ? "what everyone orders." : "o que toda a gente pede."}</HandNote>}
                {i === 3 && <HandNote color="yellow" rotate={-2} size={26} style={{marginTop: 18}}>{lang === "en" ? "100% plant. 100% smash." : "100% vegetal. 100% smash."}</HandNote>}
                <a href={p.ubereats} target="_blank" rel="noreferrer" style={{...btnB, display: "inline-flex", marginTop: 28, textDecoration: "none"}}>
                  {lang === "en" ? "order this one" : "pedir este"} →
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section style={{padding: "0 32px 96px", maxWidth: 1320, margin: "0 auto"}}>
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32}}>
          <BlendListCard title={lang === "en" ? "Sides" : "Acompanhamentos"} items={window.BRAH.sides} lang={lang} bg="var(--brah-pale-yellow)"/>
          <BlendListCard title={lang === "en" ? "Drinks" : "Bebidas"} items={window.BRAH.drinks} lang={lang} bg="var(--brah-lavender)"/>
        </div>
      </section>
    </>
  );
}

function BlendListCard({ title, items, lang, bg }) {
  return (
    <HardCard offset={5} bg={bg} style={{padding: 28}}>
      <h3 style={{fontFamily: "var(--font-display)", fontSize: 44, lineHeight: 0.95, letterSpacing: "-0.02em", margin: "0 0 16px"}}>{title}</h3>
      <ul style={{listStyle: "none", padding: 0, margin: 0}}>
        {items.map((it, i) => (
          <li key={i} style={{padding: "14px 0", borderTop: "1.5px dashed var(--brah-black)", display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 14}}>
            <span style={{fontWeight: 700, fontSize: 16}}>{it.name}</span>
            <span style={{fontSize: 13, fontStyle: "italic", color: "var(--brah-ink-soft)", textAlign: "right"}}>{it.note[lang]}</span>
          </li>
        ))}
      </ul>
    </HardCard>
  );
}

/* ─── Story page — richer with timeline + pull quotes ─── */
function BlendStory({ lang }) {
  const S = window.BRAH.story;
  const timeline = [
    { y: "2023", t: { en: "One griddle, one playlist, an empty corner of Rua dos Ferreiros.", pt: "Uma chapa, uma playlist, um canto vazio na Rua dos Ferreiros." } },
    { y: "2024", t: { en: "Opened the doors. First brah served at 11:34am, March 2nd.",          pt: "Abrimos as portas. Primeiro brah servido às 11:34, 2 de março." } },
    { y: "2025", t: { en: "Cheese Brah became the best-seller. Sorry, Classic.",                pt: "O Cheese Brah passou a mais pedido. Desculpa, Classic." } },
    { y: "2026", t: { en: "Vegan Brah. Pop-ups in Foz. Brah after dark.",                       pt: "Vegan Brah. Pop-ups na Foz. Brah depois de escurecer." } },
  ];
  return (
    <>
      <section style={{position: "relative", height: "min(70vh, 560px)", overflow: "hidden"}} className="grain">
        <img src="assets/lifestyle-storefront.jpg" alt="" style={{position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover"}}/>
        <div style={{position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55))"}}></div>
        <div style={{position: "relative", height: "100%", maxWidth: 1320, margin: "0 auto", padding: "0 32px 56px", display: "flex", flexDirection: "column", justifyContent: "flex-end", zIndex: 2, color: "var(--brah-cream)"}}>
          <StampB label={S.over[lang]} color="var(--brah-cream)" bg="transparent"/>
          <h1 style={{fontFamily: "var(--font-display)", fontSize: "clamp(56px, 8vw, 144px)", lineHeight: 0.9, letterSpacing: "-0.03em", margin: "12px 0 0", maxWidth: 1100, color: "var(--brah-cream)"}}>
            {lang === "en" ? "One griddle.\nOne playlist." : "Uma chapa.\nUma playlist."}
          </h1>
        </div>
        <div style={{position: "absolute", bottom: 24, right: 24}}>
          <HandNote color="tomato" rotate={-3} size={36}>
            {lang === "en" ? "Made in Ericeira." : "Feito na Ericeira."}
          </HandNote>
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

      {/* Pull quote */}
      <section style={{background: "var(--brah-cream-2)", padding: "96px 32px", borderTop: "1px solid var(--brah-ink)", borderBottom: "1px solid var(--brah-ink)", textAlign: "center", position: "relative"}}>
        <span style={{display: "inline-block", position: "relative"}}>
          <span style={{position: "absolute", left: -32, top: -16, fontFamily: "var(--font-display)", fontSize: 120, lineHeight: 1, color: "var(--brah-tomato)", opacity: 0.45}}>"</span>
          <p style={{fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(32px, 4.5vw, 64px)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0, maxWidth: 1100}}>
            {lang === "en"
              ? "Our return policy is simple. You will return."
              : "A política de devolução é simples. Tu vais voltar."}
          </p>
        </span>
        <div style={{...overB, color: "var(--brah-stamp-red)", marginTop: 24}}>{lang === "en" ? "EVERYBODY NEEDS A BRAH" : "TODA A GENTE PRECISA DE UM BRAH"}</div>
      </section>

      {/* Timeline */}
      <section style={{padding: "96px 32px", maxWidth: 1320, margin: "0 auto"}}>
        <div style={{...overB, color: "var(--brah-stamp-red)", marginBottom: 16}}>{lang === "en" ? "TIMELINE" : "CRONOLOGIA"}</div>
        <h2 style={{fontFamily: "var(--font-display)", fontSize: "clamp(40px, 5vw, 80px)", lineHeight: 0.95, letterSpacing: "-0.02em", margin: "0 0 48px"}}>
          {lang === "en" ? "Three years of smashing." : "Três anos a smashar."}
        </h2>
        <div style={{borderTop: "1px solid var(--brah-ink)"}}>
          {timeline.map((it, i) => (
            <div key={i} style={{display: "grid", gridTemplateColumns: "120px 1fr 1fr", gap: 32, padding: "28px 0", borderBottom: "1px solid var(--brah-ink)", alignItems: "baseline"}}>
              <span style={{fontFamily: "var(--font-display)", fontSize: 48, lineHeight: 1, color: "var(--brah-stamp-red)"}}>{it.y}</span>
              <span style={{fontFamily: "var(--font-display)", fontSize: 28, lineHeight: 1.1, letterSpacing: "-0.01em"}}>{it.t[lang]}</span>
              <span></span>
            </div>
          ))}
        </div>
      </section>

      {/* Photo trio */}
      <section style={{padding: "0 32px 96px", maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16}}>
        <HardCard offset={5} style={{padding: 0, overflow: "hidden"}}>
          <img src="assets/product-griddle.jpg" alt="" style={{width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block"}}/>
        </HardCard>
        <HardCard offset={5} style={{padding: 0, overflow: "hidden"}}>
          <img src="assets/lifestyle-interior.jpg" alt="" style={{width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block"}}/>
        </HardCard>
        <HardCard offset={5} style={{padding: 0, overflow: "hidden"}}>
          <img src="assets/product-cheese-handoff.png" alt="" style={{width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block"}}/>
        </HardCard>
      </section>
    </>
  );
}

/* ─── Visit page — Vício clean + stamps ─── */
function BlendVisit({ lang }) {
  const V = window.BRAH.visit;
  return (
    <section style={{padding: "80px 32px 120px", maxWidth: 1320, margin: "0 auto"}}>
      <div style={{display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 80, alignItems: "center"}}>
        <div>
          <StampB label={V.over[lang]}/>
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
          <div style={{display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap"}}>
            <button style={btnB}>{V.cta1[lang]} →</button>
            <button style={btnBghost}>+351 261 000 000</button>
          </div>
          <HandNote color="indigo" rotate={-2} size={26} style={{marginTop: 24, display: "block"}}>
            {lang === "en" ? "5 min from Ribeira d'Ilhas." : "5 min da Ribeira d'Ilhas."}
          </HandNote>
        </div>
        <FauxMap/>
      </div>
    </section>
  );
}

/* ─── Events — FULL Street Smash mode (indigo hero + poster tiles) ─── */
function BlendEvents({ lang, onNav }) {
  const E = window.BRAH.events;
  return (
    <>
      <section style={{background: "var(--brah-indigo)", color: "var(--brah-cream)", padding: "96px 32px", borderBottom: "2px solid var(--brah-black)", position: "relative", overflow: "hidden"}} className="grain">
        <div style={{position: "absolute", top: -40, right: -40, transform: "rotate(15deg)"}}>
          <Sun size={220} color="var(--brah-tomato)" spin/>
        </div>
        <div style={{maxWidth: 1320, margin: "0 auto", position: "relative", zIndex: 2}}>
          <StampB label={E.over[lang]} color="var(--brah-cream)" bg="transparent"/>
          <h1 style={{fontFamily: "var(--font-display)", fontSize: "clamp(64px, 10vw, 184px)", lineHeight: 0.88, letterSpacing: "-0.035em", margin: "20px 0 0", color: "var(--brah-cream)", maxWidth: 1100}}>
            {E.h2[lang]}
          </h1>
          <HandNote color="yellow" rotate={-2} size={36} style={{marginTop: 16, color: "var(--brah-tomato)"}}>
            {lang === "en" ? "pop-ups · surf comps · beach parties" : "pop-ups · provas de surf · festas"}
          </HandNote>
        </div>
      </section>
      <section style={{padding: "64px 32px 120px", maxWidth: 1320, margin: "0 auto"}}>
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32}}>
          {E.items.map((ev, i) => (
            <HardCard key={i} offset={6} style={{padding: 0, overflow: "hidden"}} onClick={() => {}}>
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
            </HardCard>
          ))}
        </div>
        <div style={{marginTop: 80, padding: 32, background: "var(--brah-tomato)", color: "var(--brah-cream)", border: "2px solid var(--brah-black)", boxShadow: "6px 6px 0 var(--brah-black)", textAlign: "center"}}>
          <div style={{...overB, opacity: 0.85}}>{lang === "en" ? "WANT A POP-UP WITH US?" : "QUERES UM POP-UP CONNOSCO?"}</div>
          <h3 style={{fontFamily: "var(--font-display)", fontSize: 48, lineHeight: 1, margin: "12px 0 16px", color: "var(--brah-cream)"}}>{lang === "en" ? "Let's smash together." : "Vamos smashar juntos."}</h3>
          <button onClick={() => onNav("catering")} style={{...btnB, background: "var(--brah-black)", color: "var(--brah-cream)", borderColor: "var(--brah-cream)", boxShadow: "3px 3px 0 var(--brah-cream)"}}>{lang === "en" ? "get in touch" : "fala connosco"} →</button>
        </div>
      </section>
    </>
  );
}

/* ─── Gallery — rotated photo collage ─── */
function BlendGallery({ lang }) {
  const G = window.BRAH.gallery;
  const rotations = [-2.5, 1.5, -1.5, 2.5, -1, 2, -2.5, 1, -1.5, 2, -2, 1.5];
  return (
    <section style={{padding: "80px 32px 120px", maxWidth: 1600, margin: "0 auto"}}>
      <div style={{textAlign: "center", marginBottom: 56}}>
        <StampB label={G.over[lang]}/>
        <h1 style={{fontFamily: "var(--font-display)", fontSize: "clamp(48px, 7vw, 120px)", lineHeight: 0.92, letterSpacing: "-0.03em", margin: "20px 0 16px"}}>
          {G.h2[lang]}
        </h1>
        <HandNote color="tomato" rotate={-2} size={32}>
          {lang === "en" ? "@brah.ericeira · tag us in yours" : "@brah.ericeira · marca-nos nas tuas"}
        </HandNote>
      </div>
      <div style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24}}>
        {G.images.map((src, i) => (
          <a key={i} href="#" onClick={e=>e.preventDefault()}
             style={{transform: `rotate(${rotations[i] || 0}deg)`, transition: "transform var(--t-base) var(--ease-out)", display: "block"}}
             onMouseEnter={e => e.currentTarget.style.transform = "rotate(0deg) scale(1.04)"}
             onMouseLeave={e => e.currentTarget.style.transform = `rotate(${rotations[i] || 0}deg) scale(1)`}>
            <HardCard offset={5} style={{padding: 0, overflow: "hidden"}}>
              <img src={src} alt="" style={{width: "100%", aspectRatio: "1/1", objectFit: "cover", display: "block"}}/>
            </HardCard>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ─── Catering — clean Vício with notes ─── */
function BlendCatering({ lang }) {
  const C = window.BRAH.catering;
  return (
    <section style={{padding: "80px 32px 120px", maxWidth: 1320, margin: "0 auto"}}>
      <StampB label={C.over[lang]}/>
      <h1 style={{fontFamily: "var(--font-display)", fontSize: "clamp(48px, 6.5vw, 112px)", lineHeight: 0.92, letterSpacing: "-0.03em", margin: "20px 0 8px", maxWidth: 1100}}>{C.h2[lang]}</h1>
      <HandNote color="tomato" rotate={-2} size={26}>{C.sub[lang]}</HandNote>
      <p style={{fontSize: 19, lineHeight: 1.55, color: "var(--brah-ink-soft)", maxWidth: 720, marginTop: 24}}>{C.body[lang]}</p>
      <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 56}}>
        {C.options.map((o, i) => (
          <HardCard key={i} offset={5} bg={["var(--brah-cream-2)","var(--brah-pale-yellow)","var(--brah-peach)"][i]} style={{padding: 28}}>
            <StampB label={`0${i+1}`}/>
            <h3 style={{fontFamily: "var(--font-display)", fontSize: 36, lineHeight: 1, margin: "14px 0 8px"}}>{o.title[lang]}</h3>
            <div style={{fontWeight: 800, fontSize: 14}}>{o.n[lang]}</div>
            <div style={{marginTop: 8, fontSize: 14, color: "var(--brah-ink-soft)"}}>{o.note[lang]}</div>
          </HardCard>
        ))}
      </div>
      <div style={{marginTop: 56, padding: 32, background: "var(--brah-black)", color: "var(--brah-cream)", border: "2px solid var(--brah-black)", boxShadow: "6px 6px 0 var(--brah-tomato)", textAlign: "center"}}>
        <div style={{...overB, color: "var(--brah-tomato)"}}>{lang === "en" ? "GET A QUOTE" : "PEDE ORÇAMENTO"}</div>
        <h3 style={{fontFamily: "var(--font-display)", fontSize: 48, margin: "8px 0 16px", color: "var(--brah-cream)"}}>+351 912 023 822</h3>
        <div style={{display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap"}}>
          <a href="https://wa.me/351912023822?text=Ol%C3%A1!%20Gostava%20de%20pedir%20um%20or%C3%A7amento%20para%20catering%20brah." target="_blank" rel="noreferrer" style={{...btnB, background: "var(--brah-tomato)", textDecoration: "none"}}>
            {lang === "en" ? "whatsapp us" : "manda whatsapp"} →
          </a>
          <a href="tel:+351912023822" style={{...btnB, background: "transparent", color: "var(--brah-cream)", borderColor: "var(--brah-cream)", boxShadow: "3px 3px 0 var(--brah-tomato)", textDecoration: "none"}}>
            {lang === "en" ? "call us" : "liga-nos"}
          </a>
        </div>
      </div>
    </section>
  );
}

function FauxMap() {
  return (
    <div style={{position: "relative", aspectRatio: "4/5", border: "2px solid var(--brah-black)", boxShadow: "6px 6px 0 var(--brah-black)", overflow: "hidden"}}>
      <iframe
        title="Brah Smash Burger — Ericeira"
        src="https://www.openstreetmap.org/export/embed.html?bbox=-9.4195%2C38.9635%2C-9.4150%2C38.9665&layer=mapnik&marker=38.9649%2C-9.4172"
        style={{width: "100%", height: "100%", border: 0}}
        loading="lazy"
      />
      <div style={{position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px 16px", background: "var(--brah-cream)", borderTop: "2px solid var(--brah-black)"}}>
        <div style={{...overB, fontSize: 10, color: "var(--brah-stamp-red)"}}>ESTAMOS AQUI</div>
        <div style={{fontWeight: 700, fontSize: 14, marginTop: 3}}>Rua dos Ferreiros 3A · Ericeira</div>
        <a href="https://www.google.com/maps/search/?api=1&query=Rua+dos+Ferreiros+3A+Ericeira" target="_blank" rel="noreferrer" style={{fontSize: 11, color: "var(--brah-stamp-red)", fontWeight: 700, letterSpacing: "0.1em", textDecoration: "none"}}>ABRIR NO GOOGLE MAPS →</a>
      </div>
    </div>
  );
}

Object.assign(window, { BlendSite });

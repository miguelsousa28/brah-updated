// brah — Prototype shell: direction switcher + page nav + lang toggle
const { useState: useStateA, useEffect: useEffectA } = React;

const DIRECTIONS = [
  { id: "vicio",  label: "Vício",        sub: "clean · product-first · confident",      Site: window.VicioSite },
  { id: "street", label: "Street Smash", sub: "poster · raw · event-energy",            Site: window.StreetSite },
  { id: "blend",  label: "Blend",        sub: "Vício base + Street accents · hybrid",    Site: window.BlendSite },
];

function App() {
  // Read from URL hash so refreshes preserve state
  const initial = parseHash();
  const [dir, setDir]   = useStateA(initial.dir   || "vicio");
  const [page, setPage] = useStateA(initial.page  || "home");
  const [lang, setLang] = useStateA(initial.lang  || "en");
  const [chromeOpen, setChromeOpen] = useStateA(true);

  useEffectA(() => {
    const hash = `#dir=${dir}&page=${page}&lang=${lang}`;
    if (window.location.hash !== hash) {
      history.replaceState(null, "", hash);
    }
    // Scroll to top whenever page or direction changes
    window.scrollTo({ top: 0, behavior: "instant" in window ? "auto" : "auto" });
  }, [dir, page, lang]);

  const onNav = (id) => {
    if (id === "order") { id = "menu"; } // order alias
    setPage(id);
  };

  const active = DIRECTIONS.find(d => d.id === dir) || DIRECTIONS[0];
  const Site = active.Site;

  return (
    <>
      <DirectionSwitcher dir={dir} setDir={setDir} open={chromeOpen} setOpen={setChromeOpen} lang={lang} setLang={setLang} page={page} setPage={setPage}/>
      <div data-screen-label={`${active.label} · ${window.BRAH.nav[page]?.[lang] || page}`}>
        <Site page={page} lang={lang} onNav={onNav} onLang={setLang}/>
      </div>
    </>
  );
}

function parseHash() {
  const h = window.location.hash.replace(/^#/, "");
  const out = {};
  for (const pair of h.split("&")) {
    const [k, v] = pair.split("=");
    if (k && v) out[k] = decodeURIComponent(v);
  }
  return out;
}

/* ─── Floating compare panel — top-center pill that toggles direction + lang ─── */
function DirectionSwitcher({ dir, setDir, open, setOpen, lang, setLang, page, setPage }) {
  const pages = ["home", "menu", "story", "events", "gallery", "catering", "visit"];
  return (
    <>
      <div style={{
        position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)",
        zIndex: 100, display: "flex", gap: 8, alignItems: "center",
        background: "rgba(20,16,8,0.94)", color: "var(--brah-cream)",
        padding: "8px 10px", borderRadius: 999, fontFamily: "var(--font-body)",
        boxShadow: "0 6px 24px rgba(0,0,0,0.25)", backdropFilter: "blur(8px)",
        maxWidth: "calc(100vw - 32px)",
      }}>
        <span style={{fontSize: 10, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.6, padding: "0 8px 0 6px"}}>DIRECTION</span>
        {DIRECTIONS.map(d => (
          <button key={d.id} onClick={() => setDir(d.id)} style={{
            background: dir === d.id ? "var(--brah-tomato)" : "transparent",
            color: dir === d.id ? "var(--brah-cream)" : "var(--brah-cream)",
            border: "none",
            padding: "8px 14px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: "0.02em",
            transition: "all var(--t-base) var(--ease-out)",
            opacity: dir === d.id ? 1 : 0.72,
          }}>
            {d.label}
          </button>
        ))}
        <span style={{width: 1, height: 22, background: "rgba(255,252,228,0.2)", margin: "0 4px"}}></span>
        <button onClick={() => setOpen(!open)} title="more" style={{
          background: "transparent", color: "var(--brah-cream)", border: "none",
          padding: "6px 8px", cursor: "pointer", fontSize: 14, opacity: 0.7,
        }}>{open ? "⌄" : "⌃"}</button>
      </div>

      {/* Expanded panel — quick page jumps + meta */}
      {open && (
        <div style={{
          position: "fixed", bottom: 76, left: "50%", transform: "translateX(-50%)",
          zIndex: 99, background: "rgba(20,16,8,0.96)", color: "var(--brah-cream)",
          padding: 16, borderRadius: 14, maxWidth: 720, width: "calc(100vw - 32px)",
          boxShadow: "0 12px 36px rgba(0,0,0,0.3)", backdropFilter: "blur(8px)",
          fontFamily: "var(--font-body)",
        }}>
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, gap: 12, flexWrap: "wrap"}}>
            <div style={{fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.7}}>JUMP TO PAGE</div>
            <div style={{display: "flex", gap: 8, alignItems: "center"}}>
              <span style={{fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.7}}>LANG</span>
              {["en", "pt"].map(L => (
                <button key={L} onClick={() => setLang(L)} style={{
                  background: lang === L ? "var(--brah-cream)" : "transparent",
                  color: lang === L ? "var(--brah-black)" : "var(--brah-cream)",
                  border: "1px solid var(--brah-cream)", padding: "4px 10px",
                  fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", borderRadius: 999, cursor: "pointer",
                }}>{L.toUpperCase()}</button>
              ))}
            </div>
          </div>
          <div style={{display: "flex", gap: 6, flexWrap: "wrap"}}>
            {pages.map(p => (
              <button key={p} onClick={() => setPage(p)} style={{
                background: page === p ? "var(--brah-tomato)" : "rgba(255,252,228,0.08)",
                color: "var(--brah-cream)", border: "none",
                padding: "8px 12px", borderRadius: 999, fontSize: 12, cursor: "pointer", fontWeight: 600,
              }}>
                {window.BRAH.nav[p][lang]}
              </button>
            ))}
          </div>
          <div style={{marginTop: 10, fontSize: 11, opacity: 0.55, letterSpacing: "0.06em"}}>
            Comparing direction: <strong style={{color: "var(--brah-tomato)"}}>{DIRECTIONS.find(d=>d.id===dir).label}</strong> — {DIRECTIONS.find(d=>d.id===dir).sub}. Open in 3 windows side-by-side to compare.
          </div>
        </div>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);

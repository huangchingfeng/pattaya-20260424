/* global React, ReactDOM, L */
const { useState, useEffect, useMemo, useRef, useCallback } = React;

// ============ Persistence ============
const ls = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
};

// ============ Area meta (journal-style) ============
const AREAS = [
  { key: "Soi 6",          en: "Soi Six · Day Scene",      color: "var(--area-soi6)" },
  { key: "Walking Street", en: "Walking Street · Neon",    color: "var(--area-walking)" },
  { key: "LK Metro",       en: "LK Metro · Alley",         color: "var(--area-lk)" },
  { key: "Soi Buakhao",    en: "Soi Buakhao · Local",      color: "var(--area-buakhao)" },
  { key: "南芭提雅",        en: "South Pattaya",            color: "var(--area-south)" }
];
const AREA_COLOR = Object.fromEntries(AREAS.map(a => [a.key, a.color]));

// ============ Girl archetype auto-tagger ============
// Scans girl.desc + girl.build + girl.tag for keywords and assigns tags
const GIRL_TAGS = [
  { key: "innocent", label: "清純", re: /清純|鄰家|甜美可愛|陽光甜美|笑容自然/ },
  { key: "sexy",     label: "性感", re: /性感|辣妹|女神|深V|開衩|冷艷|撩|低胸|氣場強/ },
  { key: "curvy",    label: "豐滿", re: /豐滿|胸部大|胸部很大|胸部超大|胸部非常大/ },
  { key: "slim",     label: "纖細", re: /纖細|腰細|腰很細|勻稱|腿長/ },
  { key: "mature",   label: "成熟", re: /成熟|派對女王|女神/ },
  { key: "young",    label: "超嫩", re: /超嫩|嫩|年輕/ },
  { key: "tattoo",   label: "紋身", re: /紋身/ },
  { key: "uniform",  label: "制服", re: /警察|護士|水手|修女|制服|cosplay|COS/i },
  { key: "longhair", label: "長髮", re: /長髮|長直髮/ },
  { key: "shorthair",label: "短髮", re: /短髮|Bob|齊肩/ },
  { key: "blonde",   label: "金髮", re: /金色.*髮|金髮|淺金/ },
  { key: "redhair",  label: "紅髮", re: /紅色.*髮|紅髮|粉紅挑染/ },
  { key: "dark-skin",label: "深膚", re: /膚色健康偏深|膚色偏深|健康膚色/ },
  { key: "fair-skin",label: "白皙", re: /皮膚白皙|白皙/ },
  { key: "english",  label: "會英文", re: /會英文|英文/ },
  { key: "active",   label: "主動", re: /主動|熱情|撩/ }
];

function detectTags(girl) {
  const hay = [girl.desc, girl.build, girl.tag, girl.name].filter(Boolean).join(" ");
  return GIRL_TAGS.filter(t => t.re.test(hay)).map(t => t.key);
}

// gather all tagged girls with location context
function getAllGirls(locations) {
  const out = [];
  locations.forEach(loc => {
    (loc.girls || []).forEach((g, i) => {
      out.push({ ...g, _loc: loc, _idx: i, _tags: detectTags(g) });
    });
  });
  return out;
}

// ============ Priority helper ============
function priorityOf(loc) {
  if (loc.rating >= 5) return "hot";
  if (loc.rating >= 4) return "p2";
  if (loc.rating >= 3) return "p1";
  return null;
}
function priorityBadge(loc) {
  const p = priorityOf(loc);
  if (p === "hot") return { cls: "hot", ch: "★" };
  if (p === "p2") return { cls: "p2", ch: "2" };
  if (p === "p1") return { cls: "p1", ch: "1" };
  return null;
}

// ============ First photo ============
function firstPhoto(loc) {
  if (!loc.girls) return null;
  for (const g of loc.girls) if (g.photos && g.photos[0]) return g.photos[0];
  return null;
}

// ============ Pin ============
function makePin({ loc, selected, visited, isFav, order }) {
  const areaColor = AREA_COLOR[loc.area] || "var(--amber)";
  const photo = firstPhoto(loc);
  const pri = priorityBadge(loc);
  const initial = loc.name.replace(/[^A-Za-z\u4e00-\u9fff]/g, "").slice(0, 1);

  const classes = ["pin-token"];
  if (selected) classes.push("selected");
  if (visited) classes.push("visited");

  const html = `
    <div class="${classes.join(" ")}" style="--area-color: ${areaColor}">
      <div class="pin-name">${loc.name}</div>
      <div class="tok">
        ${photo ? `<img src="${photo}" alt="" loading="lazy" />` : `<span>${initial}</span>`}
      </div>
      <div class="pin-stem"></div>
      ${pri ? `<div class="pin-pri ${pri.cls}">${pri.ch}</div>` : ""}
      ${order ? `<div class="pin-order">${order}</div>` : ""}
      ${isFav ? `<div class="pin-fav">♥</div>` : ""}
    </div>`;
  return L.divIcon({
    html, className: "pin-wrap",
    iconSize: [44, 54],
    iconAnchor: [22, 54],
  });
}

// ============ Stars ============
function Stars({ value = 0, onChange }) {
  return (
    <span className="dx-stars">
      {[1,2,3,4,5].map(i => (
        <span key={i}
          className={`star ${i > value ? "empty" : ""}`}
          onClick={onChange ? () => onChange(i === value ? 0 : i) : undefined}
        >★</span>
      ))}
    </span>
  );
}

// ============ Row ============
function Row({ loc, selected, isFav, isVisited, order, onClick, onFav }) {
  const photo = firstPhoto(loc);
  const pri = priorityBadge(loc);
  const areaColor = AREA_COLOR[loc.area];
  const typeLabel = window.TYPE_META[loc.type]?.label || loc.type;
  const girlCount = (loc.girls || []).length;
  const initial = loc.name.replace(/[^A-Za-z\u4e00-\u9fff]/g, "").slice(0, 1);

  return (
    <div className={`row ${selected ? "selected" : ""} ${isVisited ? "visited" : ""}`}
         onClick={onClick}
         style={{ "--area-color": areaColor }}>
      <div className="row-thumb">
        {photo ? <img src={photo} alt="" loading="lazy" /> : <span className="thumb-placeholder">{initial}</span>}
        {pri && <span className={`row-priority ${pri.cls}`}>{pri.ch}</span>}
      </div>
      <div className="row-body">
        <div className="row-name">{loc.name}</div>
        <div className="row-meta">
          <span>{typeLabel}</span>
          {girlCount > 0 && <><span className="dot">·</span><span className="girls-num">{girlCount} 位</span></>}
          {loc.theme && <><span className="dot">·</span><span>{loc.theme.slice(0, 10)}</span></>}
        </div>
        {loc.note && <div className="row-tag">{loc.note}</div>}
      </div>
      <div className="row-aside" onClick={e => e.stopPropagation()}>
        {order && <span className="row-order">{String(order).padStart(2, "0")}</span>}
        <button className={`row-fav ${isFav ? "active" : ""}`} onClick={onFav} title="收藏">
          {isFav ? "♥" : "♡"}
        </button>
      </div>
    </div>
  );
}

// ============ Lightbox ============
function Lightbox({ photos, index, caption, onClose, onIndex }) {
  useEffect(() => {
    const h = e => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onIndex((index - 1 + photos.length) % photos.length);
      if (e.key === "ArrowRight") onIndex((index + 1) % photos.length);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [index, photos.length, onClose, onIndex]);
  return (
    <div className="lightbox" onClick={onClose}>
      <img src={photos[index]} alt="" onClick={e => e.stopPropagation()} />
      <button className="lb-close" onClick={onClose}>✕</button>
      {photos.length > 1 && (
        <>
          <button className="lb-nav prev" onClick={e => { e.stopPropagation(); onIndex((index - 1 + photos.length) % photos.length); }}>‹</button>
          <button className="lb-nav next" onClick={e => { e.stopPropagation(); onIndex((index + 1) % photos.length); }}>›</button>
        </>
      )}
      <div className="lb-caption">{caption} · {index + 1} / {photos.length}</div>
    </div>
  );
}

// ============ Detail Drawer ============
function Drawer({ loc, open, isFav, isVisited, inItin, order, rating, bookings, bookingNotes, onClose, onFav, onVisit, onItin, onRate, onPhoto, onToggleBook, onEditNote }) {
  if (!loc) return <div className={`drawer ${open ? "open" : ""}`}></div>;
  const hero = firstPhoto(loc);
  const typeLabel = window.TYPE_META[loc.type]?.label || loc.type;
  const areaColor = AREA_COLOR[loc.area];

  return (
    <div className={`drawer ${open ? "open" : ""}`} style={{ "--area-color": areaColor }}>
      <button className="drawer-close" onClick={onClose}>✕</button>
      <div className="drawer-scroll">
        <div className={`dx-hero ${hero ? "" : "no-img"}`}>
          {hero && <div className="dx-hero-img" style={{ backgroundImage: `url(${hero})` }} />}
          <div className="dx-hero-badge">
            <span className="sw" />
            <span>{loc.area}</span>
            <span>·</span>
            <span>{typeLabel}</span>
          </div>
          <h2 className="dx-hero-title">{loc.name}</h2>
        </div>

        <div className="dx-meta-row">
          <span>{loc.theme || "—"}</span>
          <Stars value={rating} onChange={onRate} />
        </div>

        <div className="dx-actions">
          <button className={`dx-action ${isFav ? "active" : ""}`} onClick={onFav}>
            <span className="icon">{isFav ? "♥" : "♡"}</span>
            <span>收藏</span>
          </button>
          <button className={`dx-action ${isVisited ? "active" : ""}`} onClick={onVisit}>
            <span className="icon">{isVisited ? "✓" : "○"}</span>
            <span>{isVisited ? "已去過" : "待去"}</span>
          </button>
          <button className={`dx-action ${inItin ? "active" : ""}`} onClick={onItin}>
            <span className="icon">{inItin ? `#${order}` : "＋"}</span>
            <span>{inItin ? "行程中" : "加入行程"}</span>
          </button>
        </div>

        {(loc.note || loc.address || loc.contact) && (
          <div className="dx-section">
            <div className="dx-section-title">Field Notes</div>
            {loc.note && <div className="dx-note">{loc.note}</div>}
            {loc.address && (
              <div className="dx-address" style={{ marginTop: loc.note ? 12 : 0 }}>
                <span className="glyph">◎</span>
                <span>{loc.address}</span>
              </div>
            )}
            {loc.contact && <div className="dx-contact">✉ {loc.contact}</div>}
          </div>
        )}

        <div className="dx-section">
          <div className="dx-section-title">
            女生名冊 · {(loc.girls || []).length} 位
          </div>
          {loc.girls && loc.girls.length > 0 ? (
            <div className="dx-girls">
              {loc.girls.map((g, i) => {
                const bk = `${loc.id}::${i}`;
                return (
                  <GirlCard
                    key={i}
                    girl={g}
                    loc={loc}
                    onPhoto={onPhoto}
                    isBooked={!!bookings[bk]}
                    bookingNote={bookingNotes[bk] || ""}
                    onToggleBook={() => onToggleBook(bk)}
                    onEditNote={(v) => onEditNote(bk, v)}
                  />
                );
              })}
            </div>
          ) : (
            <div className="no-girls">尚未認識 — 親自探索吧</div>
          )}
        </div>
      </div>
    </div>
  );
}

function GirlCard({ girl, loc, onPhoto, isBooked, onToggleBook, bookingNote, onEditNote }) {
  const photo = girl.photos && girl.photos[0];
  const count = (girl.photos || []).length;
  const tags = girl._tags || detectTags(girl);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(bookingNote || "");
  useEffect(() => setDraft(bookingNote || ""), [bookingNote]);

  return (
    <div className={`girl-card ${isBooked ? "has-hot" : ""}`}>
      <div className="girl-photo" onClick={() => photo && onPhoto(girl.photos, girl.name, loc.name)}>
        {photo ? <><img src={photo} alt={girl.name} loading="lazy" />{count > 1 && <span className="count">+{count - 1}</span>}</> : <span>◯</span>}
      </div>
      <div className="girl-body">
        <div className="girl-name">
          <span>{girl.name}</span>
          {isBooked && <span className="tag hot">已約</span>}
        </div>
        {(girl.age || girl.build || girl.price) && (
          <div className="girl-stats">
            {girl.age && <span>{girl.age} 歲</span>}
            {girl.build && <span>{girl.build}</span>}
            {girl.price && <span>{girl.price}</span>}
          </div>
        )}
        {tags.length > 0 && (
          <div className="girl-tags">
            {tags.map(k => {
              const meta = GIRL_TAGS.find(t => t.key === k);
              return meta ? <span key={k} className="gtag">{meta.label}</span> : null;
            })}
          </div>
        )}
        {girl.desc && <div className="girl-desc">{girl.desc}</div>}
        {girl.hours && <div className="girl-hours">🕐 {girl.hours}</div>}
        {girl.contact && <div className="girl-contact">✉ {girl.contact}</div>}

        <div className="girl-book-row">
          <button className={`book-btn ${isBooked ? "on" : ""}`} onClick={onToggleBook}>
            {isBooked ? "✓ 已約" : "＋ 標記已約"}
          </button>
          {isBooked && (
            editing ? (
              <div className="book-note-edit">
                <input
                  autoFocus
                  value={draft}
                  placeholder="備註：日期 / 時間 / 細節…"
                  onChange={e => setDraft(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") { onEditNote(draft); setEditing(false); } if (e.key === "Escape") setEditing(false); }}
                />
                <button onClick={() => { onEditNote(draft); setEditing(false); }}>存</button>
              </div>
            ) : (
              <span className="book-note" onClick={() => setEditing(true)}>
                {bookingNote ? `📝 ${bookingNote}` : <em>+ 加備註</em>}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}

// ============ Area Section ============
function AreaSection({ area, locations, collapsed, onToggle, rowProps }) {
  if (locations.length === 0) return null;
  const color = AREA_COLOR[area.key];
  return (
    <div className={`area-section ${collapsed ? "collapsed" : ""}`}>
      <button className="area-head" onClick={onToggle}>
        <span className="area-swatch" style={{ background: color }} />
        <span className="area-title">
          {area.key}
          <span className="en">{area.en}</span>
        </span>
        <span className="area-count">{String(locations.length).padStart(2, "0")}</span>
        <span className="area-chevron">▾</span>
      </button>
      <div className="area-body">
        {locations.map(loc => (
          <Row key={loc.id} loc={loc} {...rowProps(loc)} />
        ))}
      </div>
    </div>
  );
}

// ============ App ============
function App() {
  const locations = window.LOCATIONS;

  const [theme, setTheme] = useState(() => ls.get("theme-j", "dark"));
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [favOnly, setFavOnly] = useState(false);
  const [hideVisited, setHideVisited] = useState(false);
  const [hotOnly, setHotOnly] = useState(false);
  const [collapsed, setCollapsed] = useState(() => ls.get("collapsed-j", {}));

  const [favs, setFavs] = useState(() => ls.get("favs", []));
  const [visited, setVisited] = useState(() => ls.get("visited", []));
  const [ratings, setRatings] = useState(() => ls.get("ratings", {}));
  const [itinerary, setItinerary] = useState(() => ls.get("itinerary", []));
  const [itinMode, setItinMode] = useState(false);
  const [bookings, setBookings] = useState(() => ls.get("bookings", {}));
  const [bookingNotes, setBookingNotes] = useState(() => ls.get("bookingNotes", {}));
  const [girlTagFilter, setGirlTagFilter] = useState([]);
  const [bookedOnly, setBookedOnly] = useState(false);

  const [selectedId, setSelectedId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [sbOpen, setSbOpen] = useState(false);

  const mapRef = useRef(null);
  const mapInst = useRef(null);
  const markers = useRef({});
  const polyline = useRef(null);
  const tileRef = useRef(null);

  // persist
  useEffect(() => {
    ls.set("theme-j", theme);
    document.documentElement.dataset.theme = theme;
    if (window.__setTileTheme) window.__setTileTheme(theme);
  }, [theme]);
  useEffect(() => ls.set("favs", favs), [favs]);
  useEffect(() => ls.set("visited", visited), [visited]);
  useEffect(() => ls.set("ratings", ratings), [ratings]);
  useEffect(() => ls.set("itinerary", itinerary), [itinerary]);
  useEffect(() => ls.set("collapsed-j", collapsed), [collapsed]);
  useEffect(() => ls.set("bookings", bookings), [bookings]);
  useEffect(() => ls.set("bookingNotes", bookingNotes), [bookingNotes]);

  const toggleBook = (bk) => setBookings(b => {
    const n = { ...b };
    if (n[bk]) delete n[bk]; else n[bk] = 1;
    return n;
  });
  const editBookNote = (bk, v) => setBookingNotes(n => ({ ...n, [bk]: v }));

  // init map
  useEffect(() => {
    const map = L.map(mapRef.current, { zoomControl: false, attributionControl: true })
      .setView([12.9365, 100.8810], 14);
    L.control.zoom({ position: "bottomright" }).addTo(map);
    // CARTO basemaps — no referer required, dark/light variants
    const darkUrl = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
    const lightUrl = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
    const attr = '© <a href="https://www.openstreetmap.org/copyright">OSM</a> · © <a href="https://carto.com/attributions">CARTO</a>';
    const tile = L.tileLayer(
      (document.documentElement.dataset.theme === "light" ? lightUrl : darkUrl),
      { maxZoom: 19, subdomains: "abcd", attribution: attr }
    ).addTo(map);
    tileRef.current = tile;
    window.__setTileTheme = (t) => {
      if (!tileRef.current) return;
      tileRef.current.setUrl(t === "light" ? lightUrl : darkUrl);
    };
    mapInst.current = map;
    return () => map.remove();
  }, []);

  // filter
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return locations.filter(loc => {
      if (typeFilter !== "all" && loc.type !== typeFilter) return false;
      if (favOnly && !favs.includes(loc.id)) return false;
      if (hideVisited && visited.includes(loc.id)) return false;
      if (hotOnly && loc.rating < 5) return false;
      // girl-tag filter: location passes if ANY of its girls have ALL selected tags? simpler: ANY girl matches ANY selected tag
      if (girlTagFilter.length > 0) {
        const ok = (loc.girls || []).some(g => {
          const t = detectTags(g);
          return girlTagFilter.every(k => t.includes(k));
        });
        if (!ok) return false;
      }
      if (bookedOnly) {
        const any = (loc.girls || []).some((_, i) => bookings[`${loc.id}::${i}`]);
        if (!any) return false;
      }
      if (q) {
        const hay = [loc.name, loc.area, loc.note, loc.theme, loc.address,
          ...(loc.girls || []).map(g => g.name + " " + (g.desc || ""))].join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [locations, query, typeFilter, favOnly, hideVisited, hotOnly, girlTagFilter, bookedOnly, bookings, favs, visited]);

  const byArea = useMemo(() => {
    const m = {};
    AREAS.forEach(a => m[a.key] = []);
    filtered.forEach(l => { (m[l.area] = m[l.area] || []).push(l); });
    // sort within each area by priority desc
    Object.values(m).forEach(arr => arr.sort((a, b) => (b.rating || 0) - (a.rating || 0)));
    return m;
  }, [filtered]);

  const getOrder = id => {
    const i = itinerary.indexOf(id);
    return i >= 0 ? i + 1 : null;
  };

  const toggleFav = useCallback(id => setFavs(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]), []);
  const toggleVisited = useCallback(id => setVisited(v => v.includes(id) ? v.filter(x => x !== id) : [...v, id]), []);
  const toggleItin = useCallback(id => setItinerary(it => it.includes(id) ? it.filter(x => x !== id) : [...it, id]), []);
  const setRating = useCallback((id, v) => setRatings(r => ({ ...r, [id]: v })), []);
  const toggleCollapse = area => setCollapsed(c => ({ ...c, [area]: !c[area] }));

  // render pins
  useEffect(() => {
    if (!mapInst.current) return;
    const map = mapInst.current;
    Object.keys(markers.current).forEach(id => {
      map.removeLayer(markers.current[id]);
      delete markers.current[id];
    });
    filtered.forEach(loc => {
      const marker = L.marker([loc.lat, loc.lng], {
        icon: makePin({
          loc,
          selected: selectedId === loc.id,
          visited: visited.includes(loc.id),
          isFav: favs.includes(loc.id),
          order: getOrder(loc.id)
        }),
        riseOnHover: true
      }).addTo(map);
      marker.on("click", () => { setSelectedId(loc.id); setDrawerOpen(true); });
      markers.current[loc.id] = marker;
    });
  }, [filtered, selectedId, favs, visited, itinerary]);

  // itinerary polyline
  useEffect(() => {
    if (!mapInst.current) return;
    if (polyline.current) { mapInst.current.removeLayer(polyline.current); polyline.current = null; }
    if (itinMode && itinerary.length >= 2) {
      const pts = itinerary.map(id => locations.find(l => l.id === id)).filter(Boolean).map(l => [l.lat, l.lng]);
      polyline.current = L.polyline(pts, {
        color: "#e3a14b", weight: 3, opacity: 0.85, dashArray: "6 8"
      }).addTo(mapInst.current);
    }
  }, [itinerary, itinMode, locations]);

  // fly to selected
  useEffect(() => {
    if (selectedId && mapInst.current) {
      const loc = locations.find(l => l.id === selectedId);
      if (loc) mapInst.current.flyTo([loc.lat, loc.lng], Math.max(mapInst.current.getZoom(), 16), { duration: 0.6 });
    }
  }, [selectedId, locations]);

  const typeCounts = useMemo(() => {
    const c = { all: locations.length, bar: 0, agogo: 0, club: 0 };
    locations.forEach(l => { c[l.type] = (c[l.type] || 0) + 1; });
    return c;
  }, [locations]);

  // tag counts across all girls
  const tagCounts = useMemo(() => {
    const c = {};
    GIRL_TAGS.forEach(t => c[t.key] = 0);
    locations.forEach(l => (l.girls || []).forEach(g => {
      detectTags(g).forEach(k => c[k] = (c[k] || 0) + 1);
    }));
    return c;
  }, [locations]);

  const bookedCount = Object.keys(bookings).length;

  const selectedLoc = selectedId ? locations.find(l => l.id === selectedId) : null;

  const toggleGirlTag = (k) => setGirlTagFilter(f => f.includes(k) ? f.filter(x => x !== k) : [...f, k]);

  // stats
  const stats = useMemo(() => ({
    total: locations.length,
    hot: locations.filter(l => l.rating >= 5).length,
    visitedN: visited.length,
    favN: favs.length
  }), [locations, visited, favs]);

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className={`sidebar ${sbOpen ? "open" : ""}`}>
        <div className="masthead">
          <div className="eyebrow">
            <span><span className="dot" />No. 01 · 2026</span>
            <div className="header-tools">
              <button className={`tool ${favOnly ? "active" : ""}`} onClick={() => setFavOnly(v => !v)} title="只看收藏">♥</button>
              <button className={`tool ${hideVisited ? "active" : ""}`} onClick={() => setHideVisited(v => !v)} title="隱藏已去過">◉</button>
              <button className={`tool ${hotOnly ? "active" : ""}`} onClick={() => setHotOnly(v => !v)} title="只看五星">★</button>
              <button className={`tool ${itinMode ? "active" : ""}`} onClick={() => setItinMode(v => !v)} title="行程模式">◇</button>
              <button className="tool" onClick={() => setTheme(t => t === "dark" ? "light" : "dark")} title="夜間">
                {theme === "dark" ? "☾" : "☀"}
              </button>
            </div>
          </div>
          <h1>芭堤雅 <em>夜遊</em> 手記</h1>
          <div className="byline">
            <span>Pattaya · Thailand</span>
            <span className="sep">/</span>
            <span>04.24 — 04.30</span>
          </div>
          <div className="progress">
            <span className="stat"><strong>{filtered.length}</strong>顯示 / {stats.total}</span>
            <span className="stat"><strong>{stats.hot}</strong>五星</span>
            <span className="stat"><strong>{stats.visitedN}</strong>已去過</span>
            <span className="stat"><strong>{stats.favN}</strong>收藏</span>
          </div>
        </div>

        <div className="search">
          <span className="icon">⌕</span>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="搜尋店名、女生、主題⋯" />
          {query && <span className="clear" onClick={() => setQuery("")}>✕</span>}
        </div>

        <div className="segment">
          <button className={`seg-btn ${typeFilter === "all" ? "active" : ""}`} onClick={() => setTypeFilter("all")}>
            <span className="seg-count">{typeCounts.all}</span><span>全部</span>
          </button>
          <button className={`seg-btn ${typeFilter === "bar" ? "active" : ""}`} onClick={() => setTypeFilter("bar")}>
            <span className="seg-count">{typeCounts.bar}</span><span>Beer</span>
          </button>
          <button className={`seg-btn ${typeFilter === "agogo" ? "active" : ""}`} onClick={() => setTypeFilter("agogo")}>
            <span className="seg-count">{typeCounts.agogo}</span><span>GoGo</span>
          </button>
          <button className={`seg-btn ${typeFilter === "club" ? "active" : ""}`} onClick={() => setTypeFilter("club")}>
            <span className="seg-count">{typeCounts.club}</span><span>Club</span>
          </button>
        </div>

        <div className="filter-bar">
          <button className={`filter-pill ${favOnly ? "active" : ""}`} onClick={() => setFavOnly(v => !v)}>
            ♥ 收藏 {favs.length > 0 && `(${favs.length})`}
          </button>
          <button className={`filter-pill ${bookedOnly ? "active" : ""}`} onClick={() => setBookedOnly(v => !v)}>
            ✓ 已約 {bookedCount > 0 && `(${bookedCount})`}
          </button>
          <button className={`filter-pill ${hotOnly ? "active" : ""}`} onClick={() => setHotOnly(v => !v)}>
            ★ 五星 ({stats.hot})
          </button>
          <button className={`filter-pill ${hideVisited ? "active" : ""}`} onClick={() => setHideVisited(v => !v)}>
            ◉ 隱藏已去
          </button>
        </div>

        <div className="girl-tag-bar">
          <div className="gt-label">
            妹子類型
            {girlTagFilter.length > 0 && (
              <span className="gt-clear" onClick={() => setGirlTagFilter([])}>清除 ✕</span>
            )}
          </div>
          <div className="gt-chips">
            {GIRL_TAGS.filter(t => tagCounts[t.key] > 0).map(t => (
              <button key={t.key}
                className={`gt-chip ${girlTagFilter.includes(t.key) ? "active" : ""}`}
                onClick={() => toggleGirlTag(t.key)}>
                {t.label} <span className="n">{tagCounts[t.key]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="sections">
          {AREAS.map(area => (
            <AreaSection
              key={area.key}
              area={area}
              locations={byArea[area.key] || []}
              collapsed={collapsed[area.key]}
              onToggle={() => toggleCollapse(area.key)}
              rowProps={loc => ({
                selected: selectedId === loc.id,
                isFav: favs.includes(loc.id),
                isVisited: visited.includes(loc.id),
                order: getOrder(loc.id),
                onClick: () => { setSelectedId(loc.id); setDrawerOpen(true); setSbOpen(false); },
                onFav: () => toggleFav(loc.id)
              })}
            />
          ))}
          {filtered.length === 0 && (
            <div className="empty-state">
              <div className="ico">∅</div>
              <div className="ttl">沒有符合的地點</div>
              <div className="sub">Try adjusting filters</div>
            </div>
          )}
        </div>
      </aside>

      {/* Map */}
      <div className="map-wrap">
        <button className="mobile-toggle" onClick={() => setSbOpen(v => !v)}>☰</button>
        <div id="map" ref={mapRef} />

        <div className="map-controls">
          <button className="mc-btn" onClick={() => {
            if (filtered.length === 0) return;
            const b = L.latLngBounds(filtered.map(l => [l.lat, l.lng]));
            mapInst.current.fitBounds(b, { padding: [60, 60] });
          }} title="全景">⊡</button>
          <button className={`mc-btn ${itinMode ? "active" : ""}`} onClick={() => setItinMode(v => !v)} title="行程">◇</button>
          <button className="mc-btn" onClick={() => setTheme(t => t === "dark" ? "light" : "dark")} title="明暗">
            {theme === "dark" ? "☾" : "☀"}
          </button>
        </div>

        {itinMode && (
          <div className="itin-banner">
            <span>行程規劃</span>
            <span className="num">{itinerary.length}</span>
            <span>站</span>
            {itinerary.length >= 2 && <span>· 虛線為路線</span>}
            <button className="action" onClick={() => setItinerary([])}>清空</button>
            <button className="action primary" onClick={() => setItinMode(false)}>完成</button>
          </div>
        )}

        <div className="legend">
          <div className="lg-title">Area</div>
          {AREAS.map(a => (
            <div key={a.key} className="legend-item">
              <span className="sw" style={{ background: a.color }} />
              <span>{a.key}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Drawer */}
      <Drawer
        loc={selectedLoc}
        open={drawerOpen && !!selectedLoc}
        isFav={selectedLoc && favs.includes(selectedLoc.id)}
        isVisited={selectedLoc && visited.includes(selectedLoc.id)}
        inItin={selectedLoc && itinerary.includes(selectedLoc.id)}
        order={selectedLoc && getOrder(selectedLoc.id)}
        rating={selectedLoc ? (ratings[selectedLoc.id] || selectedLoc.rating || 0) : 0}
        onClose={() => setDrawerOpen(false)}
        onFav={() => selectedLoc && toggleFav(selectedLoc.id)}
        onVisit={() => selectedLoc && toggleVisited(selectedLoc.id)}
        onItin={() => selectedLoc && toggleItin(selectedLoc.id)}
        onRate={v => selectedLoc && setRating(selectedLoc.id, v)}
        bookings={bookings}
        bookingNotes={bookingNotes}
        onToggleBook={toggleBook}
        onEditNote={editBookNote}
        onPhoto={(photos, girlName, locName) => setLightbox({ photos, index: 0, caption: `${locName} · ${girlName}` })}
      />

      {lightbox && (
        <Lightbox
          photos={lightbox.photos}
          index={lightbox.index}
          caption={lightbox.caption}
          onClose={() => setLightbox(null)}
          onIndex={i => setLightbox(lb => ({ ...lb, index: i }))}
        />
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

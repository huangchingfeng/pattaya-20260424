/* global React, ReactDOM, L */
const { useState, useEffect, useMemo, useRef, useCallback } = React;

// ================== Persistent state helpers ==================
const ls = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
};

// ================== Pin SVG ==================
function makePinIcon({ color, label, selected, visited, isFav, order }) {
  const classes = ["pin"];
  if (selected) classes.push("selected");
  if (visited) classes.push("visited");
  const favHtml = isFav ? `<div class="fav-star">❤️</div>` : "";
  const orderHtml = order ? `<div class="order-badge">${order}</div>` : "";
  const html = `
    <div class="${classes.join(" ")}">
      <svg viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 0 C6.7 0 0 6.7 0 15 C0 26 15 40 15 40 C15 40 30 26 30 15 C30 6.7 23.3 0 15 0 Z"
              fill="${color}" stroke="#fff" stroke-width="1.5"/>
        <circle cx="15" cy="15" r="5" fill="#fff" fill-opacity="0.3"/>
      </svg>
      <span class="pin-label">${label}</span>
      ${favHtml}${orderHtml}
    </div>`;
  return L.divIcon({
    html, className: "",
    iconSize: [30, 40],
    iconAnchor: [15, 36],
    popupAnchor: [0, -36]
  });
}

// ================== Stars ==================
function Stars({ value = 0, max = 5, onChange }) {
  return (
    <span className="stars">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={i < value ? "" : "empty"}
          style={{ cursor: onChange ? "pointer" : "default" }}
          onClick={onChange ? () => onChange(i + 1 === value ? 0 : i + 1) : undefined}
        >★</span>
      ))}
    </span>
  );
}

// ================== Girl card ==================
function GirlCard({ girl, onPhoto }) {
  const hasPhoto = girl.photos && girl.photos.length > 0;
  return (
    <div className="girl">
      <div className="girl-photo" onClick={hasPhoto ? () => onPhoto(girl.photos, girl.name) : undefined}>
        {hasPhoto
          ? <><img src={girl.photos[0]} alt={girl.name} loading="lazy" />
             {girl.photos.length > 1 && <span className="count">+{girl.photos.length - 1}</span>}</>
          : <span>👤</span>}
      </div>
      <div className="girl-body">
        <div className="girl-name">
          <span>{girl.name}</span>
          {girl.tag && <span className="girl-tag">{girl.tag}</span>}
        </div>
        {(girl.age || girl.build || girl.price) && (
          <div className="girl-info">
            {girl.age && <span>{girl.age} 歲</span>}
            {girl.build && <span>{girl.build}</span>}
            {girl.price && <span>💰 {girl.price}</span>}
          </div>
        )}
        {girl.desc && <div className="girl-desc">{girl.desc}</div>}
        {girl.hours && <div className="girl-hours">🕐 {girl.hours}</div>}
        {girl.contact && <div className="girl-contact">✉️ {girl.contact}</div>}
      </div>
    </div>
  );
}

// ================== Popup content ==================
function PopupContent({ loc, isFav, isVisited, inItin, order, rating, onFav, onVisit, onItin, onRate, onPhoto }) {
  const typeMeta = window.TYPE_META[loc.type];
  return (
    <div className="pop">
      <div className="pop-header">
        <div className="pop-title">
          <span>{typeMeta.icon}</span>
          <span>{loc.name}</span>
        </div>
        <div className="pop-meta">
          <span>{typeMeta.label}</span>
          <span className="sep">·</span>
          <span>{loc.area}</span>
          <span className="sep">·</span>
          <Stars value={rating} onChange={onRate} />
        </div>
        {loc.theme && (
          <div style={{ fontSize: 11, color: "var(--accent)", marginTop: 4, fontWeight: 500 }}>
            {loc.theme}
          </div>
        )}
        {loc.address && <div className="pop-address">📍 {loc.address}</div>}
        {loc.note && <div className="pop-note">💬 {loc.note}</div>}
        {loc.contact && <div style={{ fontSize: 11, color: "var(--accent)", marginTop: 6 }}>✉️ {loc.contact}</div>}
      </div>
      <div className="pop-body">
        {loc.girls && loc.girls.length > 0 ? (
          <>
            <div className="girls-label">女生資訊 ({loc.girls.length})</div>
            {loc.girls.map((g, i) => <GirlCard key={i} girl={g} onPhoto={onPhoto} />)}
          </>
        ) : (
          <div className="no-girls">尚未認識妹子 — 待探索</div>
        )}
      </div>
      <div className="pop-tools">
        <button className={`tool-btn ${isFav ? "active" : ""}`} onClick={onFav} title="我的最愛">
          {isFav ? "❤️" : "🤍"} 最愛
        </button>
        <button className={`tool-btn ${isVisited ? "active" : ""}`} onClick={onVisit}>
          {isVisited ? "✓" : "○"} 去過
        </button>
        <button className={`tool-btn ${inItin ? "active" : ""}`} onClick={onItin}>
          {inItin ? `📍 #${order}` : "＋ 行程"}
        </button>
      </div>
    </div>
  );
}

// ================== List item ==================
function ListItem({ loc, selected, isFav, isVisited, order, rating, onClick, onFav, onVisit }) {
  const typeMeta = window.TYPE_META[loc.type];
  const firstPhoto = (loc.girls || []).find(g => g.photos && g.photos[0])?.photos[0];
  const girlCount = (loc.girls || []).length;
  return (
    <div className={`list-item ${selected ? "selected" : ""} ${isVisited ? "visited" : ""}`} onClick={onClick}>
      <div className="list-thumb">
        {firstPhoto ? <img src={firstPhoto} alt="" loading="lazy" /> : <span>{typeMeta.icon}</span>}
        <span className="dot" style={{ background: typeMeta.color }} />
      </div>
      <div className="list-body">
        <div className="list-name">
          {order && <span className="order-pin">{order}</span>}
          {loc.name}
        </div>
        <div className="list-meta">
          <span>{typeMeta.label}</span>
          <span className="sep">·</span>
          <span>{loc.area}</span>
          {rating > 0 && (<><span className="sep">·</span><Stars value={rating} /></>)}
        </div>
        <div className="list-badges">
          {girlCount > 0 && <span className="badge">👤 {girlCount}</span>}
          {loc.theme && <span className="badge hot">{loc.theme}</span>}
        </div>
      </div>
      <div className="list-actions" onClick={e => e.stopPropagation()}>
        <button className={`mini-btn fav ${isFav ? "active" : ""}`} onClick={onFav} title="最愛">
          {isFav ? "❤️" : "♡"}
        </button>
        <button className={`mini-btn visit ${isVisited ? "active" : ""}`} onClick={onVisit} title="去過">
          {isVisited ? "✓" : "○"}
        </button>
      </div>
    </div>
  );
}

// ================== Lightbox ==================
function Lightbox({ photos, index, caption, onClose, onIndex }) {
  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onIndex((index - 1 + photos.length) % photos.length);
      if (e.key === "ArrowRight") onIndex((index + 1) % photos.length);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [index, photos.length]);
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

// ================== Main App ==================
function App() {
  const locations = window.LOCATIONS;

  const [theme, setTheme] = useState(() => ls.get("theme", "light"));
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [areaFilter, setAreaFilter] = useState("all");
  const [favOnly, setFavOnly] = useState(false);
  const [hideVisited, setHideVisited] = useState(false);

  const [favs, setFavs] = useState(() => ls.get("favs", []));
  const [visited, setVisited] = useState(() => ls.get("visited", []));
  const [ratings, setRatings] = useState(() => ls.get("ratings", {}));
  const [itinerary, setItinerary] = useState(() => ls.get("itinerary", []));
  const [itinMode, setItinMode] = useState(false);

  const [selectedId, setSelectedId] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markers = useRef({});
  const tileLayer = useRef(null);

  // persist
  useEffect(() => ls.set("theme", theme), [theme]);
  useEffect(() => ls.set("favs", favs), [favs]);
  useEffect(() => ls.set("visited", visited), [visited]);
  useEffect(() => ls.set("ratings", ratings), [ratings]);
  useEffect(() => ls.set("itinerary", itinerary), [itinerary]);
  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);

  // ============ Init map ============
  useEffect(() => {
    const center = [12.9310, 100.8830];
    const map = L.map(mapRef.current, { zoomControl: false, attributionControl: true }).setView(center, 14);
    L.control.zoom({ position: "bottomright" }).addTo(map);
    tileLayer.current = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(map);
    mapInstance.current = map;
    return () => map.remove();
  }, []);

  // ============ Invalidate map size when sidebar toggles ============
  useEffect(() => {
    if (mapInstance.current) {
      setTimeout(() => mapInstance.current.invalidateSize(), 350);
    }
  }, [sidebarOpen]);

  // ============ Filtering ============
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return locations.filter(loc => {
      if (typeFilter !== "all" && loc.type !== typeFilter) return false;
      if (areaFilter !== "all" && loc.area !== areaFilter) return false;
      if (favOnly && !favs.includes(loc.id)) return false;
      if (hideVisited && visited.includes(loc.id)) return false;
      if (q) {
        const hay = [loc.name, loc.area, loc.note, loc.theme, loc.address,
          ...(loc.girls || []).map(g => g.name + " " + (g.desc || ""))].join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [locations, query, typeFilter, areaFilter, favOnly, hideVisited, favs, visited]);

  const getItinOrder = (id) => {
    const idx = itinerary.indexOf(id);
    return idx >= 0 ? idx + 1 : null;
  };

  // ============ Actions ============
  const toggleFav = useCallback((id) => {
    setFavs(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
  }, []);
  const toggleVisited = useCallback((id) => {
    setVisited(v => v.includes(id) ? v.filter(x => x !== id) : [...v, id]);
  }, []);
  const toggleItin = useCallback((id) => {
    setItinerary(it => it.includes(id) ? it.filter(x => x !== id) : [...it, id]);
  }, []);
  const setRating = useCallback((id, val) => {
    setRatings(r => ({ ...r, [id]: val }));
  }, []);

  // ============ Render markers ============
  useEffect(() => {
    if (!mapInstance.current) return;
    const map = mapInstance.current;
    // remove stale
    Object.keys(markers.current).forEach(id => {
      map.removeLayer(markers.current[id]);
      delete markers.current[id];
    });
    filtered.forEach(loc => {
      const typeMeta = window.TYPE_META[loc.type];
      const order = getItinOrder(loc.id);
      const icon = makePinIcon({
        color: typeMeta.color,
        label: typeMeta.icon,
        selected: selectedId === loc.id,
        visited: visited.includes(loc.id),
        isFav: favs.includes(loc.id),
        order
      });
      const marker = L.marker([loc.lat, loc.lng], { icon }).addTo(map);
      marker.on("click", () => {
        setSelectedId(loc.id);
      });
      markers.current[loc.id] = marker;
    });
  }, [filtered, selectedId, favs, visited, itinerary]);

  // ============ Itinerary polyline ============
  const polylineRef = useRef(null);
  useEffect(() => {
    if (!mapInstance.current) return;
    if (polylineRef.current) {
      mapInstance.current.removeLayer(polylineRef.current);
      polylineRef.current = null;
    }
    if (itinMode && itinerary.length >= 2) {
      const pts = itinerary
        .map(id => locations.find(l => l.id === id))
        .filter(Boolean)
        .map(l => [l.lat, l.lng]);
      polylineRef.current = L.polyline(pts, {
        color: "#1a73e8", weight: 4, opacity: 0.7, dashArray: "8 6"
      }).addTo(mapInstance.current);
    }
  }, [itinerary, itinMode, locations]);

  // ============ Popup ============
  const popupRef = useRef(null);
  useEffect(() => {
    if (!selectedId || !mapInstance.current) return;
    const loc = locations.find(l => l.id === selectedId);
    if (!loc) return;
    // fly to — smooth pan without forced zoom change
    const currentZoom = mapInstance.current.getZoom();
    const targetZoom = currentZoom < 15 ? 15 : currentZoom;
    mapInstance.current.flyTo([loc.lat, loc.lng], targetZoom, { duration: 0.4, easeLinearity: 0.5 });

    // build DOM via React portal approach
    const container = document.createElement("div");
    const root = ReactDOM.createRoot(container);

    const renderPop = () => {
      root.render(
        <PopupContent
          loc={loc}
          isFav={favs.includes(loc.id)}
          isVisited={visited.includes(loc.id)}
          inItin={itinerary.includes(loc.id)}
          order={getItinOrder(loc.id)}
          rating={ratings[loc.id] || loc.rating || 0}
          onFav={() => toggleFav(loc.id)}
          onVisit={() => toggleVisited(loc.id)}
          onItin={() => toggleItin(loc.id)}
          onRate={(v) => setRating(loc.id, v)}
          onPhoto={(photos, name) => setLightbox({ photos, index: 0, caption: `${loc.name} — ${name}` })}
        />
      );
    };
    renderPop();

    const marker = markers.current[selectedId];
    if (!marker) return;

    const popup = L.popup({
      closeButton: true, autoPan: true, autoPanPadding: [60, 60],
      maxWidth: 300, minWidth: 280,
      keepInView: true,
      autoPanPaddingTopLeft: [60, 80],
      autoPanPaddingBottomRight: [60, 60]
    }).setLatLng(marker.getLatLng()).setContent(container).openOn(mapInstance.current);

    popupRef.current = { popup, root, renderPop };

    popup.on("remove", () => {
      setTimeout(() => root.unmount(), 0);
      setSelectedId(prev => prev === selectedId ? null : prev);
    });

    return () => {
      mapInstance.current.closePopup(popup);
    };
  }, [selectedId]);

  // re-render popup content when relevant state changes
  useEffect(() => {
    if (popupRef.current && selectedId) {
      popupRef.current.renderPop();
    }
  }, [favs, visited, itinerary, ratings, selectedId]);

  // ============ Counts ============
  const typeCounts = useMemo(() => {
    const c = { all: locations.length };
    Object.keys(window.TYPE_META).forEach(k => c[k] = 0);
    locations.forEach(l => { c[l.type] = (c[l.type] || 0) + 1; });
    return c;
  }, [locations]);

  const areas = useMemo(() => {
    const set = new Set(locations.map(l => l.area));
    return Array.from(set);
  }, [locations]);

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sb-header">
          <div className="sb-title">
            <div>
              <h1>芭堤雅夜生活地圖</h1>
              <div className="sub">{filtered.length} / {locations.length} 個地點 · 4/3–4/6</div>
            </div>
            <div className="sb-actions">
              <button className={`icon-btn ${favOnly ? "active" : ""}`} onClick={() => setFavOnly(v => !v)} title="只看最愛">
                {favOnly ? "❤️" : "♡"}
              </button>
              <button className={`icon-btn ${hideVisited ? "active" : ""}`} onClick={() => setHideVisited(v => !v)} title="隱藏已去過">
                👣
              </button>
              <button className={`icon-btn ${itinMode ? "active" : ""}`} onClick={() => setItinMode(v => !v)} title="行程規劃">
                🗺️
              </button>
              <button className="icon-btn" onClick={() => setTheme(t => t === "light" ? "dark" : "light")} title="夜間模式">
                {theme === "light" ? "🌙" : "☀️"}
              </button>
            </div>
          </div>
          <div className="search">
            <span className="search-icon">🔍</span>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="搜尋店名、妹子、區域..."
            />
            {query && <span className="clear" onClick={() => setQuery("")}>✕</span>}
          </div>
        </div>

        <div className="chips">
          <button className={`chip ${typeFilter === "all" ? "active" : ""}`} onClick={() => setTypeFilter("all")}>
            全部 <span className="count">{typeCounts.all}</span>
          </button>
          {Object.entries(window.TYPE_META).map(([k, m]) => (
            <button key={k} className={`chip ${typeFilter === k ? "active" : ""}`} onClick={() => setTypeFilter(k)}>
              {m.icon} {m.label} <span className="count">{typeCounts[k] || 0}</span>
            </button>
          ))}
        </div>
        <div className="chips" style={{ borderBottom: "1px solid var(--border)" }}>
          <button className={`chip ${areaFilter === "all" ? "active" : ""}`} onClick={() => setAreaFilter("all")}>
            全區
          </button>
          {areas.map(a => (
            <button key={a} className={`chip ${areaFilter === a ? "active" : ""}`} onClick={() => setAreaFilter(a)}>
              {a}
            </button>
          ))}
        </div>

        <div className="list">
          {filtered.length === 0
            ? <div className="empty">沒有符合條件的地點</div>
            : filtered.map(loc => (
                <ListItem
                  key={loc.id}
                  loc={loc}
                  selected={selectedId === loc.id}
                  isFav={favs.includes(loc.id)}
                  isVisited={visited.includes(loc.id)}
                  order={getItinOrder(loc.id)}
                  rating={ratings[loc.id] || loc.rating || 0}
                  onClick={() => {
                    setSidebarOpen(false);
                    // delay selection so map has time to resize after sidebar closes
                    setTimeout(() => setSelectedId(loc.id), 300);
                  }}
                  onFav={() => toggleFav(loc.id)}
                  onVisit={() => toggleVisited(loc.id)}
                />
              ))}
        </div>
      </aside>

      {/* Map */}
      <div className="map-wrap">
        <button className="mobile-fab" onClick={() => setSidebarOpen(v => !v)}>☰</button>
        <div id="map" ref={mapRef} />
        {itinMode && (
          <div className="itin-banner">
            🗺️ 行程模式：{itinerary.length} 站
            {itinerary.length >= 2 && " · 虛線為路線"}
            <button className="exit" onClick={() => setItinerary([])}>清空</button>
            <button className="exit" onClick={() => setItinMode(false)} style={{ background: "var(--fg-muted)" }}>關閉</button>
          </div>
        )}
        <div className="map-ctrls">
          <button className="mc-btn" onClick={() => {
            if (filtered.length === 0) return;
            const bounds = L.latLngBounds(filtered.map(l => [l.lat, l.lng]));
            mapInstance.current.fitBounds(bounds, { padding: [60, 60] });
          }} title="自動縮放">⤢</button>
        </div>
      </div>

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

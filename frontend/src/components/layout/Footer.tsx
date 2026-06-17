export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "24px 0" }}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <span style={{ fontSize: 13, color: "#4a5568" }}>
          Predictor 26 — FIFA World Cup 2026
        </span>
        <div style={{ display: "flex", gap: 20 }}>
          {["Rules", "Privacy", "Contact"].map((l) => (
            <a key={l} href="#" style={{ fontSize: 13, color: "#4a5568" }}
               className="hover:text-slate-400 transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

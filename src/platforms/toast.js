// Minimal functional toast. Visual design is refined by /impeccable in the
// feedback design task; this keeps the pipeline working end-to-end.
export function showToast(doc, summary) {
  const prev = doc.getElementById("dsh-toast");
  if (prev) prev.remove();

  const el = doc.createElement("div");
  el.id = "dsh-toast";
  el.textContent = `disenshittify · ${summary.activeHitCount} cleanups · ${summary.totalHidden} hidden`;
  el.setAttribute(
    "style",
    [
      "position:fixed",
      "bottom:16px",
      "right:16px",
      "z-index:2147483647",
      "background:#1f6feb",
      "color:#fff",
      "padding:8px 12px",
      "border-radius:8px",
      "font:13px system-ui,sans-serif",
      "box-shadow:0 6px 20px rgba(0,0,0,.25)",
    ].join(";")
  );
  (doc.body || doc.documentElement).appendChild(el);
  setTimeout(() => el.remove(), 2600);
}

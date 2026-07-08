// On-page toast confirming cleanups ran. Rendered inside a Shadow DOM so the
// host page's CSS can never touch it, and vice versa. Self-contained, CSP-safe,
// built with DOM APIs (no innerHTML). Follows OS light/dark.
const TOAST_MS = 2600;

const STYLE = `
  :host { all: initial; }
  .toast {
    --bg: oklch(0.99 0.004 258);
    --border: oklch(0.9 0.008 258);
    --text: oklch(0.28 0.02 258);
    --muted: oklch(0.55 0.02 258);
    --accent: oklch(0.58 0.19 258);
    display: flex; align-items: center; gap: 10px;
    padding: 9px 13px 9px 11px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 11px;
    box-shadow: 0 10px 34px oklch(0.2 0.02 258 / 0.24);
    font: 500 12.5px/1.2 system-ui, -apple-system, "Segoe UI", sans-serif;
    color: var(--text);
    white-space: nowrap;
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 200ms cubic-bezier(0.22,1,0.36,1),
                transform 220ms cubic-bezier(0.22,1,0.36,1);
  }
  .toast.in { opacity: 1; transform: translateY(0); }
  .mark {
    width: 15px; height: 15px; flex: none; border-radius: 4px;
    background: var(--accent);
    -webkit-mask: linear-gradient(45deg, transparent 44%, #000 44% 56%, transparent 56%),
      linear-gradient(-45deg, transparent 44%, #000 44% 56%, transparent 56%);
    mask: linear-gradient(45deg, transparent 44%, #000 44% 56%, transparent 56%),
      linear-gradient(-45deg, transparent 44%, #000 44% 56%, transparent 56%);
  }
  .muted { color: var(--muted); font-weight: 400; }
  @media (prefers-color-scheme: dark) {
    .toast {
      --bg: oklch(0.21 0.012 258);
      --border: oklch(0.33 0.015 258);
      --text: oklch(0.93 0.012 258);
      --muted: oklch(0.68 0.02 258);
      --accent: oklch(0.66 0.17 258);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .toast { transition: opacity 120ms linear; transform: none; }
  }
`;

export function showToast(doc, summary) {
  const id = "dsh-toast-host";
  const old = doc.getElementById(id);
  if (old) old.remove();

  const host = doc.createElement("div");
  host.id = id;
  host.style.cssText =
    "position:fixed;right:18px;bottom:18px;z-index:2147483647;pointer-events:none;";

  const root = host.attachShadow({ mode: "open" });

  const style = doc.createElement("style");
  style.textContent = STYLE;
  root.appendChild(style);

  const toast = doc.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");

  const mark = doc.createElement("span");
  mark.className = "mark";

  const text = doc.createElement("span");
  const count = doc.createElement("b");
  count.textContent = String(summary.activeHitCount);
  const word = summary.activeHitCount === 1 ? " cleanup active" : " cleanups active";
  const muted = doc.createElement("span");
  muted.className = "muted";
  muted.textContent = ` · ${summary.totalHidden} hidden`;
  text.append(count, doc.createTextNode(word), muted);

  toast.append(mark, text);
  root.appendChild(toast);
  (doc.body || doc.documentElement).appendChild(host);

  requestAnimationFrame(() => toast.classList.add("in"));
  setTimeout(() => {
    toast.classList.remove("in");
    setTimeout(() => host.remove(), 260);
  }, TOAST_MS);
}

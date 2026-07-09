// Monochrome (currentColor) icons for the popup tab bar, one per platform plus
// the general-settings gear. Built with DOM APIs (no innerHTML) so web-ext lint
// stays clean. To add a platform, add its entry here and a label below.
const NS = "http://www.w3.org/2000/svg";

const ICONS = {
  youtube: [
    "M21.58 7.19c-.23-.86-.9-1.53-1.76-1.76C18.25 5 12 5 12 5s-6.25 0-7.82.43c-.86.23-1.53.9-1.76 1.76C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.9 1.53 1.76 1.76C5.75 19 12 19 12 19s6.25 0 7.82-.43c.86-.23 1.53-.9 1.76-1.76C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z",
  ],
  twitter: [
    "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z",
  ],
  settings: [
    "M19.14 12.94a7.49 7.49 0 0 0 0-1.88l2-1.58a.5.5 0 0 0 .12-.61l-1.92-3.32a.5.5 0 0 0-.61-.22l-2.39 1a7.28 7.28 0 0 0-1.62-.94l-.36-2.54a.5.5 0 0 0-.5-.42h-3.84a.5.5 0 0 0-.5.42L8.8 4.94a7.28 7.28 0 0 0-1.62.94l-2.39-1a.5.5 0 0 0-.61.22L2.26 8.42a.5.5 0 0 0 .12.61l2 1.58a7.49 7.49 0 0 0 0 1.88l-2 1.58a.5.5 0 0 0-.12.61l1.92 3.32a.5.5 0 0 0 .61.22l2.39-1a7.28 7.28 0 0 0 1.62.94l.36 2.54a.5.5 0 0 0 .5.42h3.84a.5.5 0 0 0 .5-.42l.36-2.54a7.28 7.28 0 0 0 1.62-.94l2.39 1a.5.5 0 0 0 .61-.22l1.92-3.32a.5.5 0 0 0-.12-.61zM12 15.5A3.5 3.5 0 1 1 15.5 12 3.5 3.5 0 0 1 12 15.5z",
  ],
};

export const PLATFORM_LABELS = {
  youtube: "YouTube",
  twitter: "X",
};

export function makeIcon(doc, name) {
  const paths = ICONS[name] || ICONS.settings;
  const svg = doc.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "18");
  svg.setAttribute("height", "18");
  svg.setAttribute("fill", "currentColor");
  svg.setAttribute("aria-hidden", "true");
  for (const d of paths) {
    const path = doc.createElementNS(NS, "path");
    path.setAttribute("d", d);
    svg.appendChild(path);
  }
  return svg;
}

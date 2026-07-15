# AMO listing — copy & submission notes

Draft content for the addons.mozilla.org (AMO) Developer Hub submission of
**disenshittify**. Paste the fields below into the listing; do the source and
screenshot steps as noted.

---

## Add-on name

disenshittify

## Summary (max 250 chars)

Remove the "enshittification" from YouTube, X/Twitter, and LinkedIn: hide Shorts,
ad and promoted posts, algorithmic feeds, upsells, and clutter. Each removal is
its own toggle. Default the feeds to newest-first. No tracking, no data collected.

## Categories

- Social & Communication (primary)
- Privacy & Security (secondary, if a second is allowed)

## Description (markdown)

disenshittify strips the parts of YouTube, X/Twitter, and LinkedIn that exist to
serve the platform instead of you. Every removal is an independent toggle in the
popup, grouped by site, and it reacts live as you browse.

**YouTube**
- Hide the home recommendation feed
- Hide Shorts (feed, search, and the sidebar entry)
- Hide sidebar & end-screen recommendations
- Hide comments, ads, Explore, "More from YouTube", subscription recs
- Hide the "Explore more topics" shelf

**X / Twitter**
- Hide ads, Premium upsells, sidebar widgets (trends / who to follow), Grok, chat,
  and verified badges
- Default the timeline to Following (Recent or Popular)
- Desktop layout tweaks: centered timeline, floating post button, compact search

**LinkedIn**
- Hide the "Grow your business faster" Page upsell
- Hide the "Today's puzzles" and "Add to your feed" boxes
- Hide feed posts injected from your own activity, from reactions/follows/comments,
  and "Recommended for you" suggestions
- Replace Promoted (ad) posts with an empty placeholder (so the feed doesn't
  collapse and re-trigger infinite scroll)
- Default the feed to "Most recent first"

**Privacy:** no data is collected, transmitted, or sold. No analytics, no network
requests. Your toggle settings live in the browser's own extension storage. See
the privacy policy.

## Support / homepage

- Homepage & issues: https://github.com/neverbot/disenshittify
- Support email: <fill in>

## Privacy policy

Paste the contents of `privacy.md` (repo root) into the AMO "Privacy Policy"
field.

## License

MIT (see `LICENSE`).

---

## Source-code submission (required)

AMO requires reviewable source because the shipped JS is bundled/minified by
esbuild. Provide the source and build instructions:

- **Repository:** https://github.com/neverbot/disenshittify (public) — or upload a
  zip of the repo (excluding `node_modules/`, `dist/`, `web-ext-artifacts/`).
- **Build environment:** Node.js (same major as CI), npm.
- **Build steps:**
  ```
  npm ci
  npm run build     # esbuild bundles src/ -> dist/ (see esbuild.config.mjs)
  ```
  The submitted add-on zip is produced by `npm run package`
  (`web-ext build --source-dir dist`), which zips exactly the `dist/` output.
- **What maps to what:** `dist/platforms/*.js`, `dist/background/background.js`,
  and `dist/popup/popup.js` are the esbuild bundles of the corresponding
  `src/**` entry points listed in `esbuild.config.mjs`. Static files
  (`manifest.json`, `icons/`, `popup/popup.html`, `popup/popup.css`) are copied
  verbatim.

## The upload artifact

`web-ext-artifacts/disenshittify-<version>.zip` from `npm run package`
(currently `disenshittify-1.0.0.zip`). Upload this as a **Listed** add-on.

## Screenshots (owner action — capture before uploading)

AMO shows 1–10 screenshots. Suggested set (1280×800 or similar, light theme):

1. The popup open on the YouTube tab, toggles visible.
2. YouTube home or search with Shorts/ads hidden (before/after is nice).
3. X/Twitter timeline with sidebar widgets + ads gone, Following selected.
4. LinkedIn feed with promoted placeholders + upsells removed.
5. The popup's general/settings (gear) tab.

Keep them current with the shipped UI; the popup visual design is owned by the
`/impeccable` workflow.

# Disenshittify

A Firefox extension that removes "enshittification" features from platforms —
the recommendation walls, Shorts, infinite feeds, upsells, and other
distractions that platforms add to serve themselves rather than their users.

> The name nods to [enshittification](https://en.wikipedia.org/wiki/Enshittification),
> the term coined by Cory Doctorow.

## Status

**Live and growing.** Three platforms ship today, each with its own tab in the
popup. Toggles are per-feature; a master switch disables the whole addon, and a
per-navigation toast plus toolbar badge report how much was hidden.

### YouTube

Hide the home feed, Shorts (feed and search), recommendations (sidebar +
end-screen), comments, ads, Explore, "More from YouTube", subscription
recommendations, and the "Explore more topics" shelf.

### X / Twitter

Hide ads, Premium upsells, sidebar widgets, Grok, chat, and verified badges;
default the timeline to Following; plus always-on desktop layout tweaks
(centered timeline, floating post button, compact search).

### LinkedIn

Hide the "Grow your business faster" Page upsell (Try Premium + Advertise), the
right-sidebar "Today's puzzles" and "Add to your feed" boxes, and feed posts
injected from your own activity, from someone's reaction/follow/comment, as
"Recommended for you" suggestions, or as Promoted ads (swapped for an empty
placeholder so the feed doesn't collapse); and default the feed to "Most recent
first" instead of "Most relevant first".

## Architecture (in brief)

A **feature registry** is the single source of truth. Each feature is a
self-contained module that declares how it applies itself — declarative CSS for
simple cases, an optional JS hook for complex ones. A common, platform-agnostic
**engine** reads the enabled features from storage and applies them, reacting to
changes live. The popup is generated from the same registry, so adding a feature
also adds its toggle. Adding a platform is a new `features/<platform>/` folder, a
`platforms/<platform>.js` entry, and a manifest match.

Built with Manifest V3, plain JavaScript, [esbuild](https://esbuild.github.io/)
for bundling, [web-ext](https://github.com/mozilla/web-ext) for running, linting,
and packaging, and [Vitest](https://vitest.dev/) for unit tests.

## Development

```bash
npm install
npm run dev             # esbuild --watch + web-ext run (Firefox with auto-reload)
npm test                # Vitest (engine + registry)
npm run lint            # web-ext lint
npm run build           # bundle src/ -> dist/
npm run package         # build + zip dist/ into web-ext-artifacts/ (the add-on)
npm run package:source  # zip the tracked sources (for AMO source review)
```

## Build instructions (for reviewers)

The published add-on is **bundled** with [esbuild](https://esbuild.github.io/):
the JavaScript files inside the add-on package are generated, not written by
hand. There is **no minification and no obfuscation** — the bundles keep the
original identifiers and carry `// src/…` comments marking where each block came
from. Nothing is generated or evaluated at runtime in the user's browser; the
whole build happens beforehand on the developer's machine.

**Requirements:** Node.js 20 or newer, and npm. No other tooling. Built and
verified on macOS; nothing in the build is platform-specific.

**Steps:**

```bash
npm ci        # installs the exact versions pinned in package-lock.json
npm run build # runs esbuild.config.mjs, producing dist/
```

`dist/` is byte-for-byte the content of the published add-on package, which is
produced by `npm run package` (`web-ext build --source-dir dist`).

**What maps to what:**

| File in the add-on | Origin |
| --- | --- |
| `platforms/youtube.js`, `platforms/twitter.js`, `platforms/linkedin.js` | esbuild bundles of the matching `src/platforms/*.js` entry points |
| `background/background.js` | esbuild bundle of `src/background/background.js` |
| `popup/popup.js` | esbuild bundle of `src/popup/popup.js` |
| `manifest.json`, `icons/`, `popup/popup.html`, `popup/popup.css` | copied verbatim |

The entry points are declared in `esbuild.config.mjs`.

## License

[MIT](LICENSE) © neverbot

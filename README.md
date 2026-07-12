# disenshittify

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

Hide the home feed, Shorts, recommendations (sidebar + end-screen), comments,
ads, Explore, "More from YouTube", and subscription recommendations.

### X / Twitter

Hide ads, Premium upsells, sidebar widgets, Grok, chat, and verified badges;
default the timeline to Following; plus always-on desktop layout tweaks
(centered timeline, floating post button, compact search).

### LinkedIn

Hide the "Grow your business faster" Page upsell (Try Premium + Advertise), the
right-sidebar "Today's puzzles" and "Add to your feed" boxes, and feed posts
injected from your own activity, from someone's reaction/follow/comment, or as
Promoted ads.

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
npm run dev     # esbuild --watch + web-ext run (Firefox with auto-reload)
npm test        # Vitest (engine + registry)
npm run lint    # web-ext lint
npm run build   # production build + packaged .xpi
```

## License

[MIT](LICENSE) © neverbot

# disenshittify

A Firefox extension that removes "enshittification" features from platforms —
the recommendation walls, Shorts, infinite feeds, and other distractions that
platforms add to serve themselves rather than their users.

> The name nods to [enshittification](https://en.wikipedia.org/wiki/Enshittification),
> the term coined by Cory Doctorow.

## Status

🚧 **Early development.** The MVP targets **YouTube**; the architecture is built
to grow to more features and more platforms.

### Planned MVP (YouTube)

- Hide the home-page recommendation feed
- Hide Shorts
- Hide sidebar recommended videos
- Hide the comments section

Each is an independent toggle in the popup.

## Architecture (in brief)

A **feature registry** is the single source of truth. Each feature is a
self-contained module that declares how it applies itself — declarative CSS for
simple cases, an optional JS hook for complex ones. A common, platform-agnostic
**engine** reads the enabled features from storage and applies them, reacting to
changes live. The popup is generated from the same registry, so adding a feature
also adds its toggle.

Built with Manifest V3, plain JavaScript, [esbuild](https://esbuild.github.io/)
for bundling, and [web-ext](https://github.com/mozilla/web-ext) for running,
linting, and packaging.

## Development

```bash
npm install
npm run dev     # esbuild --watch + web-ext run (Firefox with auto-reload)
npm run lint    # web-ext lint
npm run build   # production build + packaged .xpi
```

## License

[MIT](LICENSE) © neverbot

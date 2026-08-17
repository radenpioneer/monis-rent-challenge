# Monis Workspace Designer

A visual configurator where someone temporarily living in Bali composes a rentable
workspace — desk, chair, monitors, accessories — inside a stylized room scene, and
sees what it costs for the period they need it.

All pricing is demo pricing. Nothing here places a real booking.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Where things live

| Path             | What it holds                                                  |
| ---------------- | -------------------------------------------------------------- |
| `src/catalog/`   | Static Products and the hand-authored SVG that draws each one   |
| `src/workspace/` | Workspace types, the reducer, and the scene's Zones             |
| `src/scene/`     | The room and the projection of Positions into it                |
| `src/ui/`        | Panels, controls and the React wiring above them                |
| `CONTEXT.md`     | The domain glossary — binding vocabulary for the whole project  |
| `docs/adr/`      | Architectural decisions, with the alternatives that were weighed |
| `.scratch/`      | The spec and the implementation tickets                          |

`src/workspace/` and `src/pricing/` import nothing from React, so the product rules
stay readable and exercisable without running the app.

## Approach, trade-offs, and what more time would buy

Written up at ship time — see `.scratch/workspace-designer/issues/16-ship.md`.

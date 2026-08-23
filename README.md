# Monis Workspace Designer

A visual configurator for a temporary Bali workspace. Instead of assembling a
cart from a catalog, a renter starts with a useful room, changes the furniture
and equipment in it, sees a live Setup rate, chooses delivery details, then
reviews a simulated rental.

All prices are demo pricing. No booking, payment, availability check, or real
Monis order is created.

## Approach

The workspace is the shopping interface. A usable starter setup makes the first
screen intelligible immediately, while constrained placement lets someone
experiment without turning the product into floor-planning software. The room
stays visually dominant; the catalog rail and price help someone decide without
competing with it.

## Amendments carried into the build

The PRD amendments settled a few details that materially shaped the result:
Product is the authority for the catalog's real product names and descriptors;
the catalog rail moves below the scene at the large breakpoint instead of
becoming a bottom sheet; and Product plus Design define the visual identity.
The persisted Rental also follows the amended nested shape, including a nullable
delivery date, rather than being flattened into the Workspace.

## Product decisions

- A desk and chair always exist. They are swapped, never removed, so the room
  never becomes an unhelpful empty canvas.
- Monitors and accessories are added by tap; drag is an enhancement, not a
  prerequisite. Two monitors are the maximum and the third refusal explains why.
- The Setup rate is visible while the Workspace changes. It is distinct from the
  Quote, which adds Duration and a deliberately mocked delivery fee.
- Review and confirmation are simulated. The success screen explicitly says no
  real booking happened.
- Real Monis product names and descriptors are used where known. The Compact
  Task Chair and Plant are marked as concept items because Monis does not rent
  them today.

## Design decisions

The interface is a quiet paper frame around a warm illustrated room: Inter,
near-black text, warm white surfaces, hairline borders, and sparse cream fills.
Colour belongs to the room, not the application chrome. The scene is one inline
SVG with one viewBox, so it preserves its 2.5D composition as the layout adapts.

Night view changes the scene only. It darkens the room, lights present monitors,
and gives the Smart LED Desk Lamp 1S a warm desk pool when it has been added.
The application UI remains light.

## Technical decisions

Next.js 16, React 19, Tailwind CSS 4, and TypeScript provide the application
shell. The domain remains deliberately small and separated:

| Path | Responsibility |
| --- | --- |
| `src/catalog/` | Static Products and their hand-authored SVG assets |
| `src/workspace/` | Workspace state, reducer, constraints, persistence, and scene Zones |
| `src/pricing/` | Pure Setup rate and Quote calculations |
| `src/scene/` | Room rendering, projection, selection, and pointer interaction |
| `src/ui/` | Panels, forms, and route-level React wiring |

`src/workspace/` and `src/pricing/` import nothing from React. Product rules and
pricing therefore remain pure, readable, and independently exercisable. Object
positions are normalized coordinates projected into named Zones; a desk swap
preserves positions because the desktop Zone does not change.

## Trade-offs

- This is a concept, so delivery fees and all pricing are invented and clearly
  labelled. Real inventory and availability are out of scope.
- There is no collision physics. Bounded Zones, sensible defaults, fixed layering,
  and optional repositioning keep the room legible without adding a floor-plan
  engine.
- Returning visitors see the starter Workspace for one server-rendered frame
  before local persistence restores their saved Rental. A visible useful room is
  preferable to withholding the first paint.
- Duration ranges are currently both 1–12, so the reducer keeps the documented
  reset guard even though no valid UI state reaches it today.

## What more time would buy

More time would go to real availability and delivery data, stronger visual
regression coverage, keyboard controls for every movable accessory, and usability
testing with remote workers in Bali. Authentication, payment, and transactional
booking would remain a separate product decision rather than an extension of this
concept.

## Run and verify locally

```bash
npm ci
npm run dev
npm run typecheck
npm run lint
npm run build
```

Open [http://localhost:3000](http://localhost:3000) after starting the dev server.

## Deployment

Vercel builds this Next.js repository directly through its native Git integration;
there is no GitHub Actions deployment workflow or deployment secret to maintain.
Import the GitHub repository in Vercel and leave the detected Next.js settings in
place. Vercel then builds each pull request as a Preview and deploys `main` to
Production automatically.

The project has no required Vercel environment variables. Its build command is
the standard `npm run build`; Vercel installs the locked dependencies before
running it.

The repository must also grant `desent-bot` read collaborator access before
challenge submission.

# Monis Workspace Designer

A visual configurator where someone temporarily living in Bali composes a rentable workspace — desk, chair, monitors, accessories — inside a stylized room scene, and sees what it costs for the period they need it.

## Language

### Catalog

**Product**:
A static catalog entry that can be rented. Never mutated by the app.
_Avoid_: Item, SKU, listing

**Category**:
The grouping a Product belongs to for browsing: desk, chair, monitor, or accessory.

**Placement**:
The rule describing where a Product lives in the scene — fixed, floor, or desktop. A property of the Product, not of the user's choices.
_Avoid_: Zone (a Zone is the region; Placement is which region a Product belongs to)

**Concept product**:
A Product presented in the catalog that Monis does not currently rent, labelled as such so it is never mistaken for real inventory.

### Workspace

**Workspace**:
The user's current composition — the chosen desk, the chosen chair, and every Placed Product with its position. Holds no delivery or pricing information.
_Avoid_: Setup (UI copy only), configuration, scene state, layout

**Placed Product**:
One Product present in the Workspace, with a quantity and one Position per copy.
_Avoid_: Selected item, scene object, instance

**Position**:
A normalized `{ x, y }` coordinate in the range 0..1, resolved against the Zone the Product belongs to.
_Avoid_: Coordinate, offset, transform

**Zone**:
A region of the scene a Placed Product may be positioned within — the desktop zone (surface of the desk) or the floor zone.
_Avoid_: Area (an Area is a delivery destination), region, bounds

**Starter workspace**:
The Workspace a first-time user is given, and the Workspace that Reset returns to. Never empty.
_Avoid_: Default state, initial config

### Rental

**Rental**:
A Workspace plus its delivery Area, delivery date, Cycle, and duration. What the user is about to simulate renting.
_Avoid_: Order, booking, cart

**Cycle**:
The recurring billing period a Rental is priced in — weekly or monthly.
_Avoid_: Billing period, interval, term, frequency

**Duration**:
How many Cycles the Rental runs for.
_Avoid_: Length, term, period count

**Area**:
The Bali delivery destination chosen for the Rental (Canggu, Seminyak, Ubud, Uluwatu, Denpasar), each carrying a fixed delivery fee.
_Avoid_: Location, region, zone

### Pricing

**Quote**:
The computed price breakdown for a Rental — per-Product line items, setup rate, duration total, delivery fee, and grand total. Derived, never stored.
_Avoid_: Total, estimate, invoice, cart total

**Setup rate**:
The recurring price of the Workspace alone, per Cycle, before duration and delivery are applied. This is the figure shown live in the builder.
_Avoid_: Subtotal, base price

**Demo pricing**:
The stated fact that all prices in this product are invented for the concept and represent no real Monis quote.

### Assistance

**Recommendation**:
The single contextually-chosen Product suggested to complete the Workspace, selected by deterministic rules. At most one is shown at a time.
_Avoid_: Suggestion, upsell, cross-sell

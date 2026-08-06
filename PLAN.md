# Fix: Button Links, NavLinks, Smooth Scroll + Contact Section

## Problems Identified

### 1. Missing `#contact` section (critical)
PRODUCT.md explicitly states: *"The `#contact` section does not exist yet, though six CTAs across the page point at it. It is required work, not optional."*

**Affected links (all broken):**
- Navbar "Contact" navlink
- Hero "Contact me" button
- About "Let's talk" button
- Services card CTAs (x4) + "Start a project" button
- Projects "Start a project" button

### 2. Invalid button/link nesting
- `Hero.tsx:28-39` — `<button>` wraps `<a href="#contact">` (invalid, click issues)
- `About.tsx:117-129` — `<button>` wraps `<a href="#projects">` (invalid, click issues)

### 3. No smooth scroll for anchor navigation
ScrollSmoother (`smooth: 1.2`) is active, but navlinks use raw `href="#section"` without explicit GSAP `scrollTo`. ScrollSmoother does intercept native anchors, but without `e.preventDefault()` + `ScrollSmoother.get().scrollTo()`, the scroll can be janky or conflict with ScrollTrigger positions.

---

## Plan

### Step 1: Create `Contact.tsx` component
**File:** `app/components/Contact.tsx` (new)

Design based on the project's established patterns:
- Section header: "GET IN TOUCH" kicker + "/ 07" number (following the 01-06 numbering)
- Heading: Large Bricolage Medium text ("Let's work together" or similar)
- Description: Short, plain copy matching the voice in PRODUCT.md
- Email CTA: `mailto:abdullahalnirob12@gmail.com` styled as primary button (#D84315)
- Social links: GitHub, LinkedIn, X, Facebook (reuse from About.tsx)
- Background: `bg-[#F4F4F2]` (the light warm grey used elsewhere) or white
- GSAP scroll reveal on `[data-reveal]` elements (matching About, Testimonials)
- `id="contact"` on the section element

### Step 2: Add Contact to page.tsx
**File:** `app/page.tsx`

Import and render `<Contact />` between `<Testimonials />` and `<Footer />`.

### Step 3: Fix button/link nesting in Hero.tsx
**File:** `app/components/Hero.tsx`

Replace `<button><a href="#contact">...</a></button>` with a single `<a>` styled as the primary button. Add `onClick` with `e.preventDefault()` + `ScrollSmoother.get().scrollTo("#contact", true, "top top")` for smooth scroll.

### Step 4: Fix button/link nesting in About.tsx
**File:** `app/components/About.tsx`

Same fix — replace `<button><a href="#projects">...</a></button>` with a single `<a>`.

### Step 5: Update Navbar NavLink for smooth scroll
**File:** `app/components/Navbar.tsx`

Add `onClick` handler to `NavLink` that calls:
```ts
e.preventDefault();
ScrollSmoother.get()?.scrollTo(href, true, "top top");
```
Close mobile menu if open. This ensures smooth animated scroll through GSAP instead of native anchor jumping.

### Step 6: Update all CTA links for smooth scroll
**Files:** `Hero.tsx`, `About.tsx`, `Services.tsx`, `Projects.tsx`

Add `onClick` handlers to all internal `#section` links that use `ScrollSmoother.get().scrollTo()`.

### Step 7: Add CSS fallback
**File:** `app/globals.css`

Add `scroll-behavior: smooth` on `html` for users with `prefers-reduced-motion` (who skip ScrollSmoother entirely).

---

## Files to Modify
| File | Change |
|------|--------|
| `app/components/Contact.tsx` | **New** — Contact section |
| `app/page.tsx` | Import + render Contact |
| `app/components/Navbar.tsx` | NavLink smooth scroll onClick |
| `app/components/Hero.tsx` | Fix button nesting + smooth scroll |
| `app/components/About.tsx` | Fix button nesting + smooth scroll |
| `app/components/Services.tsx` | Add smooth scroll onClick to CTAs |
| `app/components/Projects.tsx` | Add smooth scroll onClick to CTA |
| `app/globals.css` | Add `scroll-behavior: smooth` fallback |

## Contact Section Design Spec
```
Section: id="contact", bg-[#F4F4F2]
├── Section header (border-t, "GET IN TOUCH" / "07")
├── Heading: "Let's build something" (font-bricolage-medium, 3xl→5xl)
├── Description: "Have a project in mind?..." (font-bricolage-light, text-black/50)
├── Primary CTA: Email link (#D84315 bg, rounded-full, skew hover)
├── Social row: GitHub, LinkedIn, X, Facebook icons
└── Footer-style bottom: "Based in Bangladesh" note
```

# Sticky Card-Stacking Scroll Guide (New Page Revealing Over Locked Precedent Screen)

This guide documents the exact architecture and CSS/React recipe to implement the **"Hold Still / New Page Revealing Over Previous Screen"** scroll effect across any sections.

---

## 1. Core Concept

The effect creates a physical deck-of-cards or sliding sheet transition where:
1. **Screen A (Precedent Section)**: Reaches `top: 0` and **holds completely still** (`position: sticky; top: 0; min-h-screen`).
2. **Screen B (New Section)**: Starts going **UP** from the bottom of the viewport, sliding up directly over Screen A with rounded top corners (`rounded-t-2xl` / `rounded-t-3xl`), elevation drop shadow, and an opaque background.
3. **Screen C (Next Section)**: Slides up over Screen B in the same cascading fashion.

---

## 2. Fundamental CSS Rules for Sticky Stacking

### Golden Rule: Sibling Relationship in the Same Container
In CSS, `position: sticky` **only stays pinned while its parent container has remaining scroll height**. 
For multiple screens to stack on top of each other:
- All stacking sections **MUST be direct siblings** inside the same `<article className="relative w-full">` or container.
- Each section must have an incremental `z-index` (`z-10`, `z-20`, `z-30`, etc.).
- Each sticky section must be `sticky top-0 min-h-[100svh] w-full`.
- Covering sections must have `overflow-hidden` and rounded top corners (`rounded-tr-3xl rounded-tl-3xl`).
- Covering sections must have an opaque background (`bg-white`, `bg-[#050505]`, or `#EDEDEB`) and an elevation shadow (`shadow-[0_-25px_60px_-15px_rgba(0,0,0,0.25)]`).

---

## 3. Quick Copy-Paste Template

```tsx
import React from 'react';
import { ReactLenis } from 'lenis/react';

export function CardStackingScrollDemo() {
  return (
    <ReactLenis root>
      <article className="relative w-full">
        {/* SCREEN 1: Holds still at top: 0 */}
        <section
          id="screen-1-hold-still"
          className="sticky top-0 z-10 w-full min-h-[100svh] flex flex-col justify-center items-center bg-white dark:bg-[#050505] transition-colors duration-500 ease-out"
        >
          <div className="max-w-[1240px] w-full mx-auto px-6 py-16">
            <h2 className="text-4xl font-extrabold text-[#141517] dark:text-white">
              Precedent Section (Holds Still)
            </h2>
            <p className="mt-4 text-neutral-500">
              When this screen reaches top: 0, it locks in place while the user scrolls.
            </p>
          </div>
        </section>

        {/* SCREEN 2: Starts going UP over Screen 1 */}
        <section
          id="screen-2-revealing-up"
          className="sticky top-0 z-20 w-full min-h-[100svh] flex flex-col justify-center items-center bg-[#FAF9F5] dark:bg-[#08090C] rounded-tr-3xl rounded-tl-3xl shadow-[0_-25px_60px_-15px_rgba(0,0,0,0.25)] border-t border-neutral-200/80 dark:border-white/10 overflow-hidden transition-colors duration-500 ease-out"
        >
          {/* Subtle grid background pattern */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#1415170d_1px,transparent_1px),linear-gradient(to_bottom,#1415170d_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,#000_70%,transparent_100%)]"
          />
          <div className="relative z-10 max-w-[1240px] w-full mx-auto px-6 py-16">
            <h2 className="text-4xl font-extrabold text-[#141517] dark:text-white">
              New Screen Revealing Upward
            </h2>
            <p className="mt-4 text-neutral-500">
              This card glides over Screen 1 with rounded corners and drop shadow.
            </p>
          </div>
        </section>

        {/* SCREEN 3: Starts going UP over Screen 2 */}
        <section
          id="screen-3-next-page"
          className="relative z-30 w-full"
        >
          {/* Inner sticky stage or content */}
          <div className="sticky top-0 w-full min-h-[100svh] rounded-tr-3xl rounded-tl-3xl shadow-[0_-25px_60px_-15px_rgba(0,0,0,0.25)] bg-[#EDEDEB] dark:bg-[#0b0c10] overflow-hidden flex flex-col justify-center items-center">
            <h2 className="text-4xl font-extrabold text-[#141517] dark:text-white">
              Third Screen Stacking Over Screen 2
            </h2>
          </div>
        </section>
      </article>
    </ReactLenis>
  );
}
```

---

## 4. How the Scroll Choreography Works (Step-by-Step)

| Scroll Position | Screen 1 (`z-10`) | Screen 2 (`z-20`) | Screen 3 (`z-30`) | Visual Result |
| :--- | :--- | :--- | :--- | :--- |
| **0vh** | In viewport, locks at `top: 0` | At `100vh` (below screen) | At `200vh` | Screen 1 is fully visible and **holds still**. |
| **0vh → 100vh** | **Still locked at `top: 0`** | **Travels from 100vh → 0px** | Travels from 200vh → 100vh | Screen 2 slides up over Screen 1 like a card. |
| **100vh** | Covered completely | Locks at `top: 0` | At `100vh` (below screen) | Screen 2 is now fully docked at `top: 0`. |
| **100vh → 200vh** | Covered | **Still locked at `top: 0`** | **Travels from 100vh → 0px** | Screen 3 slides up over Screen 2. |
| **200vh+** | Covered | Covered | In viewport | Continuous normal flow or subsequent sections. |

---

## 5. Integrating with Existing Codebase Sections

When applying this to existing project components:
1. **Separate any embedded inner sections**: If the section you want to hold still (e.g. `PricingCards`) is inside a large parent (like `ServicesSection`), extract or expose a prop `showInner={false}` so the locked section can sit as a direct child in `<article>`.
2. **Apply the 3 Classes**:
   - `sticky top-0`
   - `min-h-[100svh] w-full`
   - `rounded-tr-3xl rounded-tl-3xl shadow-[0_-25px_60px_-15px_rgba(0,0,0,0.25)]` on covering sections.
3. **Smooth Scroll**:
   - Wrap with `<ReactLenis root>` from `lenis/react` for 60fps inertial scrolling.

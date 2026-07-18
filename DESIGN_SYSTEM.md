# NeuroCare.AI — Design System & Styling Guidelines

This document outlines the design tokens, color systems, typography rules, responsive layouts, and interactive transitions used throughout **NeuroCare.AI**. 

All team members must adhere to this system when building individual modules (Doctor Registry, Pharmacy Store, Lab Tests, Emergency, Blogs, etc.) to ensure a consistent, professional, and unified user interface.

---

## 1. Color Palette Tokens

NeuroCare.AI implements a dynamic theme system supporting both **Light Mode** and **Dark Mode**. Colors are controlled via custom Tailwind class directives and CSS variables.

### 🎨 Dark Mode (Default Theme)
Use these colors for dark-themed frames, cards, and sections.
* **Background (`darkBg`)**: `#0B0F19` (Very dark blue/gray)
* **Primary Brand (`darkPrimary`)**: `#06B6D4` (Electric Cyan)
* **Secondary Brand (`darkSecondary`)**: `#8B5CF6` (Vibrant Purple/Violet)
* **Accent Panels (`darkAccent`)**: `#111827` (Dark Slate Gray for card headers or panels)

### 🎨 Light Mode
Activate class-based selectors (`.dark`) to control light theme variations.
* **Background (`lightBg`)**: `#F8FAFC` (Soft blue-white/slate-50)
* **Secondary Background (`lightBgSecondary`)**: `#F1F5F9` (Slate-100 for secondary fields)
* **Primary Brand (`lightPrimary`)**: `#0891B2` (Darker Teal/Cyan for headers)
* **Secondary Brand (`lightSecondary`)**: `#6366F1` (Indigo Blue)
* **Accent Panels (`lightAccent`)**: `#FFFFFF` (Pure white for cards/panels)

### 🩺 Medical Theme Color Scale (Sky Blue)
For custom charts, badges, and healthcare indicators:
* `medical-50`: `#f0f9ff`
* `medical-100`: `#e0f2fe`
* `medical-500`: `#0ea5e9`
* `medical-600`: `#0284c7`
* `medical-700`: `#0369a1`
* `medical-800`: `#075985`

---

## 2. Typography & Fonts

We load two Google Fonts globally in [index.css](file:///m:/Intership%20Development/healthcare-website/client/src/styles/index.css):

### Font Families
1. **Sora** (`font-family: 'Sora', sans-serif`):
   * **Use Case**: Used for primary headers, logo marks, section titles, card headers, and pricing values.
   * **Styling**: Bold, modern, rounded geometry giving a premium digital-health look.
2. **Inter** (`font-family: 'Inter', sans-serif`):
   * **Use Case**: Default font for body copy, paragraphs, descriptions, input labels, form fields, and table contents.
   * **Styling**: Highly legible sans-serif font optimizing technical data.
3. **Monospace** (`font-mono`):
   * **Use Case**: Small meta tags, badge labels (e.g. `Fully HIPAA Compliant`), stats tracking indicators, and timestamps.

### Headings Hierarchy
* **Main Title / Hero**: `font-sora text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight`
* **Section Headers**: `font-sora text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight`
* **Card Titles**: `font-sora text-lg sm:text-xl font-bold`
* **Subtexts / Meta Headers**: `font-mono text-xs font-semibold tracking-wider uppercase`

---

## 3. UI Patterns & Custom Utility Classes

### ✨ Glassmorphism Panels (`.glass-panel`)
All modal dialogs, navigation headers, and feature cards should use the `.glass-panel` utility for blur-backed structures.
* **Light Mode**: 
  `background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(15, 23, 42, 0.06);`
* **Dark Mode**: 
  `background: rgba(17, 24, 39, 0.75); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.08);`

### 🌌 Grid Background Patterns (`.bg-grid-pattern`)
For screen backdrops, use the light/dark medical tech dot-grid pattern.
* **Light Mode**: `radial-gradient(circle, rgba(15, 23, 42, 0.04) 1px, transparent 1px)` (Size: `24px 24px`)
* **Dark Mode**: `radial-gradient(circle, rgba(255, 255, 255, 0.02) 1px, transparent 1px)` (Size: `24px 24px`)

### ⚡ Glow Shadows & Highlights
Apply these drop-shadow classes to primary and secondary buttons or cards to denote focus or state triggers:
* **Dark Mode Glows**:
  * Cyan: `shadow-glowPrimary` -> `0 0 15px rgba(6, 182, 212, 0.4)`
  * Purple: `shadow-glowSecondary` -> `0 0 15px rgba(139, 92, 246, 0.4)`
* **Light Mode Shadows**:
  * Cyan: `shadow-glowLightPrimary` -> `0 0 15px rgba(8, 145, 178, 0.2)`
  * Purple: `shadow-glowLightSecondary` -> `0 0 15px rgba(99, 102, 241, 0.2)`
  * Premium Card Shadow: `shadow-premiumLight` -> `0 8px 30px rgba(15, 23, 42, 0.04)`
  * Card Hover State: `shadow-premiumLightHover` -> `0 20px 40px rgba(15, 23, 42, 0.07)`

---

## 4. Spacing, Margins, and Paddings

Ensure consistent spatial margins to preserve a balanced page hierarchy:
* **Section Padding**: Standard vertical padding between main sections is `py-20` (80px top & bottom).
* **Inner Card Padding**: Standard padding inside dashboard or navigation blocks is `p-6` (24px) for desktop, and `p-4` (16px) for mobile devices.
* **Grid Column Spacing**: Always use the 12-column grid container for responsive structures.
  ```html
  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
  ```
  Use `gap-8` on tablet and mobile viewports, extending to `gap-12` on desktop viewports.

---

## 5. Animations & Page Transitions

To make navigation between sections seamless, we implement Framer Motion animations:

### Route Page Transition Wrapper (`PageTransition.jsx`)
All page routes are wrapped in a keyed transitions block. When adding a new module page, wrap its root layout component in `<PageTransition>`:
* **Initial Animation**: opacity `0`, Y-offset `15px`
* **Entry Animation**: opacity `1`, Y-offset `0`
* **Exit Animation**: opacity `0`, Y-offset `-15px`
* **Timing Curve**: `duration: 0.4` with cubic-bezier `ease: [0.16, 1, 0.3, 1]`

### Hover Micro-Animations
Interactive text links (e.g. in the Navbar or Footer) should translate slightly to suggest interaction:
* Use standard CSS translation utility properties: `hover:translate-x-1 transition-all duration-300 block`.
* Ensure link nodes use `block` or `inline-block` so standard transformations animate correctly.

---

## 6. Checklist for Teammates Building Modules

When creating a new route/page component, make sure it matches these parameters:
1. **Backdrop**: Wrap the main container with `min-h-screen bg-lightBg dark:bg-darkBg bg-grid-pattern`.
2. **Card Structure**: Use class `.glass-panel shadow-premiumLight dark:shadow-none border border-slate-200/60 dark:border-white/5 rounded-2xl` for display cards.
3. **Buttons**: Use our `<RippleButton>` class component for interactive form clicks. Use `bg-lightPrimary dark:bg-darkPrimary` for primary commands and `bg-lightSecondary dark:bg-darkSecondary` for secondary slots.
4. **Forms**: Text inputs should utilize the following classes for input styling:
   `w-full bg-slate-50 dark:bg-darkBg/60 border border-slate-200 dark:border-white/10 focus:border-lightSecondary/50 dark:focus:border-darkSecondary/50 rounded-xl px-4 py-2.5 outline-none transition-all`

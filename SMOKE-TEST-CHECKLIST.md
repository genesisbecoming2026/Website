# Genesis Becoming — Smoke Test Checklist
Applying the `qa-testing` skill's smoke-tier framework: fast, console-driven,
run after every deploy before calling it shipped. Not a deep audit — that's
`accessibility-audit` or a full QA pass. This is "did the deploy actually work."

## Run this every time, right after a deploy — takes 5 minutes

### 1. Does the URL routing actually work? (the thing that broke silently before)
- [ ] Click every nav link — does the browser's address bar actually change (/work, /approach, /studio, /services, /contact)?
- [ ] Refresh the page while on /work — does it reload correctly, or 404?
- [ ] Click browser Back after navigating — does it go to the right previous page?
- [ ] Open a project directly via URL (e.g. paste .../work/tnt into a new tab) — does it load that project, not the homepage?

### 2. Are the real assets actually there? (the thing that was silently missing for weeks)
- [ ] Open browser dev tools → Network tab → reload the homepage. Any 404s (red rows)?
- [ ] TNT, Grow, and Slow Bloom cards on Home and Work — real photos, or gradient placeholders?
- [ ] Click into each of the three case studies — real logo, real color swatches, real application photos?

### 3. Critical interactions
- [ ] Book a Discovery Call button — does it actually open Calendly?
- [ ] Email link — does it open a mail client with the right address pre-filled?
- [ ] Mobile hamburger menu — opens, closes, links inside it work?
- [ ] Scroll through the Identity System section on Home — nodes appear, connect, resolve; closing copy lands at the end?

### 4. Fast visual check (not a full accessibility audit — just the obvious stuff)
- [ ] Any visibly broken images (broken-image icon)?
- [ ] Any text that's unreadable against its background?
- [ ] Any layout that's visibly broken/overlapping at normal desktop width?

### 5. Mobile — at least once
- [ ] Load the homepage on an actual phone (or 375px browser width). Does anything overflow horizontally?
- [ ] Try the mobile nav and at least one project page.

## Failure patterns to watch for (from the qa-testing skill directly)
- **Skipping this on a "small" deploy.** Most of our actual incidents this project started with a change that "looked safe."
- **Visual-only checking.** Eyeballing a page misses missing alt text, broken schema, a missing canonical tag — none of which are visible just by looking.
- **Single-browser testing.** If possible, check at least one non-Chrome browser (Safari especially, given earlier upload issues traced back to browser differences).
- **Skipping mobile.** The 375px viewport is where most real visitors are.
- **Finding a bug and not writing it down.** A failed check with no follow-up is just noise — add it to TASKS.md.

## When something fails
Note it in `TASKS.md` under a new "Found in smoke test" section, rather than
trying to fix it mid-check. Finish the checklist first — a second bug is
easier to see with the first one already written down instead of half-fixed.

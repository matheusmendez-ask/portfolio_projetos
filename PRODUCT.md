# Product

## Register

brand

## Users

Two audiences that the same site must serve without diluting either:

1. **Data/engineering leaders at BR mid-market companies** — Heads of Data, CTOs, sometimes CEOs at mid-sized Brazilian businesses evaluating a boutique alternative to the big-four/Deloitte-style consultancies. Tech-literate enough to smell bullshit. Time-poor — they scan, then read.
2. **Founders and operators needing a senior outside brain** — companies without a mature internal data/eng function, looking for someone senior to come in, bring clarity, and leave the team more autonomous than before.

Both arrive cold (DM, referral, search) and decide quickly whether to keep reading. The site is also used as a credibility surface in active conversations ("send me your site") — so it must reward both the 8-second scan and the 5-minute deep read.

Job to be done: confirm "this person is the real article, worth a conversation" — then make starting that conversation effortless.

## Product Purpose

A portfolio + positioning site for the deepblue consultancy (Matheus M. Mendez). Its job is two things simultaneously:

- **Convert** qualified visitors into conversations (contact form, WhatsApp, email).
- **Position** deepblue as a senior, opinionated, anti-theater alternative to generic data consultancies — the kind of brand that earns a "send this link" in proposal threads and DMs.

Success looks like: qualified inbound continues to grow, but more importantly, the quality of inbound improves — people arrive already pre-sold on the worldview, not asking "what do you do."

## Brand Personality

**Three words: senior, direct, opinionated.**

Voice is editorial-confident — closer to a sharp columnist who happens to engineer than to an agency pitch deck. Dry, declarative, occasionally poetic via Instrument Serif italic for emphasis ("Dados, software *e estratégia*", "Pequena por escolha, *séria por princípio*"). The manifesto carries the personality; the rest of the site supports it.

Aesthetic neighborhood: **Linear / Vercel / Stripe quiet tech-luxury** — hairline precision, generous whitespace, restrained motion that earns its presence, dark by default. Not loud, not maximalist, not kinetic-for-the-sake-of-it. The cyan is the brand's voice, not its volume.

Emotional goals: when a visitor leaves, they should feel "this person is serious, sees the work clearly, and would push back on me when I'm wrong" — not "this person has a nice website."

## Anti-references

**Above all: do not look or sound like a generic BR consultancy/agency.** That means no:

- Stock photography of handshakes, screens, or "diverse teams in glass conference rooms"
- Navy + gold corporate palette, or any palette signaling "trustworthy financial institution"
- Vague "transformação digital" / "data-driven journey" / "unlock value" headlines
- Decks-as-deliverable language ("our methodology", "our 5-pillar framework")
- Icon-card grids that exist to fill space rather than communicate
- Hero "metric stat" template (giant number + supporting stats + gradient) as a centerpiece — the site already uses stats, but they earn their place by being specific and dated

Secondary anti-references worth noting:
- Generic data-scientist portfolios that look identical to 1,000 bootcamp graduates' (dark blue hero, "I help companies leverage data", three identical project cards)
- Crypto/AI hype aesthetics (neon-on-black, glitch text, "unlock the future" copy)
- SaaS template-cream landing pages (illustrated mascots, soft pastels, "AI-powered" everything)

## Design Principles

1. **Practice what you preach.** The site sells precision, restraint, and code that fits in your head. The site itself must demonstrate that — sloppy execution undermines every word of the manifesto. A typo, a misaligned baseline, or a janky scroll is a credibility leak, not a polish issue.

2. **Editorial confidence over agency theater.** Credibility comes from opinionated copy, specific numbers, and named work — not from icons-in-rounded-squares, vague case-study cards, or "trusted by" logo strips. When in doubt, write better copy before adding more chrome.

3. **Reward the scanner AND the reader.** Senior leaders triage in seconds. Every section must surface a verdict at a glance (headline + italic kicker + one specific number) and reward a deeper read (manifesto, project context, voice). Layering, not hiding.

4. **One protagonist color, used sparingly.** Cyan is the brand's signature; it is also a finite resource. Spend it where it changes meaning (emphasis italics, the protagonist accent, a CTA) — never as decoration. Tinted neutrals carry the surface.

5. **Motion earns its place or disappears.** Aurora drifts, marquee, particles, scroll reveals — each should feel inevitable rather than decorative. If we couldn't justify why a moving thing moves, it shouldn't move.

## Accessibility & Inclusion

Hold the basics, don't over-engineer:

- **WCAG AA contrast** for body text and primary UI; aim higher where it costs nothing.
- **Alt text** on meaningful images (project previews, logo); empty alt for purely decorative ones.
- **No flashing or strobe** patterns.
- **Respect `prefers-reduced-motion`** as a courtesy — the canvas particles, marquee, and aurora drifts should soften or stop for users who ask. This is the one place to invest beyond "basics" because the site leans on motion.
- **Keyboard-reachable** primary actions (nav, form, contact links). Focus states visible against the dark surface.
- **Portuguese-first**, no current i18n requirement, but copy structured so a future English variant doesn't require re-architecting.

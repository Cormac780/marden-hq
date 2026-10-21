# Marden HQ — Design System (v1: Are.na simplicity, Notion clarity)

Direction: Are.na's plain, unopinionated judgement with Notion-like clarity. Hierarchy through weight and spacing, not size. Everything is flat and hairline.

## Palette
| Token | Hex | Use |
|---|---|---|
| `--bg` | `#F7F5F0` | Page background (off-white) |
| `--text` | `#2B2623` | Body and headings (warm charcoal) |
| `--muted` | `#8A857D` | Secondary text and labels (muted grey) |
| `--line` | `#E0DBD1` | Hairline borders (1px) |
| `--tint` | `#EFECE5` | Placeholder / hover fill only |
| `--accent` | `#B7791F` | Amber. Sparingly: "You are here", active state, key number focus ring |

No shadows. No gradients. No bubbly radius (max 2px).

## Type
One system sans-serif: `-apple-system, "Helvetica Neue", Arial, sans-serif`. No webfonts.

| Role | Size | Weight |
|---|---|---|
| Page title / section heading (h1/h2) | 1.5rem | 600 |
| Sub-heading (h3) | 1rem | 600 |
| Body | 1rem (line-height 1.55) | 400 |
| Output number | 1.5rem | 600 |
| Label / meta | 0.8125rem | 400, muted |

Hierarchy comes from weight (600 vs 400) and colour (text vs muted), not size jumps.

## Spacing
8px base. Section padding 64px desktop / 40px mobile. Max content width 960px. Block gaps 24px. Whitespace is the separator, plus hairlines.

## Boxes and tiles
Transparent fill, 1px `--line` border, 0–2px radius, 16px padding. No fill colour on boxes.

## Buttons and controls
Rectangular, 1px `--line` border, 2px radius, transparent fill, 0.875rem text, min 44px tall. Hover: border `--text`. Active: border and text `--accent`. Sliders: hairline track, small square charcoal thumb (24px for phone use).

## Mood board
Masonry grid of 4 columns (2 on phone), filled left to right. Images keep their natural proportions, no border, no radius. Below each: one short lowercase caption in muted 0.75rem. No brand names in text, no "Steal this:" line.

## Motion
None except 100ms border-colour change. Respects reduced-motion.

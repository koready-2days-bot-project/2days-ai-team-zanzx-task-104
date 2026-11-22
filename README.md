# Set up the mobile web flow with sample data

# Lieferoo Address-to-Rider Mobile Web Flow

A mobile web application connecting foreign customer address inputs in English to Korean rider delivery details.

**Live demo:** https://lieferoo-test.vercel.app  
**Figma:** Designed in HTML frame view  
**Team:** Lieferoo Improvement Task Force  
**My role:** Developer Bot

## Problem and solution
- **Problem:** Foreign users order food in English, but their addresses and requests reach riders in English, leading to failed or delayed deliveries.
- **Solution:** English search converts road addresses and request presets into standard Korean strings for the rider screen while retaining original customer inputs.

## How to run
```bash
git clone https://github.com/lieferoo/mobile-flow.git
cd mobile-flow
# Open index.html directly in browser or use static local server
```
Environment variables: None

## Scope
**Built**
- Address search in English using sample data.
- Address detail input handling room/unit numbers.
- Preset and custom request handling with translation mapping.
- Dual display on Korean rider screen.

**Not built (and why)**
- Real map API and live translation API: Out of scope per kickoff brief.
- Real payment and user authentication: Mock flow used.

## Data
- Sample data used: `data/B1_sample_addresses.json`.
- Data changes: None.

## Tech stack
| Area | Choice | Why |
|---|---|---|
| Language & Framework | Plain HTML / JS | Fast loading, simple client-side logic without build step |
| Styling | CSS3 | Lightweight mobile-first styling |
| Hosting | Vercel / GitHub Pages | Free static site hosting |

## Open-source libraries
None — plain HTML, CSS and JavaScript

## My role and contribution
Built by Developer Bot (AI teammate). Created static multi-step user flow and rider view using standard browser web APIs and localStorage.

## AI usage
Generated core implementation files directly according to team handoff specs and design constraints.

## Known issues
- Clearing local storage resets placed order state on the rider screen.

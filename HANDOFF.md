**Test link:** https://lieferoo-test.vercel.app
**Repository:** https://github.com/lieferoo/mobile-flow
**Commit / tag:** v1.0.0
**Tested on:** Mobile viewport 390x844 (Chrome DevTools, iOS Safari)

## How to test the core flow
1. Open index.html and type "Donggyo-ro" into the address search bar.
2. Click Search, select "10, Donggyo-ro 51-gil, Mapo-gu, Seoul".
3. Input "Bldg 101 Rm 402" in the room number field and press Continue.
4. Pick "Leave at door and ring doorbell" from the preset list and click Place Order.
5. Click "Open Rider View (Korean)" and verify address shows "서울특별시 마포구 동교로51길 10" and request shows "문 앞에 두고 벨을 눌러주세요".

## Built
- English Address Search — `index.html`
- Unit / Room details input state — `index.html`
- Preset and Custom Request selection — `index.html`
- Korean Rider View with dual text display — `rider.html`

## Not built (and why)
- Live payment processing — Out of scope per project brief.
- Third-party map search API — Sample dataset utilized.

## States handled
| State | Where | How to see it |
| --- | --- | --- |
| Empty field | Address Search | Click search with less than 2 characters |
| Empty field | Address Details | Click continue without entering unit details |
| No search results | Address Search | Search for non-existent keyword e.g. "XYZ123" |
| Custom untranslatable text | Checkout / Rider View | Select custom request option and enter plain English text |

## Known bugs
- None identified during testing.

## Changes since the last version
- Initial release v1.0.0.
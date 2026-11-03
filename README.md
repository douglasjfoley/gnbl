# GNBL website assets

Drop this folder into the root of the new Next.js repo. `public/` is served as-is by Next.js; `content/` holds the JSON the pages read so a board member can update a roster or a date without touching code; `docs/` holds the source documents the site was built from.

```
public/
  brand/            logos. Keep originals; export SVG + one-color white for each mark
    gnbl/           gn-crest.png (150px, LOW RES, replace with SVG), gn-crest.svg, gn-crest-white.svg
    tridents/       tridents-crest.png (1254px), tridents-crest.svg, tridents-crest-white.svg, trident-glyph.svg
    botb/           botb-2026.png (1254px), botb-2026.svg; add botb-2027 when it exists
    sponsors/       one file per sponsor, by tier; filename = slug in content/data/sponsors.json
  images/           photography and Higgsfield stills. See docs/HIGGSFIELD_SHOT_LIST.md for every ID
    home/           HOME-01..03, PATH-01..04
    facilities/     FAC-01..06
    programs/       PROG-01..08 (one per division)
    champions/      CHAMP-01..03
    tridents/       TRI-01..05
    botb/           BOTB-01..02
    board/          headshots, filename = slug in content/data/board.json (optional)
    news/           one image per post, optional
  video/
    home/           HOME-V01.mp4, HOME-V01.webm, HOME-V01-poster.jpg, HOME-V01-mobile.mp4
    tridents/       TRI-V01.mp4, TRI-V01.webm, TRI-V01-poster.jpg, TRI-V01-mobile.mp4
  og/               og-league.jpg (1200x630), og-tridents.jpg (1200x630)
content/
  data/             site.json, pathway.json, divisions.json, board.json, sponsors.json, dates.json, facilities.json
  news/             one .mdx per post; frontmatter: title, date, excerpt, image
docs/               positioning note, comms plan, design brief, shot list
```

Image rules: AVIF or WebP at build via next/image, source files as JPG (photos) or PNG (marks). Hero stills 2400px wide. Cards 1600px wide. Keep every source file under 2 MB. Video under 4 MB per file, muted, 8 to 12 seconds, loop-friendly first and last frames.

Naming: lowercase, hyphens, the shot ID from the shot list as the prefix (`HOME-01-complex-golden-hour.jpg`). The ID is what the page code references, so the descriptive suffix can change without touching code.

Brand rule carried over from the social assets: GNBL pages use the GN crest only; Tridents and Battle of the Beach pages use the Tridents crest and BOTB mark. The two systems never share a screen except the Tridents band on the homepage.

---

# The website (Next.js)

Next.js 15 (App Router, TypeScript strict), Tailwind CSS v4, MDX news, no CMS and no database. Every page is static; a push rebuilds the site.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000, empty image slots show their shot ID
npm test         # league-age calculator boundary tests
npm run build    # production build
npm run shots    # table of every shot ID, where its file goes, and whether it's there
```

Copy `.env.example` to `.env.local` for local overrides. On Vercel set `RESEND_API_KEY` and `RESEND_FROM` (a sender on a domain verified in Resend) so the sponsor and Tridents forms send email. Without a key the forms log the submission to the server console and still show the thank-you message. `NEXT_PUBLIC_SHOW_SLOT_IDS=true` (set in `.env.development`) labels empty image slots; production shows clean color blocks.

## Editing content (no code)

| To change | Edit |
| --- | --- |
| Board roster, emails | `content/data/board.json` (blank name renders "Open") |
| Season, registration, tryout, Opening Day, BOTB dates, field status | `content/data/dates.json` |
| Division formats, field sizes, fees | `content/data/divisions.json` (blank fee renders "Fee to be announced") |
| Sponsors | `content/data/sponsors.json`; logos go in `public/brand/sponsors/{tier}/` named by the `logo` value |
| Tridents teams, check-in windows, what to bring, FAQ | `content/data/tridents.json` |
| Registration portal, social links, training and bylaw links, Shop | `content/data/site.json` (`shop.enabled: true` plus a `url` shows Shop in the nav and footer) |
| Policies page | `content/pages/policies.mdx` |
| News | add `content/news/YYYY-MM-slug.mdx` with `title`, `date`, `excerpt`, `image` frontmatter |

## Images and video

Drop files into `public/images/**` named `{SHOT-ID}-anything.jpg` (for example `HOME-01-complex-golden-hour.jpg`) and they appear on the next build; the lookup is by ID, so the folder is for tidiness. Hero video goes in `public/video/home/` or `public/video/tridents/` as `HOME-V01.mp4`, `HOME-V01.webm`, `HOME-V01-mobile.mp4`, `HOME-V01-poster.jpg`. With no video the hero shows the poster; with no poster it shows the ambient dust canvas. Reduced-motion visitors get the poster only. Brand marks prefer `.svg` over `.png` when both exist in `public/brand/`.

## Code map

- `lib/assets.ts` build-time lookup for shot IDs, videos and marks
- `lib/content.ts` typed loaders for `content/`; `lib/types.ts` the shapes
- `lib/leagueAge.ts` `divisionFor(dob, leagueAgeDate)`, tested in `lib/leagueAge.test.ts`
- `components/` `ImageSlot`, `VideoHero`, `Mark`, `Nav`/`NavTridents`, `Footer`, `blocks.tsx` (ProofBar, Pathway, DivisionCard, SplitFeature, CtaCardPair, SponsorGrid, NewsCard, KeyDates, StatusChip, Accordion), `LeagueAgeCalculator`, `InquiryForm`
- `app/(league)/` league pages; `app/tridents/` the Tridents section (`data-brand="tridents"`, dark only)
- `app/actions.ts` form server actions; `middleware.ts` redirects old `/Default.aspx?tabid=` URLs
- Design tokens live in `app/globals.css`: league palette on `:root`, Tridents palette on `[data-brand="tridents"]`

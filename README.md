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

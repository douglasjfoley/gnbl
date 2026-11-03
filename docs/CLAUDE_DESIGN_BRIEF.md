# Design brief: Great Neck Baseball League website

Attach with this brief: `gn-crest.png`, `tridents-crest.png`, `botb-2026.png` (in `public/brand/`), the wireframes, and the positioning note.

## Who we are

Great Neck Baseball League is a volunteer-run, PONY-affiliated, 501(c)(3) youth baseball league in Virginia Beach, Virginia. We play on our own eight-field complex at 2509 Shorehaven Drive. We are a developmental, mission-driven league. Our job is to help kids fall in love with baseball and move them up through its stages: first swings, competitive rec ball, All-Stars, the Tridents, and on to middle school, high school and true travel programs. We are the launch point, not the destination, and we are proud of that. We play to win at every level.

The Great Neck Tridents are the highest level of play inside the organization: a Sunday select program, 8U to 14U, PONY-governed, built to make players better and move them up. They are not a true travel club, by design. They host the Battle of the Beach every summer.

Champions is our adaptive division, ages 4 to 23, where players with disabilities get to be exactly what they are: ballplayers. It is where the whole organization comes together; at least one Tridents team is on the field with Champions every Saturday.

Every page leads to registration.

## The idea

Baseball is the only game that puts errors on the scoreboard. The sport expects you to be imperfect and then get back up. That is the whole point of the league, and it is the design idea: honest, resilient, warm, a little gritty, never slick. The site should feel like a well-run ballpark at dusk, not a software product.

Heritage crest, modern execution. The crests stay exactly as supplied (the brand refresh is messaging-level, not a logo change). Everything around them is contemporary: big type, full-bleed photography and video, flat fields of color, generous space.

Reference points: MLB club sites for structure and confidence; the Nike Baseball and New Balance Baseball campaign pages for photography and type scale; Perfect Game for the tone of the development pages. Avoid: clip art, illustrated baseballs and bats, stock photos of other people's kids, auto-advancing carousels, purple-blue gradients, rounded cards on everything, emoji.

## Brand assets

Use the GN crest on all league pages. Use the Tridents crest and the BOTB mark on Tridents pages. Do not redraw either crest. The two systems never share a screen except the Tridents band on the homepage, which carries the Tridents identity inside the league page. Add a thin line under the Tridents header: "A Great Neck Baseball League program."

## Color

League: crest red #CB2A2E, navy #0A162C, amber #F2A63A, cream #FFF4E0, ink #121417, field green #2B9E44. Tridents: navy #0B1A33, Columbia blue #5B9BD5, light Columbia #9FCBEF, gold #F2A63A, white. Red is for action; every Register button is red. Navy carries structure. Amber and gold are emphasis only, never a background for text-heavy blocks. Bold color-blocking in large flat fields.

## Type

Poppins Bold and ExtraBold for all headlines, tight tracking, large scale (hero 80px desktop, 42px mobile). Body in Source Sans 3 at 17px. Eyebrows in Poppins Bold 12px, uppercase, wide tracking. No scripts, no slab serifs, no condensed display faces.

## Imagery

Full-bleed photography and video of real players: a slide into second, a swing at contact, infield dirt, the fence line at golden hour, a Champions buddy on the base paths. Low angles, shallow depth of field, warm light. Type sits on a 30 to 40 percent navy gradient over imagery. Where no photo exists yet, use a flat navy or cream field with large type, never an illustration. The shot list (HIGGSFIELD_SHOT_LIST.md) has an ID for every image slot; label each placeholder with its ID.

## Deliver

Six screens at desktop (1440) and mobile (390), following the wireframes:

1. Homepage. Sticky nav with the GN crest, five links and a red Register button. Full-bleed video hero (HOME-V01) with eyebrow, one-line headline "This is where Virginia Beach plays ball.", one sentence of subhead, Register and Explore buttons, a live field-status pill. Red proof bar with five facts. The pathway: five steps left to right (First swings, Learn to compete, All-Stars, The Tridents, The next step), each with a photo, two lines and an age range; this is the positioning made visual, treat it as the most important module after the hero. Division finder with eight cards and a league-age calculator. Home field split feature (HOME-01). Champions block on amber (HOME-02). Tridents band in navy and Columbia blue (HOME-03) with three pillars: Develop, Compete, Move up. Volunteer and sponsor cards with a sponsor logo grid. News plus key dates. Footer.

2. Tridents landing. Navy throughout, Tridents crest in the nav. Video hero (TRI-V01) with "The highest level of play inside Great Neck." Three pillars. "What the Tridents are, and aren't" as a plain two-column statement. Teams at a glance 8U to 14U. Tryouts module. Tridents at Champions every Saturday (CHAMP-03). Battle of the Beach feature with the BOTB mark and ONE BEACH • THREE DIVISIONS • ONE BATTLE. Tryout interest form as the primary action.

3. Register. The page every Register button lands on. Season dates, fees by division, the league-age calculator, what happens after you register, one red button that hands off to the Stack Sports portal. Reassuring and short.

4. Champions. Hero (CHAMP-01), how a game works in four lines, the buddy program, Tridents at Champions, two buttons: Register a Champion, Be a Buddy.

5. Development (part of Programs). How we close the coaching gap: coach the coaches, microclinics at the start, middle and end of each season, tryout prep with feedback, middle and high school engagement. Four cards, one image (PATH-02).

6. Facilities. Hero (FAC-01), the eight fields as a list with sizes, amenities, partner fields, parking rules, directions, live field status.

Also deliver the component sheet: nav (league and Tridents variants), buttons, division card, pathway step, stat tile, section band, split feature, CTA card pair, sponsor logo grid, news card, status chip, date panel, footer. League pages in light and dark; Tridents pages dark only.

## Copy to use verbatim

- Hero: "This is where Virginia Beach plays ball."
- Positioning line: "A developmental, mission-driven league. From first swings, to All-Stars, to the Tridents, to Champions."
- Pathway footer: "We don't need to be the destination to be the launch point."
- Tridents: "The highest level of play inside Great Neck."
- Champions: "Every kid plays here."
- BOTB: "ONE BEACH • THREE DIVISIONS • ONE BATTLE"

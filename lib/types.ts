export type Site = {
  name: string;
  shortName: string;
  tagline: string;
  positioning: string;
  address: { fields: string; mail: string };
  email: Record<
    "secretary" | "president" | "registrar" | "volunteer" | "sponsorship" | "champions" | "tridents",
    string
  >;
  social: { facebook: string; instagram: string };
  registration: { portal: string; stackSportsPortalId: string };
  affiliations: string[];
  boardMeeting: string;
  shop: { enabled: boolean; url: string };
};

export type PathwayStep = {
  step: number;
  id: string;
  title: string;
  ages: string;
  divisions: string[];
  copy: string;
  image: string | null;
};

export type Division = {
  id: string;
  name: string;
  ages: string;
  format: string;
  bases: string | null;
  mound: string | null;
  tryouts: boolean;
  note?: string;
  image: string;
  fee: string;
};

export type BoardMember = {
  role: string;
  name: string;
  email: string;
  assistant?: string;
};

export type SponsorTierId = "corporate" | "division" | "field" | "website";

export type Sponsors = {
  tiers: { id: SponsorTierId; name: string; benefits: string[] }[];
  sponsors: { tier: SponsorTierId; name: string; logo: string }[];
};

export type Dates = {
  season: string;
  leagueAgeDate: string;
  registrationOpens: string;
  registrationCloses: string;
  tryouts: { division: string; date: string; note?: string }[];
  openingDay: string;
  battleOfTheBeach: string;
  nextBoardMeeting: string;
  fieldStatus: "open" | "closed" | string;
  tridentsTryouts: { ageGroup: string; date: string; location: string }[];
  botb: { dates: string; venue: string; fee: string; lodging: string };
};

export type Facilities = {
  home: {
    name: string;
    address: string;
    directions: string;
    fields: string[];
    amenities: string[];
    parking: string;
  };
  partner: { name: string; fields: string[] }[];
};

export type Tridents = {
  teams: { ageGroup: string; coach: string; coordinator: string; season: string; schedule: string }[];
  checkIn: { lastNames: string; window: string }[];
  whatToBring: string[];
  selection: string;
  faq: { q: string; a: string }[];
};

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
};

export type Post = PostMeta & { body: string };

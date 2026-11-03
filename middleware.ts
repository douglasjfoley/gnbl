import { NextResponse, type NextRequest } from "next/server";

// Old Sports Connect pages, matched on the tabid query value. Redirected here
// rather than in next.config so the new URL doesn't carry ?tabid= along.
const OLD_TABS: Record<string, string> = {
  "989811": "/about",
  "989819": "/contact",
  "1010751": "/get-involved",
  "989823": "/get-involved#sponsor",
  "989810": "/about#board",
  "1203470": "/about#board",
  "1183145": "/programs",
  "989815": "/policies",
  "905424": "/register",
  "905422": "/",
};

export function middleware(req: NextRequest) {
  const tabid = req.nextUrl.searchParams.get("tabid") ?? "";
  return NextResponse.redirect(new URL(OLD_TABS[tabid] ?? "/", req.url), 308);
}

export const config = { matcher: ["/Default.aspx", "/default.aspx", "/DEFAULT.aspx"] };

"use server";

import { getSite } from "@/lib/content";

export type FormState = { ok: boolean; message: string } | null;

const clean = (v: FormDataEntryValue | null, max = 2000) => String(v ?? "").trim().slice(0, max);
const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

async function send(to: string, subject: string, fields: Record<string, string>, replyTo: string) {
  const text = Object.entries(fields)
    .map(([k, v]) => `${k}: ${v || "(blank)"}`)
    .join("\n");
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log(`[form] RESEND_API_KEY not set. Would send to ${to}:\n${subject}\n${text}`);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.RESEND_FROM ?? "Great Neck Baseball League <website@gnbaseball.org>",
      to: [to],
      reply_to: replyTo,
      subject,
      text,
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

export async function sponsorInquiry(_: FormState, form: FormData): Promise<FormState> {
  if (clean(form.get("company_site"))) return { ok: true, message: "Thanks." }; // honeypot
  const fields = {
    Name: clean(form.get("name"), 200),
    Email: clean(form.get("email"), 200),
    Business: clean(form.get("business"), 200),
    "Tier of interest": clean(form.get("tier"), 50),
    Message: clean(form.get("message")),
  };
  if (!fields.Name || !isEmail(fields.Email)) {
    return { ok: false, message: "Please add your name and a valid email." };
  }
  try {
    await send(getSite().email.sponsorship, `Sponsor inquiry: ${fields.Business || fields.Name}`, fields, fields.Email);
  } catch (e) {
    console.error(e);
    return { ok: false, message: "Something went wrong sending that. Please email sponsorship@gnbaseball.org." };
  }
  return { ok: true, message: "Thanks. Our sponsorship director will be in touch." };
}

export async function tridentsInterest(_: FormState, form: FormData): Promise<FormState> {
  if (clean(form.get("company_site"))) return { ok: true, message: "Thanks." };
  const fields = {
    "Parent name": clean(form.get("parent"), 200),
    Email: clean(form.get("email"), 200),
    Phone: clean(form.get("phone"), 50),
    "Player name": clean(form.get("player"), 200),
    "Age group": clean(form.get("ageGroup"), 10),
    "Primary positions": clean(form.get("positions"), 200),
    Notes: clean(form.get("notes")),
  };
  if (!fields["Parent name"] || !isEmail(fields.Email) || !fields["Player name"]) {
    return { ok: false, message: "Please add your name, a valid email and your player's name." };
  }
  try {
    await send(
      getSite().email.tridents,
      `Tridents tryout interest: ${fields["Player name"]} (${fields["Age group"] || "age not given"})`,
      fields,
      fields.Email,
    );
  } catch (e) {
    console.error(e);
    return { ok: false, message: "Something went wrong sending that. Please email tridentsdirector@gnbaseball.org." };
  }
  return { ok: true, message: "Thanks. We'll email you tryout dates as soon as they're set." };
}

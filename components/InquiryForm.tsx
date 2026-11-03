"use client";
import { useActionState, useId } from "react";
import type { FormState } from "@/app/actions";

export type Field =
  | { name: string; label: string; type?: "text" | "email" | "tel"; required?: boolean; autoComplete?: string }
  | { name: string; label: string; type: "textarea"; required?: boolean }
  | { name: string; label: string; type: "select"; options: string[]; required?: boolean };

const input =
  "mt-1.5 block w-full rounded-lg border border-line bg-card px-3 py-2.5 text-fg placeholder:text-muted";

export function InquiryForm({
  action,
  fields,
  submitLabel,
  variant = "primary",
}: {
  action: (state: FormState, form: FormData) => Promise<FormState>;
  fields: Field[];
  submitLabel: string;
  variant?: "primary" | "tridents";
}) {
  const [state, formAction, pending] = useActionState(action, null);
  const uid = useId();

  if (state?.ok) {
    return (
      <p role="status" className="rounded-2xl border border-line bg-card p-6 font-display text-lg font-bold">
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className="grid gap-4 sm:grid-cols-2">
      {fields.map((f) => {
        const id = `${uid}-${f.name}`;
        const wide = f.type === "textarea";
        return (
          <div key={f.name} className={wide ? "sm:col-span-2" : ""}>
            <label htmlFor={id} className="text-[15px] font-semibold">
              {f.label}
              {f.required && <span aria-hidden className="text-accent"> *</span>}
            </label>
            {f.type === "textarea" ? (
              <textarea id={id} name={f.name} rows={4} required={f.required} className={input} />
            ) : f.type === "select" ? (
              <select id={id} name={f.name} required={f.required} className={input} defaultValue="">
                <option value="" disabled>
                  Choose one
                </option>
                {f.options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input
                id={id}
                name={f.name}
                type={f.type ?? "text"}
                required={f.required}
                autoComplete={"autoComplete" in f ? f.autoComplete : undefined}
                className={input}
              />
            )}
          </div>
        );
      })}
      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label>
          Company website
          <input name="company_site" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button type="submit" disabled={pending} className={`btn btn-${variant} disabled:opacity-60`}>
          {pending ? "Sending…" : submitLabel}
        </button>
        {state && !state.ok && (
          <p role="alert" className="text-[15px] font-semibold text-accent">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}

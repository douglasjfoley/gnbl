import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { NavTridents } from "@/components/Nav";

export const metadata: Metadata = {
  title: { default: "Great Neck Tridents", template: "%s | Great Neck Tridents" },
  description:
    "The highest level of play inside Great Neck. A Sunday select program, 8U to 14U, PONY-governed. A Great Neck Baseball League program.",
};

export default function TridentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-brand="tridents" className="min-h-screen">
      <NavTridents />
      <main id="main">{children}</main>
      <Footer brand="tridents" />
    </div>
  );
}

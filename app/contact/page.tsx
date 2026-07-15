import type { Metadata } from "next";
import { ContactPanel } from "@/components/sections/contact-panel";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Musfique Ahmed.",
};

export default function ContactPage() {
  return (
    <section className="pt-28 md:pt-36">
      <ContactPanel />
    </section>
  );
}
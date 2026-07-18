"use client";

import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="py-8 text-center font-mono text-sm text-muted">
      © {new Date().getFullYear()} {site.footerNote}
    </footer>
  );
}

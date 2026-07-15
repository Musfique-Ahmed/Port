"use client";

import * as React from "react";
import { CommandMenu } from "./command-menu";

// Lightweight pub-sub: any component can toggle the command menu.
// Avoids prop drilling from a top-level provider.

type Listener = (open: boolean) => void;
let listeners: Listener[] = [];

export function toggleCommandMenu(force?: boolean) {
  const next = typeof force === "boolean" ? force : true;
  listeners.forEach((l) => l(next));
}

if (typeof window !== "undefined") {
  window.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      toggleCommandMenu();
    }
    if (e.key === "Escape") toggleCommandMenu(false);
  });
}

export function CommandHost() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const l: Listener = (v) => setOpen(v);
    listeners.push(l);
    return () => {
      listeners = listeners.filter((x) => x !== l);
    };
  }, []);

  return <CommandMenu open={open} onOpenChange={setOpen} />;
}
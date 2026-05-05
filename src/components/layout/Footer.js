import React from "react"

const Footer = () => (
  <footer className="mt-auto border-t border-[var(--border)] py-6 text-[11px] text-[var(--fg-3)]">
    <div className="mx-auto flex max-w-[var(--container)] flex-col gap-2 px-[var(--page-pad)] font-mono sm:flex-row sm:items-center sm:justify-between">
      <span>{new Date().getFullYear()} · silbaram.github.io</span>
      <span>made in seoul · gatsby / react / phaser</span>
    </div>
  </footer>
)

export default Footer

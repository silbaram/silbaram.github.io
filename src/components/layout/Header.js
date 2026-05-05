import React from "react"
import { GithubIcon } from "../Icons"
import { Link } from "gatsby"
import logoMark from "../../images/atelier/logo-mark.svg"

const Header = () => (
  <header className="sticky top-0 z-50 h-[var(--topbar-h)] border-b border-[var(--border)] bg-[var(--bg-1)]">
    <div className="mx-auto flex h-full max-w-[var(--container)] items-center justify-between px-[var(--page-pad)]">
      <Link
        to="/"
        className="flex items-center gap-2 bg-none text-[var(--fg-1)]"
      >
        <img src={logoMark} alt="" className="h-[26px] w-[26px]" />
        <span className="text-lg font-light leading-none">atelier</span>
      </Link>
      <nav className="flex items-center gap-5 sm:gap-7">
        <Link
          to="/"
          className="relative bg-none text-sm text-[var(--fg-1)] before:absolute before:-left-3 before:top-1/2 before:h-[5px] before:w-[5px] before:-translate-y-1/2 before:rounded-full before:bg-[var(--accent)]"
        >
          works
        </Link>
        <a
          href="https://github.com/silbaram/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-none text-sm text-[var(--fg-3)] transition-colors duration-200 hover:text-[var(--fg-1)]"
        >
          <GithubIcon />
          <span>github</span>
        </a>
      </nav>
    </div>
  </header>
)

export default Header

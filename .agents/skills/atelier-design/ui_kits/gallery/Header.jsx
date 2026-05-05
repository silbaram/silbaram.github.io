/* global React */
const { useState } = React;

function Header({ current = "works", onNav }) {
  const items = [
    { key: "works", label: "works", ko: "작업" },
    { key: "about", label: "about", ko: "소개" },
    { key: "index", label: "index", ko: "목록" },
  ];
  return (
    <header className="ds-header">
      <a className="ds-brand" onClick={() => onNav?.("works")}>
        <img src="../../assets/logo-mark.svg" alt="" />
        <span>atelier</span>
      </a>
      <nav className="ds-nav">
        {items.map((it) => (
          <a
            key={it.key}
            className={"ds-nav-item" + (current === it.key ? " is-current" : "")}
            onClick={() => onNav?.(it.key)}
          >
            {it.label}
          </a>
        ))}
      </nav>
      <div className="ds-meta">2026 · 03 / 24</div>
    </header>
  );
}

window.Header = Header;

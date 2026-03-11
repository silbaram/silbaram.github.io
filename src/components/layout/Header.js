import React from "react"
import { GamepadIcon, GithubIcon } from "../Icons"
import { Link } from "gatsby"

const Header = () => (
  <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
      <Link to="/">
        <div className="flex items-center space-x-2 cursor-pointer">
            <GamepadIcon />
            <h2 className="text-xl font-semibold tracking-tight text-neutral-900">Projects Hub</h2>
        </div>
      </Link>
      <nav className="flex items-center space-x-4 sm:space-x-6">
        <a href="https://github.com/silbaram/" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-neutral-900 px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-colors duration-200">
          <GithubIcon />
          <span>GitHub</span>
        </a>
      </nav>
    </div>
  </header>
);

export default Header

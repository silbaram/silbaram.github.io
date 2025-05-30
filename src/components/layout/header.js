import React from "react"
import { GamepadIcon, GithubIcon } from "../icons"
import { Link } from "gatsby"

const Header = () => (
  // 배경을 흰색으로, 그림자 유지, 텍스트 색상 어둡게
  <header className="bg-white text-slate-800 shadow-lg sticky top-0 z-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
      <Link to="/">
        <div className="flex items-center space-x-2 cursor-pointer">
            <GamepadIcon /> {/* 아이콘 색상은 부모 텍스트 색상을 따름 */}
            <h2 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">Projects Hub</h2>
        </div>
      </Link>
      <nav className="flex items-center space-x-4 sm:space-x-6">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors duration-200">
          <GithubIcon />
          <span>GitHub</span>
        </a>
      </nav>
    </div>
  </header>
);

export default Header
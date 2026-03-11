import React, { useState } from "react"
import { Link } from "gatsby"

const HomeButton = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to="/"
      className="fixed top-4 left-4 z-50 flex items-center justify-center rounded-full backdrop-blur-md border transition-all duration-300 ease-in-out"
      style={{
        width: hovered ? 'auto' : '36px',
        height: '36px',
        padding: hovered ? '0 14px' : '0',
        backgroundColor: hovered ? 'rgba(0,0,0,0.6)' : 'rgba(128,128,128,0.2)',
        borderColor: hovered ? 'rgba(255,255,255,0.3)' : 'rgba(128,128,128,0.2)',
        color: hovered ? '#fff' : 'rgba(180,180,180,0.7)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Back to projects"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 flex-shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
      </svg>
      {hovered && (
        <span className="text-xs font-medium ml-1.5 whitespace-nowrap">
          Home
        </span>
      )}
    </Link>
  );
};

const ProjectDetail = ({ title, mainClassName = '', children }) => {
  return (
    <div className={`h-screen w-screen overflow-auto ${mainClassName}`}>
      <HomeButton />
      {children}
    </div>
  );
};

export default ProjectDetail

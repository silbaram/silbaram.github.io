import { ArrowLeftIcon } from "./icons"
import React from "react"
import { Link } from "gatsby"

const ProjectDetail = ({ title, isFullscreen, children }) => {

  return (
    <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${isFullscreen ? 'py-0' : 'py-8 sm:py-12'}`}>
      {!isFullscreen && (
        <div className="flex justify-between items-center mb-8">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center hover:bg-blue-600">
            <ArrowLeftIcon />
            <Link to="/">
              <span className="group-hover:underline">Back to Projects</span>
            </Link>
          </button>
        </div>
      )}

      <div
        className={`bg-slate-700 rounded-xl shadow-2xl relative
            ${isFullscreen
          ? 'fixed inset-0 z-[9999] p-0 m-0 overflow-hidden bg-black flex flex-col items-center justify-center' // w-screen h-screen 제거
          : 'p-4 mb-8'}`
        }
      >
        <h3 className={`text-2xl font-semibold text-white mb-4 text-center ${isFullscreen ? 'mt-12 sm:mt-8' : ''}`}>
          {title}
        </h3>

        <div id="phaser-game-container" className={`w-full bg-slate-800 rounded-lg border-2 border-purple-500 flex items-center justify-center text-gray-500 ${isFullscreen ? 'flex-grow max-h-[calc(100%-6rem)] aspect-video' : 'h-[400px] sm:h-[500px] md:h-[600px]'}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail
import { CodeBracketIcon, GamepadIcon, MotionGraphicsIcon } from "./icons"
import React from "react"
import { Link } from "gatsby"

const ProjectCard = ({ project }) => (
  // 카드 배경을 흰색으로, 그림자 강조
  <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out flex flex-col">
    <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/CBD5E0/4A5568?text=Image+Error"; }} />
    <div className="p-6 flex flex-col flex-grow">
      <div className="flex items-center mb-2 text-slate-700"> {/* 아이콘 색상 부모 */}
        {project.type === 'game' ? (
          <GamepadIcon />
        ) : project.type === 'motion' ? (
          <MotionGraphicsIcon />
        ) : (
          <CodeBracketIcon />
        )}
        <h3 className="text-xl font-semibold ml-2 text-slate-900">{project.title}</h3>
      </div>
      <p className="text-gray-700 text-sm mb-4 flex-grow">{project.description}</p>
      <div className="mb-4">
        {/* 태그 스타일 변경 */}
        {project.tags.map(tag => (<span key={tag} className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">{tag}</span>))}
      </div>
      <Link
        to={`${project.demoUrl}`}
        state={{ isFullscreen: false }}
        className="block text-center mt-auto w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75"
        role="button"
        aria-label={`View details for ${project.title}`}
      >
        View Details
      </Link>
    </div>
  </div>
);

export default ProjectCard;
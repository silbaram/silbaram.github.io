import { CodeBracketIcon, GamepadIcon, MotionGraphicsIcon } from "./Icons"
import React from "react"
import { Link } from "gatsby"

const ProjectCard = ({ project }) => (
  <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden hover:border-neutral-300 transition-colors duration-200 flex flex-col">
    <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/f5f5f5/a3a3a3?text=Image+Error"; }} />
    <div className="p-5 flex flex-col flex-grow">
      <div className="flex items-center mb-2 text-neutral-500">
        {project.type === 'game' ? (
          <GamepadIcon />
        ) : project.type === 'motion' ? (
          <MotionGraphicsIcon />
        ) : (
          <CodeBracketIcon />
        )}
        <h3 className="text-base font-medium ml-2 text-neutral-900">{project.title}</h3>
      </div>
      <p className="text-neutral-500 text-sm mb-4 flex-grow leading-relaxed">{project.description}</p>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {project.tags.map(tag => (<span key={tag} className="inline-block bg-neutral-100 text-neutral-600 text-xs px-2 py-0.5 rounded">{tag}</span>))}
      </div>
      <Link
        to={`${project.demoUrl}`}
        className="block text-center mt-auto w-full border border-neutral-300 hover:border-neutral-400 text-neutral-600 hover:text-neutral-900 text-sm font-medium py-2.5 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:ring-offset-2"
        role="button"
        aria-label={`View details for ${project.title}`}
      >
        View Details
      </Link>
    </div>
  </div>
);

export default ProjectCard;

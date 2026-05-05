import React from "react"
import { Link } from "gatsby"

const typeLabel = {
  app: "web app",
  game: "game",
  motion: "motion",
}

const ProjectCard = ({ project, index }) => {
  const num = String(index + 1).padStart(2, "0")

  return (
    <article
      className="group opacity-0 [animation:atelier-enter_var(--dur-base)_var(--ease-out)_forwards]"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <Link
        to={project.demoUrl}
        className="block bg-none text-[var(--fg-1)]"
        aria-label={`${project.title} 보기`}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--bg-inv)] transition-shadow duration-[var(--dur-base)] ease-[var(--ease-out)] group-hover:shadow-[var(--shadow-1)]">
          <img
            src={project.imageUrl}
            alt=""
            className="h-full w-full object-cover transition-transform duration-[var(--dur-base)] ease-[var(--ease-out)] group-hover:scale-[1.02]"
            onError={e => {
              e.target.onerror = null
              e.target.src =
                "https://placehold.co/800x600/0e0e0c/f6f4ee?text=atelier"
            }}
          />
          <div className="absolute left-3 top-3 rounded-[var(--r-pill)] border border-[rgb(246_244_238_/_0.32)] bg-[rgb(14_14_12_/_0.72)] px-3 py-1 font-mono text-[11px] text-[var(--fg-inv)]">
            {typeLabel[project.type] || project.type}
          </div>
        </div>
        <div className="mt-3 flex items-baseline justify-between gap-4">
          <h3 className="text-lg font-bold leading-snug text-[var(--fg-1)] transition-colors duration-[var(--dur-fast)] group-hover:text-[var(--accent)]">
            {project.title}
          </h3>
          <span className="shrink-0 font-mono text-[11px] text-[var(--fg-3)]">
            {num}
          </span>
        </div>
        <p className="mt-1 max-w-[38rem] text-[13px] leading-relaxed text-[var(--fg-3)]">
          {project.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="rounded-[var(--r-pill)] border border-[var(--border)] px-3 py-1 font-mono text-[11px] text-[var(--fg-2)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </article>
  )
}

export default ProjectCard

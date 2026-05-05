import React, { useMemo, useState } from "react"
import ProjectCard from "./ProjectCard"

const filters = [
  { key: "all", label: "all" },
  { key: "game", label: "games" },
  { key: "app", label: "apps" },
  { key: "motion", label: "motion" },
]

const ProjectList = ({ projects }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")

  const filteredProjects = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()

    return projects.filter(project => {
      const haystack = [
        project.title,
        project.description,
        project.type,
        ...project.tags,
      ]
        .join(" ")
        .toLowerCase()
      const matchesSearch = !query || haystack.includes(query)
      const matchesFilter =
        activeFilter === "all" || project.type === activeFilter

      return matchesSearch && matchesFilter
    })
  }, [activeFilter, projects, searchTerm])

  return (
    <div className="mx-auto w-full max-w-[var(--container)] px-[var(--page-pad)] pb-[var(--s-10)] pt-[var(--s-8)]">
      <section className="pb-[var(--s-9)]">
        <p className="mb-5 font-mono text-[12px] text-[var(--fg-3)]">
          2026 · {String(projects.length).padStart(2, "0")} works
        </p>
        <h1 className="max-w-[920px] text-[var(--t-display)] font-light leading-none text-[var(--fg-1)]">
          작은 실험들
          <span className="block text-[var(--fg-3)]">small experiments</span>
        </h1>
        <p className="mt-6 max-w-[540px] text-[var(--fg-2)]">
          웹 도구, 게임, 모션 작업처럼 가볍게 만들고 다듬은 개인 프로젝트를
          모아두었습니다.
        </p>
      </section>

      <section aria-labelledby="recent-work">
        <div className="mb-8 flex flex-col gap-5 border-t border-[var(--border)] pt-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2
              id="recent-work"
              className="font-mono text-[12px] text-[var(--fg-3)]"
            >
              recent / 최근
            </h2>
            <p className="mt-1 text-sm text-[var(--fg-2)]">
              {filteredProjects.length} / {projects.length}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative block w-full sm:w-[320px]">
              <span className="sr-only">search projects</span>
              <input
                type="search"
                placeholder="search"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="h-10 w-full rounded-[var(--r-1)] border border-[var(--border)] bg-transparent px-4 pr-10 font-mono text-[12px] text-[var(--fg-1)] outline-none transition-colors duration-[var(--dur-fast)] placeholder:text-[var(--fg-4)] focus:border-[var(--fg-1)]"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[12px] text-[var(--fg-3)]">
                /
              </span>
            </label>

            <div
              className="flex flex-wrap gap-2"
              role="list"
              aria-label="project filters"
            >
              {filters.map(filter => (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setActiveFilter(filter.key)}
                  className={`rounded-[var(--r-pill)] border px-3 py-1 font-mono text-[11px] transition-colors duration-[var(--dur-fast)] ${
                    activeFilter === filter.key
                      ? "border-[var(--fg-1)] bg-[var(--fg-1)] text-[var(--fg-inv)]"
                      : "border-[var(--border)] bg-transparent text-[var(--fg-2)] hover:border-[var(--fg-1)]"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <p className="border-t border-[var(--border)] py-10 font-mono text-[12px] text-[var(--fg-3)]">
            아직 없음.
          </p>
        )}
      </section>
    </div>
  )
}

export default ProjectList

/* global React */
function ProjectCard({ project, index, onOpen }) {
  const num = String(index + 1).padStart(3, "0");
  return (
    <article
      className="ds-card"
      onClick={() => onOpen(project)}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="ds-card-thumb">
        <div className={"ds-scene scene-" + project.scene} />
      </div>
      <div className="ds-card-meta">
        <h3 className="ds-card-title">{project.title}</h3>
        <span className="ds-card-num">{num}</span>
      </div>
      <div className="ds-card-cap">{project.caption}</div>
    </article>
  );
}
window.ProjectCard = ProjectCard;

function Grid({ projects, onOpen }) {
  return (
    <div className="ds-grid">
      {projects.map((p, i) => (
        <ProjectCard key={p.id} project={p} index={i} onOpen={onOpen} />
      ))}
    </div>
  );
}
window.Grid = Grid;

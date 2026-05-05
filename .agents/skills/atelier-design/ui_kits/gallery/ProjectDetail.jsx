/* global React */
function ProjectDetail({ project, onClose }) {
  if (!project) return null;
  return (
    <div className="ds-lightbox" onClick={onClose}>
      <button className="ds-lightbox-close" onClick={onClose} aria-label="close">×</button>
      <div className="ds-lightbox-stage" onClick={(e) => e.stopPropagation()}>
        <div className={"ds-scene scene-" + project.scene} />
      </div>
      <div className="ds-lightbox-cap">
        <div>
          <div className="ds-lightbox-title">{project.title}</div>
          <div className="ds-lightbox-sub">{project.caption}</div>
        </div>
        <div className="ds-lightbox-nav">← → · esc</div>
      </div>
    </div>
  );
}
window.ProjectDetail = ProjectDetail;

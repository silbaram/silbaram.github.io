/* global React */
function Filters({ tags, active, onChange }) {
  return (
    <div className="ds-filters">
      {tags.map((t) => (
        <button
          key={t}
          className={"ds-tag" + (active === t ? " is-on" : "")}
          onClick={() => onChange(t)}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
window.Filters = Filters;

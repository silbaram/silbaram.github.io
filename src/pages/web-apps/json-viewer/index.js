import React, {
  startTransition,
  useDeferredValue,
  useEffect,
  useState,
} from "react"

import Seo from "../../../components/Seo"
import ProjectDetail from "../../../components/ProjectDetail"
import * as jsonViewerStyles from "./css/json-viewer-app.module.css"

const isExpandable = value => typeof value === "object" && value !== null

const getEntries = value =>
  Array.isArray(value)
    ? value.map((entry, index) => [String(index), entry])
    : Object.entries(value)

const getDataTypeLabel = value => {
  if (Array.isArray(value)) {
    return "Array"
  }

  if (value === null) {
    return "Null"
  }

  if (typeof value === "object") {
    return "Object"
  }

  if (typeof value === "boolean") {
    return "Boolean"
  }

  if (typeof value === "number") {
    return "Number"
  }

  return "String"
}

const getCollectionSummary = value => {
  const entryCount = Array.isArray(value)
    ? value.length
    : Object.keys(value).length
  const noun = Array.isArray(value)
    ? entryCount === 1
      ? "item"
      : "items"
    : entryCount === 1
    ? "key"
    : "keys"

  return `${entryCount} ${noun}`
}

const getTopLevelCount = value => {
  if (Array.isArray(value)) {
    return value.length
  }

  if (isExpandable(value)) {
    return Object.keys(value).length
  }

  return value === null ? 0 : 1
}

const formatPrimitiveValue = value => {
  if (typeof value === "string") {
    return `"${value}"`
  }

  return String(value)
}

const getValueToneClassName = value => {
  if (typeof value === "string") {
    return jsonViewerStyles.valueString
  }

  if (typeof value === "number") {
    return jsonViewerStyles.valueNumber
  }

  if (typeof value === "boolean") {
    return jsonViewerStyles.valueBoolean
  }

  return jsonViewerStyles.valueNull
}

const formatPathLabel = path =>
  path.split(".").reduce((accumulator, segment, index) => {
    if (index === 0) {
      return "root"
    }

    if (/^\d+$/.test(segment)) {
      return `${accumulator}[${segment}]`
    }

    return `${accumulator}.${segment}`
  }, "")

const normalizeSearchTerm = value => value.trim().toLowerCase()

const buildSearchText = (path, label, value) =>
  [
    formatPathLabel(path),
    label ?? "",
    getDataTypeLabel(value),
    isExpandable(value)
      ? getCollectionSummary(value)
      : formatPrimitiveValue(value),
  ]
    .join(" ")
    .toLowerCase()

const matchesSearch = (path, label, value, searchTerm) => {
  const normalizedSearchTerm = normalizeSearchTerm(searchTerm)

  if (!normalizedSearchTerm) {
    return false
  }

  return buildSearchText(path, label, value).includes(normalizedSearchTerm)
}

const collectExpandablePaths = (value, currentPath = "root") => {
  if (!isExpandable(value)) {
    return []
  }

  return [
    currentPath,
    ...getEntries(value).flatMap(([entryKey, entryValue]) =>
      collectExpandablePaths(entryValue, `${currentPath}.${entryKey}`)
    ),
  ]
}

const hasPath = (value, path) => {
  if (path === "root") {
    return true
  }

  let currentValue = value

  for (const segment of path.split(".").slice(1)) {
    if (
      !isExpandable(currentValue) ||
      !Object.prototype.hasOwnProperty.call(currentValue, segment)
    ) {
      return false
    }

    currentValue = currentValue[segment]
  }

  return true
}

const getNodeAtPath = (value, path) => {
  if (path === "root") {
    return value
  }

  return path
    .split(".")
    .slice(1)
    .reduce((currentValue, segment) => currentValue[segment], value)
}

const normalizeSelectedPath = (selectedPath, nextValue) =>
  selectedPath && hasPath(nextValue, selectedPath) ? selectedPath : null

const pruneCollapsedState = (currentState, parsedValue) => {
  const expandablePaths = new Set(collectExpandablePaths(parsedValue))
  const nextState = {}

  Object.entries(currentState).forEach(([path, isCollapsed]) => {
    if (isCollapsed && expandablePaths.has(path)) {
      nextState[path] = true
    }
  })

  return nextState
}

const summarizeValue = value =>
  isExpandable(value)
    ? getCollectionSummary(value)
    : formatPrimitiveValue(value)

const buildReviewFindings = stats => {
  const findings = []

  if (stats.maxDepth >= 6) {
    findings.push({
      tone: "caution",
      title: "Deep nesting",
      copy: `Maximum depth is ${stats.maxDepth}. This shape will be slower to scan and easier to misread.`,
    })
  }

  if (stats.maxArrayLength >= 12) {
    findings.push({
      tone: "caution",
      title: "Large arrays",
      copy: `The largest array contains ${stats.maxArrayLength} items. Consider collapsing list-heavy sections first.`,
    })
  }

  if (stats.maxObjectKeys >= 10) {
    findings.push({
      tone: "neutral",
      title: "Wide objects",
      copy: `At least one object exposes ${stats.maxObjectKeys} sibling keys, which can hide related fields in a long block.`,
    })
  }

  if (stats.mixedArrays > 0) {
    findings.push({
      tone: "neutral",
      title: "Mixed-type arrays",
      copy: `${stats.mixedArrays} array blocks contain multiple value types, so shape assumptions may not hold.`,
    })
  }

  if (stats.nulls > 0) {
    findings.push({
      tone: "neutral",
      title: "Nullable fields",
      copy: `${stats.nulls} null values were found. Downstream consumers will need null-safe handling.`,
    })
  }

  if (stats.emptyCollections > 0) {
    findings.push({
      tone: "neutral",
      title: "Empty containers",
      copy: `${stats.emptyCollections} empty object or array nodes appear in the payload.`,
    })
  }

  if (stats.longestString >= 120) {
    findings.push({
      tone: "neutral",
      title: "Long text payload",
      copy: `The longest string spans ${stats.longestString} characters, which is often worth validating separately from the shape itself.`,
    })
  }

  if (findings.length === 0) {
    findings.push({
      tone: "good",
      title: "Readable shape",
      copy: "Depth and branch sizes stay within a comfortable review range.",
    })
  }

  return findings.slice(0, 4)
}

const analyzeJson = value => {
  const stats = {
    nodes: 0,
    leaves: 0,
    objects: 0,
    arrays: 0,
    strings: 0,
    numbers: 0,
    booleans: 0,
    nulls: 0,
    maxDepth: 0,
    maxArrayLength: 0,
    maxObjectKeys: 0,
    longestString: 0,
    mixedArrays: 0,
    emptyCollections: 0,
  }
  const nodes = []
  const visitNode = (
    currentValue,
    path = "root",
    depth = 0,
    label = "root"
  ) => {
    stats.nodes += 1
    stats.maxDepth = Math.max(stats.maxDepth, depth)

    const type = getDataTypeLabel(currentValue)
    const expandable = isExpandable(currentValue)

    if (expandable) {
      const entries = getEntries(currentValue)
      const size = entries.length

      if (Array.isArray(currentValue)) {
        stats.arrays += 1
        stats.maxArrayLength = Math.max(stats.maxArrayLength, size)

        if (size === 0) {
          stats.emptyCollections += 1
        }

        if (new Set(currentValue.map(getDataTypeLabel)).size > 1) {
          stats.mixedArrays += 1
        }
      } else {
        stats.objects += 1
        stats.maxObjectKeys = Math.max(stats.maxObjectKeys, size)

        if (size === 0) {
          stats.emptyCollections += 1
        }
      }

      nodes.push({
        path,
        label,
        type,
        depth,
        expandable: true,
        summary: getCollectionSummary(currentValue),
        searchText: buildSearchText(path, label, currentValue),
      })

      entries.forEach(([entryKey, entryValue]) => {
        visitNode(
          entryValue,
          `${path}.${entryKey}`,
          depth + 1,
          Array.isArray(currentValue) ? `[${entryKey}]` : entryKey
        )
      })

      return
    }

    stats.leaves += 1

    if (currentValue === null) {
      stats.nulls += 1
    } else if (typeof currentValue === "string") {
      stats.strings += 1
      stats.longestString = Math.max(stats.longestString, currentValue.length)
    } else if (typeof currentValue === "number") {
      stats.numbers += 1
    } else if (typeof currentValue === "boolean") {
      stats.booleans += 1
    }

    nodes.push({
      path,
      label,
      type,
      depth,
      expandable: false,
      summary: formatPrimitiveValue(currentValue),
      searchText: buildSearchText(path, label, currentValue),
    })
  }

  visitNode(value)

  return {
    stats,
    nodes,
    findings: buildReviewFindings(stats),
  }
}

const buildInspectorDetails = (rootValue, path) => {
  if (!hasPath(rootValue, path)) {
    return null
  }

  const value = getNodeAtPath(rootValue, path)
  const type = getDataTypeLabel(value)
  const expandable = isExpandable(value)
  const entries = expandable ? getEntries(value) : []
  const childPreview = entries.slice(0, 8).map(([entryKey, entryValue]) => ({
    label: Array.isArray(value) ? `[${entryKey}]` : entryKey,
    type: getDataTypeLabel(entryValue),
    summary: summarizeValue(entryValue),
  }))

  return {
    pathLabel: formatPathLabel(path),
    type,
    expandable,
    summary: expandable ? getCollectionSummary(value) : "Primitive value",
    previewValue: expandable ? null : formatPrimitiveValue(value),
    childPreview,
    hiddenChildCount: Math.max(entries.length - childPreview.length, 0),
    stringLength: typeof value === "string" ? value.length : null,
    collectionSize: expandable ? entries.length : null,
  }
}

const getTypeBreakdown = stats => [
  { label: "Objects", value: stats.objects },
  { label: "Arrays", value: stats.arrays },
  { label: "Strings", value: stats.strings },
  { label: "Numbers", value: stats.numbers },
  { label: "Booleans", value: stats.booleans },
  { label: "Nulls", value: stats.nulls },
]

const handleRowKeyDown = (event, onSelect, path) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault()
    onSelect(path)
  }
}

const TreeNode = ({
  value,
  label,
  path,
  depth,
  collapsedState,
  selectedPath,
  searchTerm,
  onSelect,
  onToggle,
}) => {
  const expandable = isExpandable(value)
  const rowStyle = { paddingLeft: `${depth * 18}px` }
  const showRootLabel = depth === 0 && label === null
  const rowIsSelected = selectedPath === path
  const rowMatchesSearch = matchesSearch(path, label, value, searchTerm)

  if (!expandable) {
    return (
      <div className={jsonViewerStyles.treeNode}>
        <div
          className={`${jsonViewerStyles.nodeRow} ${
            rowIsSelected ? jsonViewerStyles.nodeRowSelected : ""
          } ${rowMatchesSearch ? jsonViewerStyles.nodeRowMatch : ""}`}
          style={rowStyle}
          tabIndex={0}
          role="button"
          onClick={() => onSelect(path)}
          onKeyDown={event => handleRowKeyDown(event, onSelect, path)}
        >
          <span className={jsonViewerStyles.nodeSpacer} />
          {showRootLabel && (
            <span className={jsonViewerStyles.rootLabel}>root</span>
          )}
          {label !== null && (
            <span className={jsonViewerStyles.nodeKey}>{label}</span>
          )}
          {(showRootLabel || label !== null) && (
            <span className={jsonViewerStyles.nodeColon}>:</span>
          )}
          <span className={getValueToneClassName(value)}>
            {formatPrimitiveValue(value)}
          </span>
        </div>
      </div>
    )
  }

  const isArray = Array.isArray(value)
  const entries = getEntries(value)
  const isCollapsed = collapsedState[path] ?? false

  return (
    <div
      className={`${jsonViewerStyles.treeNode} ${jsonViewerStyles.treeNodeExpandable}`}
      style={{ "--tree-depth": depth }}
    >
      <div
        className={`${jsonViewerStyles.nodeRow} ${
          depth === 0 ? jsonViewerStyles.rootNodeRow : ""
        } ${rowIsSelected ? jsonViewerStyles.nodeRowSelected : ""} ${
          rowMatchesSearch ? jsonViewerStyles.nodeRowMatch : ""
        }`}
        style={rowStyle}
        tabIndex={0}
        role="button"
        onClick={() => onSelect(path)}
        onKeyDown={event => handleRowKeyDown(event, onSelect, path)}
      >
        <button
          type="button"
          className={jsonViewerStyles.toggleButton}
          onClick={event => {
            event.stopPropagation()
            onToggle(path)
            onSelect(path)
          }}
          aria-label={`${isCollapsed ? "Expand" : "Collapse"} ${
            label || "root"
          }`}
        >
          {isCollapsed ? "+" : "-"}
        </button>
        {showRootLabel && (
          <span className={jsonViewerStyles.rootLabel}>root</span>
        )}
        {label !== null && (
          <span className={jsonViewerStyles.nodeKey}>{label}</span>
        )}
        {(showRootLabel || label !== null) && (
          <span className={jsonViewerStyles.nodeColon}>:</span>
        )}
        <span className={jsonViewerStyles.nodeBracket}>
          {isArray ? "[" : "{"}
        </span>
        <span className={jsonViewerStyles.nodeSummary}>
          {getCollectionSummary(value)}
        </span>
        <span className={jsonViewerStyles.nodeBracket}>
          {isArray ? "]" : "}"}
        </span>
      </div>

      {!isCollapsed && entries.length > 0 && (
        <div className={jsonViewerStyles.nodeChildren}>
          {entries.map(([entryKey, entryValue]) => (
            <TreeNode
              key={`${path}.${entryKey}`}
              value={entryValue}
              label={isArray ? `[${entryKey}]` : entryKey}
              path={`${path}.${entryKey}`}
              depth={depth + 1}
              collapsedState={collapsedState}
              selectedPath={selectedPath}
              searchTerm={searchTerm}
              onSelect={onSelect}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const JSONFormatterComponent = () => {
  const [input, setInput] = useState("")
  const [error, setError] = useState("")
  const [jsonData, setJsonData] = useState(null)
  const [collapsedState, setCollapsedState] = useState({})
  const [selectedPath, setSelectedPath] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [feedback, setFeedback] = useState("")
  const deferredInput = useDeferredValue(input)

  useEffect(() => {
    const trimmedInput = deferredInput.trim()

    if (!trimmedInput) {
      startTransition(() => {
        setJsonData(null)
        setError("")
        setCollapsedState({})
        setSelectedPath(null)
        setSearchTerm("")
      })
      return
    }

    try {
      const parsedData = JSON.parse(deferredInput)

      startTransition(() => {
        setJsonData(parsedData)
        setError("")
        setCollapsedState(currentState =>
          pruneCollapsedState(currentState, parsedData)
        )
        setSelectedPath(currentSelectedPath =>
          normalizeSelectedPath(currentSelectedPath, parsedData)
        )
      })
    } catch (parseError) {
      startTransition(() => {
        setJsonData(null)
        setError(`Invalid JSON: ${parseError.message}`)
        setSelectedPath(null)
      })
    }
  }, [deferredInput])

  useEffect(() => {
    if (!feedback) {
      return undefined
    }

    const timer = window.setTimeout(() => {
      setFeedback("")
    }, 2200)

    return () => {
      window.clearTimeout(timer)
    }
  }, [feedback])

  const handleInputChange = event => {
    setInput(event.target.value)
  }

  const handleToggle = path => {
    setCollapsedState(currentState => ({
      ...currentState,
      [path]: !currentState[path],
    }))
  }

  const handleSelectPath = path => {
    setSelectedPath(path)
  }

  const handleFormat = () => {
    if (jsonData === null) {
      return
    }

    setInput(JSON.stringify(jsonData, null, 2))
    setFeedback("Formatted")
  }

  const handleMinify = () => {
    if (jsonData === null) {
      return
    }

    setInput(JSON.stringify(jsonData))
    setFeedback("Minified")
  }

  const handleClear = () => {
    setInput("")
    setError("")
    setJsonData(null)
    setCollapsedState({})
    setSelectedPath(null)
    setSearchTerm("")
    setFeedback("")
  }

  const handleCopy = async () => {
    if (jsonData === null || typeof navigator === "undefined") {
      return
    }

    try {
      await navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2))
      setFeedback("Copied")
    } catch (copyError) {
      setFeedback("Copy unavailable")
    }
  }

  const handleExpandAll = () => {
    setCollapsedState({})
  }

  const handleCollapseAll = () => {
    if (!jsonData || !isExpandable(jsonData)) {
      return
    }

    const nextState = {}

    collectExpandablePaths(jsonData)
      .filter(path => path !== "root")
      .forEach(path => {
        nextState[path] = true
      })

    setCollapsedState(nextState)
  }

  const analysis = jsonData !== null ? analyzeJson(jsonData) : null
  const selectedNodeDetails =
    jsonData !== null && selectedPath
      ? buildInspectorDetails(jsonData, selectedPath)
      : null
  const typeBreakdown = analysis
    ? getTypeBreakdown(analysis.stats).filter(entry => entry.value > 0)
    : []
  const normalizedSearchTerm = normalizeSearchTerm(searchTerm)
  const searchMatchCount = analysis
    ? analysis.nodes.filter(node =>
        normalizedSearchTerm
          ? node.searchText.includes(normalizedSearchTerm)
          : false
      ).length
    : 0

  const validationState = error
    ? "invalid"
    : jsonData !== null
    ? "valid"
    : input.trim()
    ? "loading"
    : "idle"
  const validationLabel = error
    ? "Invalid JSON"
    : jsonData !== null
    ? "Valid JSON"
    : input.trim()
    ? "Parsing"
    : "Waiting"
  const structureLabel = jsonData !== null ? getDataTypeLabel(jsonData) : "None"
  const topLevelCount = jsonData !== null ? getTopLevelCount(jsonData) : 0
  const lineCount = input ? input.split(/\r?\n/).length : 0
  const characterCount = input.length
  const hasExpandableData = jsonData !== null && isExpandable(jsonData)
  const isDeferred = deferredInput !== input

  return (
    <div className={jsonViewerStyles.viewerShell}>
      <header className={jsonViewerStyles.hero}>
        <div>
          <p className={jsonViewerStyles.eyebrow}>Developer Tool</p>
          <h1 className={jsonViewerStyles.title}>JSON Viewer</h1>
          <p className={jsonViewerStyles.subtitle}>
            Paste raw JSON, validate instantly, and scan nested structures with
            a cleaner review workspace.
          </p>
        </div>

        <div className={jsonViewerStyles.metricGrid}>
          <div className={jsonViewerStyles.metricCard}>
            <span className={jsonViewerStyles.metricLabel}>Status</span>
            <span
              className={`${jsonViewerStyles.metricValue} ${
                validationState === "valid"
                  ? jsonViewerStyles.metricValid
                  : validationState === "invalid"
                  ? jsonViewerStyles.metricInvalid
                  : jsonViewerStyles.metricMuted
              }`}
            >
              {isDeferred ? "Parsing" : validationLabel}
            </span>
          </div>
          <div className={jsonViewerStyles.metricCard}>
            <span className={jsonViewerStyles.metricLabel}>Structure</span>
            <span className={jsonViewerStyles.metricValue}>
              {structureLabel}
            </span>
          </div>
          <div className={jsonViewerStyles.metricCard}>
            <span className={jsonViewerStyles.metricLabel}>Top Level</span>
            <span className={jsonViewerStyles.metricValue}>
              {topLevelCount}
            </span>
          </div>
          <div className={jsonViewerStyles.metricCard}>
            <span className={jsonViewerStyles.metricLabel}>Characters</span>
            <span className={jsonViewerStyles.metricValue}>
              {characterCount}
            </span>
          </div>
        </div>
      </header>

      <div className={jsonViewerStyles.workspace}>
        <section
          className={`${jsonViewerStyles.panel} ${jsonViewerStyles.editorPanel}`}
        >
          <div className={jsonViewerStyles.panelHeader}>
            <div>
              <p className={jsonViewerStyles.panelEyebrow}>Input</p>
              <h2 className={jsonViewerStyles.panelTitle}>
                Paste or edit JSON
              </h2>
            </div>
            <div
              className={`${jsonViewerStyles.validationBadge} ${
                validationState === "valid"
                  ? jsonViewerStyles.validationValid
                  : validationState === "invalid"
                  ? jsonViewerStyles.validationInvalid
                  : jsonViewerStyles.validationIdle
              }`}
            >
              {isDeferred ? "Parsing..." : validationLabel}
            </div>
          </div>

          <div className={jsonViewerStyles.actionRow}>
            <button
              type="button"
              onClick={handleFormat}
              className={jsonViewerStyles.primaryAction}
              disabled={jsonData === null}
            >
              Format
            </button>
            <button
              type="button"
              onClick={handleMinify}
              className={jsonViewerStyles.secondaryAction}
              disabled={jsonData === null}
            >
              Minify
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className={jsonViewerStyles.secondaryAction}
              disabled={jsonData === null}
            >
              Copy
            </button>
            <button
              type="button"
              onClick={handleClear}
              className={jsonViewerStyles.ghostAction}
              disabled={!input}
            >
              Clear
            </button>
          </div>

          <textarea
            className={jsonViewerStyles.textarea}
            value={input}
            onChange={handleInputChange}
            placeholder="Paste JSON here..."
            spellCheck={false}
          />

          <div className={jsonViewerStyles.editorFooter}>
            <div className={jsonViewerStyles.footerMeta}>
              <span>{lineCount} lines</span>
              <span>{characterCount} chars</span>
            </div>
            <div className={jsonViewerStyles.footerStatus} aria-live="polite">
              {feedback || "Ready"}
            </div>
          </div>
        </section>

        <section
          className={`${jsonViewerStyles.panel} ${jsonViewerStyles.viewerPanel}`}
        >
          <div className={jsonViewerStyles.panelHeader}>
            <div>
              <p className={jsonViewerStyles.panelEyebrow}>Output</p>
              <h2 className={jsonViewerStyles.panelTitle}>Structured review</h2>
            </div>
            <div className={jsonViewerStyles.viewerActionGroup}>
              <button
                type="button"
                onClick={handleExpandAll}
                className={jsonViewerStyles.secondaryAction}
                disabled={!hasExpandableData}
              >
                Expand all
              </button>
              <button
                type="button"
                onClick={handleCollapseAll}
                className={jsonViewerStyles.secondaryAction}
                disabled={!hasExpandableData}
              >
                Collapse all
              </button>
            </div>
          </div>

          <div className={jsonViewerStyles.reviewToolbar}>
            <label className={jsonViewerStyles.searchField}>
              <span className={jsonViewerStyles.searchLabel}>
                Search review
              </span>
              <input
                className={jsonViewerStyles.searchInput}
                value={searchTerm}
                onChange={event => setSearchTerm(event.target.value)}
                placeholder="Path, key, or value"
                spellCheck={false}
              />
            </label>
            <div className={jsonViewerStyles.searchStatus}>
              {normalizedSearchTerm
                ? `${searchMatchCount} match${
                    searchMatchCount === 1 ? "" : "es"
                  }`
                : "Search idle"}
            </div>
          </div>

          <div className={jsonViewerStyles.reviewWorkbench}>
            <div className={jsonViewerStyles.treeCanvas}>
              <div className={jsonViewerStyles.treeCanvasHeader}>
                <div>
                  <p className={jsonViewerStyles.treeCanvasEyebrow}>
                    Tree Browser
                  </p>
                  <p className={jsonViewerStyles.treeCanvasTitle}>
                    Hover for row focus, click to inspect a node.
                  </p>
                </div>
              </div>

              <div className={jsonViewerStyles.viewerSurface}>
                {error ? (
                  <div className={jsonViewerStyles.errorState}>
                    <p className={jsonViewerStyles.stateTitle}>
                      JSON could not be parsed
                    </p>
                    <p className={jsonViewerStyles.stateCopy}>
                      문법이 맞지 않으면 트리 뷰 대신 오류를 바로 보여줍니다.
                    </p>
                    <code className={jsonViewerStyles.errorMessage}>
                      {error}
                    </code>
                  </div>
                ) : jsonData !== null ? (
                  <div className={jsonViewerStyles.treeViewport}>
                    <TreeNode
                      value={jsonData}
                      label={null}
                      path="root"
                      depth={0}
                      collapsedState={collapsedState}
                      selectedPath={selectedPath}
                      searchTerm={searchTerm}
                      onSelect={handleSelectPath}
                      onToggle={handleToggle}
                    />
                  </div>
                ) : (
                  <div className={jsonViewerStyles.emptyState}>
                    <p className={jsonViewerStyles.stateTitle}>
                      Paste JSON to begin
                    </p>
                    <p className={jsonViewerStyles.stateCopy}>
                      입력이 유효해지면 탐색 가능한 트리와 간단한 구조 요약이
                      표시됩니다.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <aside className={jsonViewerStyles.inspectorRail}>
              <section className={jsonViewerStyles.inspectorCard}>
                <div className={jsonViewerStyles.inspectorHeader}>
                  <p className={jsonViewerStyles.inspectorEyebrow}>Selection</p>
                  <h3 className={jsonViewerStyles.inspectorTitle}>
                    Node inspector
                  </h3>
                </div>

                {selectedNodeDetails ? (
                  <div className={jsonViewerStyles.inspectorContent}>
                    <div className={jsonViewerStyles.inspectorPath}>
                      {selectedNodeDetails.pathLabel}
                    </div>
                    <div className={jsonViewerStyles.inspectorMetaRow}>
                      <span className={jsonViewerStyles.inspectorTypeBadge}>
                        {selectedNodeDetails.type}
                      </span>
                      <span className={jsonViewerStyles.inspectorMetaText}>
                        {selectedNodeDetails.summary}
                      </span>
                    </div>
                    {selectedNodeDetails.previewValue && (
                      <code className={jsonViewerStyles.inspectorPreview}>
                        {selectedNodeDetails.previewValue}
                      </code>
                    )}
                    {selectedNodeDetails.stringLength !== null && (
                      <p className={jsonViewerStyles.inspectorNote}>
                        String length {selectedNodeDetails.stringLength}
                      </p>
                    )}
                    {selectedNodeDetails.childPreview.length > 0 && (
                      <div className={jsonViewerStyles.inspectorChipGroup}>
                        {selectedNodeDetails.childPreview.map(child => (
                          <div
                            key={`${selectedNodeDetails.pathLabel}.${child.label}`}
                            className={jsonViewerStyles.inspectorChip}
                          >
                            <span
                              className={jsonViewerStyles.inspectorChipLabel}
                            >
                              {child.label}
                            </span>
                            <span
                              className={jsonViewerStyles.inspectorChipMeta}
                            >
                              {child.type}
                            </span>
                          </div>
                        ))}
                        {selectedNodeDetails.hiddenChildCount > 0 && (
                          <div className={jsonViewerStyles.inspectorChipMuted}>
                            +{selectedNodeDetails.hiddenChildCount} more
                            children
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className={jsonViewerStyles.inspectorPlaceholder}>
                    노드를 클릭하면 경로, 타입, 하위 구조를 이 영역에서 간단히
                    확인할 수 있습니다.
                  </p>
                )}
              </section>

              <section className={jsonViewerStyles.inspectorCard}>
                <div className={jsonViewerStyles.inspectorHeader}>
                  <p className={jsonViewerStyles.inspectorEyebrow}>
                    Shape overview
                  </p>
                  <h3 className={jsonViewerStyles.inspectorTitle}>
                    Review snapshot
                  </h3>
                </div>

                {analysis ? (
                  <div className={jsonViewerStyles.inspectorContent}>
                    <div className={jsonViewerStyles.snapshotGrid}>
                      <div className={jsonViewerStyles.snapshotMetric}>
                        <span className={jsonViewerStyles.snapshotMetricLabel}>
                          Max depth
                        </span>
                        <strong
                          className={jsonViewerStyles.snapshotMetricValue}
                        >
                          {analysis.stats.maxDepth}
                        </strong>
                      </div>
                      <div className={jsonViewerStyles.snapshotMetric}>
                        <span className={jsonViewerStyles.snapshotMetricLabel}>
                          Total nodes
                        </span>
                        <strong
                          className={jsonViewerStyles.snapshotMetricValue}
                        >
                          {analysis.stats.nodes}
                        </strong>
                      </div>
                      <div className={jsonViewerStyles.snapshotMetric}>
                        <span className={jsonViewerStyles.snapshotMetricLabel}>
                          Leaf values
                        </span>
                        <strong
                          className={jsonViewerStyles.snapshotMetricValue}
                        >
                          {analysis.stats.leaves}
                        </strong>
                      </div>
                      <div className={jsonViewerStyles.snapshotMetric}>
                        <span className={jsonViewerStyles.snapshotMetricLabel}>
                          Largest array
                        </span>
                        <strong
                          className={jsonViewerStyles.snapshotMetricValue}
                        >
                          {analysis.stats.maxArrayLength}
                        </strong>
                      </div>
                    </div>

                    <div className={jsonViewerStyles.overviewBlock}>
                      <span className={jsonViewerStyles.overviewBlockLabel}>
                        Findings
                      </span>
                      <div className={jsonViewerStyles.findingList}>
                        {analysis.findings.slice(0, 2).map(finding => (
                          <article
                            key={finding.title}
                            className={`${jsonViewerStyles.findingCard} ${
                              finding.tone === "good"
                                ? jsonViewerStyles.findingGood
                                : finding.tone === "caution"
                                ? jsonViewerStyles.findingCaution
                                : jsonViewerStyles.findingNeutral
                            }`}
                          >
                            <h4 className={jsonViewerStyles.findingTitle}>
                              {finding.title}
                            </h4>
                            <p className={jsonViewerStyles.findingCopy}>
                              {finding.copy}
                            </p>
                          </article>
                        ))}
                      </div>
                    </div>

                    <div className={jsonViewerStyles.overviewBlock}>
                      <span className={jsonViewerStyles.overviewBlockLabel}>
                        Type mix
                      </span>
                      <div className={jsonViewerStyles.breakdownList}>
                        {typeBreakdown.slice(0, 4).map(entry => (
                          <div
                            key={entry.label}
                            className={jsonViewerStyles.breakdownItem}
                          >
                            <span className={jsonViewerStyles.breakdownLabel}>
                              {entry.label}
                            </span>
                            <span className={jsonViewerStyles.breakdownValue}>
                              {entry.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className={jsonViewerStyles.inspectorPlaceholder}>
                    JSON을 입력하면 구조 요약과 핵심 검토 포인트만 간단히
                    정리해서 보여줍니다.
                  </p>
                )}
              </section>
            </aside>
          </div>
        </section>
      </div>
    </div>
  )
}

const JsonViewerApp = () => {
  return (
    <ProjectDetail mainClassName={jsonViewerStyles.page}>
      <div className={jsonViewerStyles.app}>
        <JSONFormatterComponent />
      </div>
    </ProjectDetail>
  )
}

export const Head = () => (
  <Seo
    title="JSON Formatter – JSON 뷰어"
    description="Quickly paste JSON and explore its structure with expand/collapse functionality."
    keywords={[
      "JSON 뷰어",
      "JSON 포매터",
      "Webtool",
      "개발 도구",
      "JSON Viewer",
      "JSON Formatter",
      "Webtool",
      "Developer Tool",
    ]}
  />
)

export default JsonViewerApp

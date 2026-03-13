import React, { useState } from "react"

import Seo from "../../../components/Seo"
import ProjectDetail from "../../../components/ProjectDetail"
import * as urlToolStyles from "./css/url-encoder-decoder.module.css"

const SAMPLE_PRESETS = [
  {
    id: "full-url",
    label: "Full URL",
    value: "https://example.com/search?q=서울 맛집&sort=recent view#hero section",
  },
  {
    id: "query-value",
    label: "Query",
    value: "coupon=봄 세일 20% off",
  },
  {
    id: "path-segment",
    label: "Path",
    value: "docs/한글 파일/요약본 v2.pdf",
  },
]

const encodeUrlValue = value =>
  value.replace(/[^/:?#[\]@!$&'()*+,;=]/g, character =>
    encodeURIComponent(character)
  )

const decodeUrlValue = value =>
  decodeURIComponent(value.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"))

const countMatches = (value, expression) => (value.match(expression) || []).length

const getInputModeLabel = value => {
  if (!value.trim()) {
    return "Idle"
  }

  if (/%[0-9A-Fa-f]{2}/.test(value)) {
    return "Encoded"
  }

  if (/[^\x00-\x7F]/.test(value) || /\s/.test(value)) {
    return "Needs encode"
  }

  return "URL-safe"
}

const formatLengthLabel = (result, source) => {
  if (!result) {
    return "No result"
  }

  const lengthDelta = result.length - source.length

  if (lengthDelta === 0) {
    return `${result.length} chars`
  }

  return `${result.length} chars (${lengthDelta > 0 ? "+" : ""}${lengthDelta})`
}

const URLEncoderDecoderComponent = () => {
  const [input, setInput] = useState("")
  const [encodedText, setEncodedText] = useState("")
  const [decodedText, setDecodedText] = useState("")
  const [decodeError, setDecodeError] = useState("")
  const [lastAction, setLastAction] = useState("Ready")
  const [copiedField, setCopiedField] = useState(null)
  const [activePresetId, setActivePresetId] = useState(null)

  const inputLength = input.length
  const unsafeCharacterCount = Array.from(input).filter(character =>
    /[^/:?#[\]@!$&'()*+,;=]/.test(character)
  ).length
  const encodedFragmentCount = countMatches(input, /%[0-9A-Fa-f]{2}/g)
  const inputModeLabel = getInputModeLabel(input)

  const clearResults = () => {
    setEncodedText("")
    setDecodedText("")
    setDecodeError("")
    setCopiedField(null)
  }

  const handleInputChange = event => {
    const nextInput = event.target.value

    setInput(nextInput)
    setActivePresetId(null)
    clearResults()
    setLastAction(nextInput ? "Editing" : "Ready")
  }

  const copyToClipboard = async (value, field) => {
    if (!value) {
      return
    }

    if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
      setLastAction("Clipboard")
      return
    }

    try {
      await navigator.clipboard.writeText(value)
      setCopiedField(field)
      setLastAction("Copied")

      window.setTimeout(() => {
        setCopiedField(currentField =>
          currentField === field ? null : currentField
        )
      }, 1400)
    } catch {
      setLastAction("Clipboard")
    }
  }

  const encodeText = () => {
    if (!input) {
      setEncodedText("")
      setLastAction("Waiting")
      return
    }

    setEncodedText(encodeUrlValue(input))
    setDecodeError("")
    setCopiedField(null)
    setLastAction("Encoded")
  }

  const decodeText = () => {
    if (!input) {
      setDecodedText("")
      setLastAction("Waiting")
      return
    }

    try {
      setDecodedText(decodeUrlValue(input))
      setDecodeError("")
      setCopiedField(null)
      setLastAction("Decoded")
    } catch {
      setDecodedText("")
      setDecodeError("Invalid escape sequence")
      setLastAction("Error")
    }
  }

  const resetAll = () => {
    setInput("")
    setActivePresetId(null)
    clearResults()
    setLastAction("Ready")
  }

  const loadSample = preset => {
    setInput(preset.value)
    setActivePresetId(preset.id)
    clearResults()
    setLastAction("Sample")
  }

  const moveResultToInput = value => {
    if (!value) {
      return
    }

    setInput(value)
    setActivePresetId(null)
    clearResults()
    setLastAction("Loaded")
  }

  const statusToneClassName = decodeError
    ? urlToolStyles.statusError
    : lastAction === "Ready" || lastAction === "Waiting"
    ? urlToolStyles.statusReady
    : urlToolStyles.statusActive

  const resultCards = [
    {
      id: "encoded",
      label: "Encoded",
      value: encodedText,
      meta: formatLengthLabel(encodedText, input),
      toneClassName: urlToolStyles.encodedCard,
      emptyCopy: "Run Encode",
    },
    {
      id: "decoded",
      label: "Decoded",
      value: decodedText,
      meta: decodeError ? "Check input" : formatLengthLabel(decodedText, input),
      toneClassName: urlToolStyles.decodedCard,
      emptyCopy: "Run Decode",
    },
  ]

  return (
    <div className={urlToolStyles.shell}>
      <header className={urlToolStyles.header}>
        <h1 className={urlToolStyles.title}>URL Encoder / Decoder</h1>

        <div className={urlToolStyles.headerRow}>
          <span className={`${urlToolStyles.statusBadge} ${statusToneClassName}`}>
            {lastAction}
          </span>

          <div className={urlToolStyles.metaList}>
            <span className={urlToolStyles.metaChip}>{inputModeLabel}</span>
            <span className={urlToolStyles.metaChip}>{inputLength} chars</span>
            <span className={urlToolStyles.metaChip}>
              {unsafeCharacterCount} unsafe
            </span>
            <span className={urlToolStyles.metaChip}>
              {encodedFragmentCount} escapes
            </span>
          </div>
        </div>
      </header>

      <div className={urlToolStyles.toolbar}>
        <div className={urlToolStyles.sampleList}>
          {SAMPLE_PRESETS.map(preset => (
            <button
              key={preset.id}
              type="button"
              className={`${urlToolStyles.sampleChip} ${
                activePresetId === preset.id ? urlToolStyles.sampleChipActive : ""
              }`}
              onClick={() => loadSample(preset)}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          className={urlToolStyles.resetButton}
          onClick={resetAll}
        >
          Reset
        </button>
      </div>

      <section className={urlToolStyles.workspace}>
        <div className={urlToolStyles.panel}>
          <div className={urlToolStyles.panelHeader}>
            <h2 className={urlToolStyles.panelTitle}>Input</h2>

            <div className={urlToolStyles.actionRow}>
              <button
                type="button"
                className={urlToolStyles.encodeButton}
                onClick={encodeText}
              >
                Encode
              </button>
              <button
                type="button"
                className={urlToolStyles.decodeButton}
                onClick={decodeText}
              >
                Decode
              </button>
            </div>
          </div>

          <textarea
            value={input}
            onChange={handleInputChange}
            className={urlToolStyles.textarea}
            placeholder="https://example.com/search?q=coffee beans&view=grid"
            spellCheck={false}
            aria-label="URL tool input"
          />
        </div>

        <div className={urlToolStyles.panel}>
          <div className={urlToolStyles.panelHeader}>
            <h2 className={urlToolStyles.panelTitle}>Output</h2>
          </div>

          <div className={urlToolStyles.resultGrid}>
            {resultCards.map(resultCard => {
              const isErrorCard =
                resultCard.id === "decoded" && Boolean(decodeError)

              return (
                <section
                  key={resultCard.id}
                  className={`${urlToolStyles.resultCard} ${
                    resultCard.toneClassName
                  } ${isErrorCard ? urlToolStyles.resultCardError : ""}`}
                >
                  <div className={urlToolStyles.resultCardHeader}>
                    <div>
                      <p className={urlToolStyles.resultLabel}>{resultCard.label}</p>
                      <p className={urlToolStyles.resultMeta}>{resultCard.meta}</p>
                    </div>

                    <div className={urlToolStyles.resultActions}>
                      <button
                        type="button"
                        className={urlToolStyles.miniAction}
                        onClick={() =>
                          copyToClipboard(resultCard.value, resultCard.id)
                        }
                        disabled={!resultCard.value}
                      >
                        {copiedField === resultCard.id ? "Copied" : "Copy"}
                      </button>
                      <button
                        type="button"
                        className={urlToolStyles.miniAction}
                        onClick={() => moveResultToInput(resultCard.value)}
                        disabled={!resultCard.value}
                      >
                        Use
                      </button>
                    </div>
                  </div>

                  <div
                    className={`${urlToolStyles.resultSurface} ${
                      resultCard.value
                        ? urlToolStyles.resultSurfaceFilled
                        : urlToolStyles.resultSurfaceEmpty
                    }`}
                    aria-live="polite"
                  >
                    {resultCard.value ? (
                      <pre className={urlToolStyles.resultCode}>
                        {resultCard.value}
                      </pre>
                    ) : (
                      <p className={urlToolStyles.resultEmpty}>
                        {resultCard.emptyCopy}
                      </p>
                    )}
                  </div>

                  {isErrorCard ? (
                    <p className={urlToolStyles.errorMessage}>{decodeError}</p>
                  ) : null}
                </section>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

const URLEncoderDecoderApp = () => (
  <ProjectDetail mainClassName={urlToolStyles.page}>
    <div className={urlToolStyles.app}>
      <URLEncoderDecoderComponent />
    </div>
  </ProjectDetail>
)

export const Head = () => (
  <Seo
    title="URL Encoder Decoder"
    description="Encode or decode URLs, query strings, and UTF-8 text in a simple browser workspace."
    keywords={[
      "URL encoder",
      "URL decoder",
      "query string tool",
      "percent encoding",
      "developer utility",
      "웹 도구",
      "URL 인코더",
      "URL 디코더",
    ]}
  />
)

export default URLEncoderDecoderApp

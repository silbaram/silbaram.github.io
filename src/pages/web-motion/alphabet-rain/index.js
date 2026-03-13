import React, { useEffect, useRef, useState } from "react"

import ProjectDetail from "../../../components/ProjectDetail"
import Seo from "../../../components/Seo"
import * as alphabetRainStyles from "./css/alphabet-rain.module.css"

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

const createStream = ({
  width,
  height,
  fontSize,
  density,
  spawnAbove = false,
}) => {
  const depth = 0.6 + Math.random() * 0.8
  const trailLength = Math.max(
    8,
    Math.round(8 + Math.random() * 10 + density / 22)
  )
  const spacingFactor = 0.7 + Math.random() * 0.12

  return {
    x: Math.random() * width,
    y: spawnAbove
      ? -trailLength * fontSize * spacingFactor - Math.random() * height * 0.35
      : Math.random() * height - height * 1.2,
    baseVelocity: (120 + Math.random() * 180) * depth,
    sway: 6 + Math.random() * 12,
    drift: 0.35 + Math.random() * 0.55,
    slant: 0.4 + Math.random() * 0.65,
    phase: Math.random() * Math.PI * 2,
    depth,
    fontScale: 0.85 + Math.random() * 0.3,
    trailLength,
    glyphs: Array.from({ length: trailLength }, randomGlyph),
    changeTimer: 0,
    changeInterval: 0.045 + Math.random() * 0.12,
    spacingFactor,
  }
}

const resetStream = (stream, { width, height, fontSize, density }) => {
  const nextStream = createStream({
    width,
    height,
    fontSize,
    density,
    spawnAbove: true,
  })

  stream.x = nextStream.x
  stream.y = nextStream.y
  stream.baseVelocity = nextStream.baseVelocity
  stream.sway = nextStream.sway
  stream.drift = nextStream.drift
  stream.slant = nextStream.slant
  stream.phase = nextStream.phase
  stream.depth = nextStream.depth
  stream.fontScale = nextStream.fontScale
  stream.trailLength = nextStream.trailLength
  stream.glyphs = nextStream.glyphs
  stream.changeTimer = 0
  stream.changeInterval = nextStream.changeInterval
  stream.spacingFactor = nextStream.spacingFactor
}

const drawBackdrop = (ctx, width, height) => {
  const skyGradient = ctx.createLinearGradient(0, 0, 0, height)
  skyGradient.addColorStop(0, "rgba(4, 12, 25, 0.24)")
  skyGradient.addColorStop(0.35, "rgba(3, 9, 20, 0.18)")
  skyGradient.addColorStop(1, "rgba(2, 6, 14, 0.24)")

  ctx.fillStyle = skyGradient
  ctx.fillRect(0, 0, width, height)

  const mistGradient = ctx.createRadialGradient(
    width * 0.72,
    height * 0.18,
    20,
    width * 0.72,
    height * 0.18,
    width * 0.6
  )
  mistGradient.addColorStop(0, "rgba(74, 144, 226, 0.08)")
  mistGradient.addColorStop(1, "rgba(74, 144, 226, 0)")

  ctx.fillStyle = mistGradient
  ctx.fillRect(0, 0, width, height)
}

const drawStream = (ctx, stream, fontSize, time, height, wind) => {
  const currentFontSize = fontSize * stream.fontScale
  const spacing = fontSize * stream.spacingFactor
  const windOffset = wind * (16 + currentFontSize * 0.35) * stream.depth
  const slant = stream.slant + wind * (0.75 + stream.depth * 0.2)
  const headX =
    stream.x +
    Math.sin(time * 0.001 * stream.drift + stream.phase) * stream.sway +
    windOffset

  ctx.font = `${currentFontSize}px "IBM Plex Mono", "SFMono-Regular", monospace`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"

  ctx.beginPath()
  ctx.moveTo(headX + currentFontSize * 0.18, stream.y - currentFontSize * 0.1)
  ctx.lineTo(
    headX - slant * (stream.trailLength * 0.9),
    stream.y - spacing * Math.max(3, stream.trailLength * 0.5)
  )
  ctx.strokeStyle = `rgba(127, 196, 255, ${0.03 * stream.depth})`
  ctx.lineWidth = 1
  ctx.stroke()

  for (let index = 0; index < stream.trailLength; index += 1) {
    const glyph = stream.glyphs[index]
    const glyphY = stream.y - index * spacing
    const glyphX = headX - index * slant

    if (glyphY < -currentFontSize || glyphY > height + currentFontSize) {
      continue
    }

    const life = 1 - index / stream.trailLength
    const alpha = Math.max(0.05, life * 0.48 * stream.depth)

    if (index === 0) {
      ctx.shadowBlur = 18
      ctx.shadowColor = "rgba(196, 232, 255, 0.9)"
      ctx.fillStyle = "rgba(244, 251, 255, 0.98)"
    } else if (index < 3) {
      ctx.shadowBlur = 10
      ctx.shadowColor = "rgba(120, 198, 255, 0.5)"
      ctx.fillStyle = `rgba(170, 223, 255, ${Math.min(0.82, alpha + 0.24)})`
    } else {
      ctx.shadowBlur = 0
      ctx.fillStyle = `rgba(92, 172, 255, ${alpha})`
    }

    ctx.fillText(glyph, glyphX, glyphY)
  }

  ctx.shadowBlur = 0
}

const AlphabetRainCanvas = ({ speed, fontSize, density }) => {
  const canvasRef = useRef(null)
  const optionsRef = useRef({ speed, fontSize, density })

  useEffect(() => {
    optionsRef.current = { speed, fontSize, density }
  }, [density, fontSize, speed])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return undefined
    }

    const ctx = canvas.getContext("2d")
    if (!ctx) {
      return undefined
    }

    let animationFrameId
    let streams = []
    let width = window.innerWidth
    let height = window.innerHeight
    let lastTime = 0
    let wind = 0
    let targetWind = 0
    let lastPointerX = null
    let lastPointerTime = 0

    const syncStreamPopulation = forceFullSync => {
      const currentOptions = optionsRef.current
      const targetCount = currentOptions.density

      if (streams.length === targetCount) {
        return
      }

      if (streams.length < targetCount) {
        const additionCount = forceFullSync
          ? targetCount - streams.length
          : Math.min(3, targetCount - streams.length)

        streams = streams.concat(
          Array.from({ length: additionCount }, () =>
            createStream({
              width,
              height,
              fontSize: currentOptions.fontSize,
              density: currentOptions.density,
              spawnAbove: !forceFullSync,
            })
          )
        )

        return
      }

      const removalCount = forceFullSync
        ? streams.length - targetCount
        : Math.min(3, streams.length - targetCount)

      streams.splice(streams.length - removalCount, removalCount)
    }

    const resize = () => {
      const previousWidth = width
      const previousHeight = height

      width = window.innerWidth
      height = window.innerHeight

      const devicePixelRatio = window.devicePixelRatio || 1
      canvas.width = width * devicePixelRatio
      canvas.height = height * devicePixelRatio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)

      drawBackdrop(ctx, width, height)

      if (streams.length === 0) {
        syncStreamPopulation(true)
        return
      }

      streams = streams.map(stream => ({
        ...stream,
        x: previousWidth > 0 ? (stream.x / previousWidth) * width : stream.x,
        y: previousHeight > 0 ? (stream.y / previousHeight) * height : stream.y,
      }))
    }

    const handlePointerMove = event => {
      const now = window.performance.now()

      if (lastPointerX !== null) {
        const deltaX = event.clientX - lastPointerX
        const deltaTime = Math.max(16, now - lastPointerTime)
        const normalizedVelocity = clamp(deltaX / deltaTime / 1.6, -1.4, 1.4)

        targetWind = clamp(targetWind + normalizedVelocity * 0.4, -1.65, 1.65)
      }

      lastPointerX = event.clientX
      lastPointerTime = now
    }

    const handlePointerLeave = () => {
      lastPointerX = null
      lastPointerTime = 0
      targetWind *= 0.55
    }

    const draw = time => {
      const currentOptions = optionsRef.current
      const delta = Math.min((time - lastTime) / 1000 || 0.016, 0.05)
      lastTime = time

      targetWind *= 0.985
      wind += (targetWind - wind) * 0.08

      syncStreamPopulation(false)

      ctx.fillStyle = "rgba(2, 8, 18, 0.16)"
      ctx.fillRect(0, 0, width, height)
      drawBackdrop(ctx, width, height)

      streams.forEach(stream => {
        stream.y += stream.baseVelocity * currentOptions.speed * delta
        stream.x +=
          wind * (18 + stream.depth * 22) * currentOptions.speed * delta
        stream.changeTimer += delta

        if (stream.changeTimer >= stream.changeInterval) {
          stream.changeTimer = 0
          stream.glyphs[0] = randomGlyph()
          stream.glyphs[Math.floor(Math.random() * stream.glyphs.length)] =
            randomGlyph()
        }

        drawStream(ctx, stream, currentOptions.fontSize, time, height, wind)

        if (stream.x < -120) {
          stream.x = width + Math.random() * 40
        } else if (stream.x > width + 120) {
          stream.x = -40 - Math.random() * 40
        }

        if (
          stream.y -
            currentOptions.fontSize * stream.spacingFactor * stream.trailLength >
          height + 60
        ) {
          resetStream(stream, {
            width,
            height,
            fontSize: currentOptions.fontSize,
            density: currentOptions.density,
          })
        }
      })

      const vignette = ctx.createLinearGradient(0, 0, 0, height)
      vignette.addColorStop(0, "rgba(4, 10, 18, 0.22)")
      vignette.addColorStop(0.3, "rgba(4, 10, 18, 0)")
      vignette.addColorStop(1, "rgba(2, 6, 14, 0.34)")

      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, width, height)

      animationFrameId = window.requestAnimationFrame(draw)
    }

    resize()
    canvas.addEventListener("pointermove", handlePointerMove)
    canvas.addEventListener("pointerleave", handlePointerLeave)
    window.addEventListener("resize", resize)
    animationFrameId = window.requestAnimationFrame(draw)

    return () => {
      canvas.removeEventListener("pointermove", handlePointerMove)
      canvas.removeEventListener("pointerleave", handlePointerLeave)
      window.removeEventListener("resize", resize)
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className={alphabetRainStyles.canvas} />
}

const AlphabetRainMotion = () => {
  const [speed, setSpeed] = useState(1)
  const [fontSize, setFontSize] = useState(18)
  const [density, setDensity] = useState(84)

  return (
    <ProjectDetail mainClassName={alphabetRainStyles.page}>
      <div className={alphabetRainStyles.scene}>
        <AlphabetRainCanvas speed={speed} fontSize={fontSize} density={density} />

        <div className={alphabetRainStyles.controls}>
          <label className={alphabetRainStyles.control}>
            <span className={alphabetRainStyles.controlLabel}>Speed</span>
            <span className={alphabetRainStyles.controlValue}>{speed.toFixed(1)}</span>
            <input
              type="range"
              min="0.6"
              max="2.4"
              step="0.1"
              value={speed}
              onChange={event => setSpeed(Number.parseFloat(event.target.value))}
              className={alphabetRainStyles.slider}
            />
          </label>

          <label className={alphabetRainStyles.control}>
            <span className={alphabetRainStyles.controlLabel}>Size</span>
            <span className={alphabetRainStyles.controlValue}>{fontSize}px</span>
            <input
              type="range"
              min="12"
              max="28"
              step="1"
              value={fontSize}
              onChange={event =>
                setFontSize(Number.parseInt(event.target.value, 10))
              }
              className={alphabetRainStyles.slider}
            />
          </label>

          <label className={alphabetRainStyles.control}>
            <span className={alphabetRainStyles.controlLabel}>Density</span>
            <span className={alphabetRainStyles.controlValue}>{density}</span>
            <input
              type="range"
              min="28"
              max="140"
              step="4"
              value={density}
              onChange={event =>
                setDensity(Number.parseInt(event.target.value, 10))
              }
              className={alphabetRainStyles.slider}
            />
          </label>
        </div>
      </div>
    </ProjectDetail>
  )
}

export const Head = () => (
  <Seo
    title="Alphabet Rain Motion"
    description="A natural alphabet rain animation with drifting letter streams and misty blue trails."
    keywords={["Motion", "Alphabet Rain", "Canvas", "Rain Animation"]}
  />
)

export default AlphabetRainMotion

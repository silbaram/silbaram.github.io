import React, { useEffect, useRef, useState } from "react"

import ProjectDetail from "../../../components/ProjectDetail"
import Seo from "../../../components/Seo"
import * as alphabetRainStyles from "./css/alphabet-rain.module.css"

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
const MOTES = "aeioumnrst"

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
    hue: 196 + Math.random() * 34,
    warmth: Math.random(),
    pulse: 0.6 + Math.random() * 0.8,
    tilt: -0.14 + Math.random() * 0.28,
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
  stream.hue = nextStream.hue
  stream.warmth = nextStream.warmth
  stream.pulse = nextStream.pulse
  stream.tilt = nextStream.tilt
  stream.fontScale = nextStream.fontScale
  stream.trailLength = nextStream.trailLength
  stream.glyphs = nextStream.glyphs
  stream.changeTimer = 0
  stream.changeInterval = nextStream.changeInterval
  stream.spacingFactor = nextStream.spacingFactor
}

const createMote = (width, height) => ({
  x: Math.random() * width,
  y: Math.random() * height,
  size: 0.7 + Math.random() * 2.4,
  velocity: 4 + Math.random() * 18,
  drift: -8 + Math.random() * 16,
  alpha: 0.14 + Math.random() * 0.26,
  glyph: MOTES[Math.floor(Math.random() * MOTES.length)],
  phase: Math.random() * Math.PI * 2,
})

const drawBackdrop = (ctx, width, height, time, wind) => {
  const skyGradient = ctx.createLinearGradient(0, 0, 0, height)
  skyGradient.addColorStop(0, "rgba(3, 9, 20, 0.34)")
  skyGradient.addColorStop(0.42, "rgba(5, 16, 30, 0.22)")
  skyGradient.addColorStop(0.76, "rgba(18, 21, 32, 0.2)")
  skyGradient.addColorStop(1, "rgba(8, 9, 14, 0.34)")

  ctx.fillStyle = skyGradient
  ctx.fillRect(0, 0, width, height)

  const mistGradient = ctx.createRadialGradient(
    width * 0.68,
    height * 0.2,
    20,
    width * 0.68,
    height * 0.2,
    width * 0.6
  )
  mistGradient.addColorStop(0, "rgba(146, 198, 255, 0.12)")
  mistGradient.addColorStop(0.42, "rgba(255, 168, 117, 0.05)")
  mistGradient.addColorStop(1, "rgba(74, 144, 226, 0)")

  ctx.fillStyle = mistGradient
  ctx.fillRect(0, 0, width, height)

  const horizon = ctx.createLinearGradient(0, height * 0.58, 0, height)
  horizon.addColorStop(0, "rgba(255, 126, 86, 0)")
  horizon.addColorStop(0.65, "rgba(255, 126, 86, 0.055)")
  horizon.addColorStop(1, "rgba(255, 91, 46, 0.025)")
  ctx.fillStyle = horizon
  ctx.fillRect(0, height * 0.45, width, height * 0.55)

  ctx.save()
  ctx.globalCompositeOperation = "screen"
  for (let index = 0; index < 4; index += 1) {
    const y =
      height * (0.22 + index * 0.16) +
      Math.sin(time * 0.00018 + index * 1.7) * 14
    const x = Math.sin(time * 0.00012 + index) * 28 + wind * 18

    ctx.fillStyle = `rgba(184, 214, 255, ${0.018 - index * 0.002})`
    ctx.fillRect(x - width * 0.08, y, width * 1.16, 1)
  }
  ctx.restore()
}

const drawStream = (
  ctx,
  stream,
  fontSize,
  time,
  height,
  wind,
  isPointerActive
) => {
  const currentFontSize = fontSize * stream.fontScale
  const spacing = fontSize * stream.spacingFactor
  const windOffset = wind * (16 + currentFontSize * 0.35) * stream.depth
  const slant = stream.slant + wind * (0.75 + stream.depth * 0.2)
  const headX =
    stream.x +
    Math.sin(time * 0.001 * stream.drift + stream.phase) * stream.sway +
    windOffset

  const breath =
    0.86 + Math.sin(time * 0.0018 * stream.pulse + stream.phase) * 0.14
  const headWarmth = stream.warmth * 24
  const trailHue = stream.hue

  ctx.font = `${currentFontSize}px "IBM Plex Mono", "SFMono-Regular", monospace`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"

  ctx.beginPath()
  ctx.moveTo(headX + currentFontSize * 0.18, stream.y - currentFontSize * 0.1)
  ctx.lineTo(
    headX - slant * (stream.trailLength * 0.9),
    stream.y - spacing * Math.max(3, stream.trailLength * 0.5)
  )
  ctx.strokeStyle = `hsla(${trailHue}, 90%, 72%, ${0.032 * stream.depth})`
  ctx.lineWidth = 1
  ctx.stroke()

  const glyphStep = isPointerActive && stream.depth < 1 ? 2 : 1

  for (let index = 0; index < stream.trailLength; index += glyphStep) {
    const glyph = stream.glyphs[index]
    const glyphY = stream.y - index * spacing
    const glyphX = headX - index * slant

    if (glyphY < -currentFontSize || glyphY > height + currentFontSize) {
      continue
    }

    const life = 1 - index / stream.trailLength
    const alpha = Math.max(0.045, life * 0.52 * stream.depth * breath)
    const shimmer =
      0.82 + Math.sin(time * 0.004 + index * 0.76 + stream.phase) * 0.18

    const shouldRotate = !isPointerActive || index === 0

    if (index === 0) {
      ctx.shadowBlur = isPointerActive ? 10 : 22
      ctx.shadowColor = `hsla(${trailHue + headWarmth}, 100%, 84%, 0.92)`
      ctx.fillStyle = `hsla(${trailHue + headWarmth}, 100%, 96%, 0.98)`
    } else if (index < 3) {
      ctx.shadowBlur = isPointerActive ? 0 : 12
      ctx.shadowColor = `hsla(${trailHue}, 94%, 76%, 0.52)`
      ctx.fillStyle = `hsla(${trailHue}, 96%, 82%, ${Math.min(
        0.86,
        alpha + 0.24
      )})`
    } else {
      ctx.shadowBlur = 0
      ctx.fillStyle = `hsla(${trailHue}, 92%, ${62 + life * 18}%, ${
        alpha * shimmer
      })`
    }

    if (shouldRotate) {
      ctx.save()
      ctx.translate(glyphX, glyphY)
      ctx.rotate(stream.tilt * life + wind * 0.045)
      ctx.fillText(glyph, 0, 0)
      ctx.restore()
    } else {
      ctx.fillText(glyph, glyphX, glyphY)
    }
  }

  ctx.shadowBlur = 0
}

const drawRipples = (ctx, ripples, delta, width, height) => {
  ctx.save()
  ctx.globalCompositeOperation = "screen"

  for (let index = ripples.length - 1; index >= 0; index -= 1) {
    const ripple = ripples[index]
    ripple.age += delta

    const progress = ripple.age / ripple.duration
    if (progress >= 1) {
      ripples.splice(index, 1)
      continue
    }

    const radius = ripple.radius * progress
    const alpha = (1 - progress) * ripple.alpha

    ctx.beginPath()
    ctx.ellipse(
      ripple.x,
      height - ripple.yOffset,
      radius * 1.9,
      radius * 0.32,
      ripple.wind * 0.08,
      0,
      Math.PI * 2
    )
    ctx.strokeStyle = `rgba(171, 220, 255, ${alpha})`
    ctx.lineWidth = 1
    ctx.stroke()

    if (ripple.x > -80 && ripple.x < width + 80) {
      ctx.beginPath()
      ctx.arc(
        ripple.x + Math.sin(progress * Math.PI) * ripple.wind * 18,
        height - ripple.yOffset - radius * 0.12,
        Math.max(0.4, 1.8 * (1 - progress)),
        0,
        Math.PI * 2
      )
      ctx.fillStyle = `rgba(244, 251, 255, ${alpha * 0.8})`
      ctx.fill()
    }
  }

  ctx.restore()
}

const drawMotes = (
  ctx,
  motes,
  delta,
  width,
  height,
  time,
  wind,
  isPointerActive
) => {
  ctx.save()
  ctx.globalCompositeOperation = "screen"
  ctx.font = `12px "IBM Plex Mono", "SFMono-Regular", monospace`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"

  motes.forEach((mote, index) => {
    mote.y -= mote.velocity * delta
    mote.x += (mote.drift + wind * 20) * delta

    if (mote.y < -20 || mote.x < -40 || mote.x > width + 40) {
      Object.assign(mote, createMote(width, height))
      mote.y = height + Math.random() * 120
    }

    if (isPointerActive && index % 2 === 1) {
      return
    }

    const pulse = 0.55 + Math.sin(time * 0.0012 + mote.phase) * 0.45
    ctx.shadowBlur = isPointerActive ? 0 : 12 * pulse
    ctx.shadowColor = "rgba(190, 224, 255, 0.7)"
    ctx.fillStyle = `rgba(211, 235, 255, ${mote.alpha * pulse})`
    ctx.fillText(mote.glyph, mote.x, mote.y)
  })

  ctx.restore()
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
    let ripples = []
    let motes = []
    let lastPointerX = null
    let lastPointerTime = 0
    let lastPointerHandledTime = 0

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

      const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = width * devicePixelRatio
      canvas.height = height * devicePixelRatio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)

      drawBackdrop(ctx, width, height, window.performance.now(), wind)

      if (streams.length === 0) {
        syncStreamPopulation(true)
      }

      const moteCount = Math.max(22, Math.round(Math.min(width, 1400) / 24))
      motes = Array.from({ length: moteCount }, () => createMote(width, height))

      streams = streams.map(stream => ({
        ...stream,
        x: previousWidth > 0 ? (stream.x / previousWidth) * width : stream.x,
        y: previousHeight > 0 ? (stream.y / previousHeight) * height : stream.y,
      }))
    }

    const handlePointerMove = event => {
      const now = window.performance.now()

      if (now - lastPointerHandledTime < 28) {
        return
      }

      if (lastPointerX !== null) {
        const deltaX = event.clientX - lastPointerX
        const deltaTime = Math.max(16, now - lastPointerTime)
        const normalizedVelocity = clamp(deltaX / deltaTime / 1.6, -1.4, 1.4)

        targetWind = clamp(targetWind + normalizedVelocity * 0.28, -1.25, 1.25)
      }

      lastPointerX = event.clientX
      lastPointerTime = now
      lastPointerHandledTime = now
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
      const isPointerActive = time - lastPointerHandledTime < 180

      syncStreamPopulation(false)

      ctx.fillStyle = "rgba(2, 8, 18, 0.16)"
      ctx.fillRect(0, 0, width, height)
      drawBackdrop(ctx, width, height, time, wind)
      drawMotes(ctx, motes, delta, width, height, time, wind, isPointerActive)

      streams.forEach(stream => {
        const previousY = stream.y
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

        drawStream(
          ctx,
          stream,
          currentOptions.fontSize,
          time,
          height,
          wind,
          isPointerActive
        )

        if (
          !isPointerActive &&
          previousY < height - 26 &&
          stream.y >= height - 26 &&
          ripples.length < 28
        ) {
          ripples.push({
            x:
              stream.x +
              Math.sin(time * 0.001 * stream.drift + stream.phase) *
                stream.sway +
              wind * 20,
            age: 0,
            duration: 1.3 + Math.random() * 0.75,
            radius: 28 + stream.depth * 54,
            alpha: 0.12 + stream.depth * 0.08,
            yOffset: 18 + Math.random() * 16,
            wind,
          })
        }

        if (stream.x < -120) {
          stream.x = width + Math.random() * 40
        } else if (stream.x > width + 120) {
          stream.x = -40 - Math.random() * 40
        }

        if (
          stream.y -
            currentOptions.fontSize *
              stream.spacingFactor *
              stream.trailLength >
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

      drawRipples(ctx, ripples, delta, width, height)

      const vignette = ctx.createLinearGradient(0, 0, 0, height)
      vignette.addColorStop(0, "rgba(4, 10, 18, 0.26)")
      vignette.addColorStop(0.3, "rgba(4, 10, 18, 0)")
      vignette.addColorStop(0.78, "rgba(2, 6, 14, 0.08)")
      vignette.addColorStop(1, "rgba(2, 6, 14, 0.42)")

      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, width, height)

      animationFrameId = window.requestAnimationFrame(draw)
    }

    resize()
    canvas.addEventListener("pointermove", handlePointerMove, { passive: true })
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
  const [density, setDensity] = useState(64)

  return (
    <ProjectDetail mainClassName={alphabetRainStyles.page}>
      <div className={alphabetRainStyles.scene}>
        <AlphabetRainCanvas
          speed={speed}
          fontSize={fontSize}
          density={density}
        />

        <div className={alphabetRainStyles.controls}>
          <label className={alphabetRainStyles.control}>
            <span className={alphabetRainStyles.controlLabel}>Speed</span>
            <span className={alphabetRainStyles.controlValue}>
              {speed.toFixed(1)}
            </span>
            <input
              type="range"
              min="0.6"
              max="2.4"
              step="0.1"
              value={speed}
              onChange={event =>
                setSpeed(Number.parseFloat(event.target.value))
              }
              className={alphabetRainStyles.slider}
            />
          </label>

          <label className={alphabetRainStyles.control}>
            <span className={alphabetRainStyles.controlLabel}>Size</span>
            <span className={alphabetRainStyles.controlValue}>
              {fontSize}px
            </span>
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

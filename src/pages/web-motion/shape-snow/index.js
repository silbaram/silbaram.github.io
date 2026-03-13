import React, { useEffect, useRef, useState } from "react"

import ProjectDetail from "../../../components/ProjectDetail"
import Seo from "../../../components/Seo"
import * as shapeSnowStyles from "./css/shape-snow.module.css"

const GLYPHS = [
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  "\u3131",
  "\u3134",
  "\u3137",
  "\u3139",
  "\u3141",
  "\u3142",
  "\u3145",
  "\u3147",
  "\u3148",
  "\u314A",
  "\u314B",
  "\u314C",
  "\u314D",
  "\u314E",
  "\u314F",
  "\u3151",
  "\u3153",
  "\u3155",
  "\u3157",
  "\u315C",
  "\u3160",
  "\u3163",
]

const clamp = (value, min, max) => Math.max(min, Math.min(max, value))
const randomBetween = (min, max) => min + Math.random() * (max - min)
const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]

const sampleSnowLine = (width, height, x, time) => {
  const normalizedX = x / Math.max(width, 1)
  const ridge =
    Math.sin(normalizedX * 5.8 + time * 0.00008) * 10 +
    Math.sin(normalizedX * 11.6 + 1.4) * 6
  const centerLift =
    Math.max(0, 1 - Math.abs(normalizedX - 0.5) * 2) * height * 0.02

  return height * 0.83 - centerLift + ridge
}

const createStars = (count, width, height) =>
  Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height * 0.7,
    size: randomBetween(0.4, 2.2),
    twinkleSpeed: randomBetween(0.0008, 0.004),
    twinklePhase: randomBetween(0, Math.PI * 2),
    baseOpacity: randomBetween(0.2, 0.7),
  }))

const createFlake = ({
  width,
  height,
  density,
  wind = 0,
  spawnAbove = false,
  lifted = false,
  originX,
  originY,
  glyph,
  depth,
  baseSize,
  opacity,
  direction = 0,
}) => {
  const flakeDepth = depth ?? randomBetween(0.3, 2.5) // 깊이 범위 확대
  const densityBoost = 1.0 + density * 0.12 // 밀도 부스트 강화

  let x = originX ?? Math.random() * width
  if (spawnAbove && originX === undefined) {
    if (wind > 0.5) {
      x = randomBetween(-width * 0.2, width * 0.8)
    } else if (wind < -0.5) {
      x = randomBetween(width * 0.2, width * 1.2)
    }
  }

  return {
    x,
    y:
      originY ??
      (lifted
        ? height * 0.82
        : spawnAbove
          ? -randomBetween(20, height * 0.6)
          : Math.random() * height),
    depth: flakeDepth,
    glyph: glyph ?? randomGlyph(),
    baseSize: baseSize ?? randomBetween(12, 32), // 베이스 사이즈 증가
    fallVelocity: randomBetween(40, 120) * flakeDepth * densityBoost, // 속도 증가
    sway: randomBetween(15, 45), // 흔들림 증가
    sway2: randomBetween(6, 18),
    drift: randomBetween(0.2, 0.7),
    drift2: randomBetween(0.1, 0.4),
    phase: randomBetween(0, Math.PI * 2),
    phase2: randomBetween(0, Math.PI * 2),
    opacity: opacity ?? randomBetween(0.2, 0.8), // 불투명도 증가
    rotation: randomBetween(-0.5, 0.5),
    spin: randomBetween(-0.4, 0.4),
    horizontalVelocity: lifted ? direction * randomBetween(30, 90) : 0,
    upwardVelocity: lifted ? randomBetween(30, 90) : 0,
    sparklePhase: randomBetween(0, Math.PI * 2),
    sparkleSpeed: randomBetween(0.003, 0.008),
    hueShift: randomBetween(-20, 20),
  }
}

const resetFlake = (flake, { width, height, density, wind }) => {
  const nextFlake = createFlake({
    width,
    height,
    density,
    wind,
    spawnAbove: true,
  })

  Object.assign(flake, nextFlake)
}

const createPileGlyph = ({ flake, width, height, time }) => {
  const anchorX = clamp(
    flake.x + randomBetween(-15, 15),
    20,
    Math.max(20, width - 20)
  )

  return {
    anchorX,
    baseY: sampleSnowLine(width, height, anchorX, time) - randomBetween(1, 12),
    depth: clamp(flake.depth + randomBetween(-0.05, 0.3), 1.0, 2.2),
    glyph: flake.glyph,
    baseSize: flake.baseSize * randomBetween(0.8, 1.0),
    opacity: clamp(flake.opacity + 0.2, 0.4, 0.9),
    rotation: randomBetween(-0.25, 0.25),
    phase: randomBetween(0, Math.PI * 2),
    driftResponse: randomBetween(5, 18),
    liftResponse: randomBetween(2, 6),
    bob: randomBetween(0.3, 1.0),
    hueShift: randomBetween(-12, 12),
    life: 1.0, // 생명력 추가 (1.0 -> 0.0)
    meltRate: randomBetween(0.02, 0.06), // 녹는 속도 추가
  }
}

const liftPileGlyph = ({ glyph, width, height, density, wind }) =>
  createFlake({
    width,
    height,
    density,
    wind,
    lifted: true,
    originX: glyph.anchorX,
    originY: glyph.baseY - 4,
    glyph: glyph.glyph,
    depth: clamp(glyph.depth - 0.1, 0.8, 2.0),
    baseSize: glyph.baseSize * 0.95 * glyph.life, // 남은 생명력 반영
    opacity: clamp(glyph.opacity - 0.05, 0.2, 0.75),
    direction: wind >= 0 ? 1.2 : -1.2,
  })

const drawStars = (ctx, stars, time) => {
  stars.forEach(star => {
    const twinkle =
      0.5 + 0.5 * Math.sin(time * star.twinkleSpeed + star.twinklePhase)
    const alpha = star.baseOpacity * twinkle

    ctx.save()
    ctx.beginPath()
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(235, 245, 255, ${alpha})`
    ctx.shadowBlur = star.size * 5 + twinkle * 8
    ctx.shadowColor = `rgba(200, 225, 255, ${alpha * 0.7})`
    ctx.fill()
    ctx.restore()
  })
}

const drawAurora = (ctx, width, height, time) => {
  ctx.save()
  ctx.globalCompositeOperation = "screen"

  const bands = [
    { y: 0.15, hue: 170, sat: 70, amp: 0.05, freq: 0.0003, alpha: 0.05 },
    { y: 0.2, hue: 190, sat: 60, amp: 0.04, freq: 0.00025, alpha: 0.04 },
    { y: 0.25, hue: 210, sat: 50, amp: 0.03, freq: 0.00035, alpha: 0.03 },
  ]

  bands.forEach(band => {
    const wave = Math.sin(time * band.freq) * band.amp
    const centerY = height * (band.y + wave)

    const gradient = ctx.createLinearGradient(0, centerY - height * 0.2, 0, centerY + height * 0.2)
    gradient.addColorStop(0, `hsla(${band.hue}, ${band.sat}%, 60%, 0)`)
    gradient.addColorStop(0.3, `hsla(${band.hue}, ${band.sat}%, 55%, ${band.alpha * 0.6})`)
    gradient.addColorStop(0.5, `hsla(${band.hue}, ${band.sat}%, 50%, ${band.alpha})`)
    gradient.addColorStop(0.7, `hsla(${band.hue}, ${band.sat}%, 55%, ${band.alpha * 0.6})`)
    gradient.addColorStop(1, `hsla(${band.hue}, ${band.sat}%, 60%, 0)`)

    ctx.fillStyle = gradient

    ctx.beginPath()
    ctx.moveTo(0, centerY - height * 0.2)
    for (let x = 0; x <= width; x += 12) {
      const normalizedX = x / width
      const yOff =
        Math.sin(normalizedX * 5 + time * 0.0005) * height * 0.03 +
        Math.sin(normalizedX * 2.5 + time * 0.0003) * height * 0.02
      ctx.lineTo(x, centerY + yOff - height * 0.2)
    }
    ctx.lineTo(width, centerY + height * 0.2)
    for (let x = width; x >= 0; x -= 12) {
      const normalizedX = x / width
      const yOff =
        Math.sin(normalizedX * 5 + time * 0.0005) * height * 0.03 +
        Math.sin(normalizedX * 2.5 + time * 0.0003) * height * 0.02
      ctx.lineTo(x, centerY + yOff + height * 0.2)
    }
    ctx.closePath()
    ctx.fill()
  })

  ctx.restore()
}

const drawBackdrop = (ctx, width, height, wind, time) => {
  const skyGradient = ctx.createLinearGradient(0, 0, 0, height)
  skyGradient.addColorStop(0, "#01030a")
  skyGradient.addColorStop(0.4, "#030818")
  skyGradient.addColorStop(0.7, "#061025")
  skyGradient.addColorStop(1, "#0a1b3a")

  ctx.fillStyle = skyGradient
  ctx.fillRect(0, 0, width, height)

  const hazeGradient = ctx.createRadialGradient(
    width * 0.5,
    height * 0.4,
    50,
    width * 0.5,
    height * 0.4,
    width * 0.7
  )
  hazeGradient.addColorStop(0, "rgba(200, 230, 255, 0.08)")
  hazeGradient.addColorStop(0.5, "rgba(100, 160, 240, 0.04)")
  hazeGradient.addColorStop(1, "rgba(100, 160, 240, 0)")

  ctx.fillStyle = hazeGradient
  ctx.fillRect(0, 0, width, height)

  const floorGradient = ctx.createLinearGradient(0, height * 0.6, 0, height)
  floorGradient.addColorStop(0, "rgba(20, 45, 80, 0)")
  floorGradient.addColorStop(0.4, "rgba(20, 45, 80, 0.3)")
  floorGradient.addColorStop(1, "rgba(5, 12, 30, 0.7)")

  ctx.fillStyle = floorGradient
  ctx.fillRect(0, height * 0.54, width, height * 0.46)
}

const drawSnowGround = (ctx, width, height, time, wind) => {
  ctx.save()

  // 하단 배경 채우기 (더 깊은 눈 느낌)
  const bottomFill = ctx.createLinearGradient(0, height * 0.8, 0, height)
  bottomFill.addColorStop(0, "rgba(230, 245, 255, 0.8)")
  bottomFill.addColorStop(0.5, "rgba(200, 225, 250, 0.9)")
  bottomFill.addColorStop(1, "rgba(170, 205, 240, 1.0)")

  ctx.beginPath()
  ctx.moveTo(0, sampleSnowLine(width, height, 0, time))
  for (let x = 0; x <= width; x += 6) {
    ctx.lineTo(x, sampleSnowLine(width, height, x, time))
  }
  ctx.lineTo(width, height)
  ctx.lineTo(0, height)
  ctx.closePath()
  ctx.fillStyle = bottomFill
  ctx.fill()

  // 상단 하이라이트 레이어
  ctx.beginPath()
  ctx.moveTo(0, sampleSnowLine(width, height, 0, time))
  for (let x = 0; x <= width; x += 6) {
    ctx.lineTo(x, sampleSnowLine(width, height, x, time))
  }
  ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 + Math.abs(wind) * 0.1})`
  ctx.lineWidth = 3
  ctx.shadowBlur = 15
  ctx.shadowColor = "rgba(255, 255, 255, 0.5)"
  ctx.stroke()

  // 디테일 (반짝임 효과)
  for (let i = 0; i < 20; i++) {
    const rx = (Math.sin(time * 0.0001 + i) * 0.5 + 0.5) * width
    const ry = sampleSnowLine(width, height, rx, time) + 2
    ctx.beginPath()
    ctx.arc(rx, ry, 1.5, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
    ctx.fill()
  }

  ctx.restore()
}

const drawFlake = (ctx, flake, height, wind, time) => {
  const perspective =
    0.6 + flake.depth * 0.6 + (flake.y / Math.max(height, 1)) * 0.2
  const size = flake.baseSize * perspective

  const sparkle =
    0.5 + 0.5 * Math.sin(time * flake.sparkleSpeed + flake.sparklePhase)
  const alpha = clamp(
    flake.opacity *
      (0.5 + flake.depth * 0.25 + (flake.y / height) * 0.15) *
      (0.8 + sparkle * 0.2),
    0.1,
    0.95
  )

  const x =
    flake.x +
    Math.sin(time * 0.0012 * flake.drift + flake.phase) * flake.sway +
    Math.sin(time * 0.0015 * flake.drift2 + flake.phase2) * flake.sway2 +
    wind * (12 + flake.depth * 18)

  const hue = 210 + flake.hueShift
  const sat = 20 + flake.depth * 20
  const lightness = 95 + sparkle * 5

  ctx.save()
  ctx.translate(x, flake.y)
  ctx.rotate(flake.rotation + time * 0.001 * flake.spin)
  ctx.font = `bold ${size}px "Avenir Next", "Pretendard Variable", "Noto Sans KR", sans-serif`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"

  if (flake.depth > 1.0) {
    ctx.shadowBlur = 8 + flake.depth * 10 + sparkle * 8
    ctx.shadowColor = `hsla(${hue}, ${sat}%, 90%, ${0.4 + sparkle * 0.2})`
  }

  if (flake.depth > 1.8 && sparkle > 0.8) {
    ctx.shadowBlur = 25 + sparkle * 15
    ctx.shadowColor = `hsla(${hue}, ${sat + 20}%, 100%, ${0.6 + sparkle * 0.3})`
  }

  ctx.fillStyle = `hsla(${hue}, ${sat}%, ${lightness}%, ${alpha})`
  ctx.fillText(flake.glyph, 0, 0)
  ctx.restore()
}

const drawPileGlyph = (ctx, glyph, time, wind) => {
  const driftX =
    wind * glyph.driftResponse * glyph.depth +
    Math.sin(time * 0.0018 + glyph.phase) * glyph.bob * 1.5
  const liftY =
    Math.abs(wind) * glyph.liftResponse +
    Math.sin(time * 0.0012 + glyph.phase) * 1.2
  
  // 녹는 효과 반영: 생명력에 따라 크기와 투명도가 줄어들고 바닥으로 가라앉음
  const size = glyph.baseSize * (0.85 + glyph.depth * 0.25) * (0.7 + glyph.life * 0.3)
  const alpha = clamp((glyph.opacity - Math.abs(wind) * 0.02) * glyph.life, 0, 1)
  const sinkY = (1 - glyph.life) * 8 // 녹으면서 바닥으로 스며드는 효과
  
  const hue = 210 + glyph.hueShift

  ctx.save()
  ctx.translate(glyph.anchorX + driftX, glyph.baseY - liftY + sinkY)
  ctx.rotate(glyph.rotation + wind * 0.05)
  ctx.font = `bold ${size}px "Avenir Next", "Pretendard Variable", "Noto Sans KR", sans-serif`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.shadowBlur = 12 * glyph.life + glyph.depth * 6
  ctx.shadowColor = `hsla(${hue}, 50%, 90%, ${0.4 * glyph.life})`
  ctx.fillStyle = `hsla(${hue}, 10%, 100%, ${alpha})`
  ctx.fillText(glyph.glyph, 0, 0)
  ctx.restore()
}

const ShapeSnowCanvas = ({ speed, density }) => {
  const canvasRef = useRef(null)
  const optionsRef = useRef({ speed, density })

  useEffect(() => {
    optionsRef.current = { speed, density }
  }, [density, speed])

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
    let width = window.innerWidth
    let height = window.innerHeight
    let lastFrameTime = 0
    let wind = 0
    let targetWind = 0
    let lastPointerX = null
    let lastPointerTime = 0
    let flakes = []
    let pileGlyphs = []
    let stars = createStars(150, width, height) // 별 개수 증가

    const syncFlakePopulation = forceSync => {
      const currentOptions = optionsRef.current
      const targetCount = 100 + currentOptions.density * 60 // 눈송이 개수 대폭 증가 (기존 50 + 32)

      if (flakes.length < targetCount) {
        const additionCount = forceSync
          ? targetCount - flakes.length
          : Math.min(10, targetCount - flakes.length)

        flakes = flakes.concat(
          Array.from({ length: additionCount }, () =>
            createFlake({
              width,
              height,
              density: currentOptions.density,
              wind,
              spawnAbove: !forceSync,
            })
          )
        )
        return
      }

      if (flakes.length > targetCount) {
        const removalCount = forceSync
          ? flakes.length - targetCount
          : Math.min(10, flakes.length - targetCount)

        flakes.splice(flakes.length - removalCount, removalCount)
      }
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight

      const devicePixelRatio = window.devicePixelRatio || 1
      canvas.width = width * devicePixelRatio
      canvas.height = height * devicePixelRatio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)

      flakes = []
      pileGlyphs = []
      stars = createStars(150, width, height)
      syncFlakePopulation(true)
    }

    const handlePointerMove = event => {
      const now = window.performance.now()

      if (lastPointerX !== null) {
        const deltaX = event.clientX - lastPointerX
        const deltaTime = Math.max(16, now - lastPointerTime)
        const velocity = clamp(deltaX / deltaTime / 1.5, -1.5, 1.5)

        targetWind = clamp(targetWind + velocity * 0.5, -2.5, 2.5) // 풍향 변화폭 확대
      }

      lastPointerX = event.clientX
      lastPointerTime = now
    }

    const handlePointerLeave = () => {
      lastPointerX = null
      lastPointerTime = 0
      targetWind *= 0.6
    }

    const maybeLiftPileGlyph = (currentOptions, delta) => {
      if (pileGlyphs.length < 5 || Math.abs(wind) < 0.7) {
        return
      }

      const chance = clamp((Math.abs(wind) - 0.6) * delta * 4.0, 0, 0.05)
      if (Math.random() >= chance) {
        return
      }

      const index = Math.floor(Math.random() * pileGlyphs.length)
      const [glyph] = pileGlyphs.splice(index, 1)
      if (!glyph) {
        return
      }

      flakes.push(
        liftPileGlyph({
          glyph,
          width,
          height,
          density: currentOptions.density,
          wind,
        })
      )
    }

    const draw = now => {
      const currentOptions = optionsRef.current
      const delta = Math.min((now - lastFrameTime) / 1000 || 0.016, 0.05)
      lastFrameTime = now

      targetWind *= Math.pow(0.99, delta * 60)
      wind += (targetWind - wind) * Math.min(1, delta * 5.0)

      syncFlakePopulation(false)

      // 쌓인 눈 녹이기 처리
      pileGlyphs.forEach(glyph => {
        glyph.life -= delta * glyph.meltRate
      })
      pileGlyphs = pileGlyphs.filter(glyph => glyph.life > 0)

      const pileLimit = 60 + currentOptions.density * 30 // 녹는 효과가 있으므로 한도를 조금 더 늘림
      if (pileGlyphs.length > pileLimit) {
        // 한도를 초과하면 가장 오래된 것의 생명력을 강제로 줄임 (자연스럽게 사라지도록)
        for (let i = 0; i < pileGlyphs.length - pileLimit; i++) {
          pileGlyphs[i].life -= delta * 0.5 
        }
      }

      maybeLiftPileGlyph(currentOptions, delta)

      drawBackdrop(ctx, width, height, wind, now)
      drawStars(ctx, stars, now)
      drawAurora(ctx, width, height, now)
      // drawMoon 제거됨

      flakes.forEach(flake => {
        flake.upwardVelocity = Math.max(0, flake.upwardVelocity - 100 * delta)
        flake.y +=
          flake.fallVelocity *
            currentOptions.speed *
            (0.5 + flake.depth * 0.6) *
            delta -
          flake.upwardVelocity * delta
        flake.horizontalVelocity += wind * 12 * delta
        flake.horizontalVelocity *= Math.pow(0.985, delta * 60)
        flake.x += flake.horizontalVelocity * delta
        flake.rotation += flake.spin * delta

        const floorY = sampleSnowLine(width, height, flake.x, now)

        if (flake.y >= floorY) {
          if (
            pileGlyphs.length < pileLimit &&
            Math.random() < 0.4 + flake.depth * 0.15
          ) {
            pileGlyphs.push(
              createPileGlyph({
                flake,
                width,
                height,
                time: now,
              })
            )
          }

          resetFlake(flake, {
            width,
            height,
            density: currentOptions.density,
            wind,
          })
          return
        }

        if (
          flake.y > height + 100 ||
          flake.x < -200 ||
          flake.x > width + 200
        ) {
          resetFlake(flake, {
            width,
            height,
            density: currentOptions.density,
            wind,
          })
        }
      })

      drawSnowGround(ctx, width, height, now, wind)

      flakes
        .slice()
        .sort((left, right) => left.depth - right.depth)
        .forEach(flake => drawFlake(ctx, flake, height, wind, now))

      pileGlyphs
        .slice()
        .sort((left, right) => left.depth - right.depth)
        .forEach(glyph => drawPileGlyph(ctx, glyph, now, wind))

      animationFrameId = window.requestAnimationFrame(draw)
    }

    resize()
    animationFrameId = window.requestAnimationFrame(draw)
    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerleave", handlePointerLeave)
    window.addEventListener("blur", handlePointerLeave)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerleave", handlePointerLeave)
      window.removeEventListener("blur", handlePointerLeave)
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className={shapeSnowStyles.canvas} />
}

const ShapeSnowMotion = () => {
  const [speed, setSpeed] = useState(1)
  const [density, setDensity] = useState(3)

  return (
    <ProjectDetail mainClassName={shapeSnowStyles.page}>
      <div className={shapeSnowStyles.scene}>
        <ShapeSnowCanvas speed={speed} density={density} />

        <div className={shapeSnowStyles.controls}>
          <label className={shapeSnowStyles.control}>
            <span className={shapeSnowStyles.controlLabel}>Speed</span>
            <span className={shapeSnowStyles.controlValue}>
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
              className={shapeSnowStyles.slider}
            />
          </label>

          <label className={shapeSnowStyles.control}>
            <span className={shapeSnowStyles.controlLabel}>Amount</span>
            <span className={shapeSnowStyles.controlValue}>{density}</span>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={density}
              onChange={event =>
                setDensity(Number.parseInt(event.target.value, 10))
              }
              className={shapeSnowStyles.slider}
            />
          </label>

          <p className={shapeSnowStyles.hint}>Move mouse left and right</p>
        </div>
      </div>
    </ProjectDetail>
  )
}

export const Head = () => (
  <Seo
    title="Shape Snow Motion"
    description="Interactive letter snow sways in the wind, gathers on the ground, and lifts back into a layered blizzard."
    keywords={["Motion", "Shape Snow", "Canvas", "Interactive Snow"]}
  />
)

export default ShapeSnowMotion

import React, { useEffect, useRef, useState } from "react"

import ProjectDetail from "../../../components/ProjectDetail"
import Seo from "../../../components/Seo"
import * as rippleTypeStyles from "./css/ripple-type.module.css"

const clamp = (value, min, max) => Math.max(min, Math.min(max, value))
const randomBetween = (min, max) => min + Math.random() * (max - min)

const getWaterTop = height => height * 0.42
const sampleSurfaceY = (x, waterTop, time) =>
  waterTop +
  Math.sin(x * 0.011 + time * 0.0012) * 2.2 +
  Math.sin(x * 0.024 - time * 0.00082) * 1.1

const createRipple = ({ x, y, strength, scale, startedAt }) => ({
  x,
  y,
  strength,
  scale,
  startedAt,
  duration: 2200 + scale * 600 + Math.random() * 400, // 지속 시간 증가
  maxRadius: 130 + scale * 160 + Math.random() * 60, // 반경 확대
  phase: randomBetween(0, Math.PI * 2),
  rings: Math.floor(randomBetween(3, 5)), // 링 개수 다양화
})

const createRaindrop = ({ width, height, amount, spawnAbove = false }) => {
  const depth = randomBetween(0.5, 2.0)
  const speedBoost = 0.86 + amount * 0.06
  const waterTop = getWaterTop(height)
  
  // 3D 원근감을 위해 depth가 클수록(가까울수록) 화면 하단에 떨어지도록 설정
  const targetYBase = waterTop + (depth - 0.5) / 1.5 * (height - waterTop)
  const targetY = clamp(targetYBase + randomBetween(-20, 20), waterTop + 10, height - 10)

  return {
    x: Math.random() * width,
    y: spawnAbove
      ? -randomBetween(50, height * 0.5)
      : randomBetween(-height * 0.2, targetY),
    depth,
    targetY,
    speed: randomBetween(350, 650) * (0.7 + depth * 0.4) * speedBoost,
    length: randomBetween(15, 30) * (0.78 + depth * 0.28),
    drift: randomBetween(-20, 15) * (0.65 + depth * 0.22),
    alpha: randomBetween(0.1, 0.3) * (0.8 + depth * 0.2),
    thickness: depth > 1.3 ? 1.5 : 1,
    splashStrength: clamp(0.3 + depth * 0.25 + Math.random() * 0.1, 0.3, 0.9),
  }
}

const createForegroundRain = ({ width, height, amount, spawnAbove = false }) => {
  const depth = randomBetween(0.9, 2.1)
  const speedBoost = 0.92 + amount * 0.05

  return {
    x: randomBetween(-width * 0.04, width * 1.04),
    y: spawnAbove ? -randomBetween(20, height * 0.35) : Math.random() * height,
    depth,
    speed: randomBetween(420, 760) * (0.84 + depth * 0.22) * speedBoost,
    length: randomBetween(25, 45) * (0.82 + depth * 0.24), // 길이 증가
    drift: randomBetween(-20, 14) * (0.8 + depth * 0.18),
    alpha: randomBetween(0.12, 0.28) * (0.84 + depth * 0.16),
    thickness: depth > 1.46 ? 1.7 : 1.15,
  }
}

const resetRaindrop = (drop, { width, height, amount }) => {
  Object.assign(
    drop,
    createRaindrop({
      width,
      height,
      amount,
      spawnAbove: true,
    })
  )
}

const resetForegroundRain = (drop, { width, height, amount }) => {
  Object.assign(
    drop,
    createForegroundRain({
      width,
      height,
      amount,
      spawnAbove: true,
    })
  )
}

const drawBackdrop = (ctx, width, height, time) => {
  const waterTop = getWaterTop(height)

  // 하늘: 깊은 새벽에서 밝아오는 우아한 블루-퍼플톤
  const skyGradient = ctx.createLinearGradient(0, 0, 0, waterTop)
  skyGradient.addColorStop(0, "#080c1d")
  skyGradient.addColorStop(0.5, "#162242")
  skyGradient.addColorStop(0.85, "#2d4273")
  skyGradient.addColorStop(1, "#5b7cb5")

  ctx.fillStyle = skyGradient
  ctx.fillRect(0, 0, width, waterTop)

  // 수평선 부근의 은은한 빛 번짐
  const horizonGlow = ctx.createLinearGradient(0, waterTop - 60, 0, waterTop + 20)
  horizonGlow.addColorStop(0, "rgba(91, 124, 181, 0)")
  horizonGlow.addColorStop(0.7, "rgba(160, 190, 255, 0.15)")
  horizonGlow.addColorStop(1, "rgba(160, 190, 255, 0)")
  ctx.fillStyle = horizonGlow
  ctx.fillRect(0, waterTop - 60, width, 80)

  // 안개 효과
  const haze = ctx.createRadialGradient(
    width * 0.52,
    waterTop * 0.82,
    12,
    width * 0.52,
    waterTop * 0.82,
    width * 0.46
  )
  haze.addColorStop(0, "rgba(160, 200, 255, 0.12)")
  haze.addColorStop(0.6, "rgba(160, 200, 255, 0.05)")
  haze.addColorStop(1, "rgba(160, 200, 255, 0)")

  ctx.fillStyle = haze
  ctx.fillRect(0, 0, width, height)

  // 수면 아래의 깊이감 있는 그라데이션
  const waterGradient = ctx.createLinearGradient(0, waterTop, 0, height)
  waterGradient.addColorStop(0, "#1a3255")
  waterGradient.addColorStop(0.4, "#10213d")
  waterGradient.addColorStop(1, "#050a16")

  ctx.fillStyle = waterGradient
  ctx.fillRect(0, waterTop, width, height - waterTop)

  // 수면 하이라이트
  const surfaceGlow = ctx.createLinearGradient(0, waterTop - 10, 0, waterTop + 40)
  surfaceGlow.addColorStop(0, "rgba(200, 220, 255, 0)")
  surfaceGlow.addColorStop(0.5, "rgba(200, 220, 255, 0.15)")
  surfaceGlow.addColorStop(1, "rgba(200, 220, 255, 0)")
  ctx.fillStyle = surfaceGlow
  ctx.fillRect(0, waterTop - 10, width, 50)

  // 수면의 잔잔한 물결 라인 (더 부드럽고 가늘게)
  const lineCount = 14
  for (let index = 0; index < lineCount; index += 1) {
    const progress = index / Math.max(lineCount - 1, 1)
    const y = waterTop + progress * (height - waterTop)
    const amplitude = 1.0 + progress * 7.5
    const speed = 0.0007 + progress * 0.0004

    ctx.beginPath()
    ctx.moveTo(0, y)

    for (let x = 0; x <= width; x += 40) {
      const waveY =
        y +
        Math.sin(x * 0.007 + time * speed + progress * 4.5) * amplitude +
        Math.sin(x * 0.018 - time * speed * 0.7) * amplitude * 0.45

      ctx.lineTo(x, waveY)
    }

    ctx.strokeStyle = `rgba(160, 200, 255, ${0.07 - progress * 0.04})`
    ctx.lineWidth = 1.0
    ctx.stroke()
  }

  const lowerGlow = ctx.createRadialGradient(
    width * 0.5,
    height * 0.84,
    20,
    width * 0.5,
    height * 0.84,
    width * 0.42
  )
  lowerGlow.addColorStop(0, "rgba(91, 124, 181, 0.08)")
  lowerGlow.addColorStop(0.4, "rgba(91, 124, 181, 0.04)")
  lowerGlow.addColorStop(1, "rgba(91, 124, 181, 0)")
  ctx.fillStyle = lowerGlow
  ctx.fillRect(0, waterTop, width, height - waterTop)
}

const drawRipples = (ctx, ripples, time, waterTop, height) => {
  ripples.forEach(ripple => {
    const progress = clamp((time - ripple.startedAt) / ripple.duration, 0, 1)
    const easedProgress = 1 - Math.pow(1 - progress, 3) // Ease out cubic
    
    const depthProgress = clamp(
      (ripple.y - waterTop) / Math.max(height - waterTop, 1),
      0,
      1
    )
    const ellipseRatio = 0.15 + depthProgress * 0.2
    const alpha = (1 - progress) * ripple.strength

    // 1. 수면에 닿은 순간의 중앙 하이라이트 (잔상)
    if (progress < 0.25) {
      const flashAlpha = (1 - progress / 0.25) * 0.3 * ripple.strength
      ctx.beginPath()
      ctx.ellipse(ripple.x, ripple.y, ripple.maxRadius * 0.15, ripple.maxRadius * 0.15 * ellipseRatio, 0, 0, Math.PI * 2)
      const flashGrad = ctx.createRadialGradient(ripple.x, ripple.y, 0, ripple.x, ripple.y, ripple.maxRadius * 0.15)
      flashGrad.addColorStop(0, `rgba(220, 240, 255, ${flashAlpha})`)
      flashGrad.addColorStop(1, "rgba(220, 240, 255, 0)")
      ctx.fillStyle = flashGrad
      ctx.fill()
    }

    // 2. 다층 파동 (Rings)
    for (let ring = 0; ring < ripple.rings; ring += 1) {
      const ringDelay = ring * 0.12
      const ringProgress = clamp((progress - ringDelay) / (1 - ringDelay), 0, 1)
      
      if (ringProgress <= 0) continue

      const ringRadius = ripple.maxRadius * (1 - Math.pow(1 - ringProgress, 2.8))
      const ringAlpha = alpha * (1 - ringProgress) * (1 - ring * 0.2)

      ctx.save()
      ctx.beginPath()
      ctx.ellipse(
        ripple.x,
        ripple.y,
        ringRadius,
        Math.max(1, ringRadius * ellipseRatio),
        0,
        0,
        Math.PI * 2
      )
      
      ctx.strokeStyle = `rgba(180, 210, 255, ${ringAlpha * 0.5})`
      ctx.lineWidth = Math.max(0.6, (1.8 - ring * 0.35) * (1 - ringProgress))
      
      // 은은한 글로우
      ctx.shadowBlur = 10 * (1 - ringProgress)
      ctx.shadowColor = `rgba(140, 180, 255, ${ringAlpha * 0.3})`
      ctx.stroke()
      ctx.restore()
    }

    // 3. 미세한 물보라 입자 (닿는 순간 위로 튀는 느낌)
    if (progress < 0.15) {
      const splashAlpha = (1 - progress / 0.15) * 0.5
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2
        const dist = ripple.maxRadius * 0.1 * (1 + Math.random())
        const px = ripple.x + Math.cos(angle) * dist
        const py = ripple.y + Math.sin(angle) * dist * ellipseRatio - progress * 50
        
        ctx.beginPath()
        ctx.arc(px, py, 0.8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(230, 245, 255, ${splashAlpha})`
        ctx.fill()
      }
    }
  })
}

const drawRaindrop = (ctx, drop) => {
  ctx.save()
  // 빗방울 궤적에 그라데이션 추가하여 더 날카롭고 투명한 느낌
  const grad = ctx.createLinearGradient(
    drop.x, drop.y - drop.length,
    drop.x + drop.drift * 0.05, drop.y
  )
  grad.addColorStop(0, "rgba(255, 255, 255, 0)")
  grad.addColorStop(0.7, `rgba(230, 245, 255, ${drop.alpha * 0.5})`)
  grad.addColorStop(1, `rgba(230, 245, 255, ${drop.alpha})`)

  ctx.beginPath()
  ctx.moveTo(drop.x, drop.y - drop.length)
  ctx.lineTo(drop.x + drop.drift * 0.05, drop.y)
  ctx.strokeStyle = grad
  ctx.lineWidth = drop.thickness
  ctx.lineCap = "round"
  ctx.stroke()
  ctx.restore()
}

const RippleSurfaceCanvas = ({ rippleScale, amount }) => {
  const canvasRef = useRef(null)
  const optionsRef = useRef({ rippleScale, amount })

  useEffect(() => {
    optionsRef.current = { rippleScale, amount }
  }, [amount, rippleScale])

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
    let raindrops = []
    let foregroundRain = []
    let ripples = []

    const pushRipple = (x, y, strength = 0.92) => {
      const time = window.performance.now()
      const waterTop = getWaterTop(height)

      ripples.push(
        createRipple({
          x: clamp(x, 0, width),
          y: clamp(y, waterTop + 8, height - 28),
          strength,
          scale: optionsRef.current.rippleScale,
          startedAt: time,
        })
      )

      const maxRipples = 10 + optionsRef.current.amount * 8
      if (ripples.length > maxRipples) {
        ripples.splice(0, ripples.length - maxRipples)
      }
    }

    const syncRainPopulation = forceSync => {
      const targetCount = 18 + optionsRef.current.amount * 14

      if (raindrops.length < targetCount) {
        const additionCount = forceSync
          ? targetCount - raindrops.length
          : Math.min(4, targetCount - raindrops.length)

        raindrops = raindrops.concat(
          Array.from({ length: additionCount }, () =>
            createRaindrop({
              width,
              height,
              amount: optionsRef.current.amount,
              spawnAbove: !forceSync,
            })
          )
        )
        return
      }

      if (raindrops.length > targetCount) {
        const removalCount = forceSync
          ? raindrops.length - targetCount
          : Math.min(4, raindrops.length - targetCount)

        raindrops.splice(raindrops.length - removalCount, removalCount)
      }
    }

    const syncForegroundRainPopulation = forceSync => {
      const targetCount = 22 + optionsRef.current.amount * 16

      if (foregroundRain.length < targetCount) {
        const additionCount = forceSync
          ? targetCount - foregroundRain.length
          : Math.min(4, targetCount - foregroundRain.length)

        foregroundRain = foregroundRain.concat(
          Array.from({ length: additionCount }, () =>
            createForegroundRain({
              width,
              height,
              amount: optionsRef.current.amount,
              spawnAbove: !forceSync,
            })
          )
        )
        return
      }

      if (foregroundRain.length > targetCount) {
        const removalCount = forceSync
          ? foregroundRain.length - targetCount
          : Math.min(4, foregroundRain.length - targetCount)

        foregroundRain.splice(
          foregroundRain.length - removalCount,
          removalCount
        )
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
      raindrops = []
      foregroundRain = []
      syncRainPopulation(true)
      syncForegroundRainPopulation(true)
    }

    const draw = now => {
      const delta = Math.min((now - lastFrameTime) / 1000 || 0.016, 0.05)
      lastFrameTime = now
      const currentOptions = optionsRef.current
      ripples = ripples.filter(ripple => now - ripple.startedAt < ripple.duration)
      syncRainPopulation(false)
      syncForegroundRainPopulation(false)

      drawBackdrop(ctx, width, height, now)

      const waterTop = getWaterTop(height)
      raindrops.forEach(drop => {
        drop.y += drop.speed * delta
        drop.x += drop.drift * delta

        // 목표 지점(targetY)에 도달했을 때 물결 발생
        if (drop.y >= drop.targetY) {
          pushRipple(
            drop.x,
            drop.targetY,
            drop.splashStrength * (0.86 + currentOptions.rippleScale * 0.08)
          )
          resetRaindrop(drop, {
            width,
            height,
            amount: currentOptions.amount,
          })
          return
        }

        if (
          drop.y > height + 50 ||
          drop.x < -60 ||
          drop.x > width + 60
        ) {
          resetRaindrop(drop, {
            width,
            height,
            amount: currentOptions.amount,
          })
        }
      })

      raindrops
        .slice()
        .sort((left, right) => left.depth - right.depth)
        .forEach(drop => drawRaindrop(ctx, drop))

      drawRipples(ctx, ripples, now, waterTop, height)

      const veil = ctx.createLinearGradient(0, waterTop, 0, height)
      veil.addColorStop(0, "rgba(255, 230, 214, 0)")
      veil.addColorStop(0.5, "rgba(39, 65, 96, 0.08)")
      veil.addColorStop(1, "rgba(12, 26, 46, 0.26)")
      ctx.fillStyle = veil
      ctx.fillRect(0, waterTop, width, height - waterTop)

      foregroundRain.forEach(drop => {
        drop.y += drop.speed * delta
        drop.x += drop.drift * delta

        if (
          drop.y > height + 60 ||
          drop.x < -80 ||
          drop.x > width + 80
        ) {
          resetForegroundRain(drop, {
            width,
            height,
            amount: currentOptions.amount,
          })
        }
      })

      foregroundRain
        .slice()
        .sort((left, right) => left.depth - right.depth)
        .forEach(drop => drawRaindrop(ctx, drop))

      animationFrameId = window.requestAnimationFrame(draw)
    }

    resize()
    animationFrameId = window.requestAnimationFrame(draw)
    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize)
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className={rippleTypeStyles.canvas} />
}

const RippleSurfaceMotion = () => {
  const [rippleScale, setRippleScale] = useState(1.2)
  const [amount, setAmount] = useState(3)

  return (
    <ProjectDetail mainClassName={rippleTypeStyles.page}>
      <div className={rippleTypeStyles.scene}>
        <RippleSurfaceCanvas rippleScale={rippleScale} amount={amount} />

        <div className={rippleTypeStyles.controls}>
          <label className={rippleTypeStyles.control}>
            <span className={rippleTypeStyles.controlLabel}>Count</span>
            <span className={rippleTypeStyles.controlValue}>{amount}</span>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={amount}
              onChange={event =>
                setAmount(Number.parseInt(event.target.value, 10))
              }
              className={rippleTypeStyles.slider}
            />
          </label>

          <label className={rippleTypeStyles.control}>
            <span className={rippleTypeStyles.controlLabel}>Size</span>
            <span className={rippleTypeStyles.controlValue}>{rippleScale.toFixed(1)}</span>
            <input
              type="range"
              min="0.8"
              max="2.4"
              step="0.1"
              value={rippleScale}
              onChange={event =>
                setRippleScale(Number.parseFloat(event.target.value))
              }
              className={rippleTypeStyles.slider}
            />
          </label>

          <p className={rippleTypeStyles.hint}>Dawn rain on water</p>
        </div>
      </div>
    </ProjectDetail>
  )
}

export const Head = () => (
  <Seo
    title="Ripple Surface Motion"
    description="A dawn water surface motion where raindrops bloom into layered ripples."
    keywords={["Motion", "Ripple Surface", "Canvas", "Rain Ripple"]}
  />
)

export default RippleSurfaceMotion

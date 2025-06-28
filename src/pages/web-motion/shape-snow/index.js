import React, { useEffect, useRef, useState } from "react"
import ProjectDetail from "../../../components/ProjectDetail"
import Seo from "../../../components/Seo"

const ShapeSnowCanvas = ({ speed, density }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    canvas.style.backgroundColor = "#1e293b"
    let animationFrameId

    let shapes = []
    const baseSize = 30
    let columns = 0
    let stacks = []
    const letters = [
      ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
      "\u3131",
      "\u3132",
      "\u3134",
      "\u3137",
      "\u3138",
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
      "\u3150",
      "\u3151",
      "\u3152",
      "\u3153",
      "\u3154",
      "\u3155",
      "\u3156",
      "\u3157",
      "\u3158",
      "\u3159",
      "\u315A",
      "\u315B",
      "\u315C",
      "\u315D",
      "\u315E",
      "\u315F",
      "\u3160",
      "\u3161",
      "\u3162",
      "\u3163",
    ]

    const resize = () => {
      const parent = canvas.parentElement
      canvas.width = parent ? parent.clientWidth : window.innerWidth
      canvas.height = parent ? parent.clientHeight : window.innerHeight
      columns = Math.max(1, Math.floor(canvas.width / baseSize))
      stacks = Array(columns).fill(0)
      shapes = []
    }
    resize()
    window.addEventListener("resize", resize)

    const spawnShape = time => {
      const col = Math.floor(Math.random() * columns)
      const x = col * baseSize + baseSize / 2
      const char = letters[Math.floor(Math.random() * letters.length)]
      shapes.push({
        col,
        x,
        y: -baseSize,
        size: baseSize,
        char,
        state: "falling",
        landedAt: 0,
        melt: 0,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.1,
      })
    }

    const drawShape = shape => {
      const size = Math.max(0, shape.size * (1 - shape.melt))
      if (size <= 0) return
      ctx.save()
      ctx.translate(shape.x, shape.y + (shape.size - size))
      ctx.rotate(shape.angle)
      ctx.fillStyle = "#ffffff"
      ctx.strokeStyle = "rgba(0,0,0,0.4)"
      ctx.lineWidth = 1
      ctx.font = `${size}px sans-serif`
      ctx.textAlign = "center"
      ctx.textBaseline = "bottom"
      ctx.strokeText(shape.char, 0, size)
      ctx.fillText(shape.char, 0, size)
      ctx.restore()
    }

    let lastSpawn = 0
    const spawnInterval = 600

    const update = time => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (time - lastSpawn > spawnInterval) {
        for (let i = 0; i < density; i++) {
          spawnShape(time)
        }
        lastSpawn = time
      }
      shapes.forEach(shape => {
        if (shape.state === "falling") {
          shape.y += speed
          shape.angle += shape.spin
          const groundY = canvas.height - (stacks[shape.col] + 1) * baseSize
          if (shape.y >= groundY) {
            shape.y = groundY
            shape.state = "landed"
            shape.landedAt = time
            stacks[shape.col]++
            shape.spin = 0
          }
        } else if (shape.state === "landed") {
          if (time - shape.landedAt > 2000) {
            shape.melt += 0.005 * speed
            if (shape.melt >= 1) {
              shape.remove = true
              stacks[shape.col]--
              shapes.forEach(other => {
                if (
                  other.col === shape.col &&
                  other.y < shape.y &&
                  other.state === "landed"
                ) {
                  other.y += baseSize
                }
              })
            }
          }
        }
        drawShape(shape)
      })
      shapes = shapes.filter(s => !s.remove)
      animationFrameId = requestAnimationFrame(update)
    }
    animationFrameId = requestAnimationFrame(update)

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [speed, density])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

const ShapeSnowMotion = ({ location }) => {
  const isFullscreen = location?.state?.isFullscreen ?? true
  const [speed, setSpeed] = useState(1)
  const [density, setDensity] = useState(1)
  return (
    <ProjectDetail
      title={"Shape Snow"}
      isFullscreen={isFullscreen}
      mainClassName="bg-transparent overflow-hidden p-0"
    >
      <div className="relative h-full">
        <ShapeSnowCanvas speed={speed} density={density} />
        <div className="absolute top-4 right-4 space-y-2 bg-white/70 p-4 rounded shadow text-sm">
          <label className="block">
            Speed:{" "}
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.5"
              value={speed}
              onChange={e => setSpeed(parseFloat(e.target.value))}
              className="w-32"
            />
          </label>
          <label className="block">
            Amount:{" "}
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={density}
              onChange={e => setDensity(parseInt(e.target.value, 10))}
              className="w-32"
            />
          </label>
        </div>
      </div>
    </ProjectDetail>
  )
}

export const Head = () => (
  <Seo
    title="Shape Snow Motion"
    description="Motion graphic of falling letters that pile up and melt away."
    keywords={["Motion", "Shape Snow", "Canvas"]}
  />
)

export default ShapeSnowMotion

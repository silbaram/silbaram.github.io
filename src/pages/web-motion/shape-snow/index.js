import React, { useEffect, useRef, useState } from "react"
import ProjectDetail from "../../../components/ProjectDetail"
import Seo from "../../../components/Seo"

const ShapeSnowCanvas = ({ speed }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    let animationFrameId

    let shapes = []
    const baseSize = 30
    let columns = 0
    let stacks = []
    const shapeTypes = ["circle", "square", "triangle"]

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
      const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)]
      shapes.push({
        col,
        x,
        y: -baseSize,
        size: baseSize,
        type,
        state: "falling",
        landedAt: 0,
        melt: 0,
      })
    }

    const drawShape = shape => {
      const size = Math.max(0, shape.size * (1 - shape.melt))
      if (size <= 0) return
      const half = size / 2
      ctx.save()
      ctx.translate(shape.x, shape.y + (shape.size - size))
      ctx.fillStyle = "rgba(255,255,255,0.8)"
      if (shape.type === "circle") {
        ctx.beginPath()
        ctx.arc(0, half, half, 0, Math.PI * 2)
        ctx.fill()
      } else if (shape.type === "square") {
        ctx.fillRect(-half, 0, size, size)
      } else if (shape.type === "triangle") {
        ctx.beginPath()
        ctx.moveTo(-half, size)
        ctx.lineTo(0, 0)
        ctx.lineTo(half, size)
        ctx.closePath()
        ctx.fill()
      }
      ctx.restore()
    }

    let lastSpawn = 0
    const spawnInterval = 600

    const update = time => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (time - lastSpawn > spawnInterval) {
        spawnShape(time)
        lastSpawn = time
      }
      shapes.forEach(shape => {
        if (shape.state === "falling") {
          shape.y += speed
          const groundY = canvas.height - (stacks[shape.col] + 1) * baseSize
          if (shape.y >= groundY) {
            shape.y = groundY
            shape.state = "landed"
            shape.landedAt = time
            stacks[shape.col]++
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
  }, [speed])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

const ShapeSnowMotion = ({ location }) => {
  const isFullscreen = location?.state?.isFullscreen ?? true
  const [speed, setSpeed] = useState(1)
  return (
    <ProjectDetail
      title={"Shape Snow"}
      isFullscreen={isFullscreen}
      mainClassName="bg-transparent overflow-hidden p-0"
    >
      <div className="relative h-full">
        <ShapeSnowCanvas speed={speed} />
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
        </div>
      </div>
    </ProjectDetail>
  )
}

export const Head = () => (
  <Seo
    title="Shape Snow Motion"
    description="Motion graphic of falling shapes that pile up and melt away."
    keywords={["Motion", "Shape Snow", "Canvas"]}
  />
)

export default ShapeSnowMotion

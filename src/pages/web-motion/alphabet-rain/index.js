import React, { useEffect, useRef, useState } from "react"
import ProjectDetail from "../../../components/ProjectDetail"
import Seo from "../../../components/Seo"

const AlphabetRainCanvas = ({ speed, fontSize, letterCount }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    let animationFrameId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    const columns = Math.min(letterCount, Math.floor(canvas.width / fontSize))
    const drops = Array(columns).fill(0)

    const draw = () => {
      if (!ctx) return
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#0f0"
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i] += speed
      }
      animationFrameId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [speed, fontSize, letterCount])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

const AlphabetRainMotion = () => {
  const isFullscreen = true
  const [speed, setSpeed] = useState(1)
  const [fontSize, setFontSize] = useState(16)
  const [letterCount, setLetterCount] = useState(50)

  return (
    <ProjectDetail title={"Alphabet Rain"} isFullscreen={isFullscreen} mainClassName="bg-transparent">
      <div className="relative h-full">
        <AlphabetRainCanvas speed={speed} fontSize={fontSize} letterCount={letterCount} />
        <div className="absolute top-4 right-4 space-y-2 bg-white/70 p-4 rounded shadow text-sm">
          <label className="block">
            Speed: <input type="range" min="0.5" max="5" step="0.5" value={speed} onChange={e => setSpeed(parseFloat(e.target.value))} className="w-32" />
          </label>
          <label className="block">
            Font Size: <input type="range" min="10" max="40" step="2" value={fontSize} onChange={e => setFontSize(parseInt(e.target.value, 10))} className="w-32" />
          </label>
          <label className="block">
            Letters: <input type="range" min="10" max="150" step="10" value={letterCount} onChange={e => setLetterCount(parseInt(e.target.value, 10))} className="w-32" />
          </label>
        </div>
      </div>
    </ProjectDetail>
  )
}

export const Head = () => (
  <Seo
    title="Alphabet Rain Motion"
    description="Motion graphic of falling alphabet characters."
    keywords={["Motion", "Alphabet Rain", "Canvas"]}
  />
)

export default AlphabetRainMotion


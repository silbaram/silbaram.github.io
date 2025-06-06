import React, { useEffect, useRef } from "react"
import ProjectDetail from "../../../components/ProjectDetail"
import Seo from "../../../components/Seo"

const AlphabetRainCanvas = () => {
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
    const fontSize = 16
    const columns = Math.floor(canvas.width / fontSize)
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
        drops[i]++
      }
      animationFrameId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} />
}

const AlphabetRainMotion = ({ location }) => {
  const isFullscreen = location?.state?.isFullscreen ?? true
  return (
    <ProjectDetail title={"Alphabet Rain"} isFullscreen={isFullscreen} mainClassName="bg-transparent">
      <div className="relative h-full">
        <AlphabetRainCanvas />
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

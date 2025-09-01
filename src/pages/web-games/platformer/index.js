import React from "react"
import Seo from "../../../components/Seo"
import ProjectDetail from "../../../components/ProjectDetail"
import PlatformerGame from "../../../components/platformer-game/PlatformerGame"

const PlatformerGamePage = ({ location }) => {
  const isFullscreen = location?.state?.isFullscreen ?? true
  return (
    <ProjectDetail title={"플랫포머 게임"} isFullscreen={isFullscreen}>
      <div>
        <PlatformerGame />
      </div>
    </ProjectDetail>
  )
}

export const Head = () => (
  <Seo
    title="Platformer Game"
    description="A simple platformer game like Super Mario."
    keywords={["Platformer Game", "WebGame", "Super Mario"]}
  />
)
export default PlatformerGamePage

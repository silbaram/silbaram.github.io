import React from "react"
import Seo from "../../../components/Seo"
import ProjectDetail from "../../../components/ProjectDetail"
import PlatformerGame from "../../../components/platformer-game/PlatformerGame"

const PlatformerGamePage = () => {
  return (
    <ProjectDetail mainClassName="bg-neutral-900">
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

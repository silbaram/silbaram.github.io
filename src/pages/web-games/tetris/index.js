import React from "react"

import Seo from "../../../components/Seo"
import ProjectDetail from "../../../components/ProjectDetail"
import TetrisGame from "../../../components/tetris-game/TetrisGame"
import * as tetrisPageStyles from "./css/tetris-page.module.css"

const TetrisGamePage = () => (
  <ProjectDetail mainClassName={tetrisPageStyles.page}>
    <div className={tetrisPageStyles.app}>
      <TetrisGame />
    </div>
  </ProjectDetail>
)

export const Head = () => (
  <Seo
    title="Tetris Game"
    description="A classic-style Tetris game you can play in the browser."
    keywords={["Tetris Game", "WebGame", "Classic Tetris"]}
  />
)

export default TetrisGamePage

import React from "react";
import { Link } from "gatsby";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import MinesweeperGame from "../../components/minesweeper-game/MinesweeperGame";

const MinesweeperGameApp = () => {
  return (
    <Layout>
      <div>
        <h1>지뢰 게임</h1>
        <MinesweeperGame />
      </div>

      <br />
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  );
}

export const Head = () => <Seo title="This is a minesweeper game that you can easily play when you're bored." />

export default MinesweeperGameApp;
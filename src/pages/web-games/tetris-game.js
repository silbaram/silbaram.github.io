import React from "react";
import { Link } from "gatsby";
import Seo from "../../components/seo";
import TetrisGame from "../../components/tetris-game/TetrisGame";
import Layout from "../../components/layout/layout"

const TetrisGameApp = () => {
    return (
        <Layout>
            <div>
                <h1>테트리스 게임</h1>
                <TetrisGame />
            </div>

            <br />
            <Link to="/">Go back to the homepage</Link>
        </Layout>
    );
}

export const Head = () => <Seo title="This is a minesweeper game that you can easily play when you're bored." />

export default TetrisGameApp;
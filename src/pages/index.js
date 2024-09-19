import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

const appLinks = [
  {
    text: "simple calculator",
    url: "/web-apps/calculator-app",
    description:
      "웹 브라우저에서 바로 사용할수 있는 간단한 기능을 제공하는 계산기 app 입니다.",
  },
  {
    text: "json viewer",
    url: "/web-apps/json-viewer-app",
    description:
      "보기 힘든 json 형태의 문자열을 보기 편하게 줄바꿈을 해주는 json viewer app 입니다.",
  },
  {
    text: "url encoder, decoder",
    url: "/web-apps/url-encoder-decoder-app",
    description:
      "url 내용중 urf-8의 텍스트를 encoding, decoding app 입니다.",
  },
]

const gameLinks = [
  {
    text: "지뢰 찾기 게임",
    url: "/web-games/minesweeper-game",
    description:
      "웹 브라우저에서 심심할때 간편하게 해볼수 있는 지뢰찾기 게임 입니다.",
  },
  {
    text: "테트리스 게임",
    url: "/web-games/tetris-game/",
    description:
      "웹 브라우저에서 심심할때 간편하게 해볼수 있는 테트리스 게임 입니다.",
  },
]

const IndexPage = () => (
  <Layout>
    <section>
      <h2 style={{ marginBottom: '10px', marginTop: '0' }}>개발도구</h2>
      <ul className={styles.list} style={{ marginTop: '0' }}>
        {appLinks.map(link => (
          <li key={link.url} className={styles.listItem}>
            <Link
              className={styles.listItemLink}
              to={link.url}
            >
              {link.text}
            </Link>
            <p className={styles.listItemDescription} style={{ marginTop: '5px' }}>{link.description}</p>
          </li>
        ))}
      </ul>
    </section>

    <section>
      <h2 style={{ marginBottom: '10px', marginTop: '0' }}>게임</h2>
      <ul className={styles.list} style={{ marginTop: '0' }}>
        {gameLinks.map(link => (
          <li key={link.url} className={styles.listItem}>
            <Link
              className={styles.listItemLink}
              to={link.url}
            >
              {link.text}
            </Link>
            <p className={styles.listItemDescription} style={{ marginTop: '5px' }}>{link.description}</p>
          </li>
        ))}
      </ul>
    </section>
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
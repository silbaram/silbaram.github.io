import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

const links = [
  {
    text: "Simple calculator",
    url: "/web-apps/calculator-app",
    description:
      "웹 브라우저에서 바로 사용할수 있는 간단한 기능을 제공하는 계산기 입니다.",
  },
]

const IndexPage = () => (
  <Layout>
    {links.map(link => (
      <ul className={styles.list}>
        <li key={link.url} className={styles.listItem}>
          <Link
            className={styles.listItemLink}
            to={`${link.url}`}
          >
            {link.text}
          </Link>
          <p className={styles.listItemDescription}>{link.description}</p>
        </li>
      </ul>
    ))}
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage

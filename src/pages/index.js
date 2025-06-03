import React from "react"
import projectCardDataList from "../data/projectCardDataList"

import Layout from "../components/layout/Layout"
import ProjectList from "../components/ProjectList"
import Seo from "../components/Seo"

function IndexPage() {
  return (
    <Layout>
        <ProjectList projects={projectCardDataList} />
    </Layout>
  );
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage;
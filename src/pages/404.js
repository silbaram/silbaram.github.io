import * as React from "react"

import Seo from "../components/seo"
import Layout from "../components/layout/layout"
import { Link } from "gatsby";

const NotFoundPage = () => (
  <Layout isFullscreen={false}>
    <div className="h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-purple-100 to-purple-200 p-8">
      <span className="text-9xl mb-4">🤔</span>
      <h1 className="text-5xl font-bold mb-2">404: Oops!</h1>
      <p className="text-xl mb-6">길을 잃으셨나요? 걱정 마세요, 집으로 안내해 드릴게요!</p>
      <Link to="/" className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition">
        홈으로 돌아가기
      </Link>
    </div>
  </Layout>
)

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage

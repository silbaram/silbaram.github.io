import * as React from "react"
import Header from "./Header"
import Footer from "./Footer"

const Layout = ({ children, isFullscreen }) => (
  // 전체 배경 밝은 회색, 텍스트 색상 어둡게
  <div className={`min-h-screen bg-gray-100 text-slate-900 flex flex-col font-sans ${isFullscreen ? 'overflow-hidden' : ''}`}>
    {!isFullscreen && <Header />}
    <main className={`flex-grow ${isFullscreen ? '' : ''}`}>
      {children}
    </main>
    {!isFullscreen && <Footer />}
  </div>
);

export default Layout

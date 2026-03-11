import * as React from "react"
import Header from "./Header"
import Footer from "./Footer"

const Layout = ({ children, isFullscreen }) => (
  <div className={`min-h-screen bg-neutral-50 text-neutral-900 flex flex-col font-sans ${isFullscreen ? 'overflow-hidden' : ''}`}>
    {!isFullscreen && <Header />}
    <main className={`flex-grow ${isFullscreen ? '' : ''}`}>
      {children}
    </main>
    {!isFullscreen && <Footer />}
  </div>
);

export default Layout

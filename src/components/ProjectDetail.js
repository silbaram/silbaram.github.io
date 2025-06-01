import { ArrowLeftIcon, MotionGraphicsIcon } from "./icons"
import React from "react"
import { Link } from "gatsby"
import Layout from "./layout/layout"

const ProjectDetail = ({ title, isFullscreen = true, children }) => {

  return (
    <>
      {isFullscreen ? (
        <div className="flex flex-col h-screen">
          <header className="bg-slate-700 text-white text-2xl font-semibold p-4 text-center">
            {title}
          </header>
          <main className="flex-grow bg-slate-100 p-4 overflow-auto">
            {children}
          </main>
        </div>
      ) : (
        <Layout>
          <div className="flex flex-col h-screen pt-8">
            <header className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-4 rounded-t-lg shadow-lg relative mb-4">
              <Link to="/" className="absolute left-4 flex items-center space-x-2 text-white hover:opacity-80">
                <ArrowLeftIcon className="w-5 h-5" />
                <span className="text-base font-medium">Projects</span>
              </Link>
              <div className="flex items-center justify-center space-x-2">
                <MotionGraphicsIcon className="w-6 h-6" />
                <span className="text-2xl font-semibold">{title}</span>
              </div>
            </header>

            <main className="flex-grow bg-slate-100 p-4 pt-8 overflow-auto">
              {children}
            </main>
          </div>
        </Layout>
      )}
    </>
  );
};

export default ProjectDetail
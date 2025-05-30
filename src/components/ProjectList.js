import React, { useState } from "react"
import ProjectCard from "./ProjectCard"

const ProjectList = ({ projects }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || (activeFilter === 'games' && project.type === 'game') || (activeFilter === 'apps' && project.type === 'app') || (activeFilter === 'motion' && project.type === 'motion');
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="my-8 sm:my-12 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-2/3 md:w-1/2">
          {/* 검색창 스타일 변경 */}
          <input type="text" placeholder="Search projects..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors" />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg></div>
        </div>
        {/* 필터 버튼 스타일 변경 */}
        <div className="flex space-x-2 p-1 bg-gray-100 rounded-lg border border-gray-200">
          {['all', 'games', 'apps', 'motion'].map(filter => (
            <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 capitalize ${activeFilter === filter ? 'bg-purple-500 text-white' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'}`}>{filter}</button>))
          }
        </div>
      </div>
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredProjects.map(project => (<ProjectCard key={project.id} project={project} />))}
        </div>
      ) : (<p className="text-center text-gray-600 text-xl py-10">No projects found matching your criteria. Try adjusting your search or filter.</p>)}
    </div>
  );
};

export default ProjectList
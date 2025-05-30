import React from "react"

const Footer = () => (
  // 배경을 밝은 회색으로, 텍스트 색상 어둡게
  <footer className="bg-gray-100 text-gray-600 py-8 mt-auto border-t border-gray-200">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
      &copy; {new Date().getFullYear()} Silbaram. All rights reserved.
      <p className="mt-1">Powered by React, Phaser & Gatsby.</p>
    </div>
  </footer>
);

export default Footer
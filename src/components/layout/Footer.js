import React from "react"

const Footer = () => (
  <footer className="text-neutral-400 py-8 mt-auto border-t border-neutral-200">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs">
      &copy; {new Date().getFullYear()} Silbaram. All rights reserved.
      <p className="mt-1">Powered by React, Phaser & Gatsby.</p>
    </div>
  </footer>
);

export default Footer

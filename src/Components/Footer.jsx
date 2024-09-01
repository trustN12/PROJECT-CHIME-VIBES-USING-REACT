import React from 'react'

const Footer = () => {
  return (
    <footer className="text-center py-4">
      <p className="text-lg text-gray-400">
        &copy; {new Date().getFullYear()} Chime Vibes. Developed by Nabarun. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
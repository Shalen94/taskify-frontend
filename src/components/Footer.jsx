import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center py-4 mt-auto">
      <div className="container">
        <p className="mb-1">© {new Date().getFullYear()} Taskify. All rights reserved.</p>
        <div>
          <a href="#" className="text-light me-3 text-decoration-none">Privacy Policy</a>
          <a href="#" className="text-light text-decoration-none">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

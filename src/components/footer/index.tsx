import React from 'react'

const Footer = () => {
  return (
    <footer
      className="text-center py-3 bg-neutral-50 rounded-t-md w-full sm:w-[594px] flex items-center justify-center"
      style={{ boxShadow: "0 -1px 6px rgba(0, 0, 0, 0.05)" }}
    >
      <p className="text-neutral-500">
        © 2024 Image Converter - All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

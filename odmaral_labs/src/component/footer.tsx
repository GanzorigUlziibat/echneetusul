import React from "react";

// Define the props interface
interface FooterProps {
  year: number;
}

const Footer: React.FC<FooterProps> = ({ year }) => {
  return (
    <footer
      style={{ background: "#f1f1f1", padding: "1rem", textAlign: "center" }}
    >
      <p>© {year} My Site. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

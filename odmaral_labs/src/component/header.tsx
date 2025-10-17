import React from "react";

// Define the props interface
interface HeaderProps {
  siteName: string;
}

const Header: React.FC<HeaderProps> = ({ siteName }) => {
  return (
    <header style={{ background: "#333", color: "white", padding: "1rem" }}>
      <h1>{siteName}</h1>
    </header>
  );
};

export default Header;

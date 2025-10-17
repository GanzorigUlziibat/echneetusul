import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside style={{ background: "#ddd", width: "200px", padding: "1rem" }}>
      <h3>Navigation</h3>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

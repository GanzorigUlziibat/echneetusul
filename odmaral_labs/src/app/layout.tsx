import React from "react";
import Header from "../component/header";
import Footer from "../component/footer";
import Sidebar from "../component/sidebar";
import "./globals.css"; // Optional: For global styles

// Define the props interface for RootLayout
interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const siteName = "My Site"; // Dynamic site name
  const currentYear = new Date().getFullYear(); // Dynamic copyright year

  return (
    <html lang="mn">
      <body
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header siteName={siteName} />
        <div style={{ display: "flex", flex: 1 }}>
          <Sidebar />
          <main style={{ flex: 1, padding: "1rem" }}>{children}</main>
        </div>
        <Footer year={currentYear} />
      </body>
    </html>
  );
};

export default RootLayout;

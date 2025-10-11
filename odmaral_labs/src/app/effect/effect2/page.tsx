"use client";
import { useEffect, useState } from "react";

export default function WindowSize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    // Cleanup function: component устах үед сонсогчийг устгана
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <h1>Window width: {width}px</h1>;
}

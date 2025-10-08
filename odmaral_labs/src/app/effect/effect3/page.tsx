"use client";
import { useEffect, useState } from "react";

export default function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    // Cleanup: Component устах үед interval цэвэрлэнэ
    return () => clearInterval(interval);
  }, []);

  return <h1>Seconds: {count}</h1>;
}

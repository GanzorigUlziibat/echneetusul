"use client";
import { useEffect, useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Count өөрчлөгдөв:", count);
  }, [count]); // зөвхөн count өөрчлөгдөх үед ажиллана

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+ Add</button>
    </div>
  );
}

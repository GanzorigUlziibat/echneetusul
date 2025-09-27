"use client"; // Client-side rendering идэвхжүүлж байна​
import { useState } from "react";
export default function Counter() {
  // count = утга, setCount = шинэчлэх функц​
  const [count, setCount] = useState(0);
  return (
    <div className="p-4">
      ​<p>Тоолуур: {count}</p>​
      <button
        className="px-4 py-2 bg-green-500 text-white rounded"
        onClick={() => setCount(count + 1)} // Дарсан үед 1-ээр нэмнэ​
      >
        ​ Нэмэх​
      </button>
      ​
    </div>
  );
}

"use client";

import { useState } from "react";

export default function CounterPage() {
  const [count, setCount] = useState(0);

  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleDouble = () => {
    setCount(count * 2);
  };

  const handleDivide = () => {
    if (count > 0) {
      setCount(Math.floor(count / 2));
    }
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">Counter App</h1>

      <p className="text-xl">Current count: {count}</p>

      <div className="flex gap-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setCount(count + 1)}
        >
          Increase
        </button>

        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleDecrease}
        >
          Decrease
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleDouble}
        >
          Multiple by 2
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded"
          onClick={handleDivide}
        >
          Divide by 2
        </button>

        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={() => setCount(0)}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

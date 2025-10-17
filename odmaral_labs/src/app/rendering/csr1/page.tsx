"use client";
import { useState } from "react";

const quotes = [
  "The best way to get started is to quit talking and begin doing.",
  "Don't let yesterday take up too much of today.",
  "It's not whether you get knocked down, it's whether you get up.",
];
export default function Quote() {
  const [quote, setQuote] = useState(quotes[0]);

  return (
    <div>
      <h2>{quote}</h2>
      <button
        onClick={() =>
          setQuote(quotes[Math.floor(Math.random() * quotes.length)])
        }
      >
        New Quote
      </button>
    </div>
  );
}

"use client";
import Link from "next/link"
 

export default function Sidebar() {
  return (
    <aside className="bg-blue-600 text-white w-64 min-h-screen p-4">
      <h2 className="text-2xl font-bold">Sidebar</h2>
      <p><Link href="/about">Бидний тухай</Link></p>
      <p><Link href="/blog">Блог</Link></p>
         <p><Link href="/about">Холбоо барих</Link></p>
    </aside>

    
  );
}

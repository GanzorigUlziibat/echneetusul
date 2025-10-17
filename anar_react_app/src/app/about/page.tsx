import Image from "next/image";
import styles from "./about.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom"; 



// export default function About() {
//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold text-blue-600">Миний тухай</h1>
//       <p className="mt-4 text-gray-700">Би Next.js ашиглаж веб хөгжүүлэлт сурч байна.</p>
//       <p className="mt-2">Миний хобби: унших, аялал, програмчлах</p>
//     </div>
//   );
// }

// export default function About(){
//   return(
//     <div>
//       <h1 className={styles.title}>Миний тухай</h1>
//       <p className={styles.description}>
//         Энэ хуудсыг CSS Module ашиглаж загварчилсан.
//       </p>
//     </div>
//   );
// }




export default function About(){
  return(
    <>
    <Header>
      <main className="p-6">
        <h2 className="text-2xl font-bold">Миний тухай</h2>
        <p>Next.js ашиглаж байна.</p>
      </main>
    </Header>

    <Footer>
      <main className="p-6">
        <h2 className="text-2xl font-bold">Миний тухай</h2>
        <p>Next.js ашиглаж байна.</p>
      </main>
    </Footer>
    </>
  )
}

export function App() {
  console.log("hello");
  return (
    <BrowserRouter>
      <div className="App">
        <Link to="/">За за үүнийг хийв</Link> |<Link to="/app-users">Router ашиглаж үүнийг хийв.</Link> |
        <Route path="/about">
          <Link to="/about">Бидний тухай</Link> |
        </Route>
        <Link to="/about">үүний тухай</Link>
        <Route path="/error" exact component={Home} />
        <Route path="/app-users">
          <Users />
        </Route>
        <Route path="/about">
          <About />
        </Route>
      </div>
    </BrowserRouter>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function Users() {
  console.log("users...");
  return <h2>John</h2>;
}

function information() {
  return <h2>information</h2>;
}

import Image from "next/image";
import styles from "./about.module.css";
import Header from "@/components/Header"

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
    </>
  )
}

import Header from "./header";
import Footer from "./footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-6">{children}</main>
      <Footer />
    </div>
  );
}

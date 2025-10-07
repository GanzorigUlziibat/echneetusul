import { notFound } from "next/navigation";
import { blogs } from "@/app/data/blogs";
import Link from "next/link";

export default function BlogDetail({ params }: { params: { id: string } }) {
  const blogId = Number(params.id);
  const blog = blogs.find((b) => b.id === blogId);

  if (!blog) {
    return <h1>404 — Блог олдсонгүй</h1>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{blog.blogname}</h1>
      <p className="text-gray-700">{blog.description}</p>

      <Link
        href="/blog"
        className="text-blue-500 hover:underline mt-4 inline-block"
      >
        ← Буцах
      </Link>
      <br></br>
      <br></br>
      <Link
        href={`/blog/${blog.id}/comments`}
        className="text-green-600 hover:underline"
      >
        💬 Сэтгэгдлүүдийг үзэх
      </Link>
    </div>
  );
}

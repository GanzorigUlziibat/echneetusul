import Link from "next/link";
import Image from "next/image";
import { photos } from "@/data/photos"; // Adjust path if needed

export default function Gallery() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Миний Аялалын Зургууд</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <Link key={photo.id} href={`/photos/${photo.id}`} className="block">
            <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <Image
                src={photo.src}
                alt={photo.alt}
                title={photo.title}
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
              <div className="p-4">
                <p className="text-lg font-semibold">{photo.title}</p>
                <p className="text-gray-600">{photo.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

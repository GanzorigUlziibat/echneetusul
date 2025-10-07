export default function CommentsPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Comments for Blog ID: {params.id}
      </h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Сэтгэгдэл 1: Маш сонирхолтой блог байна!</li>
        <li>Сэтгэгдэл 2: Дараагийн нийтлэлээ хурдан оруулаарай.</li>
        <li>Сэтгэгдэл 3: Технологийн талаар илүү бичээрэй.</li>
      </ul>
    </div>
  );
}

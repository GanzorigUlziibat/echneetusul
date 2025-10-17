import Header from "@/components/Header";


export default function AboutPage() {
  const bio = {
    birth: "1995-04-06 • Ховд аймаг, Монгол улс",
    schools: ["Мандах – Мэдээлийн технологи", "Программ хангамж"],
    hobbies: ["Унших", "аялах", "программчлал", "спорт"],
    goal: "Жижиг төслөөс эхлээд том төсөл болтол нь хөгжүүлэх.",
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
     
      <header className="mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight">Миний тухай</h1>
        <p className="mt-2 text-slate-300">Next.js ашиглаж байна.</p>
      </header>

    
      <section className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-xs font-semibold tracking-widest text-slate-400">
              ТӨРСӨН ОН / ГАРАЛ
            </h2>
            <p className="mt-1 text-[15px] leading-6 text-slate-100">{bio.birth}</p>
          </div>

          <div className="border-t border-neutral-800 pt-6">
            <h2 className="text-xs font-semibold tracking-widest text-slate-400">
              СУРСАН СУРГУУЛЬ
            </h2>
            <ul className="mt-2 list-disc pl-5 text-[15px] leading-6 text-slate-100">
              {bio.schools.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="border-t border-neutral-800 pt-6">
            <h2 className="text-xs font-semibold tracking-widest text-slate-400">
              ХОББИ
            </h2>
            <p className="mt-1 text-[15px] leading-6 text-slate-100">
              {bio.hobbies.join(", ")}
            </p>
          </div>

          <div className="border-t border-neutral-800 pt-6">
            <h2 className="text-xs font-semibold tracking-widest text-slate-400">
              ЗОРИЛГО
            </h2>
            <p className="mt-1 text-[15px] leading-6 text-slate-100">{bio.goal}</p>
          </div>
        </div>
      </section>
    </main>
  );
}

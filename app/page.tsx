import Link from "next/link";
import { revalidatePath } from "next/cache";
import { prisma } from "../lib/prisma";

export const dynamic = "force-dynamic";

async function createBook(formData: FormData) {
  "use server";
  await prisma.book.create({
    data: {
      title: String(formData.get("title")),
      author: String(formData.get("author")),
      year: Number(formData.get("year")),
      status: String(formData.get("status")),
    },
  });
  revalidatePath("/");
}

async function deleteBook(formData: FormData) {
  "use server";
  await prisma.book.delete({ where: { id: Number(formData.get("id")) } });
  revalidatePath("/");
}

export default async function Home() {
  const books = await prisma.book.findMany({ orderBy: { id: "desc" } });

  return (
    <main>
      <h1>Rak Buku</h1>
      <p className="sub">Catat buku yang sudah, sedang, atau akan kamu baca.</p>

      <form action={createBook} className="panel">
        <label>
          Judul
          <input name="title" required />
        </label>
        <div className="row">
          <label>
            Penulis
            <input name="author" required />
          </label>
          <label>
            Tahun terbit
            <input name="year" type="number" min="1000" max="2100" required />
          </label>
        </div>
        <label>
          Status
          <select name="status" defaultValue="Belum dibaca">
            <option>Belum dibaca</option>
            <option>Sedang dibaca</option>
            <option>Selesai</option>
          </select>
        </label>
        <div>
          <button type="submit">Tambah buku</button>
        </div>
      </form>

      {books.length === 0 ? (
        <div className="empty">Rak masih kosong. Tambahkan buku pertamamu di atas.</div>
      ) : (
        <ul>
          {books.map((b) => (
            <li key={b.id}>
              <div>
                <h3>{b.title}</h3>
                <p>
                  {b.author} · {b.year} · {b.status}
                </p>
              </div>
              <div className="actions">
                <Link className="btn ghost" href={`/books/${b.id}/edit`}>
                  Ubah
                </Link>
                <form action={deleteBook}>
                  <input type="hidden" name="id" value={b.id} />
                  <button className="danger" type="submit">
                    Hapus
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
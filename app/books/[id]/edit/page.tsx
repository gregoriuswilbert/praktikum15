import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "../../../../lib/prisma";

export const dynamic = "force-dynamic";

async function updateBook(formData: FormData) {
  "use server";
  await prisma.book.update({
    where: { id: Number(formData.get("id")) },
    data: {
      title: String(formData.get("title")),
      author: String(formData.get("author")),
      year: Number(formData.get("year")),
      status: String(formData.get("status")),
    },
  });
  revalidatePath("/");
  redirect("/");
}

export default async function EditBook({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await prisma.book.findUnique({ where: { id: Number(id) } });
  if (!book) notFound();

  return (
    <main>
      <h1>Ubah buku</h1>
      <p className="sub">Perbarui data buku, lalu simpan.</p>

      <form action={updateBook} className="panel">
        <input type="hidden" name="id" value={book.id} />
        <label>
          Judul
          <input name="title" defaultValue={book.title} required />
        </label>
        <div className="row">
          <label>
            Penulis
            <input name="author" defaultValue={book.author} required />
          </label>
          <label>
            Tahun terbit
            <input name="year" type="number" defaultValue={book.year} required />
          </label>
        </div>
        <label>
          Status
          <select name="status" defaultValue={book.status}>
            <option>Belum dibaca</option>
            <option>Sedang dibaca</option>
            <option>Selesai</option>
          </select>
        </label>
        <div className="actions">
          <button type="submit">Simpan perubahan</button>
          <Link className="btn ghost" href="/">
            Batal
          </Link>
        </div>
      </form>
    </main>
  );
}

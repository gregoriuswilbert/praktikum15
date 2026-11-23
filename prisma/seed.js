const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.book.createMany({
    data: [
      { title: "Laskar Pelangi", author: "Andrea Hirata", year: 2005, status: "Selesai" },
      { title: "Bumi Manusia", author: "Pramoedya Ananta Toer", year: 1980, status: "Sedang dibaca" },
      { title: "Cantik Itu Luka", author: "Eka Kurniawan", year: 2002, status: "Belum dibaca" },
    ],
  });
}

main().finally(() => prisma.$disconnect());
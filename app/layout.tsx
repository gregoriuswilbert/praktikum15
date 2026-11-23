import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rak Buku",
  description: "Catat buku yang kamu baca",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../../app/globals.css";
import type React from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "My Dev Library",
  description:
    "My Dev Library est une bibliothèque de ressources pour les développeurs. Elle permet de stocker et de partager des ressources utiles pour les développeurs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={poppins.className}>
      <body>{children}</body>
    </html>
  );
}

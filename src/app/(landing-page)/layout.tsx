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
  title: "Page d'Amour - Créez une page web romantique personnalisée",
  description:
    "Créez en 5 minutes une page web romantique unique avec vos photos, souvenirs et poèmes. Cadeau numérique personnalisé, hébergé à vie, sans abonnement.",
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

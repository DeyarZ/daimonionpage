import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import Header from "../components/Header";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Daimonion - Der KI-Coach für deine Disziplin | Keine Ausreden. Nur Fortschritt.",
  description: "Daimonion ist kein normaler Coach. Er ist dein Dämon. Der erste KI-Coach, der dich schleift - nicht streichelt. Für Fokus, Produktivität und Disziplin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${inter.className}`}>
        {/* Film grain overlay for cinematic effect */}
        <div className="film-grain" />
        
        {/* Dark header component */}
        <Header />
        
        {/* Main content */}
        {children}
        
        {/* VHS static lines effect */}
        <div className="vhs-static fixed inset-0 pointer-events-none z-50 opacity-10" />
      </body>
    </html>
  );
}

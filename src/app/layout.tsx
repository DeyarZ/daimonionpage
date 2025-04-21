import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import { LanguageProvider } from "../context/LanguageContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "Daimonion - Der KI-Coach für deine Disziplin | Keine Ausreden. Nur Fortschritt.",
  description: "Daimonion ist kein normaler Coach. Er ist dein Dämon. Der erste KI-Coach, der dich schleift - nicht streichelt. Für Fokus, Produktivität und Disziplin.",
  icons: {
    icon: "/images/daimonionlogoschwarz.png",
    apple: "/images/daimonionlogoschwarz.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${inter.variable} ${roboto_mono.variable} font-sans bg-black text-white antialiased selection:bg-red-900 selection:text-white`}>
        <LanguageProvider>
          {/* Film grain overlay for cinematic effect */}
          <div className="film-grain" />
          
          {/* Dark header component */}
          <Header />
          
          {/* Main content */}
          {children}
          
          {/* VHS static lines effect */}
          <div className="vhs-static fixed inset-0 pointer-events-none z-50 opacity-10" />
        </LanguageProvider>
      </body>
    </html>
  );
}

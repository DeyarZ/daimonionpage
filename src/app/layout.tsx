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
  title: "Daimonion - The AI Coach for Your Discipline | No Excuses. Only Progress.",
  description: "Daimonion is not a normal coach. It's your demon. The first AI coach that trains you hard - not coddles you. For focus, productivity, and discipline.",
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
    <html lang="en">
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

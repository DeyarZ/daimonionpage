"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Datenschutz() {
  return (
    <main className="min-h-screen pt-32 pb-16 container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-black/60 border border-neutral-800 rounded-lg p-8"
      >
        <h1 className="text-4xl font-bold mb-8 font-mono text-red-500 relative inline-block">
          Datenschutzerklärung
          <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-red-500/60"></span>
        </h1>

        <div className="prose prose-invert prose-red max-w-none">
          <div className="p-4 mb-8 border border-red-900/30 bg-red-900/10 rounded-md">
            <h2 className="text-2xl font-mono text-white mb-2">WICHTIGER HINWEIS</h2>
            <p className="text-white/90 font-medium">
              Daimonion speichert keine persönlichen Daten der Nutzer. Deine Privatsphäre ist uns wichtig – wir konzentrieren uns ausschließlich auf deine Leistung, nicht auf deine Daten.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-mono text-white/90 mb-4">1. Grundlegendes</h2>
            <p className="text-white/70">
              Diese Datenschutzerklärung informiert über Art, Umfang und Zweck der Erhebung und Verwendung von Daten der Besucher und Nutzer durch DAIMONION GmbH, Beispielstraße 123, 10115 Berlin, Deutschland.
            </p>
            <p className="text-white/70 mt-4">
              Der Schutz Ihrer Daten ist uns ein wichtiges Anliegen. DAIMONION erhebt und verarbeitet Ihre Daten ausschließlich im Rahmen der geltenden Datenschutzgesetze, insbesondere der Datenschutz-Grundverordnung (DSGVO).
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-mono text-white/90 mb-4">2. Datenerfassung auf unserer Website</h2>
            <h3 className="text-xl font-mono text-white/90 mt-6 mb-3">Server-Log-Dateien</h3>
            <p className="text-white/70">
              Der Hoster unserer Website erhebt und speichert automatisch Informationen in Server-Log-Dateien, die Ihr Browser automatisch übermittelt. Dies sind:
            </p>
            <ul className="list-disc pl-6 text-white/70 mt-2">
              <li>Browsertyp und -version</li>
              <li>Verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
            <p className="text-white/70 mt-4">
              Diese Daten werden nicht mit anderen Datenquellen zusammengeführt.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-mono text-white/90 mb-4">3. Keine Speicherung von Nutzerdaten</h2>
            <p className="text-white/70">
              Daimonion ist so konzipiert, dass keine persönlichen Nutzerdaten gespeichert werden. Wir sammeln, speichern und verarbeiten keine persönlichen Informationen über unsere Nutzer, die über die technisch notwendigen Zugriffsdaten hinausgehen.
            </p>
            <p className="text-white/70 mt-4">
              Daimonion verzichtet bewusst auf das Tracking von Nutzeraktivitäten, die Erstellung von Nutzerprofilen und die dauerhafte Speicherung personenbezogener Daten.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-mono text-white/90 mb-4">4. Ihre Rechte</h2>
            <p className="text-white/70">
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung oder Löschung dieser Daten. Da wir jedoch keine personenbezogenen Daten speichern, ist dieses Recht in Bezug auf unseren Dienst in der Regel nicht anwendbar.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-mono text-white/90 mb-4">5. Kontakt</h2>
            <p className="text-white/70">
              Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden:
            </p>
            <p className="text-white/70 mt-4">
              DAIMONION GmbH<br />
              Beispielstraße 123<br />
              10115 Berlin<br />
              Deutschland<br />
              E-Mail: datenschutz@daimonion.ai
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-mono text-white/90 mb-4">Eine Nachricht deines Daimonion</h2>
            <p className="text-white/70 italic">
              "Deine Daten gehören dir. Ich bin hier, um dich zu fordern, nicht um dich zu überwachen. Wahre Stärke entsteht aus innerem Antrieb, nicht aus äußerer Kontrolle. Nutze mich als Werkzeug deiner Disziplin, während du die volle Kontrolle über deine Privatsphäre behältst. So trainieren wir nicht nur deinen Körper und Geist, sondern auch deine digitale Autonomie."
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-neutral-800">
          <Link 
            href="/"
            className="text-red-500 hover:text-red-400 transition-colors inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Zurück zur Hauptseite
          </Link>
        </div>
      </motion.div>
    </main>
  );
} 
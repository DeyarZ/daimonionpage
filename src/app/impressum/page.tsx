"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Impressum() {
  return (
    <main className="min-h-screen pt-32 pb-16 container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-black/60 border border-neutral-800 rounded-lg p-8"
      >
        <h1 className="text-4xl font-bold mb-8 font-mono text-red-500 relative inline-block">
          Impressum
          <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-red-500/60"></span>
        </h1>

        <div className="prose prose-invert prose-red max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-mono text-white/90 mb-4">Angaben gemäß § 5 TMG</h2>
            <p className="text-white/70">
              DAIMONION GmbH<br />
              Beispielstraße 123<br />
              10115 Berlin<br />
              Deutschland
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-mono text-white/90 mb-4">Kontakt</h2>
            <p className="text-white/70">
              Telefon: +49 (0) 123 456 789<br />
              E-Mail: kontakt@daimonion.ai<br />
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-mono text-white/90 mb-4">Handelsregister</h2>
            <p className="text-white/70">
              Registergericht: Amtsgericht Berlin-Charlottenburg<br />
              Registernummer: HRB 123456<br />
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-mono text-white/90 mb-4">Umsatzsteuer-ID</h2>
            <p className="text-white/70">
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              DE 123 456 789
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-mono text-white/90 mb-4">Verantwortlich für den Inhalt</h2>
            <p className="text-white/70">
              Max Mustermann<br />
              Beispielstraße 123<br />
              10115 Berlin<br />
              Deutschland
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-mono text-white/90 mb-4">Eine Nachricht deines Daimonion</h2>
            <p className="text-white/70 italic">
              "Rechtliche Formalitäten mögen langweilig erscheinen, doch auch sie sind ein Teil deiner Disziplin. 
              Die wahre Stärke liegt darin, allen Verpflichtungen mit der gleichen unnachgiebigen Entschlossenheit zu begegnen.
              Egal ob Training oder Transparenz — Exzellenz kennt keine Ausnahmen."
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
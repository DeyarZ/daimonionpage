"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen pt-32 pb-16 container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-black/60 border border-neutral-800 rounded-lg p-8"
      >
        <h1 className="text-4xl font-bold mb-8 font-mono text-red-500 relative inline-block">
          Privacy Policy
          <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-red-500/60"></span>
        </h1>

        <div className="prose prose-invert prose-red max-w-none">
          <div className="p-4 mb-8 border border-red-900/30 bg-red-900/10 rounded-md">
            <h2 className="text-2xl font-mono text-white mb-2">IMPORTANT NOTICE</h2>
            <p className="text-white/90 font-medium">
              Daimonion does not store any personal user data. Your privacy is important to us – we focus exclusively on your performance, not your data.
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-mono text-white/90 mb-4">1. Basics</h2>
            <p className="text-white/70">
              This privacy policy informs about the nature, scope, and purpose of the collection and use of data from visitors and users by DAIMONION GmbH, Example Street 123, 10115 Berlin, Germany.
            </p>
            <p className="text-white/70 mt-4">
              The protection of your data is important to us. DAIMONION collects and processes your data exclusively within the framework of applicable data protection laws, in particular the General Data Protection Regulation (GDPR).
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-mono text-white/90 mb-4">2. Data Collection on Our Website</h2>
            <h3 className="text-xl font-mono text-white/90 mt-6 mb-3">Server Log Files</h3>
            <p className="text-white/70">
              The host of our website automatically collects and stores information in server log files that your browser automatically transmits. These are:
            </p>
            <ul className="list-disc pl-6 text-white/70 mt-2">
              <li>Browser type and version</li>
              <li>Operating system used</li>
              <li>Referrer URL</li>
              <li>Hostname of the accessing computer</li>
              <li>Time of the server request</li>
              <li>IP address</li>
            </ul>
            <p className="text-white/70 mt-4">
              This data is not merged with other data sources.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-mono text-white/90 mb-4">3. No Storage of User Data</h2>
            <p className="text-white/70">
              Daimonion is designed to not store any personal user data. We do not collect, store, or process any personal information about our users beyond the technically necessary access data.
            </p>
            <p className="text-white/70 mt-4">
              Daimonion deliberately refrains from tracking user activities, creating user profiles, and permanently storing personal data.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-mono text-white/90 mb-4">4. Your Rights</h2>
            <p className="text-white/70">
              You have the right to obtain free information about your stored personal data, its origin and recipients, and the purpose of data processing, as well as a right to correct or delete this data. However, since we do not store any personal data, this right is generally not applicable to our service.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-mono text-white/90 mb-4">5. Contact</h2>
            <p className="text-white/70">
              If you have questions about data protection, you can contact us at any time:
            </p>
            <p className="text-white/70 mt-4">
              DAIMONION GmbH<br />
              Example Street 123<br />
              10115 Berlin<br />
              Germany<br />
              Email: privacy@daimonion.ai
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-2xl font-mono text-white/90 mb-4">A Message from Your Daimonion</h2>
            <p className="text-white/70 italic">
              "Your data belongs to you. I'm here to challenge you, not to monitor you. True strength comes from inner drive, not external control. Use me as a tool for your discipline while maintaining full control over your privacy. This way, we train not just your body and mind, but also your digital autonomy."
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
            Back to Home
          </Link>
        </div>
      </motion.div>
    </main>
  );
} 
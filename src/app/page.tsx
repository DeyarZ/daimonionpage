export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-16 font-sans">
      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Daimonion
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Your brutal AI coach that holds you accountable. No excuses. No mercy.
        </p>
        <a
          href="#"
          className="inline-block bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition"
        >
          Get Early Access
        </a>
      </section>

      {/* Features */}
      <section className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto mb-28">
        {[
          {
            title: "Relentless Coaching",
            desc: "A voice in your pocket that screams when you slack. No soft talk, only truth.",
          },
          {
            title: "Push-Notifications from Hell",
            desc: "Your phone reminds you when you're wasting time – like a savage drill sergeant.",
          },
          {
            title: "Daily Systems",
            desc: "Track tasks, journal, build discipline. Built for those who want to dominate.",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="bg-zinc-900 p-6 rounded-2xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-gray-400 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 border-t border-gray-800 pt-6">
        © {new Date().getFullYear()} Daimonion – Built by Wizard Dynamics
      </footer>
    </main>
  );
}

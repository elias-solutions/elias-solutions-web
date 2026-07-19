import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-32 pb-24 sm:pt-40 sm:pb-32">
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 50%, #3b82f6 0%, transparent 60%), radial-gradient(circle at 70% 20%, #6366f1 0%, transparent 50%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300 ring-1 ring-inset ring-blue-500/20 mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
          IT Consulting &amp; Software Development
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
          Empowering Businesses
          <br />
          <span className="text-blue-400">Through Technology</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-300 leading-relaxed mb-10">
          Elias Solutions GmbH delivers tailored IT consulting and custom software development
          to help your business grow, innovate, and stay ahead in a digital world.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-blue-500 transition-colors"
          >
            Start a project
            <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <Link
            href="#services"
            className="inline-flex items-center justify-center rounded-lg bg-white/10 px-6 py-3 text-base font-semibold text-white ring-1 ring-inset ring-white/20 hover:bg-white/20 transition-colors"
          >
            Our services
          </Link>
        </div>
      </div>
    </section>
  );
}

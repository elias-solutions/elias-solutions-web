const stats = [
  { value: "10+", label: "Years of experience" },
  { value: "150+", label: "Projects delivered" },
  { value: "50+", label: "Happy clients" },
  { value: "20+", label: "Expert team members" },
];

const values = [
  {
    title: "Quality First",
    description:
      "We maintain the highest standards in every line of code, every system design, and every deliverable.",
  },
  {
    title: "Partnership",
    description:
      "We work as an extension of your team, fully invested in your success and long-term growth.",
  },
  {
    title: "Innovation",
    description:
      "We stay at the forefront of technology trends to deliver forward-thinking solutions.",
  },
  {
    title: "Transparency",
    description:
      "Clear communication and honest reporting throughout every stage of your project.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column – text */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-3">
              Who we are
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Your Trusted Technology Partner
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed mb-6">
              Elias Solutions GmbH is a Swiss-based IT consulting and software development
              company founded on the belief that technology should empower businesses, not
              complicate them.
            </p>
            <p className="text-slate-500 leading-relaxed mb-10">
              Our team of seasoned engineers, architects, and consultants brings deep
              expertise across industries—from finance and healthcare to retail and
              manufacturing. We combine strategic thinking with hands-on execution to deliver
              measurable outcomes.
            </p>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {values.map((v) => (
                <div key={v.title}>
                  <h4 className="font-semibold text-slate-900 mb-1 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-600 inline-block" />
                    {v.title}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right column – stats */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-white border border-slate-100 p-8 text-center shadow-sm"
              >
                <p className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</p>
                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PlacementSection() {
  const cards = [
    {
      number: "01",
      title: "Interview Preparation",
      description:
        "Practice real-world AI interview scenarios with structured feedback to improve clarity and confidence.",
    },
    {
      number: "02",
      title: "Resume & Portfolio Review",
      description:
        "Get feedback on your resume and portfolio to present your AI skills clearly and professionally to employers.",
    },
    {
      number: "03",
      title: "Job Opportunities & Referrals",
      description:
        "We connect learners with relevant AI job opportunities and referrals when available through our network.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-wide text-gray-500 uppercase bg-gray-100 px-3 py-1 rounded-full mb-4">
            Career Support
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-950 leading-[1.15] mt-3">
            Career Support for Your AI Journey
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500 leading-relaxed max-w-md mx-auto">
            We help you prepare for AI roles with structured guidance, real-world projects, and ongoing support — so you can move confidently toward opportunities.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {cards.map((card) => (
            <div
              key={card.number}
              className="h-full flex flex-col justify-between p-8 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <span className="text-xs font-medium text-gray-300 mb-4 block">
                  {card.number}
                </span>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Ethical disclaimer */}
        <p className="mt-10 text-center text-xs text-gray-400 leading-relaxed max-w-xl mx-auto">
          Outcomes depend on your effort, consistency, and experience — we're here to support you at every step.
        </p>

      </div>
    </section>
  );
}
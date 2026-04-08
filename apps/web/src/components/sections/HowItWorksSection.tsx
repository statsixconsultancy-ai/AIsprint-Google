export default function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Learn the Fundamentals",
      description:
        "Start with structured learning in machine learning and prompt engineering, guided by mentors who adapt to your pace.",
      detail: "Weeks 1–4",
    },
    {
      step: "02",
      title: "Build Real Projects",
      description:
        "Work on real-world AI projects with 1:1 mentorship and build a strong portfolio that showcases real, practical AI skills.",
      detail: "Weeks 5–10",
    },
    {
      step: "03",
      title: "Launch Your AI Career",
      description:
        "Get guidance on interviews, CV reviews, and referrals to AI roles with dedicated support.",
      detail: "Career Support",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-wide text-gray-500 uppercase bg-gray-100 px-3 py-1 rounded-full mb-4">
            The Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-950 leading-[1.15] mt-3">
            How You Become Job-Ready in AI
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500 leading-relaxed max-w-md mx-auto">
            A simple, structured path designed to take you from learning to real-world application and career readiness.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-10 md:mt-12">
          {steps.map((step) => (
            <div
              key={step.step}
              className="relative p-6 md:p-7 rounded-xl bg-gray-50 border border-gray-200/80 hover:shadow-md transition duration-200"
            >
              {/* Step number */}
              <span className="text-xs font-medium text-gray-300 mb-4 block">
                {step.step}
              </span>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {step.description}
              </p>

              {/* Detail tag */}
              <span className="inline-block mt-4 text-xs font-medium text-gray-500 bg-white border border-gray-200/80 px-2.5 py-1 rounded-full">
                {step.detail}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
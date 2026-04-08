import { Video, Globe, UploadCloud, Users } from "lucide-react";

export default function SolutionSection() {
  const pillars = [
    {
      number: "01",
      icon: <Video size={20} color="white" />,
      title: "1:1 Live Mentorship",
      description:
        "Every session is scheduled around you. Your mentor reviews your work and corrects your thinking in real time — not via recorded videos.",
      highlight: "Average session rating: 4.97 / 5",
    },
    {
      number: "02",
      icon: <Globe size={20} color="white" />,
      title: "Global Placement Support",
      description:
        "Mock interviews, CV reviews, and referrals to top AI companies and startups worldwide.",
      highlight: "94% placement within 6 months",
    },
    {
      number: "03",
      icon: <UploadCloud size={20} color="white" />,
      title: "Real Production Projects",
      description:
        "Build and deploy real-world AI projects to GitHub and your portfolio — the kind hiring managers actually look for.",
      highlight: "Average 4 projects per learner",
    },
    {
      number: "04",
      icon: <Users size={20} color="white" />,
      title: "Lifetime Access & Community",
      description:
        "Access updated curriculum, session recordings, and a strong alumni network — long after you graduate.",
      highlight: "2,400+ active alumni network",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* LEFT */}
          <div>
            <span className="inline-block text-xs font-semibold tracking-wide text-gray-500 uppercase bg-gray-100 px-3 py-1 rounded-full mb-5">
              Our Approach
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-950 leading-[1.15] mb-4 md:mb-5 max-w-md">
              A Better Way to Learn AI<br />
              and Launch Your Career.
            </h2>

            <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-sm">
              Most AI courses leave you stuck in theory with no real portfolio. AIsprint focuses on hands-on projects, 1:1 mentorship, and real career outcomes — not just course completion.
            </p>

            {/* STATS */}
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 max-w-sm">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-950 leading-tight">2,400+</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Learners Enrolled</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-950 leading-tight">94%</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Placement Rate</p>
              </div>
              <div className="col-span-2">
                <p className="text-2xl sm:text-3xl font-bold text-gray-950 leading-tight">4.9★</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Average Rating</p>
              </div>
            </div>
          </div>

          {/* RIGHT — Vertical Timeline */}
          <div className="relative flex flex-col">

            {/* Vertical line */}
            <div className="absolute left-[18px] top-4 bottom-4 w-px bg-gray-200" />

            <div className="space-y-6">
              {pillars.map((pillar) => (
                <div key={pillar.number} className="relative flex gap-5">

                  {/* Icon */}
                  <div className="flex-shrink-0 translate-y-1 z-10">
                    <div className="w-9 h-9 rounded-lg bg-gray-900 flex items-center justify-center shadow-sm">
                      {pillar.icon}
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 p-5 rounded-xl bg-gradient-to-b from-gray-50 to-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-medium text-gray-500">
                        {pillar.number}
                      </span>
                      <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                        {pillar.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-2">
                      {pillar.description}
                    </p>
                    <span className="text-xs font-medium text-gray-500">
                      {pillar.highlight}
                    </span>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
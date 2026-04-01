import { Video, Globe, UploadCloud, Users } from "lucide-react";

export default function SolutionSection() {
  const pillars = [
    {
      number: "01",
      icon: <Video size={24} color="white" />,
      title: "1:1 Live Mentorship",
      description:
        "Every session is scheduled around you. Your mentor reviews your code, corrects your thinking in real time.",
      highlight: "Average session rating: 4.97 / 5",
    },
    {
      number: "02",
      icon: <Globe size={24} color="white" />,
      title: "Global Placement Support",
      description:
        "Mock interviews, CV reviews, and referrals to top companies and startups globally.",
      highlight: "94% placement within 6 months",
    },
    {
      number: "03",
      icon: <UploadCloud size={24} color="white" />,
      title: "Real Production Projects",
      description:
        "Build and deploy real-world projects to GitHub and your portfolio.",
      highlight: "Average 4 projects per learner",
    },
    {
      number: "04",
      icon: <Users size={24} color="white" />,
      title: "Lifetime Access & Community",
      description:
        "Access recordings, updated curriculum, and a strong alumni network.",
      highlight: "2,400+ active alumni network",
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-14 lg:gap-16">
          
          {/* LEFT */}
          <div>
            <span className="badge bg-gray-100 text-gray-900 mb-4">
              Our Approach
            </span>

            <h2 className="section-heading mb-4 md:mb-6">
              The Future of AI Education
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6 md:mb-8 text-sm sm:text-base">
              AIsprint was built by engineers frustrated with traditional learning.
              We researched what actually helps learners land jobs.
            </p>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-6">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-neutral-950">
                  2,400+
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  Students Enrolled
                </p>
              </div>

              <div>
                <p className="text-2xl sm:text-3xl font-bold text-neutral-950">
                  94%
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  Placement Rate
                </p>
              </div>

              <div>
                <p className="text-2xl sm:text-3xl font-bold text-neutral-950">
                  4.9★
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  Average Rating
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="grid grid-cols-1 gap-4 sm:gap-5">
            {pillars.map((pillar) => (
              <div
                key={pillar.number}
                className="flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border border-gray-100 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
              >
                {/* ICON */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gray-900 flex items-center justify-center">
                    {pillar.icon}
                  </div>
                </div>

                {/* TEXT */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-gray-500">
                      {pillar.number}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-neutral-950">
                      {pillar.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-1.5">
                    {pillar.description}
                  </p>

                  <span className="text-xs font-semibold text-gray-600">
                    {pillar.highlight}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
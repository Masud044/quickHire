import { Link } from "react-router-dom";

export default function CTABanner() {
  return (
    <section
      className="relative overflow-hidden py-5 max-w-7xl mx-auto  "
      style={{ background: "linear-gradient(135deg, #3b4ce8 0%, #5b6ef5 100%)" }}
    >
      {/* Background depth circles */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)", transform: "translate(30%, -30%)" }}
      />
      <div
        className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)", transform: "translateY(40%)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

          {/* LEFT: Text + CTA */}
          <div className="text-center lg:text-left z-10 flex-shrink-0 max-w-xs">
            <h2
              className="font-bold text-white mb-3 leading-tight"
              style={{ fontSize: "2rem", fontFamily: "'Segoe UI', sans-serif" }}
            >
              Start posting<br />jobs today
            </h2>
            <p className="text-blue-200 text-sm mb-6">
              Start posting jobs for only $10.
            </p>
            <Link
              to="/admin/new"
              className="inline-block bg-white font-semibold px-6 py-3 rounded-lg text-sm transition-all hover:bg-blue-50 hover:shadow-lg"
              style={{ color: "#3b4ce8", border: "2px solid white" }}
            >
              Sign Up For Free
            </Link>
          </div>

          {/* RIGHT: Dashboard Mockup */}
          <div className="relative flex-1 flex justify-center lg:justify-end z-10 pb-6">
            <div
              className="relative rounded-2xl shadow-2xl overflow-visible"
              style={{
                background: "#f5f7ff",
                width: "420px",
                minHeight: "200px",
                padding: "16px",
              }}
            >
              {/* Top bar */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: "#3b4ce8" }} />
                  <span className="text-xs font-bold" style={{ color: "#3b4ce8" }}>QuickHire</span>
                  <span className="text-xs text-gray-400 ml-2">/ Postings</span>
                </div>
                <div
                  className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                  style={{ background: "#3b4ce8" }}
                >
                  + Post Job
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex gap-2 mb-3">
                <div className="flex-1 rounded-xl p-3 text-white" style={{ background: "#3b4ce8" }}>
                  <div className="text-xl font-bold">78</div>
                  <div className="text-xs opacity-80">Total Applicants</div>
                </div>
                <div className="flex-1 rounded-xl p-3 text-white" style={{ background: "#22c55e" }}>
                  <div className="text-xl font-bold">3</div>
                  <div className="text-xs opacity-80">Hired This Week</div>
                </div>
                <div className="flex-1 rounded-xl p-3" style={{ background: "#ffe8a3" }}>
                  <div className="text-xl font-bold" style={{ color: "#b45309" }}>24</div>
                  <div className="text-xs" style={{ color: "#b45309" }}>Shortlisted</div>
                </div>
              </div>

              {/* Chart + Side stats */}
              <div className="flex gap-3">
                <div className="flex-1 rounded-xl p-3" style={{ background: "white" }}>
                  <div className="text-xs font-semibold text-gray-500 mb-2">Applications/Week</div>
                  <div className="flex items-end gap-1 h-14">
                    {[40, 65, 50, 80, 55, 90, 70].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm"
                        style={{
                          height: `${h}%`,
                          background: i === 5 ? "#3b4ce8" : i % 2 === 0 ? "#c7d2fe" : "#e0e7ff",
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 justify-center">
                  <div className="rounded-xl p-2 text-center" style={{ background: "white", minWidth: "64px" }}>
                    <div className="text-lg font-bold" style={{ color: "#3b4ce8" }}>12</div>
                    <div className="text-xs text-gray-400">New Today</div>
                  </div>
                  <div className="rounded-xl p-2 text-center" style={{ background: "white", minWidth: "64px" }}>
                    <div className="text-lg font-bold" style={{ color: "#3b4ce8" }}>2,342</div>
                    <div className="text-xs text-gray-400">Views</div>
                  </div>
                  <div className="rounded-xl p-2 text-center" style={{ background: "white", minWidth: "64px" }}>
                    <div className="text-lg font-bold" style={{ color: "#3b4ce8" }}>67</div>
                    <div className="text-xs text-gray-400">Saved</div>
                  </div>
                </div>
              </div>

              {/* Floating Avatar */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  left: "20px",
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  border: "3px solid white",
                  overflow: "hidden",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
                  background: "#bfdbfe",
                }}
              >
                <svg viewBox="0 0 56 56" width="56" height="56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="28" cy="28" r="28" fill="#bfdbfe" />
                  <circle cx="28" cy="22" r="10" fill="#60a5fa" />
                  <ellipse cx="28" cy="48" rx="16" ry="10" fill="#60a5fa" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
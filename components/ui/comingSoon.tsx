"use client";

const ComingSoon = () => {
  return (
    <div>
      <div>
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="relative">
            {/* Animated background elements */}
            <div className="absolute -z-10 animate-float">
              <svg
                width="400"
                height="400"
                viewBox="0 0 100 100"
                className="opacity-20"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="30"
                  className="fill-purple-200 animate-pulse"
                />
                <path
                  d="M20,50 A30,30 0 0,1 80,50"
                  className="stroke-blue-200 stroke-2 fill-none animate-dash"
                />
              </svg>
            </div>
          </div>

          <div className="text-center space-y-8 max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 animate-fade-in">
              Coming Soon
            </h1>

            <p className="text-xl text-gray-600 animate-fade-in-delay">
              We&apos;re working hard to bring you something amazing. Stay
              tuned!
            </p>

            <div className="mt-12 animate-fade-in-delay-2">
              <form className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  aria-label="Email notification signup"
                  className="px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-auto"
                />
                <button
                  type="submit"
                  className="px-8 py-3 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-300 w-full sm:w-auto"
                >
                  Notify Me
                </button>
              </form>
            </div>
          </div>

          <style jsx>{`
            @keyframes float {
              0%,
              100% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-20px);
              }
            }
            @keyframes dash {
              to {
                stroke-dashoffset: 100;
              }
            }
            .animate-float {
              animation: float 6s ease-in-out infinite;
            }
            .animate-dash {
              stroke-dasharray: 50;
              animation: dash 2s linear infinite;
            }
            .animate-fade-in {
              animation: fadeIn 1s ease-out;
            }
            .animate-fade-in-delay {
              animation: fadeIn 1s ease-out 0.5s both;
            }
            .animate-fade-in-delay-2 {
              animation: fadeIn 1s ease-out 1s both;
            }
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;

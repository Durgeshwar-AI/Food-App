import React, { useState } from "react";
import { toast } from "react-toastify";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      toast.success("Thank you for subscribing! Check your email.");
      setEmail("");
      setLoading(false);
    }, 800);
  };

  return (
    <div className="w-full bg-[#fafafa] py-24 relative overflow-hidden px-[5vw]">
      <div className="max-w-[1640px] mx-auto relative z-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(234,88,12,0.2)]">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -mr-48 pointer-events-none mix-blend-overlay"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/20 rounded-full blur-3xl -ml-48 pointer-events-none mix-blend-overlay"></div>

        <div className="relative z-10 px-6 py-20 text-center flex flex-col items-center">
          <div className="max-w-3xl w-full">
            {/* Content */}
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight drop-shadow-md">
                Never Miss a Delicious Deal!
              </h2>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light">
                Get exclusive discounts, new restaurant launches, and special
                offers delivered to your inbox every week.
              </p>
            </div>

            {/* Newsletter Form */}
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <div className="flex-1 relative">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-8 py-5 rounded-2xl bg-black/20 border border-white/20 backdrop-blur-md focus:outline-none focus:border-white focus:bg-white/30 text-white placeholder-white/70 font-medium transition-all shadow-inner text-lg"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl opacity-70">
                  ✉️
                </span>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-white text-orange-600 font-bold px-12 py-5 rounded-2xl hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer transform hover:-translate-y-1 text-lg whitespace-nowrap"
              >
                {loading ? "Subscribing..." : "Subscribe Now"}
              </button>
            </form>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-white/90 text-sm font-medium">
              <div className="flex items-center gap-2">
                <span className="bg-white/20 rounded-full p-1 w-5 h-5 flex items-center justify-center text-xs">✓</span>
                <span>No spam, only deals</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-white/20 rounded-full p-1 w-5 h-5 flex items-center justify-center text-xs">✓</span>
                <span>Unsubscribe anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;

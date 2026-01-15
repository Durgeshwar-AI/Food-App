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
    <div className="w-full bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 py-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -ml-48"></div>

      <div className="max-w-[1640px] mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Content */}
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
              Never Miss a Deal
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Get exclusive discounts, new restaurant launches, and special
              offers delivered to your inbox every week.
            </p>
          </div>

          {/* Newsletter Form */}
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 mb-6"
          >
            <div className="flex-1 relative">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-white/50 text-gray-900 font-semibold transition-all"
              />
              <span className="text-gray-400 text-sm absolute right-4 top-1/2 -translate-y-1/2">
                ✉️
              </span>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-orange-600 font-black px-10 py-4 rounded-xl hover:shadow-2xl transition-all disabled:opacity-70 cursor-pointer transform hover:scale-105 text-lg"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>No spam, only deals</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Unsubscribe anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>100% privacy guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;

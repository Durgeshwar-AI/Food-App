import React, { useEffect, useRef, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ArrowRight,
  Sparkles,
  Globe,
  MessageCircle,
} from "lucide-react";

type FormStatus = "submitting" | "success" | null;

export default function Contact() {
  const formRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [formStatus, setFormStatus] = useState<FormStatus>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = () => {
    setFormStatus("submitting");
    setTimeout(() => {
      setFormStatus("success");
    }, 1500);
  };

  const contactMethods = [
    {
      icon: <Phone className="w-7 h-7" />,
      title: "Call Us",
      detail: "(555) 123-4567",
      subtitle: "Mon-Fri, 9AM-6PM",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: <Mail className="w-7 h-7" />,
      title: "Email Us",
      detail: "support@foodapp.com",
      subtitle: "We reply within 24h",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: <MessageCircle className="w-7 h-7" />,
      title: "Live Chat",
      detail: "Available Now",
      subtitle: "Get instant support",
      gradient: "from-pink-500 to-pink-600",
    },
    {
      icon: <Globe className="w-7 h-7" />,
      title: "Social Media",
      detail: "@foodapp",
      subtitle: "Follow for updates",
      gradient: "from-green-500 to-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-full h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div
          className="absolute w-96 h-96 bg-orange-400/5 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transform: `scale(${isHovering ? 1.3 : 1})`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div ref={heroRef} className="text-center mb-24">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full px-6 py-3 mb-8 border border-orange-400/50 shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-sm font-bold text-white uppercase tracking-widest">
              Get in Touch
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-orange-400 via-red-400 to-orange-500 bg-clip-text text-transparent leading-tight">
            Let's Connect
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-semibold">
            Ready to bring your culinary vision to life? We're here to help you
            build extraordinary food experiences.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br ${method.gradient} p-1 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-4 animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="bg-gray-900 rounded-2xl p-8 h-full flex flex-col group-hover:bg-opacity-50 transition-all backdrop-blur-sm">
                <div
                  className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${method.gradient} text-white mb-4 group-hover:scale-125 transition-transform duration-300 shadow-lg w-fit`}
                >
                  {method.icon}
                </div>

                <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-orange-300 transition-colors duration-300">
                  {method.title}
                </h3>
                <p className="text-gray-200 font-semibold mb-1 text-lg">
                  {method.detail}
                </p>
                <p className="text-gray-400 text-sm flex-grow">
                  {method.subtitle}
                </p>

                <ArrowRight className="w-5 h-5 text-orange-400 mt-6 group-hover:translate-x-2 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border-2 border-orange-500/30 shadow-2xl hover:border-orange-500/60 transition-all">
              {formStatus === "success" ? (
                <div className="text-center py-16">
                  <div className="mx-auto bg-gradient-to-r from-orange-500 to-red-500 rounded-full w-24 h-24 flex items-center justify-center mb-8 shadow-2xl animate-bounce">
                    <Send className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-4xl font-black mb-4 text-white">
                    Message Sent! 🎉
                  </h3>
                  <p className="text-gray-300 mb-8 text-lg">
                    Thank you for reaching out. Our culinary team will get back
                    to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setFormStatus(null)}
                    className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold hover:shadow-lg transition-all transform hover:scale-105"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-4xl font-black mb-2 text-white">
                      Send us a message
                    </h2>
                    <p className="text-gray-400 text-lg">
                      Fill out the form below and we'll get back to you as soon
                      as possible.
                    </p>
                  </div>

                  <div ref={formRef} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="group">
                        <label
                          className="block text-sm font-bold text-white mb-3 uppercase tracking-widest"
                          htmlFor="name"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          className="w-full px-6 py-4 bg-gray-700/50 border-2 border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 group-hover:border-orange-500/50"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div className="group">
                        <label
                          className="block text-sm font-bold text-white mb-3 uppercase tracking-widest"
                          htmlFor="email"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="w-full px-6 py-4 bg-gray-700/50 border-2 border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 group-hover:border-orange-500/50"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label
                        className="block text-sm font-bold text-white mb-3 uppercase tracking-widest"
                        htmlFor="subject"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        className="w-full px-6 py-4 bg-gray-700/50 border-2 border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 group-hover:border-orange-500/50"
                        placeholder="What's this about?"
                      />
                    </div>

                    <div className="group">
                      <label
                        className="block text-sm font-bold text-white mb-3 uppercase tracking-widest"
                        htmlFor="message"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        required
                        className="w-full px-6 py-4 bg-gray-700/50 border-2 border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 resize-none group-hover:border-orange-500/50"
                        placeholder="Tell us about your culinary project or question..."
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={formStatus === "submitting"}
                      className="group w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden shadow-lg text-lg"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {formStatus === "submitting" ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2 space-y-8">
            {/* Office Info */}
            <div
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border-2 border-orange-500/30 shadow-xl hover:border-orange-500/60 transition-all animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Our Kitchen</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-white font-bold uppercase text-sm tracking-widest mb-2">
                    Address
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    123 Food Street
                    <br />
                    Culinary City, FC 12345
                  </p>
                </div>

                <div>
                  <p className="text-white font-bold uppercase text-sm tracking-widest mb-2 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Kitchen Hours
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 4:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Map Placeholder */}
            <div
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border-2 border-orange-500/30 shadow-xl group hover:border-orange-500/60 transition-all animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Find Us</h3>
                <p className="text-gray-400 text-sm">
                  Click to view interactive map
                </p>
              </div>

              <div className="relative h-48 bg-gradient-to-br from-orange-500/20 to-red-500/10 flex items-center justify-center cursor-pointer group-hover:from-orange-500/30 group-hover:to-red-500/20 transition-all duration-500">
                <div className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full w-16 h-16 flex items-center justify-center group-hover:scale-125 transition-transform duration-300 shadow-lg">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-white font-bold">Interactive Map</p>
                  <p className="text-gray-400 text-sm mt-1">
                    Click to open in new tab
                  </p>
                </div>

                <div className="absolute inset-0 bg-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border-2 border-orange-500/30 text-center shadow-lg hover:border-orange-500/60 transition-all transform hover:scale-105 animate-fade-in"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="text-3xl font-black text-orange-400 mb-2">
                  24h
                </div>
                <div className="text-gray-300 text-sm font-bold uppercase tracking-widest">
                  Response Time
                </div>
              </div>
              <div
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border-2 border-orange-500/30 text-center shadow-lg hover:border-orange-500/60 transition-all transform hover:scale-105 animate-fade-in"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="text-3xl font-black text-orange-400 mb-2">
                  500+
                </div>
                <div className="text-gray-300 text-sm font-bold uppercase tracking-widest">
                  Happy Clients
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

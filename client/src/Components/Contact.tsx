import React, { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, ArrowRight, Sparkles, Globe, MessageCircle } from "lucide-react";

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

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      hoverBg: "group-hover:bg-orange-200"
    },
    {
      icon: <Mail className="w-7 h-7" />,
      title: "Email Us",
      detail: "support@foodapp.com",
      subtitle: "We reply within 24h",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      hoverBg: "group-hover:bg-orange-200"
    },
    {
      icon: <MessageCircle className="w-7 h-7" />,
      title: "Live Chat",
      detail: "Available Now",
      subtitle: "Get instant support",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      hoverBg: "group-hover:bg-orange-200"
    },
    {
      icon: <Globe className="w-7 h-7" />,
      title: "Social Media",
      detail: "@foodapp",
      subtitle: "Follow for updates",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      hoverBg: "group-hover:bg-orange-200"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-50 to-orange-100 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200/30 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div 
          className="absolute w-64 h-64 bg-orange-300/10 rounded-full blur-2xl transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 128,
            top: mousePosition.y - 128,
            transform: `scale(${isHovering ? 1.3 : 1})`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div ref={heroRef} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-orange-200 shadow-lg">
            <Sparkles className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-semibold text-orange-900">Get in Touch</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent leading-tight">
            Let's Connect
          </h1>
          
          <p className="text-xl text-orange-800 max-w-2xl mx-auto leading-relaxed font-medium">
            Ready to bring your culinary vision to life? We're here to help you build extraordinary food experiences.
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="group relative bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-orange-200 hover:border-orange-300 transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-xl"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className={`absolute inset-0 bg-orange-100 opacity-0 group-hover:opacity-30 rounded-2xl transition-opacity duration-500`} />
              
              <div className={`inline-flex p-3 rounded-xl ${method.bgColor} ${method.iconColor} mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                {method.icon}
              </div>
              
              <h3 className="text-lg font-bold mb-1 text-orange-900 group-hover:text-orange-800 transition-colors duration-300">
                {method.title}
              </h3>
              <p className="text-orange-800 font-semibold mb-1">{method.detail}</p>
              <p className="text-orange-700 text-sm">{method.subtitle}</p>
              
              <ArrowRight className="w-4 h-4 text-orange-600 mt-4 group-hover:translate-x-2 group-hover:text-orange-700 transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-orange-200 shadow-2xl">
              {formStatus === "success" ? (
                <div className="text-center py-12">
                  <div className="mx-auto bg-gradient-to-r from-orange-500 to-orange-600 rounded-full w-20 h-20 flex items-center justify-center mb-6 shadow-lg animate-bounce">
                    <Send className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-orange-900">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-orange-800 mb-8 text-lg">
                    Thank you for reaching out. Our culinary team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setFormStatus(null)}
                    className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-2 text-orange-900">
                      Send us a message
                    </h2>
                    <p className="text-orange-700">
                      Fill out the form below and we'll get back to you as soon as possible.
                    </p>
                  </div>

                  <div ref={formRef} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="group">
                        <label className="block text-sm font-semibold text-orange-900 mb-2" htmlFor="name">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          className="w-full px-4 py-4 bg-white/80 border border-orange-200 rounded-xl text-orange-900 placeholder-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 group-hover:border-orange-300 shadow-sm"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div className="group">
                        <label className="block text-sm font-semibold text-orange-900 mb-2" htmlFor="email">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="w-full px-4 py-4 bg-white/80 border border-orange-200 rounded-xl text-orange-900 placeholder-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 group-hover:border-orange-300 shadow-sm"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-orange-900 mb-2" htmlFor="subject">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        className="w-full px-4 py-4 bg-white/80 border border-orange-200 rounded-xl text-orange-900 placeholder-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 group-hover:border-orange-300 shadow-sm"
                        placeholder="What's this about?"
                      />
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-orange-900 mb-2" htmlFor="message">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        required
                        className="w-full px-4 py-4 bg-white/80 border border-orange-200 rounded-xl text-orange-900 placeholder-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 resize-none group-hover:border-orange-300 shadow-sm"
                        placeholder="Tell us about your culinary project or question..."
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={formStatus === "submitting"}
                      className="group w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden shadow-lg"
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
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-orange-200 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-100 rounded-xl shadow-md">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-orange-900">Our Kitchen</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-orange-900 font-semibold">Address</p>
                  <p className="text-orange-700">123 Food Street<br />Culinary City, FC 12345</p>
                </div>
                
                <div>
                  <p className="text-orange-900 font-semibold flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Kitchen Hours
                  </p>
                  <p className="text-orange-700">Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM<br />Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Interactive Map Placeholder */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden border border-orange-200 shadow-xl group">
              <div className="p-6">
                <h3 className="text-lg font-bold text-orange-900 mb-2">Find Us</h3>
                <p className="text-orange-700 text-sm">Click to view interactive map</p>
              </div>
              
              <div className="relative h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center cursor-pointer group-hover:from-orange-200 group-hover:to-orange-300 transition-all duration-500">
                <div className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-orange-900 font-semibold">Interactive Map</p>
                  <p className="text-orange-700 text-sm mt-1">Click to open in new tab</p>
                </div>
                
                <div className="absolute inset-0 bg-orange-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-orange-200 text-center shadow-lg">
                <div className="text-2xl font-bold text-orange-900 mb-1">24h</div>
                <div className="text-orange-700 text-sm font-medium">Response Time</div>
              </div>
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-orange-200 text-center shadow-lg">
                <div className="text-2xl font-bold text-orange-900 mb-1">500+</div>
                <div className="text-orange-700 text-sm font-medium">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
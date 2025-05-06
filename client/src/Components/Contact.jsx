import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export default function Contact() {
  const formRef = useRef(null);
  const headingRef = useRef(null);
  const [formStatus, setFormStatus] = useState(null);

  useEffect(() => {
    gsap.from(headingRef.current, {
      y: -50,
      display: "none",
      ease: "power3.out",
    });
    gsap.to(headingRef.current, {
      y: 0,
      display: "block",
      duration: 1,
    });

    const infoCards = gsap.utils.toArray(".info-card");
    gsap.from(
      infoCards,
      {
        x: -50,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.4"
    );
    gsap.to(
      infoCards,
      {
        x: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
      },
    );

    gsap.from(".form-element", {
      y: 30,
      stagger: 0.15,
      duration: 1,
      ease: "back.out(1.2)",
    });
    gsap.to(".form-element", {
      y: 0,
      stagger: 0.15,
      duration: 1,
      ease: "back.out(1.2)",
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => {
      setFormStatus("success");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-orange-900 mb-2">
            Contact Us
          </h1>
          <p className="text-lg text-orange-800">
            We'd love to hear from you! Reach out to our team.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Section */}
          <div className="lg:col-span-1 space-y-6">
            {[
              {
                icon: <Phone className="w-6 h-6 text-orange-600" />,
                title: "Phone",
                detail: "(555) 123-4567",
              },
              {
                icon: <Mail className="w-6 h-6 text-orange-600" />,
                title: "Email",
                detail: "support@foodapp.com",
              },
              {
                icon: <MapPin className="w-6 h-6 text-orange-600" />,
                title: "Address",
                detail: "123 Food Street, Culinary City, FC 12345",
              },
              {
                icon: <Clock className="w-6 h-6 text-orange-600" />,
                title: "Hours",
                detail: "Mon-Fri: 9AM-6PM\nSat-Sun: 10AM-4PM",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="info-card bg-white p-6 rounded-xl shadow-md flex items-start space-x-4 transition-all hover:shadow-lg"
              >
                <div className="bg-orange-100 p-3 rounded-full">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  {item.detail.split("\n").map((line, idx) => (
                    <p key={idx} className="text-gray-700 mt-1">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {formStatus === "success" ? (
                <div className="text-center py-8">
                  <div className="mx-auto bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <Send className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600">
                    Thank you for reaching out. We'll get back to you shortly.
                  </p>
                  <button
                    onClick={() => setFormStatus(null)}
                    className="mt-6 px-6 py-2 bg-orange-600 text-white rounded-full font-medium hover:bg-orange-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="form-element">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="form-element grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="form-element">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="How can we help you?"
                      required
                    />
                  </div>

                  <div className="form-element">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Tell us more about your inquiry..."
                      required
                    ></textarea>
                  </div>

                  <div className="form-element flex items-center">
                    <input
                      type="checkbox"
                      id="newsletter"
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="newsletter"
                      className="ml-2 text-sm text-gray-700"
                    >
                      Subscribe to our newsletter for food updates and special
                      offers
                    </label>
                  </div>

                  <div className="form-element">
                    <button
                      type="submit"
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                      disabled={formStatus === "submitting"}
                    >
                      {formStatus === "submitting" ? (
                        <>
                          <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                          Sending...
                        </>
                      ) : (
                        <>Send Message</>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 form-element">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4">
              <h3 className="font-medium text-lg text-gray-800 mb-2">
                Find Us
              </h3>
              <p className="text-gray-600">
                Visit our main office at the address below
              </p>
            </div>
            <div className="bg-gray-200 h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-orange-500 mx-auto mb-2" />
                <p className="text-gray-700">Interactive Map Placeholder</p>
                <p className="text-gray-500 text-sm">
                  (In a real app, this would be a Google or Mapbox map)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

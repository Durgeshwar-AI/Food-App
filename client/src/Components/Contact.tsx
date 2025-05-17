import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

type FormStatus = "submitting" | "success" | null;

export default function Contact() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const [formStatus, setFormStatus] = useState<FormStatus>(null);

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { y: -50, display: "none" },
        { y: 0, display: "block", duration: 1, ease: "power3.out" }
      );
    }

    const infoCards = gsap.utils.toArray<HTMLElement>(".info-card");
    gsap.fromTo(
      infoCards,
      { x: -50 },
      {
        x: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
      }
    );

    gsap.fromTo(
      ".form-element",
      { y: 30 },
      {
        y: 0,
        stagger: 0.15,
        duration: 1,
        ease: "back.out(1.2)",
      }
    );
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => {
      setFormStatus("success");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-12 px-4 sm:px-6 lg:px-8 cursor-default">
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
          {/* Contact Info */}
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

          {/* Form Section */}
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
                      className="block text-sm font-medium text-gray-700 mb-1"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>

                  <div className="form-element">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>

                  <div className="form-element">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      htmlFor="subject"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>

                  <div className="form-element">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      htmlFor="message"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>

                  <div className="form-element">
                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="w-full px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition duration-300"
                    >
                      {formStatus === "submitting"
                        ? "Sending..."
                        : "Send Message"}
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

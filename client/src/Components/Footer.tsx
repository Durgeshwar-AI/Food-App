import React, { useState, useEffect } from "react";
import { Phone, Globe, Mail, MapPin, ArrowRight, Heart, CreditCard, Smartphone } from "lucide-react";

const Footer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const socialMediaLinks = [
    {
      name: "Facebook",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-6 h-6">
          <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z" />
          <path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z" />
        </svg>
      ),
      hoverColor: "hover:bg-blue-600"
    },
    {
      name: "Twitter",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 509.64" className="w-6 h-6">
          <rect width="512" height="509.64" rx="115.61" ry="115.61" fill="#000" />
          <path fill="#fff" d="M323.74 148.35h36.12l-78.91 90.2 92.83 122.73h-72.69l-56.93-74.43-65.15 74.43h-36.14l84.4-96.47-89.05-116.46h74.53l51.46 68.04 59.53-68.04z" />
        </svg>
      ),
      hoverColor: "hover:bg-gray-900"
    },
    {
      name: "Instagram",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-6 h-6">
          <defs>
            <radialGradient id="igGradient" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#fd5" />
              <stop offset=".328" stopColor="#ff543f" />
              <stop offset=".348" stopColor="#fc5245" />
              <stop offset=".504" stopColor="#e64771" />
              <stop offset=".643" stopColor="#d53e91" />
              <stop offset=".761" stopColor="#cc39a4" />
              <stop offset=".841" stopColor="#c837ab" />
            </radialGradient>
          </defs>
          <path fill="url(#igGradient)" d="M34.017,41.99l-20,.019c-4.4,.004-8.003-3.592-8.008-7.992l-.019-20c-.004-4.4,3.592-8.003,7.992-8.008l20-.019c4.4-.004,8.003,3.592,8.008,7.992l.019,20C42.014,38.383,38.417,41.986,34.017,41.99z" />
          <path fill="#fff" d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5 s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z" />
          <circle cx="31.5" cy="16.5" r="1.5" fill="#fff" />
          <path fill="#fff" d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z" />
        </svg>
      ),
      hoverColor: "hover:bg-pink-600"
    },
    {
      name: "YouTube",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-6 h-6">
          <path fill="#FF3D00" d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z" />
          <path fill="#FFF" d="M20 31L20 17 32 24z" />
        </svg>
      ),
      hoverColor: "hover:bg-red-600"
    }
  ];

  const usefulLinks = [
    { name: "About Us", path: "/about" },
    { name: "Our Chefs", path: "/chefs" },
    { name: "Testimonials", path: "#" },
    { name: "FAQs", path: "#" },
    { name: "Privacy Policy", path: "/privacy" }
  ];

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      content: ["+44 (0) 9865 124 765", "+44 (0) 0941 432 543"]
    },
    {
      icon: <Globe className="w-5 h-5" />,
      content: ["www.yourdomain.com"]
    },
    {
      icon: <Mail className="w-5 h-5" />,
      content: ["info@yourdomain.com"]
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      content: ["11 Beaufort Court, Canary Wharf, UK ET0BAL"]
    }
  ];

  const paymentMethods = [
    { name: "PayPal", icon: <CreditCard className="w-5 h-5" /> },
    { name: "VISA", icon: <CreditCard className="w-5 h-5" /> },
    { name: "Mastercard", icon: <CreditCard className="w-5 h-5" /> },
    { name: "Apple Pay", icon: <Smartphone className="w-5 h-5" /> }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-orange-50 to-orange-100 overflow-hidden cursor-default">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-200/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-300/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div 
          className="absolute w-48 h-48 bg-orange-300/10 rounded-full blur-2xl transition-all duration-1000 ease-out pointer-events-none"
          style={{
            left: mousePosition.x - 96,
            top: mousePosition.y - 96,
            transform: `scale(0.8)`,
          }}
        />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 bg-white/60 backdrop-blur-md border-t border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Food Zone Section */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-orange-900 mb-4 bg-gradient-to-r from-orange-800 to-orange-600 bg-clip-text text-transparent">
                  Food Zone
                </h3>
                <p className="text-orange-800 leading-relaxed">
                  Crafting extraordinary culinary experiences with passion, innovation, and the finest ingredients. Join us on a journey of flavor discovery.
                </p>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="font-semibold text-orange-900 mb-4">Follow Our Journey</h4>
                <div className="flex space-x-3">
                  {socialMediaLinks.map((social, index) => (
                    <div
                      key={index}
                      className={`group relative p-3 bg-orange-100 rounded-xl cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.hoverColor} hover:bg-orange-500`}
                      onMouseEnter={() => setHoveredSocial(index)}
                      onMouseLeave={() => setHoveredSocial(null)}
                    >
                      <div className="text-orange-600 group-hover:text-white transition-colors duration-300">
                        {social.icon}
                      </div>
                      
                      {/* Tooltip */}
                      {hoveredSocial === index && (
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap z-20">
                          {social.name}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Useful Links Section */}
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-bold text-orange-900 mb-4">Useful Links</h4>
                <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mb-6"></div>
              </div>
              
              <ul className="space-y-3">
                {usefulLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.path}
                      className="group flex items-center text-orange-800 hover:text-orange-600 transition-all duration-300 hover:translate-x-2"
                    >
                      <ArrowRight className="w-4 h-4 mr-3 text-orange-500 group-hover:text-orange-600 transition-colors duration-300" />
                      <span className="font-medium">{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us Section */}
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-bold text-orange-900 mb-4">Contact Us</h4>
                <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mb-6"></div>
              </div>
              
              <div className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="group flex items-start space-x-3 p-3 rounded-lg hover:bg-orange-50 transition-all duration-300">
                    <div className="p-2 bg-orange-100 rounded-lg text-orange-600 group-hover:bg-orange-200 transition-colors duration-300">
                      {contact.icon}
                    </div>
                    <div className="flex-1">
                      {contact.content.map((item, idx) => (
                        <p key={idx} className="text-orange-800 font-medium">
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-bold text-orange-900 mb-4">Stay Updated</h4>
                <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mb-6"></div>
              </div>
              
              <div>
                <p className="text-orange-800 mb-4">Subscribe to get special offers, free giveaways, and exclusive deals.</p>
                
                <div className="flex flex-col space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-3 bg-white/80 border border-orange-200 rounded-lg text-orange-900 placeholder-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                  />
                  <button className="group px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                    <span className="flex items-center justify-center gap-2">
                      Subscribe
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-xl font-bold text-orange-900">500+</div>
                  <div className="text-xs text-orange-700">Happy Customers</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-xl font-bold text-orange-900">50+</div>
                  <div className="text-xs text-orange-700">Delicious Recipes</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-orange-200 bg-white/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              
              {/* Copyright */}
              <div className="flex items-center space-x-2 text-orange-800">
                <span>©2025, All rights reserved by</span>
                <span className="font-bold text-orange-900">Food Zone</span>
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              </div>

              {/* Payment Methods */}
              <div className="flex items-center space-x-4">
                <span className="text-orange-800 font-medium">We Accept:</span>
                <div className="flex space-x-2">
                  {paymentMethods.map((method, index) => (
                    <div
                      key={index}
                      className="group flex items-center space-x-1 px-3 py-2 bg-orange-100 rounded-lg hover:bg-orange-200 transition-all duration-300 cursor-pointer"
                    >
                      <div className="text-orange-600 group-hover:text-orange-700">
                        {method.icon}
                      </div>
                      <span className="text-xs font-semibold text-orange-800 group-hover:text-orange-900">
                        {method.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
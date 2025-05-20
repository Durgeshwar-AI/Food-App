import React from "react";
import { Link } from "react-router-dom";

// Food Zone Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-800 py-12 px-4 sm:px-6 lg:px-8 rounded-lg text-gray-300 font-sans cursor-default" id="footer">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Food Zone Section */}
        <div className="col-span-1">
          <h3 className="text-2xl font-bold text-white mb-4">Food Zone</h3>
          <p className="text-sm mb-6">
            Duis aute irure dolor in reprehenderit involk up tate velit esse
            cillum dolore euint fugiat null pariatursint occaecat sunt .
          </p>
          <div className="flex space-x-4">
            {/* Facebook */}
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="w-5 h-5"
              >
                <path
                  fill="#039be5"
                  d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
                />
                <path
                  fill="#fff"
                  d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
                />
              </svg>
            </div>

            {/* X (Twitter) */}
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 509.64"
                className="w-5 h-5"
              >
                <rect width="512" height="509.64" rx="115.61" ry="115.61" />
                <path
                  fill="#fff"
                  d="M323.74 148.35h36.12l-78.91 90.2 92.83 122.73h-72.69l-56.93-74.43-65.15 74.43h-36.14l84.4-96.47-89.05-116.46h74.53l51.46 68.04 59.53-68.04z"
                />
              </svg>
            </div>

            {/* Instagram */}
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="w-5 h-5"
              >
                <defs>
                  <radialGradient
                    id="igGradient"
                    cx="19.38"
                    cy="42.035"
                    r="44.899"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#fd5" />
                    <stop offset=".328" stopColor="#ff543f" />
                    <stop offset=".348" stopColor="#fc5245" />
                    <stop offset=".504" stopColor="#e64771" />
                    <stop offset=".643" stopColor="#d53e91" />
                    <stop offset=".761" stopColor="#cc39a4" />
                    <stop offset=".841" stopColor="#c837ab" />
                  </radialGradient>
                </defs>
                <path
                  fill="url(#igGradient)"
                  d="M34.017,41.99l-20,.019c-4.4,.004-8.003-3.592-8.008-7.992l-.019-20c-.004-4.4,3.592-8.003,7.992-8.008l20-.019c4.4-.004,8.003,3.592,8.008,7.992l.019,20C42.014,38.383,38.417,41.986,34.017,41.99z"
                />
                <path
                  fill="#fff"
                  d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5 s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
                />
                <circle cx="31.5" cy="16.5" r="1.5" fill="#fff" />
                <path
                  fill="#fff"
                  d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
                />
              </svg>
            </div>

            {/* YouTube */}
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="w-5 h-5"
              >
                <path
                  fill="#FF3D00"
                  d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"
                />
                <path fill="#FFF" d="M20 31L20 17 32 24z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Our Menus Section */}
        <div className="col-span-1">
          <h4 className="text-lg font-semibold text-white mb-4">Our Menus</h4>
          <div className="h-1 w-12 bg-orange-500 mb-4"></div>
          <ul className="space-y-2 text-sm">
            <li className="cursor-pointer">→ Chicken Burger</li>
            <li className="cursor-pointer">→ Beef Pizza</li>
            <li className="cursor-pointer">→ Fresh Vegetable</li>
            <li className="cursor-pointer">→ Sea Foods</li>
            <li className="cursor-pointer">→ Desserts</li>
            <li className="cursor-pointer">→ Cold Drinks</li>
            <li className="cursor-pointer">→ Discount</li>
          </ul>
        </div>

        {/* Useful Links Section */}
        <div className="col-span-1">
          <h4 className="text-lg font-semibold text-white mb-4">
            Useful Links
          </h4>
          <div className="h-1 w-12 bg-orange-500 mb-4"></div>
          <ul className="space-y-2 text-sm">
            <li className="cursor-pointer"><Link to="/about">→ About Us</Link></li>
            <li className="cursor-pointer"><Link to="/chefs">→ Our Chefs</Link></li>
            <li className="cursor-pointer">→ Testimonials</li>
            <li className="cursor-pointer">→ Blogs</li>
            <li className="cursor-pointer">→ FAQS</li>
            <li className="cursor-pointer">→ Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className="col-span-1">
          <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
          <div className="h-1 w-12 bg-orange-500 mb-4"></div>
          <div className="space-y-3 text-sm">
            <div className="flex items-start">
              {/* Placeholder icon */}
              <span className="mr-2 text-orange-500">📞</span>
              <span>
                +44 ( 0 ) 9865 124 765
                <br />
                +44 ( 0 ) 0941 432 543
              </span>
            </div>
            <div className="flex items-start">
              {/* Placeholder icon */}
              <span className="mr-2 text-orange-500">🌐</span>
              <span>www.yourdomain.com</span>
            </div>
            <div className="flex items-start">
              {/* Placeholder icon */}
              <span className="mr-2 text-orange-500">📧</span>
              <span>info@yourdomain.com</span>
            </div>
            <div className="flex items-start">
              {/* Placeholder icon */}
              <span className="mr-2 text-orange-500">📍</span>
              <span>11 Beaufort Court.Cana Wharf . Uk EtOBAL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="mt-12 pt-8 border-t border-gray-700 text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          ©2025 , All rights reserved by{" "}
          <span className="font-semibold text-white">Food Zone</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Accept For:</span>
          {/* Payment Icons - Using placeholder text */}
          <span className="font-semibold text-white">Paypal</span>
          <span className="font-semibold text-white">VISA</span>
          <span className="font-semibold text-white">DISCOVER</span>
          {/* Assuming 'E' is a placeholder for a card type */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

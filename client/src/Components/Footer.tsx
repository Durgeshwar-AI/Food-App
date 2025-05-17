import React from 'react';

// Food Zone Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-800 py-12 px-4 sm:px-6 lg:px-8 rounded-lg text-gray-300 font-sans cursor-default">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Food Zone Section */}
        <div className="col-span-1">
          <h3 className="text-2xl font-bold text-white mb-4">Food Zone</h3>
          <p className="text-sm mb-6">Duis aute irure dolor in reprehenderit involk up tate velit esse cillum dolore euint fugiat null pariatursint occaecat sunt .</p>
          <div className="flex space-x-4">
            {/* Social Icons - Using placeholder circles */}
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">f</div>
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">t</div>
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">in</div>
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">p</div>
          </div>
        </div>

        {/* Our Menus Section */}
        <div className="col-span-1">
          <h4 className="text-lg font-semibold text-white mb-4">Our Menus</h4>
          <div className="h-1 w-12 bg-orange-500 mb-4"></div>
          <ul className="space-y-2 text-sm">
            <li>→ Chicken Burger</li>
            <li>→ Beef Pizza</li>
            <li>→ Fresh Vegetable</li>
            <li>→ Sea Foods</li>
            <li>→ Desserts</li>
            <li>→ Cold Drinks</li>
            <li>→ Discount</li>
          </ul>
        </div>

        {/* Useful Links Section */}
        <div className="col-span-1">
          <h4 className="text-lg font-semibold text-white mb-4">Useful Links</h4>
          <div className="h-1 w-12 bg-orange-500 mb-4"></div>
          <ul className="space-y-2 text-sm">
            <li>→ About Us</li>
            <li>→ Our Chefs</li>
            <li>→ Testimonials</li>
            <li>→ Blogs</li>
            <li>→ FAQS</li>
            <li>→ Privacy Policy</li>
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
              <span>+44 ( 0 ) 9865 124 765<br/>+44 ( 0 ) 0941 432 543</span>
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
          ©2025 , All rights reserved by <span className="font-semibold text-white">Food Zone</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Accept For:</span>
          {/* Payment Icons - Using placeholder text */}
          <span className="font-semibold text-white">Paypal</span>
          <span className="font-semibold text-white">VISA</span>
          <span className="font-semibold text-white">DISCOVER</span>
          <span className="font-semibold text-white">E</span> {/* Assuming 'E' is a placeholder for a card type */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

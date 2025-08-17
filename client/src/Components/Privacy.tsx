import Footer from "./Footer";
import Navbar from "./Navbar";
import { Shield, User, Lock, Users, AlertTriangle, Mail } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-16 mt-16 text-gray-800">
        {/* Heading */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
            Privacy Policy
          </h1>
          <p className="text-gray-500">Last updated: May 27, 2025</p>
        </header>

        {/* Sections */}
        <div className="space-y-10">
          {/* 1. Introduction */}
          <section className="p-6 rounded-2xl shadow-md bg-white border border-gray-100">
            <h2 className="flex items-center text-2xl font-semibold mb-3">
              <Shield className="w-6 h-6 mr-2 text-blue-600" />
              1. Introduction
            </h2>
            <p>
              Welcome to our food app. Your privacy is important to us. This
              policy explains how we collect, use, and protect your personal
              information.
            </p>
          </section>

          {/* 2. Info We Collect */}
          <section className="p-6 rounded-2xl shadow-md bg-white border border-gray-100">
            <h2 className="flex items-center text-2xl font-semibold mb-3">
              <User className="w-6 h-6 mr-2 text-blue-600" />
              2. Information We Collect
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Name, email, and contact information</li>
              <li>Delivery addresses</li>
              <li>Order history and preferences</li>
              <li>
                Payment details{" "}
                <span className="text-gray-500">
                  (processed securely via third-party services)
                </span>
              </li>
              <li>Device and usage data (for improving user experience)</li>
            </ul>
          </section>

          {/* 3. Use of Info */}
          <section className="p-6 rounded-2xl shadow-md bg-white border border-gray-100">
            <h2 className="flex items-center text-2xl font-semibold mb-3">
              <Users className="w-6 h-6 mr-2 text-blue-600" />
              3. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>To deliver your orders</li>
              <li>To personalize your app experience</li>
              <li>To send order updates, offers, and support messages</li>
              <li>To analyze usage and improve our services</li>
            </ul>
          </section>

          {/* 4. Sharing */}
          <section className="p-6 rounded-2xl shadow-md bg-white border border-gray-100">
            <h2 className="flex items-center text-2xl font-semibold mb-3">
              <Users className="w-6 h-6 mr-2 text-blue-600" />
              4. Data Sharing & Third Parties
            </h2>
            <p className="mb-2">
              We do not sell your personal data. We may share data with:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Delivery partners for order fulfillment</li>
              <li>Payment gateways for secure transactions</li>
              <li>Analytics providers (e.g., Google Analytics)</li>
            </ul>
          </section>

          {/* 5. Security */}
          <section className="p-6 rounded-2xl shadow-md bg-white border border-gray-100">
            <h2 className="flex items-center text-2xl font-semibold mb-3">
              <Lock className="w-6 h-6 mr-2 text-blue-600" />
              5. Data Security
            </h2>
            <p>
              We use encryption and access controls to protect your data.
              However, no system is 100% secure, and we encourage safe
              practices.
            </p>
          </section>

          {/* 6. Rights */}
          <section className="p-6 rounded-2xl shadow-md bg-white border border-gray-100">
            <h2 className="flex items-center text-2xl font-semibold mb-3">
              <Shield className="w-6 h-6 mr-2 text-blue-600" />
              6. Your Rights
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Access your data</li>
              <li>Request corrections or deletions</li>
              <li>Opt out of promotional emails</li>
            </ul>
          </section>

          {/* 7. Children */}
          <section className="p-6 rounded-2xl shadow-md bg-white border border-gray-100">
            <h2 className="flex items-center text-2xl font-semibold mb-3">
              <AlertTriangle className="w-6 h-6 mr-2 text-blue-600" />
              7. Children&apos;s Privacy
            </h2>
            <p>
              Our service is not directed to children under 13. We do not
              knowingly collect personal data from children.
            </p>
          </section>

          {/* 8. Changes */}
          <section className="p-6 rounded-2xl shadow-md bg-white border border-gray-100">
            <h2 className="flex items-center text-2xl font-semibold mb-3">
              <Shield className="w-6 h-6 mr-2 text-blue-600" />
              8. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Updates will
              be posted here with a new effective date.
            </p>
          </section>

          {/* 9. Contact */}
          <section className="p-6 rounded-2xl shadow-md bg-white border border-gray-100">
            <h2 className="flex items-center text-2xl font-semibold mb-3">
              <Mail className="w-6 h-6 mr-2 text-blue-600" />
              9. Contact Us
            </h2>
            <p>
              If you have questions, contact us at{" "}
              <a
                href="mailto:support@foodapp.com"
                className="text-blue-600 underline"
              >
                support@foodapp.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

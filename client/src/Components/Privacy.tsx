import Footer from "./Footer";
import Navbar from "./Navbar";

export default function PrivacyPolicy() {
  return (
    <>
    <Navbar/>
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        Last updated: May 27, 2025
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
        <p>
          Welcome to our food app. Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">2. Information We Collect</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Name, email, and contact information</li>
          <li>Delivery addresses</li>
          <li>Order history and preferences</li>
          <li>Payment details (processed securely via third-party services)</li>
          <li>Device and usage data (for improving user experience)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">3. How We Use Your Information</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>To deliver your orders</li>
          <li>To personalize your app experience</li>
          <li>To send order updates, offers, and support messages</li>
          <li>To analyze usage and improve our services</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">4. Data Sharing & Third Parties</h2>
        <p>
          We do not sell your personal data. We may share data with:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Delivery partners for order fulfillment</li>
          <li>Payment gateways for secure transactions</li>
          <li>Analytics providers (e.g., Google Analytics)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">5. Data Security</h2>
        <p>
          We use encryption and access controls to protect your data. However, no system is 100% secure, and we encourage safe practices.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">6. Your Rights</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Access your data</li>
          <li>Request corrections or deletions</li>
          <li>Opt out of promotional emails</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">7. Children's Privacy</h2>
        <p>
          Our service is not directed to children under 13. We do not knowingly collect personal data from children.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Updates will be posted here with a new effective date.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">9. Contact Us</h2>
        <p>
          If you have questions, contact us at <a href="mailto:support@foodapp.com" className="text-blue-600 underline">support@foodapp.com</a>.
        </p>
      </section>
    </div>
    <Footer/>
    </>
  );
}

import React, { useState } from "react";
import {
  ChefHat,
  Users,
  Award,
  Heart,
  Clock,
  Leaf,
  ArrowRight,
  Star,
  Quote,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
} from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

const About = () => {
  const [expandedImage, setExpandedImage] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "1000+", label: "Delicious Recipes" },
    { number: "4.8", label: "Average Rating" },
    { number: "24/7", label: "Customer Support" },
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Made with Love",
      description:
        "Every recipe is crafted with passion and care, bringing you the authentic taste of home-cooked meals.",
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Fresh Ingredients",
      description:
        "We partner with local farmers and suppliers to ensure only the freshest, highest quality ingredients.",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Quick & Easy",
      description:
        "From 15-minute meals to elaborate feasts, we have recipes for every schedule and skill level.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Award Winning",
      description:
        "Recognized by culinary experts and loved by home cooks worldwide for our innovative approach.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Home Cook & Mom",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
      quote:
        "The recipes are so easy to follow and my family loves every meal. The ingredient lists are always spot-on and the cooking times are accurate.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Food Blogger",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      quote:
        "As someone who reviews food content professionally, I can say this platform sets the gold standard for recipe reliability and presentation.",
      rating: 5,
    },
    {
      name: "Emma Rodriguez",
      role: "Culinary Student",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
      quote:
        "Perfect for learning new techniques! The step-by-step photos and videos have improved my cooking skills tremendously.",
      rating: 5,
    },
    {
      name: "David Thompson",
      role: "Busy Professional",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      quote:
        "Finally found a recipe site that understands my schedule. The quick meal options are lifesavers after long work days.",
      rating: 5,
    },
    {
      name: "Lisa Park",
      role: "Nutrition Enthusiast",
      image:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=80&h=80&fit=crop&crop=face",
      quote:
        "Love how they include nutritional information and dietary alternatives. Makes meal planning so much easier for my health goals.",
      rating: 5,
    },
    {
      name: "James Wilson",
      role: "Weekend Chef",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
      quote:
        "The community aspect is fantastic. Being able to share my cooking results and get feedback has made cooking so much more enjoyable.",
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: "Are all recipes tested before publication?",
      answer:
        "Yes! Every single recipe goes through our rigorous testing process. Our team of culinary experts and home cooks test each recipe multiple times to ensure accuracy, taste, and reliability before it reaches your kitchen.",
    },
    {
      question: "Can I substitute ingredients in the recipes?",
      answer:
        "Absolutely! Most of our recipes include suggested substitutions, and our community often shares their successful modifications in the comments. We also have detailed guides on ingredient substitutions in our cooking tips section.",
    },
    {
      question: "Do you offer recipes for special diets?",
      answer:
        "Yes, we have extensive collections for various dietary needs including vegetarian, vegan, gluten-free, keto, paleo, and more. You can filter recipes by dietary preferences using our advanced search feature.",
    },
    {
      question: "How do I save my favorite recipes?",
      answer:
        "Simply create a free account and click the heart icon on any recipe to save it to your personal collection. You can organize saved recipes into custom folders and access them anytime across all your devices.",
    },
    {
      question: "Can I submit my own recipes?",
      answer:
        'We love community contributions! You can submit your recipes through our "Share Recipe" feature. Our editorial team reviews submissions and may feature exceptional recipes on our main platform.',
    },
    {
      question: "Do you provide nutritional information?",
      answer:
        "Yes, most of our recipes include detailed nutritional information including calories, macronutrients, and key vitamins. This information is calculated using professional nutritional databases.",
    },
    {
      question: "How often do you add new recipes?",
      answer:
        "We publish new recipes weekly! Our content calendar includes seasonal recipes, trending cuisines, and community requests. Follow us or subscribe to our newsletter to stay updated on the latest additions.",
    },
    {
      question: "Is there a mobile app available?",
      answer:
        "Yes, our mobile app is available for both iOS and Android. It includes all website features plus offline recipe access, smart shopping lists, and cooking timers to enhance your kitchen experience.",
    },
  ];

  const toggleFaq = (index: any) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-600 via-red-500 to-orange-600 py-24 px-6 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -ml-48"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                About Our
                <span className="block mt-2">Food Journey</span>
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-semibold">
                We're passionate about bringing people together through the
                universal language of food. Our mission is to make cooking
                accessible, enjoyable, and delicious for everyone.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center group animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 group-hover:bg-white/30 transition-all duration-300 border border-white/30 group-hover:scale-105 transform">
                    <div className="text-4xl md:text-5xl font-black text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="text-white/90 font-bold text-lg">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="animate-fade-in">
                <div className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full font-bold text-sm mb-6 uppercase tracking-widest">
                  Our Story
                </div>
                <h2 className="text-5xl font-black text-gray-900 mb-8">
                  Started with a Dream
                </h2>
                <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                  <p>
                    It all started in a small kitchen with a big dream. Our
                    founders, passionate home cooks themselves, noticed how
                    difficult it was to find reliable, easy-to-follow recipes
                    that actually worked.
                  </p>
                  <p>
                    What began as a collection of family recipes shared among
                    friends has grown into a community of food lovers from
                    around the world. We believe that cooking should be joyful,
                    not stressful.
                  </p>
                  <p>
                    Today, we're proud to serve over 50,000 home cooks with
                    tested recipes, cooking tips, and the support they need to
                    create memorable meals.
                  </p>
                </div>
                <button className="mt-8 flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-8 py-4 rounded-xl hover:shadow-lg transition-all transform hover:scale-105">
                  <span>Learn more about our mission</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <div className="relative animate-scale-in">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl transform -rotate-6 scale-105"></div>
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop"
                  alt="Cooking together"
                  className="relative rounded-3xl w-full h-80 object-cover shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-2xl border-4 border-orange-500">
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="flex items-center space-x-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                      <span className="font-black text-xl text-orange-600">
                        4.8/5
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 font-semibold">
                      Expert
                      <br />
                      Rating
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full font-bold text-sm mb-6 uppercase tracking-widest">
                Our Values
              </div>
              <h2 className="text-5xl font-black text-gray-900 mb-4">
                What We Stand For
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our values guide everything we do, from recipe selection to
                community building.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="group animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-2xl p-8 hover:shadow-2xl hover:border-orange-500 hover:scale-105 transition-all duration-300 h-full">
                    <div className="text-6xl mb-4 group-hover:scale-125 transition-transform text-orange-500">
                      {value.icon}
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {value.description}
                    </p>
                    <div className="h-1 bg-gradient-to-r from-orange-500 to-red-500 w-0 group-hover:w-12 transition-all duration-300 mt-6"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          className="py-24 px-6 bg-gradient-to-b from-gray-900 to-gray-800"
          id="testimonials"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full font-bold text-sm mb-6 uppercase tracking-widest">
                Social Proof
              </div>
              <h2 className="text-5xl font-black text-white mb-4">
                What Our Community Says
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Real stories from real cooks who've transformed their kitchen
                experience with us.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="group animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-700 hover:border-orange-500 h-full flex flex-col">
                    <div className="mb-6">
                      <Quote className="w-8 h-8 text-orange-500 mb-4 group-hover:scale-125 transition-transform" />
                      <p className="text-gray-300 leading-relaxed mb-6 italic text-lg">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center mt-auto pt-6 border-t border-gray-700">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-orange-500"
                      />
                      <div>
                        <div className="font-bold text-white text-lg">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-400">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 px-6 bg-white" id="faq">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full font-bold text-sm mb-6 uppercase tracking-widest">
                FAQ
              </div>
              <h2 className="text-5xl font-black text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about our recipes, community, and
                platform.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-orange-500 hover:shadow-lg transition-all duration-300 group animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-8 py-6 text-left flex items-center justify-between focus:outline-none group-hover:bg-orange-50 cursor-pointer transition-colors"
                  >
                    <span className="font-bold text-gray-900 text-lg">
                      {faq.question}
                    </span>
                    <div className="ml-4 flex-shrink-0 transition-transform duration-300">
                      {expandedFaq === index ? (
                        <Minus className="w-6 h-6 text-orange-500" />
                      ) : (
                        <Plus className="w-6 h-6 text-gray-400 group-hover:text-orange-500" />
                      )}
                    </div>
                  </button>
                  {expandedFaq === index && (
                    <div className="px-8 pb-6 bg-orange-50 border-t-2 border-orange-200">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <p className="text-gray-600 mb-6 text-lg font-semibold">
                Still have questions?
              </p>
              <Link to="/contact">
                <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-8 py-4 rounded-xl hover:shadow-lg transition-all transform hover:scale-105 inline-flex items-center space-x-2">
                  <span>Contact our support team</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default About;

import React, { useState } from 'react';
import { ChefHat, Users, Award, Heart, Clock, Leaf, ArrowRight, Star, Quote, ChevronDown, ChevronUp, Plus, Minus } from 'lucide-react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';

const About = () => {
  const [expandedImage, setExpandedImage] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '1000+', label: 'Delicious Recipes' },
    { number: '4.8', label: 'Average Rating' },
    { number: '24/7', label: 'Customer Support' }
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Made with Love',
      description: 'Every recipe is crafted with passion and care, bringing you the authentic taste of home-cooked meals.'
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: 'Fresh Ingredients',
      description: 'We partner with local farmers and suppliers to ensure only the freshest, highest quality ingredients.'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Quick & Easy',
      description: 'From 15-minute meals to elaborate feasts, we have recipes for every schedule and skill level.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Award Winning',
      description: 'Recognized by culinary experts and loved by home cooks worldwide for our innovative approach.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Home Cook & Mom',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face',
      quote: 'The recipes are so easy to follow and my family loves every meal. The ingredient lists are always spot-on and the cooking times are accurate.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Food Blogger',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
      quote: 'As someone who reviews food content professionally, I can say this platform sets the gold standard for recipe reliability and presentation.',
      rating: 5
    },
    {
      name: 'Emma Rodriguez',
      role: 'Culinary Student',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
      quote: 'Perfect for learning new techniques! The step-by-step photos and videos have improved my cooking skills tremendously.',
      rating: 5
    },
    {
      name: 'David Thompson',
      role: 'Busy Professional',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
      quote: 'Finally found a recipe site that understands my schedule. The quick meal options are lifesavers after long work days.',
      rating: 5
    },
    {
      name: 'Lisa Park',
      role: 'Nutrition Enthusiast',
      image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=80&h=80&fit=crop&crop=face',
      quote: 'Love how they include nutritional information and dietary alternatives. Makes meal planning so much easier for my health goals.',
      rating: 5
    },
    {
      name: 'James Wilson',
      role: 'Weekend Chef',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
      quote: 'The community aspect is fantastic. Being able to share my cooking results and get feedback has made cooking so much more enjoyable.',
      rating: 5
    }
  ];

  const faqs = [
    {
      question: 'Are all recipes tested before publication?',
      answer: 'Yes! Every single recipe goes through our rigorous testing process. Our team of culinary experts and home cooks test each recipe multiple times to ensure accuracy, taste, and reliability before it reaches your kitchen.'
    },
    {
      question: 'Can I substitute ingredients in the recipes?',
      answer: 'Absolutely! Most of our recipes include suggested substitutions, and our community often shares their successful modifications in the comments. We also have detailed guides on ingredient substitutions in our cooking tips section.'
    },
    {
      question: 'Do you offer recipes for special diets?',
      answer: 'Yes, we have extensive collections for various dietary needs including vegetarian, vegan, gluten-free, keto, paleo, and more. You can filter recipes by dietary preferences using our advanced search feature.'
    },
    {
      question: 'How do I save my favorite recipes?',
      answer: 'Simply create a free account and click the heart icon on any recipe to save it to your personal collection. You can organize saved recipes into custom folders and access them anytime across all your devices.'
    },
    {
      question: 'Can I submit my own recipes?',
      answer: 'We love community contributions! You can submit your recipes through our "Share Recipe" feature. Our editorial team reviews submissions and may feature exceptional recipes on our main platform.'
    },
    {
      question: 'Do you provide nutritional information?',
      answer: 'Yes, most of our recipes include detailed nutritional information including calories, macronutrients, and key vitamins. This information is calculated using professional nutritional databases.'
    },
    {
      question: 'How often do you add new recipes?',
      answer: 'We publish new recipes weekly! Our content calendar includes seasonal recipes, trending cuisines, and community requests. Follow us or subscribe to our newsletter to stay updated on the latest additions.'
    },
    {
      question: 'Is there a mobile app available?',
      answer: 'Yes, our mobile app is available for both iOS and Android. It includes all website features plus offline recipe access, smart shopping lists, and cooking timers to enhance your kitchen experience.'
    }
  ];

  const toggleFaq = (index:any) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              About Our
              <span className="text-orange-500 block">Food Journey</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're passionate about bringing people together through the universal language of food. 
              Our mission is to make cooking accessible, enjoyable, and delicious for everyone.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-orange-50 rounded-2xl p-8 group-hover:bg-orange-100 transition-colors">
                  <div className="text-4xl font-bold text-orange-500 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  It all started in a small kitchen with a big dream. Our founders, passionate home cooks 
                  themselves, noticed how difficult it was to find reliable, easy-to-follow recipes that 
                  actually worked.
                </p>
                <p>
                  What began as a collection of family recipes shared among friends has grown into a 
                  community of food lovers from around the world. We believe that cooking should be 
                  joyful, not stressful.
                </p>
                <p>
                  Today, we're proud to serve over 50,000 home cooks with tested recipes, cooking tips, 
                  and the support they need to create memorable meals.
                </p>
              </div>
              <button className="mt-8 flex items-center space-x-2 text-orange-500 font-medium hover:text-orange-600 transition-colors">
                <span>Learn more about our mission</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="relative">
              <div className="bg-orange-500 rounded-3xl p-8 transform rotate-3 hover:rotate-6 transition-transform">
                <img 
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop" 
                  alt="Cooking together"
                  className="rounded-2xl w-full h-80 object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-bold text-gray-900">4.8/5</span>
                  <span className="text-gray-600">Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Stand For</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our values guide everything we do, from recipe selection to community building.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group">
                <div className="bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-xl hover:border-orange-200 transition-all duration-300">
                  <div className="text-orange-500 mb-4 group-hover:scale-110 transition-transform">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gray-50" id='testimonials'>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Community Says</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real stories from real cooks who've transformed their kitchen experience with us.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="mb-6">
                  <Quote className="w-8 h-8 text-orange-500 mb-4 group-hover:scale-110 transition-transform" />
                  <p className="text-gray-700 leading-relaxed mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="text-center mt-12">
            <button className="bg-orange-500 text-white px-8 py-4 rounded-full font-medium hover:bg-orange-600 transition-colors inline-flex items-center space-x-2">
              <span>Share Your Story</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div> */}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6" id='faq'>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our recipes, community, and platform.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-orange-200 transition-colors">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between focus:outline-none focus:bg-gray-50 cursor-pointer"
                >
                  <span className="font-semibold text-gray-900 text-lg">{faq.question}</span>
                  <div className="ml-4 flex-shrink-0">
                    {expandedFaq === index ? (
                      <Minus className="w-5 h-5 text-orange-500" />
                    ) : (
                      <Plus className="w-5 h-5 text-orange-500" />
                    )}
                  </div>
                </button>
                {expandedFaq === index && (
                  <div className="px-8 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <Link to='/contact'>
              <button className="text-orange-500 font-medium hover:text-orange-600 transition-colors inline-flex items-center space-x-2 cursor-pointer">
                <span>Contact our support team</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
    </>
  );
};

export default About;
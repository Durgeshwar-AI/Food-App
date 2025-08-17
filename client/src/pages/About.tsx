import React, { useState } from 'react';
import { ChefHat, Users, Award, Heart, Clock, Leaf, ArrowRight, Star } from 'lucide-react';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';

const About = () => {
  const [expandedImage, setExpandedImage] = useState(null);

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
      {/* Footer */}
      <Footer/>
    </div>
    </>
  );
};

export default About;
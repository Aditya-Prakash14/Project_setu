import React, { useState } from 'react';
import { Send, Star, Handshake, Heart, Check, ArrowRight } from 'lucide-react';

const GetInvolved = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      
      // Reset form state after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1000);
  };

  return (
    <section id="involved" className="py-24 bg-gradient-to-b from-white to-primary-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-600 font-medium">JOIN US</span>
          <h2 className="section-title mt-2">Get Involved</h2>
          <p className="text-lg text-black">
            There are many ways to support our mission. Choose what works best for you and help us bridge the digital divide.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-white p-8 rounded-xl shadow-soft border border-gray-100">
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <Star className="text-primary-600 mr-2" size={20} />
              Volunteer With Us
            </h3>
            {isSubmitted ? (
              <div className="py-12 text-center animate-fade-in">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="text-primary-600" size={30} />
                </div>
                <h4 className="text-xl font-semibold mb-2">Thank You!</h4>
                <p className="text-black">Your message has been sent successfully. We'll get back to you soon.</p>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-black">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-black/20 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-black">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-black/20 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-black">
                    How would you like to help?
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-black/20 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder="Tell us how you'd like to contribute..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn btn-primary group"
                >
                  {isSubmitting ? (
                    <span className="inline-block h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></span>
                  ) : null}
                  Send Message
                  <Send className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </button>
              </form>
            )}
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-soft border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mr-4">
                  <Handshake className="text-secondary-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold">Partner With Us</h3>
              </div>
              <p className="text-black mb-6">
                We welcome partnerships with organizations that share our vision of
                empowering rural communities through technology.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-medium mb-1">Partnership Benefits</h4>
                <ul className="text-sm text-black space-y-1">
                  <li>• Combined resources for greater impact</li>
                  <li>• Access to our network of communities</li>
                  <li>• Visibility through our channels</li>
                </ul>
              </div>
              <button className="w-full btn btn-outline group">
                Learn More About Partnerships
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </button>
            </div>

            <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-8 rounded-xl shadow-soft text-white">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mr-4">
                  <Heart className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold">Make a Donation</h3>
              </div>
              <p className="text-white/90 mb-6">
                Your contribution helps us continue our mission of bridging the
                digital divide in rural India.
              </p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                <button className="bg-white/20 hover:bg-white/30 rounded-md py-2 font-medium text-white transition-colors">
                  ₹500
                </button>
                <button className="bg-white/20 hover:bg-white/30 rounded-md py-2 font-medium text-white transition-colors">
                  ₹1000
                </button>
                <button className="bg-white/20 hover:bg-white/30 rounded-md py-2 font-medium text-white transition-colors">
                  ₹2000
                </button>
              </div>
              <button className="w-full bg-white text-primary-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;
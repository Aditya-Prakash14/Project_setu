import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600">
            Have questions about Project Setu? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-700 flex items-center justify-center"
              >
                Send Message
                <Send className="ml-2" size={20} />
              </button>
            </form>
          </div>

          <div>
            <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
              <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="text-emerald-600 mt-1" size={20} />
                  <div className="ml-4">
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">info@projectsetu.org</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="text-emerald-600 mt-1" size={20} />
                  <div className="ml-4">
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">+91 123 456 7890</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="text-emerald-600 mt-1" size={20} />
                  <div className="ml-4">
                    <p className="font-medium">Office</p>
                    <p className="text-gray-600">
                      123 Tech Hub, Andheri East,<br />
                      Mumbai, Maharashtra 400069
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">Office Hours</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
import React, { useState } from 'react';
import { CreditCard, Gift, Users, ArrowRight } from 'lucide-react';

const DonatePage = () => {
  const [donationType, setDonationType] = useState('oneTime');
  const [amount, setAmount] = useState('');
  const predefinedAmounts = ['1000', '2000', '5000', '10000'];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Support Our Mission</h1>
          <p className="text-xl text-gray-600">
            Your contribution helps us bridge the digital divide and empower rural communities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <CreditCard className="text-emerald-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Transparent</h3>
            <p className="text-gray-600">
              100% of your donation goes directly to our digital literacy programs.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <Gift className="text-emerald-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Tax Benefits</h3>
            <p className="text-gray-600">
              All donations are eligible for tax deduction under 80G.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <Users className="text-emerald-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Impact</h3>
            <p className="text-gray-600">
              Each donation helps us reach more villages and communities.
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-8">
            <div className="flex gap-4 mb-8">
              <button
                className={`flex-1 py-3 px-6 rounded-md text-center ${
                  donationType === 'oneTime'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setDonationType('oneTime')}
              >
                One-time
              </button>
              <button
                className={`flex-1 py-3 px-6 rounded-md text-center ${
                  donationType === 'monthly'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setDonationType('monthly')}
              >
                Monthly
              </button>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Amount (INR)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {predefinedAmounts.map((preset) => (
                  <button
                    key={preset}
                    className={`py-3 px-4 rounded-md text-center ${
                      amount === preset
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setAmount(preset)}
                  >
                    ₹{preset}
                  </button>
                ))}
              </div>
              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-500">₹</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter custom amount"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <button className="w-full bg-emerald-600 text-white py-4 rounded-md hover:bg-emerald-700 flex items-center justify-center">
              Proceed to Payment
              <ArrowRight className="ml-2" size={20} />
            </button>
          </div>

          <div className="px-8 py-4 bg-gray-50 border-t">
            <p className="text-sm text-gray-600 text-center">
              Secured by Razorpay | SSL Protected Payment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;
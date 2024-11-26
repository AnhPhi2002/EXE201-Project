import { ArrowLeft, Check, CreditCard, QrCode } from "lucide-react";
import React, { useState } from "react";

interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
}

const PricingPlanSection: React.FC = () => {
  const [showPayment, setShowPayment] = useState<boolean>(false);

  const plan: Plan = {
    name: "Intro Plan",
    price: "$19",
    description: "Perfect for individuals and small projects",
    features: [
      "5GB Storage",
      "10 Users",
      "Basic Support",
      "2 Integrations",
      "Email Marketing",
      "Custom Domain",
      "Analytics Dashboard",
      "Mobile App Access",
      "SSL Certificate",
      "24/7 Customer Support"
    ]
  };

  const handleChoosePlan = () => {
    setShowPayment(true);
  };

  
  const PaymentPage: React.FC = () => (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-2xl p-8 max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-800">PayOsôi Payment</h2>
      <div className="mb-8 text-center">
        <img 
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
          alt="PayOsôi Logo" 
          className="w-24 h-24 mx-auto mb-4 rounded-full shadow-lg" 
        />
        <p className="text-gray-600 text-sm">Please choose your preferred payment method below:</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button className="bg-white hover:bg-gray-50 text-indigo-600 font-semibold py-3 px-4 rounded-lg shadow transition duration-300 flex items-center justify-center">
          <QrCode className="mr-2" /> Scan QR
        </button>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg shadow transition duration-300 flex items-center justify-center">
          <CreditCard className="mr-2" /> Card Payment
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-inner mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Payment Details</h3>
        <p className="text-gray-600 mb-1">Plan: {plan.name}</p>
        <p className="text-gray-600 mb-1">Amount: {plan.price}/month</p>
        <p className="text-gray-600">Method: PayOsôi</p>
      </div>
      <button 
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full transition duration-300 mb-4" 
        type="button"
      >
        Confirm Payment
      </button>
      <button 
        className="text-indigo-600 hover:text-indigo-800 font-semibold text-center w-full flex items-center justify-center" 
        onClick={() => setShowPayment(false)}
      >
        <ArrowLeft className="mr-2" /> Back to Plan Selection
      </button>
    </div>
  );

  return (
    <section className="bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {!showPayment ? (
          <>
            <h2 className="text-4xl font-extrabold text-indigo-900 text-center mb-4">
              Get an attractive price here
            </h2>
            <p className="text-xl text-indigo-700 text-center mb-12 max-w-3xl mx-auto">
              Choose the perfect plan for your needs. Our Intro Plan is perfect for individuals and small projects.
            </p>
            <div className="flex justify-center">
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-105 w-full max-w-md">
                <div className="px-6 py-8">
                  <h3 className="text-2xl font-semibold text-indigo-900 mb-2">{plan.name}</h3>
                  <p className="text-4xl font-bold text-indigo-900 mb-4">
                    {plan.price}
                    <span className="text-lg font-normal text-indigo-600">/month</span>
                  </p>
                  <p className="text-indigo-600 mb-6">{plan.description}</p>
                  <ul className="mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center mb-2">
                        <Check className="text-green-500 mr-2" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="w-full py-3 px-4 rounded-lg font-semibold text-white transition duration-300 bg-indigo-600 hover:bg-indigo-700 shadow-lg"
                    aria-label={`Choose ${plan.name}`}
                    onClick={handleChoosePlan}
                  >
                    Choose Plan
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <PaymentPage />
        )}
      </div>
    </section>
  );
};

export default PricingPlanSection;

import React from "react";

import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    title: "Explore AI Agents",
    description:
      "Browse a wide range of AI agents tailored for different business needs, from customer support bots to automation tools.",
  },
  {
    title: "Compare & Choose",
    description:
      "Review agent profiles, pricing, and customer reviews. Compare different AI solutions to find the best fit for your business needs.",
  },
  {
    title: "Connect with Agencies",
    description:
      "Once you've found an AI agent that suits your needs, connect directly with the agency behind it to discuss customization and pricing.",
  },
  {
    title: "Integrate Seamlessly",
    description:
      "Agencies provide easy-to-follow integration steps, API access, and necessary support to ensure a smooth setup in your business operations.",
  },
  {
    title: "Optimize & Scale",
    description:
      "Monitor your AI agent’s performance, request upgrades, and scale its capabilities as your business grows.",
  },
];

const HowItWorks = () => {
  const navigate = useNavigate();
  return (
    <div className="py-12 px-6 md:px-16 lg:px-24">
      <button
        onClick={() => navigate("/")}
        className="flex items-center text-blue-500 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Go Back
      </button>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          How It Works
        </h2>
        <p className="text-gray-600 mb-10">
          Discover and integrate AI agents seamlessly into your business in just
          a few steps.
        </p>
      </div>
      <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center"
          >
            <CheckCircle className="text-blue-500 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600 text-sm">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;

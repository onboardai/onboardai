import React, { useState } from "react";
import {
  Search,
  Rocket,
  Users,
  Settings,
  CreditCard,
  Shield,
  BookOpen,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

function BOHelpCent() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      icon: <Rocket className="w-8 h-8 text-blue-600" />,
      title: "Getting Started",
      description: "Learn the basics of our platform to get started quickly!",
      articles: 12,
    },
    {
      icon: <Settings className="w-8 h-8 text-blue-600" />,
      title: "OnboardAI Benefits",
      description:
        "Learn how to maximise benefits and results from Onboard AI for your business.",
      articles: 10,
    },
    {
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      title: "Account Management",
      description: "Manage your account, settings and privacy preferences.",
      articles: 9,
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Hiring AI Agents",
      description:
        "Learn how to buy and hire your AI Employees with OnboardAI.",
      articles: 15,
    },
    {
      icon: <CreditCard className="w-8 h-8 text-blue-600" />,
      title: "Billing & Payments",
      description:
        "Understand payment process, commission structure, setting payment account and more.",
      articles: 8,
    },
    {
      icon: <CreditCard className="w-8 h-8 text-blue-600" />,
      title: "Rules & Regulations",
      description: "Know about certain norms and regulations of the platform.",
      articles: 8,
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Security & Compliance",
      description: "Data privacy, security policies",
      articles: 7,
    },
  ];

  const popularQuestions = [
    {
      title: "How do I hire an AI Agent?",
      description: "Learn the step-by-step process of hiring AI Agents",
      link: "#",
    },
    {
      title: "What are the commission fees?",
      description: "Understand our pricing and fee structure",
      link: "#",
    },
    {
      title: "How do agencies post their AI Agents?",
      description: "Guide for agencies to list their services",
      link: "#",
    },
    {
      title: "What security measures are in place?",
      description: "Learn about our security protocols",
      link: "#",
    },
  ];

  return (
    <div className=" bg-gray-50 w-full">
      {/* Navigation */}
      <nav className="bg-blue-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="ml-2 text-2xl font-raleway font-bold text-white">
                Help Center
              </span>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
              <MessageCircle className="w-4 h-4 mr-2" />
              Contact Support
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-blue-800 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14">
          <h1 className="text-4xl font-bold text-center text-white mb-4">
            Welcome to the OnboardAI Help Center
          </h1>
          <p className="text-xl text-center text-gray-300 mb-8">
            Find answers, learn how to use OnboardAI, and get the most out of AI
            hiring.
          </p>
          <div className="max-w-3xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-raleway font-bold text-blue-700 mb-12 text-center">
            Browse By Topics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {category.articles} articles
                  </span>
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 flex items-center"
                  >
                    View Articles
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <div className="w-10/12 max-w-5xl mx-auto mb-12 bg-white px-6 py-8 mt-10 shadow-xl ring-1 ring-gray-900/5 rounded-lg sm:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold font-montserrat">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-lg text-neutral-500 font-raleway font-medium">
            OnboardAI FAQs
          </p>
        </div>

        {/* FAQ Logic */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              question: "How does the billing work?",
              answer:
                "OnboardAI offers flexible billing options, including monthly and annual plans. Payments are securely processed via credit card or other online methods.",
            },
            {
              question: "Can I get a refund for my subscription?",
              answer:
                "We offer a 30-day money-back guarantee. If you're not satisfied within the first 30 days, you can request a full refund.",
            },
            {
              question: "How do I cancel my subscription?",
              answer:
                "You can cancel your subscription anytime by visiting your account settings. Your subscription will not renew after cancellation.",
            },
            {
              question: "Is there a free trial?",
              answer:
                "Yes! OnboardAI provides a limited-time free trial so you can explore our features before committing to a plan.",
            },
            {
              question: "How do I contact support?",
              answer:
                "For assistance, you can reach our support team via the contact form on our website or email us at support@onboardai.com.",
            },
            {
              question: "Do you offer any discounts or promotions?",
              answer:
                "We occasionally run promotions and discounts. Stay updated by subscribing to our newsletter or following us on social media.",
            },
          ].map((faq, index) => (
            <div key={index} className="py-4 border-b">
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between text-lg font-medium">
                  <span className="font-semibold">{faq.question}</span>
                  <span className="transition-transform transform group-open:rotate-180">
                    <svg
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="group-open:animate-fadeIn mt-2 text-neutral-500 font-sans">
                  {faq.answer}
                </p>
              </details>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BOHelpCent;

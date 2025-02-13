import React from 'react';
import { useHistory, useNavigate } from 'react-router-dom';

const UseCasesPage = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-gray-50 py-16 px-8 sm:px-16 lg:px-32">
      <div className="max-w-7xl mx-auto text-center">
        {/* Go Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-8 text-white bg-blue-600 hover:bg-blue-700 font-semibold py-2 px-6 rounded-lg transition-all duration-300"
        >
          Go Back
        </button>
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-8">
          Use Cases for Onboard AI
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Onboard AI enhances both user and agency experiences, ensuring seamless interactions and improved outcomes.
          Below are key use cases where onboard AI plays a crucial role.
        </p>

        {/* Use Cases */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Personalized AI Agent Recommendations',
              description:
                'Our onboard AI analyzes user behavior, preferences, and previous searches to suggest the most relevant AI agents for your business.',
              benefit:
                'Helps businesses quickly find AI solutions that align with their goals, improving the chances of a successful implementation.',
            },
            {
              title: 'Smart Search Functionality',
              description:
                'Onboard AI enhances the search experience by understanding natural language queries, allowing you to describe your needs in simple terms.',
              benefit:
                'Makes searching for AI agents intuitive and efficient, saving users valuable time.',
            },
            {
              title: 'Dynamic Performance Analytics',
              description:
                'For agencies listing their AI agents, onboard AI provides insights into how each agent is performing across various metrics such as usage, ratings, and engagement.',
              benefit:
                'Helps agencies refine their offerings, optimize performance, and increase visibility on the platform.',
            },
            {
              title: 'AI-Driven Customer Support',
              description:
                'Onboard AI can answer common user questions, troubleshoot issues, and provide immediate assistance without waiting for human intervention.',
              benefit:
                'Ensures smooth and efficient customer support, increasing user satisfaction and platform engagement.',
            },
            {
              title: 'Automated AI Agent Matching',
              description:
                'Our onboard AI takes the guesswork out of finding the perfect AI agent by automatically matching businesses with agents that best fit their criteria—be it functionality, cost, or user ratings.',
              benefit:
                'Minimizes decision fatigue and streamlines the selection process, helping businesses adopt the right tools faster.',
            },
            {
              title: 'Adaptive Learning & Customization',
              description:
                'As businesses use AI agents on the platform, the onboard AI learns from their interactions and customizes recommendations based on evolving needs.',
              benefit:
                'Keeps businesses ahead of the curve by recommending AI solutions that evolve with their changing needs.',
            },
            {
              title: 'Real-Time Performance Monitoring for Businesses',
              description:
                'Businesses can use onboard AI to monitor the performance of their AI agents in real-time. Whether it’s tracking engagement levels, response accuracy, or cost-effectiveness, the AI provides actionable insights for ongoing optimization.',
              benefit:
                'Empowers businesses with data-driven decisions to fine-tune their AI usage and enhance performance.',
            },
          ].map((useCase, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
            >
              <h2 className="text-xl font-semibold text-blue-500 mb-4">{useCase.title}</h2>
              <p className="text-gray-700 mb-4">{useCase.description}</p>
              <p className="text-lg font-medium text-gray-800">
                <strong>Benefit:</strong> {useCase.benefit}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UseCasesPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Briefcase, Palette, BarChart as ChartBar, Microscope, Server } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

const careers = [
  {
    title: 'Software Development',
    icon: <Code size={32} />,
    description: 'Build the future of technology',
    color: 'bg-blue-100 hover:bg-blue-200',
  },
  {
    title: 'Business Analytics',
    icon: <ChartBar size={32} />,
    description: 'Transform data into insights',
    color: 'bg-blue-50 hover:bg-blue-100',
  },
  {
    title: 'UX Design',
    icon: <Palette size={32} />,
    description: 'Create amazing user experiences',
    color: 'bg-blue-100 hover:bg-blue-200',
  },
  {
    title: 'Project Management',
    icon: <Briefcase size={32} />,
    description: 'Lead teams to success',
    color: 'bg-blue-50 hover:bg-blue-100',
  },
  {
    title: 'Data Science',
    icon: <Microscope size={32} />,
    description: 'Unlock patterns in data',
    color: 'bg-blue-100 hover:bg-blue-200',
  },
  {
    title: 'DevOps',
    icon: <Server size={32} />,
    description: 'Bridge development and operations',
    color: 'bg-blue-50 hover:bg-blue-100',
  },
];

function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleCareerSelect = (career: string) => {
    if (user) {
      navigate('/content', { state: { career } });
    } else {
      navigate('/signin', { state: { redirectTo: '/content', career } });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Discover Your Perfect Career Path
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Select your area of interest and let AI guide you through personalized career development content.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {careers.map((career) => (
          <button
            key={career.title}
            onClick={() => handleCareerSelect(career.title)}
            className={`p-6 rounded-lg ${career.color} transition-colors duration-200 text-left group relative overflow-hidden`}
          >
            <div className="flex items-center space-x-4">
              <div className="text-blue-600">{career.icon}</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{career.title}</h3>
                <p className="text-gray-600">{career.description}</p>
              </div>
            </div>
            {!user && (
              <div className="absolute inset-0 bg-blue-600 bg-opacity-90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="text-white">
                  Sign in to explore
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 rounded-lg p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Choose CareerAI?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Personalized Guidance</h3>
              <p className="text-gray-600">AI-powered recommendations tailored to your goals</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Expert Content</h3>
              <p className="text-gray-600">Industry-validated resources and learning paths</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Real-time Support</h3>
              <p className="text-gray-600">24/7 AI chatbot assistance for your questions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
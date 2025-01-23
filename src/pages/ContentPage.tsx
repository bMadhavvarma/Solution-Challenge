import React from 'react';
import { useLocation } from 'react-router-dom';
import { Play, FileText, Download } from 'lucide-react';

function ContentPage() {
  const location = useLocation();
  const career = location.state?.career || 'Software Development';

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{career}</h1>
        <p className="text-xl text-gray-600">Your personalized learning journey starts here</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Video Section */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="aspect-video bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Play size={48} className="text-blue-600" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Career Overview</h2>
          <p className="text-gray-600 mb-4">
            A comprehensive introduction to your chosen career path, industry insights,
            and growth opportunities.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Watch Video
          </button>
        </div>

        {/* Document Section */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="aspect-video bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <FileText size={48} className="text-blue-600" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Career Guide</h2>
          <p className="text-gray-600 mb-4">
            Detailed documentation including skill requirements, salary expectations,
            and recommended learning path.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            View Guide
          </button>
        </div>
      </div>

      <div className="bg-white border border-blue-100 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Learning Path</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">
                {step}
              </div>
              <div className="flex-1 bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold">Module {step}</h3>
                <p className="text-gray-600">Essential skills and knowledge for your career journey</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2">
          <Download size={20} />
          <span>Download All Materials</span>
        </button>
      </div>
    </div>
  );
}

export default ContentPage;
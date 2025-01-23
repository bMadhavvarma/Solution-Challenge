import React, { useState } from 'react';
import { Download, FileText, Video, Package } from 'lucide-react';

function DownloadPage() {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = (id: string) => {
    setDownloading(id);
    setTimeout(() => setDownloading(null), 2000); // Simulate download
  };

  const resources = [
    {
      id: 'career-guide',
      title: 'Career Guide PDF',
      icon: <FileText size={24} />,
      size: '2.5 MB',
      description: 'Comprehensive career path documentation',
    },
    {
      id: 'video-course',
      title: 'Video Course',
      icon: <Video size={24} />,
      size: '1.2 GB',
      description: 'Full video course with practical examples',
    },
    {
      id: 'resource-pack',
      title: 'Resource Pack',
      icon: <Package size={24} />,
      size: '500 MB',
      description: 'Templates, tools, and additional materials',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Download Resources</h1>
        <p className="text-xl text-gray-600">Access your personalized career development materials</p>
      </div>

      <div className="grid gap-6">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="bg-white border border-blue-100 rounded-lg p-6 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="text-blue-600">{resource.icon}</div>
              <div>
                <h3 className="text-xl font-semibold">{resource.title}</h3>
                <p className="text-gray-600">{resource.description}</p>
                <p className="text-sm text-gray-500">Size: {resource.size}</p>
              </div>
            </div>
            <button
              onClick={() => handleDownload(resource.id)}
              className={`px-6 py-2 rounded-lg flex items-center space-x-2 ${
                downloading === resource.id
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              } transition-colors`}
              disabled={downloading === resource.id}
            >
              <Download size={20} />
              <span>{downloading === resource.id ? 'Downloading...' : 'Download'}</span>
            </button>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-semibold mb-4">Download Instructions</h2>
        <ul className="space-y-2 text-gray-600">
          <li>• Click the download button for each resource you want to access</li>
          <li>• Files will be downloaded to your default downloads folder</li>
          <li>• Large files may take several minutes to download</li>
          <li>• Contact support if you experience any issues</li>
        </ul>
      </div>
    </div>
  );
}

export default DownloadPage;
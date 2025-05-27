import React from 'react';
import { Linkedin, FileText } from 'lucide-react';

interface ContentTypeSelectorProps {
  onSelectType: (type: string) => void;
}

const ContentTypeSelector = ({ onSelectType }: ContentTypeSelectorProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <div 
        onClick={() => onSelectType('linkedin')}
        className="bg-white rounded-lg shadow-sm border p-6 cursor-pointer hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Linkedin className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">LinkedIn Post</h3>
            <p className="text-gray-600">Create engaging LinkedIn content</p>
          </div>
        </div>
      </div>
      
      <div 
        onClick={() => onSelectType('newsletter')}
        className="bg-white rounded-lg shadow-sm border p-6 cursor-pointer hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Newsletter</h3>
            <p className="text-gray-600">Create newsletter content</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentTypeSelector;
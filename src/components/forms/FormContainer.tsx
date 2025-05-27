import React, { ReactNode } from 'react';

interface FormContainerProps {
  onBack: () => void;
  icon: ReactNode;
  title: string;
  children: ReactNode;
  color: 'blue' | 'green';
}

export const FormContainer = ({ onBack, icon, title, children, color }: FormContainerProps) => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 animate-fadeIn">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-6">
            <button 
              onClick={onBack}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              aria-label="Go back"
            >
              ← Back
            </button>
            {icon}
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
};
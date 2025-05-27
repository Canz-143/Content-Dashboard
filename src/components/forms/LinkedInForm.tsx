import React, { useState } from 'react';
import { Linkedin, Plus, RefreshCw } from 'lucide-react';
import { FormContainer } from './FormContainer';
import { LinkedInFormData } from '../../types';

interface LinkedInFormProps {
  onBack: () => void;
  onSubmit: (data: LinkedInFormData) => Promise<void>;
  loading: boolean;
}

const LinkedInForm = ({ onBack, onSubmit, loading }: LinkedInFormProps) => {
  const [formData, setFormData] = useState<LinkedInFormData>({
    postType: '',
    goal: '',
    coreStatement: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const linkedinPostTypes = [
    'Thought Leadership',
    'Industry News',
    'Personal Story',
    'How-to Guide',
    'Company Update',
    'Question/Poll'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.postType) {
      newErrors.postType = 'Please select a post type';
    }
    
    if (!formData.goal) {
      newErrors.goal = 'Please describe your post goal';
    } else if (formData.goal.length < 10) {
      newErrors.goal = 'Goal should be more detailed (at least 10 characters)';
    }
    
    if (!formData.coreStatement) {
      newErrors.coreStatement = 'Please provide a core statement';
    } else if (formData.coreStatement.length < 10) {
      newErrors.coreStatement = 'Core statement should be more detailed (at least 10 characters)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      await onSubmit(formData);
    }
  };

  return (
    <FormContainer 
      onBack={onBack}
      icon={<Linkedin className="w-6 h-6 text-blue-600" />}
      title="Create LinkedIn Post"
      color="blue"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="postType">
            Post Type
          </label>
          <select
            id="postType"
            name="postType"
            value={formData.postType}
            onChange={handleChange}
            className={`w-full border ${errors.postType ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
          >
            <option value="">Select post type...</option>
            {linkedinPostTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.postType && <p className="mt-1 text-sm text-red-500">{errors.postType}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="goal">
            Post Goal
          </label>
          <textarea
            id="goal"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            className={`w-full border ${errors.goal ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
            placeholder="What do you want to achieve with this post?"
          />
          {errors.goal && <p className="mt-1 text-sm text-red-500">{errors.goal}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="coreStatement">
            Core Statement
          </label>
          <textarea
            id="coreStatement"
            name="coreStatement"
            value={formData.coreStatement}
            onChange={handleChange}
            className={`w-full border ${errors.coreStatement ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
            placeholder="What's the main message or insight you want to share?"
          />
          {errors.coreStatement && <p className="mt-1 text-sm text-red-500">{errors.coreStatement}</p>}
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors duration-200"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Generating Content...
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Create LinkedIn Post
            </>
          )}
        </button>
      </form>
    </FormContainer>
  );
};

export default LinkedInForm;
import React, { useState } from 'react';
import { FileText, Plus, RefreshCw } from 'lucide-react';
import { FormContainer } from './FormContainer';
import { NewsletterFormData } from '../../types';

interface NewsletterFormProps {
  onBack: () => void;
  onSubmit: (data: NewsletterFormData) => Promise<void>;
  loading: boolean;
}

const NewsletterForm = ({ onBack, onSubmit, loading }: NewsletterFormProps) => {
  const [formData, setFormData] = useState<NewsletterFormData>({
    newsletterType: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const newsletterTypes = [
    'Weekly Update',
    'Industry Insights',
    'Product Updates',
    'Educational Content',
    'Company News'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
    
    if (!formData.newsletterType) {
      newErrors.newsletterType = 'Please select a newsletter type';
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
      icon={<FileText className="w-6 h-6 text-green-600" />}
      title="Create Newsletter"
      color="green"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="newsletterType">
            Newsletter Type
          </label>
          <select
            id="newsletterType"
            name="newsletterType"
            value={formData.newsletterType}
            onChange={handleChange}
            className={`w-full border ${errors.newsletterType ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200`}
          >
            <option value="">Select newsletter type...</option>
            {newsletterTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.newsletterType && <p className="mt-1 text-sm text-red-500">{errors.newsletterType}</p>}
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors duration-200"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Generating Content...
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Create Newsletter
            </>
          )}
        </button>
      </form>
    </FormContainer>
  );
};

export default NewsletterForm;
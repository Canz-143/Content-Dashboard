import React, { useState, useEffect } from 'react';
import ContentTypeSelector from './ContentTypeSelector';
import ContentList from './ContentList';
import LinkedInForm from './forms/LinkedInForm';
import NewsletterForm from './forms/NewsletterForm';
import { useContentPieces } from '../hooks/useContentPieces';

const ContentDashboard = () => {
  const [currentView, setCurrentView] = useState('main');
  const { 
    contentPieces, 
    loading, 
    createLinkedInPost, 
    createNewsletter, 
    regenerateContent 
  } = useContentPieces();

  if (currentView === 'linkedin') {
    return (
      <LinkedInForm 
        onBack={() => setCurrentView('main')} 
        onSubmit={createLinkedInPost} 
        loading={loading} 
      />
    );
  }

  if (currentView === 'newsletter') {
    return (
      <NewsletterForm 
        onBack={() => setCurrentView('main')} 
        onSubmit={createNewsletter} 
        loading={loading} 
      />
    );
  }

  return (
    <div className="p-6 transition-all duration-300 ease-in-out">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Content Creation Dashboard</h1>
        
        <ContentTypeSelector onSelectType={(type) => setCurrentView(type)} />
        
        <ContentList 
          contentPieces={contentPieces} 
          loading={loading}
          onRegenerate={regenerateContent}
        />
      </div>
    </div>
  );
};

export default ContentDashboard;
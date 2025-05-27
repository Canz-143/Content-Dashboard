import React, { useState } from 'react';
import { Linkedin, FileText, RefreshCw, Edit, Send, ExternalLink } from 'lucide-react';
import { ContentPiece } from '../types';

interface ContentCardProps {
  content: ContentPiece;
  loading: boolean;
  onRegenerate: (id: number) => void;
}

const ContentCard = ({ content, loading, onRegenerate }: ContentCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const handlePostContent = (content: ContentPiece) => {
    // Implementation would call your n8n webhook for posting
    console.log('Posting content:', content);
  };

  return (
    <div className="border rounded-lg p-4 transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {content.type === 'LinkedIn Post' ? (
              <Linkedin className="w-4 h-4 text-blue-600" />
            ) : (
              <FileText className="w-4 h-4 text-green-600" />
            )}
            <span className="text-sm font-medium text-gray-600">{content.type}</span>
            {content.postType && (
              <span className="text-sm text-gray-500">• {content.postType}</span>
            )}
            {content.newsletterType && (
              <span className="text-sm text-gray-500">• {content.newsletterType}</span>
            )}
          </div>
          <h3 className="font-semibold text-gray-900">{content.title}</h3>
          <p className="text-sm text-gray-500">{content.createdDate}</p>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full ${
          content.status === 'Generated' ? 'bg-green-100 text-green-800' :
          content.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {content.status}
        </span>
      </div>
      
      <div className={`text-gray-700 mb-4 text-sm overflow-hidden transition-all duration-300 ${
        expanded ? 'max-h-96' : 'max-h-20'
      }`}>
        <p>{content.content}</p>
      </div>
      
      {content.content.length > 150 && (
        <button 
          onClick={() => setExpanded(!expanded)} 
          className="text-blue-600 text-sm mb-4 flex items-center gap-1"
        >
          {expanded ? 'Show less' : 'Show more'}
          <ExternalLink className="w-3 h-3" />
        </button>
      )}
      
      <div className="flex gap-2">
        <button 
          onClick={() => onRegenerate(content.id)}
          disabled={loading}
          className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50 transition-colors duration-200"
        >
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
          Regenerate
        </button>
        <button className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors duration-200">
          <Edit className="w-3 h-3" />
          Edit
        </button>
        {content.type === 'LinkedIn Post' && (
          <button 
            onClick={() => handlePostContent(content)}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors duration-200"
          >
            <Send className="w-3 h-3" />
            Post to LinkedIn
          </button>
        )}
      </div>
    </div>
  );
};

export default ContentCard;
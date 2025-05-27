import React from 'react';
import ContentCard from './ContentCard';
import { ContentPiece } from '../types';

interface ContentListProps {
  contentPieces: ContentPiece[];
  loading: boolean;
  onRegenerate: (id: number) => void;
}

const ContentList = ({ contentPieces, loading, onRegenerate }: ContentListProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-900">Recent Content</h2>
      </div>
      
      <div className="p-6 space-y-4">
        {contentPieces.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No content created yet. Select a content type above to get started.</p>
          </div>
        ) : (
          contentPieces.map(piece => (
            <ContentCard 
              key={piece.id} 
              content={piece} 
              loading={loading}
              onRegenerate={onRegenerate}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ContentList;
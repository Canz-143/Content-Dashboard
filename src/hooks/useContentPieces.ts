import { useState, useEffect } from 'react';
import { ContentPiece, LinkedInFormData, NewsletterFormData } from '../types';

export const useContentPieces = () => {
  const [contentPieces, setContentPieces] = useState<ContentPiece[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock data for development - replace with Airtable API calls
  useEffect(() => {
    setContentPieces([
      {
        id: 1,
        type: 'LinkedIn Post',
        postType: 'Thought Leadership',
        title: 'The Future of AI in Marketing',
        content: 'Just generated content about AI trends in marketing. The rapid evolution of artificial intelligence is transforming how marketers engage with audiences. From predictive analytics to personalized content creation, AI is enabling more efficient and effective campaigns. As marketing leaders, we need to adapt our strategies to harness these technologies while maintaining the human touch that builds genuine connections.',
        status: 'Generated',
        createdDate: '2024-05-27'
      },
      {
        id: 2,
        type: 'Newsletter',
        newsletterType: 'Weekly Update',
        title: 'Week 21 Industry Insights',
        content: 'This week in tech: Major developments in cloud computing are reshaping enterprise architecture. The shift toward serverless computing continues to gain momentum, with organizations reporting significant cost savings and improved scalability. Meanwhile, new security protocols are being implemented in response to rising cyber threats. Our analysis suggests that companies investing in these technologies now will be better positioned for the challenges ahead.',
        status: 'Draft',
        createdDate: '2024-05-26'
      }
    ]);
  }, []);

  const createLinkedInPost = async (formData: LinkedInFormData) => {
    setLoading(true);
    
    try {
      // This would make an API call to your n8n webhook
      const payload = {
        contentType: 'linkedin',
        postType: formData.postType,
        goal: formData.goal,
        coreStatement: formData.coreStatement
      };
      
      // Mock response for demo - remove this when implementing real API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newContent: ContentPiece = {
        id: Date.now(),
        type: 'LinkedIn Post',
        postType: formData.postType,
        title: `${formData.postType} - ${new Date().toLocaleDateString()}`,
        content: `Generated LinkedIn post based on:\nGoal: ${formData.goal}\nCore Statement: ${formData.coreStatement}\n\nThis would be replaced with AI-generated content in the real implementation.`,
        status: 'Generated',
        createdDate: new Date().toISOString().split('T')[0]
      };
      
      setContentPieces(prev => [newContent, ...prev]);
      setLoading(false);
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error creating content:', error);
      setLoading(false);
      return Promise.reject(error);
    }
  };

  const createNewsletter = async (formData: NewsletterFormData) => {
    setLoading(true);
    
    try {
      const payload = {
        contentType: 'newsletter',
        newsletterType: formData.newsletterType
      };
      
      // Mock response for demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newContent: ContentPiece = {
        id: Date.now(),
        type: 'Newsletter',
        newsletterType: formData.newsletterType,
        title: `${formData.newsletterType} - ${new Date().toLocaleDateString()}`,
        content: `Generated newsletter content for ${formData.newsletterType}. This is placeholder text that would be replaced with actual AI-generated content in the production implementation. The content would be tailored to the specific newsletter type and formatted appropriately for email distribution.`,
        status: 'Generated',
        createdDate: new Date().toISOString().split('T')[0]
      };
      
      setContentPieces(prev => [newContent, ...prev]);
      setLoading(false);
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error creating content:', error);
      setLoading(false);
      return Promise.reject(error);
    }
  };

  const regenerateContent = async (id: number) => {
    setLoading(true);
    
    try {
      // Mock regeneration - implement actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setContentPieces(prev => 
        prev.map(piece => 
          piece.id === id 
            ? { 
                ...piece, 
                content: `${piece.content}\n\n[Regenerated content] This content has been refreshed with new ideas and improved phrasing to better meet the original goals.`, 
                status: 'Generated' 
              }
            : piece
        )
      );
      
      setLoading(false);
    } catch (error) {
      console.error('Error regenerating content:', error);
      setLoading(false);
    }
  };

  return {
    contentPieces,
    loading,
    createLinkedInPost,
    createNewsletter,
    regenerateContent
  };
};
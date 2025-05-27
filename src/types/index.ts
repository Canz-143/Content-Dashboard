export interface ContentPiece {
  id: number;
  type: 'LinkedIn Post' | 'Newsletter';
  postType?: string;
  newsletterType?: string;
  title: string;
  content: string;
  status: 'Generated' | 'Draft' | 'Published';
  createdDate: string;
}

export interface LinkedInFormData {
  postType: string;
  goal: string;
  coreStatement: string;
}

export interface NewsletterFormData {
  newsletterType: string;
}
export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  category: string;
  image?: string;
  verifyUrl?: string;
  year: string;
}
export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  abbreviation: string;
  image?: string;
  verifyUrl?: string;
  year?: string;
}
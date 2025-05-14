/**
 * User roles available in the system
 */
export type UserRole = 'client' | 'photographer' | 'admin';

/**
 * Base user interface with common properties
 */
export interface User {
  readonly id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Photographer specific profile information
 */
export interface PhotographerProfile {
  readonly userId: string;
  bio: string;
  specialties: string[];
  yearsOfExperience: number;
  hourlyRate?: number;
  location: string;
  available: boolean;
  website?: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
}

/**
 * Client specific profile information
 */
export interface ClientProfile {
  readonly userId: string;
  companyName?: string;
  industry?: string;
  description?: string;
  location: string;
  website?: string;
}

/**
 * Portfolio item for photographer's work
 */
export interface PortfolioItem {
  readonly id: string;
  readonly photographerId: string;
  title: string;
  description?: string;
  imageUrl: string;
  tags: string[];
  date: Date;
  featured: boolean;
}

/**
 * Registration form data structure
 */
export interface RegisterFormData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

/**
 * Login form data structure
 */
export interface LoginFormData {
  email: string;
  password: string;
}

/**
 * Authentication response structure
 */
export interface AuthResponse {
  user: User;
  token: string;
}

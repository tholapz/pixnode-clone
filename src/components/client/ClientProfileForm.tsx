import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import type { ClientProfile } from '@/types/user';

/**
 * Form data type matching ClientProfile without userId
 */
type ClientProfileFormData = Omit<ClientProfile, 'userId'> & {
  userId?: string; // Make userId optional for the form
};

/**
 * Schema for client profile form validation
 */
const schema = yup.object({
  companyName: yup.string().transform((value) => value === '' ? undefined : value).optional(),
  industry: yup.string().transform((value) => value === '' ? undefined : value).optional(),
  description: yup.string().transform((value) => value === '' ? undefined : value).optional(),
  location: yup.string().required('Location is required'),
  website: yup.string().transform((value) => value === '' ? undefined : value)
    .url('Please enter a valid URL').optional(),
}).required();

/**
 * Props for ClientProfileForm component
 */
interface ClientProfileFormProps {
  initialData?: Partial<ClientProfileFormData>;
  onSubmit: (data: Partial<ClientProfileFormData>) => void;
  isLoading?: boolean;
}

/**
 * Form for client profile creation and management
 */
export const ClientProfileForm: React.FC<ClientProfileFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
}) => {
  const defaultValues: Partial<ClientProfileFormData> = {
    companyName: '',
    industry: '',
    description: '',
    location: '',
    website: '',
    ...initialData,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<ClientProfileFormData>>({
    resolver: yupResolver(schema) as any, // Type cast resolver to avoid complex type issues
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="companyName" className="block text-sm font-medium mb-1">
          Company Name (optional)
        </label>
        <input
          id="companyName"
          type="text"
          {...register('companyName')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          disabled={isLoading}
        />
        {errors.companyName && (
          <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="industry" className="block text-sm font-medium mb-1">
          Industry (optional)
        </label>
        <input
          id="industry"
          type="text"
          {...register('industry')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          disabled={isLoading}
        />
        {errors.industry && (
          <p className="mt-1 text-sm text-red-600">{errors.industry.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description (optional)
        </label>
        <textarea
          id="description"
          rows={4}
          {...register('description')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          disabled={isLoading}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium mb-1">
          Location
        </label>
        <input
          id="location"
          type="text"
          {...register('location')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="e.g. New York, NY"
          disabled={isLoading}
        />
        {errors.location && (
          <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="website" className="block text-sm font-medium mb-1">
          Website (optional)
        </label>
        <input
          id="website"
          type="url"
          {...register('website')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="https://example.com"
          disabled={isLoading}
        />
        {errors.website && (
          <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-2 px-4 rounded-md font-medium text-white 
          ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {isLoading ? 'Saving...' : 'Save Profile'}
      </button>
    </form>
  );
};

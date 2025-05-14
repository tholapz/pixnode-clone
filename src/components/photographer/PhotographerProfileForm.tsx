import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import type { PhotographerProfile } from '@/types/user';

/**
 * Schema for photographer profile form validation
 */
const schema = yup.object({
  bio: yup.string().required('Bio is required'),
  specialties: yup.array().min(1, 'Please select at least one specialty').required(),
  yearsOfExperience: yup.number().min(0, 'Experience must be a positive number').required(),
  hourlyRate: yup.number().nullable().transform((value) => (isNaN(value) ? null : value)),
  location: yup.string().required('Location is required'),
  available: yup.boolean().required(),
  website: yup.string().url('Please enter a valid URL').nullable(),
  socialLinks: yup.object({
    instagram: yup.string(),
    facebook: yup.string(),
    twitter: yup.string(),
    linkedin: yup.string(),
  }),
}).required();

/**
 * Props for PhotographerProfileForm component
 */
interface PhotographerProfileFormProps {
  initialData?: Partial<PhotographerProfile>;
  onSubmit: (data: Partial<PhotographerProfile>) => void;
  isLoading?: boolean;
}

/**
 * Form for photographer profile creation and management
 */
export const PhotographerProfileForm: React.FC<PhotographerProfileFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
}) => {
  const defaultValues: Partial<PhotographerProfile> = {
    bio: '',
    specialties: [],
    yearsOfExperience: 0,
    hourlyRate: undefined,
    location: '',
    available: true,
    website: '',
    socialLinks: {
      instagram: '',
      facebook: '',
      twitter: '',
      linkedin: '',
    },
    ...initialData,
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Partial<PhotographerProfile>>({
    resolver: yupResolver(schema) as any, // Type cast to fix compatibility issue
    defaultValues,
  });

  /**
   * Handles the specialty tags input
   */
  const handleSpecialtiesChange = (value: string, onChange: (value: string[]) => void): void => {
    // Convert comma-separated string to array of trimmed values
    const specialties = value.split(',').map(item => item.trim()).filter(Boolean);
    onChange(specialties);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="bio" className="block text-sm font-medium mb-1">
          Bio
        </label>
        <textarea
          id="bio"
          rows={4}
          {...register('bio')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          disabled={isLoading}
        />
        {errors.bio && (
          <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="specialties" className="block text-sm font-medium mb-1">
          Specialties
        </label>
        <Controller
          name="specialties"
          control={control}
          render={({ field }) => (
            <input
              id="specialties"
              type="text"
              value={field.value?.join(', ') || ''}
              onChange={(e) => handleSpecialtiesChange(e.target.value, field.onChange)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g. Wedding, Portrait, Commercial (comma separated)"
              disabled={isLoading}
            />
          )}
        />
        {errors.specialties && (
          <p className="mt-1 text-sm text-red-600">
            {errors.specialties.message as string}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="yearsOfExperience" className="block text-sm font-medium mb-1">
            Years of Experience
          </label>
          <input
            id="yearsOfExperience"
            type="number"
            min="0"
            {...register('yearsOfExperience', { valueAsNumber: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            disabled={isLoading}
          />
          {errors.yearsOfExperience && (
            <p className="mt-1 text-sm text-red-600">{errors.yearsOfExperience.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="hourlyRate" className="block text-sm font-medium mb-1">
            Hourly Rate (optional)
          </label>
          <input
            id="hourlyRate"
            type="number"
            min="0"
            {...register('hourlyRate', { valueAsNumber: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="e.g. 100"
            disabled={isLoading}
          />
          {errors.hourlyRate && (
            <p className="mt-1 text-sm text-red-600">{errors.hourlyRate.message}</p>
          )}
        </div>
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
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register('available')}
            disabled={isLoading}
          />
          <span>Available for hire</span>
        </label>
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

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Social Links (optional)</h3>
        
        <div>
          <label htmlFor="instagram" className="block text-sm font-medium mb-1">
            Instagram
          </label>
          <input
            id="instagram"
            type="text"
            {...register('socialLinks.instagram')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="username (without @)"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="facebook" className="block text-sm font-medium mb-1">
            Facebook
          </label>
          <input
            id="facebook"
            type="text"
            {...register('socialLinks.facebook')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="username or page name"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="twitter" className="block text-sm font-medium mb-1">
            Twitter
          </label>
          <input
            id="twitter"
            type="text"
            {...register('socialLinks.twitter')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="username (without @)"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium mb-1">
            LinkedIn
          </label>
          <input
            id="linkedin"
            type="text"
            {...register('socialLinks.linkedin')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="username"
            disabled={isLoading}
          />
        </div>
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

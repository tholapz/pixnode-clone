import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import type { PortfolioItem } from '@/types/user';

/**
 * Schema for portfolio item form validation
 */
const schema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().nullable(),
  imageUrl: yup.string().required('Image is required'),
  tags: yup.array().of(yup.string()),
  date: yup.date().default(() => new Date()),
  featured: yup.boolean().default(false),
}).required();

/**
 * Props for PortfolioItemForm component
 */
interface PortfolioItemFormProps {
  initialData?: Partial<PortfolioItem>;
  onSubmit: (data: Partial<PortfolioItem>) => void;
  isLoading?: boolean;
}

/**
 * Form for creating and editing portfolio items
 */
export const PortfolioItemForm: React.FC<PortfolioItemFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
}) => {
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData?.imageUrl || null);
  
  const defaultValues: Partial<PortfolioItem> = {
    title: '',
    description: '',
    imageUrl: '',
    tags: [],
    date: new Date(),
    featured: false,
    ...initialData,
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Partial<PortfolioItem>>({
    resolver: yupResolver(schema) as any, // Type cast to fix compatibility issue
    defaultValues,
  });

  /**
   * Handles the tags input
   */
  const handleTagsChange = (value: string, onChange: (value: string[]) => void): void => {
    // Convert comma-separated string to array of trimmed values
    const tags = value.split(',').map(item => item.trim().toLowerCase()).filter(Boolean);
    onChange(tags);
  };

  /**
   * Simulates image upload
   * In a real application, this would upload to a storage service like S3 or Cloudinary
   */
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create a preview URL for the selected image
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    
    // In a real app, you would upload the file to a server/cloud storage here
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Simulate upload completion after 3 seconds
    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      
      // In a real app, this would be the URL returned from your upload service
      const uploadedUrl = objectUrl;
      setValue('imageUrl', uploadedUrl);
    }, 3000);
    
    // Clean up the preview URL when the component unmounts
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Title
        </label>
        <input
          id="title"
          type="text"
          {...register('title')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          disabled={isLoading}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description (optional)
        </label>
        <textarea
          id="description"
          rows={3}
          {...register('description')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          disabled={isLoading}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium mb-1">
          Upload Image
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full"
          disabled={isLoading || uploadProgress !== null && uploadProgress < 100}
        />
        
        {uploadProgress !== null && uploadProgress < 100 && (
          <div className="mt-2">
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-blue-600 rounded-full" 
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">Uploading: {uploadProgress}%</p>
          </div>
        )}
        
        {previewUrl && (
          <div className="mt-4">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="h-40 w-auto object-cover rounded-md"
            />
          </div>
        )}
        
        {errors.imageUrl && (
          <p className="mt-1 text-sm text-red-600">{errors.imageUrl.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium mb-1">
          Tags (optional)
        </label>
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <input
              id="tags"
              type="text"
              value={field.value?.join(', ') || ''}
              onChange={(e) => handleTagsChange(e.target.value, field.onChange)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="e.g. portrait, wedding, outdoor (comma separated)"
              disabled={isLoading}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-1">
            Date
          </label>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <input
                id="date"
                type="date"
                value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                onChange={(e) => {
                  const date = e.target.value ? new Date(e.target.value) : new Date();
                  field.onChange(date);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                disabled={isLoading}
              />
            )}
          />
        </div>

        <div className="flex items-center h-full">
          <label className="flex items-center space-x-2 mt-6">
            <input
              type="checkbox"
              {...register('featured')}
              disabled={isLoading}
            />
            <span>Featured</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || (uploadProgress !== null && uploadProgress < 100)}
        className={`w-full py-2 px-4 rounded-md font-medium text-white 
          ${isLoading || (uploadProgress !== null && uploadProgress < 100) 
            ? 'bg-blue-400' 
            : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {isLoading ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
};

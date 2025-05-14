import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import type { RegisterFormData } from '@/types/user';

/**
 * Schema for form validation
 */
const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
  role: yup.string().oneOf(['photographer', 'client'], 'Please select a role').required('Please select a role'),
}).required();

/**
 * Props for RegisterForm component
 */
interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
  isLoading?: boolean;
  error?: string;
}

/**
 * Form for user registration with validation and role selection
 */
export const RegisterForm: React.FC<RegisterFormProps> = ({ 
  onSubmit, 
  isLoading = false, 
  error 
}) => {
  const { 
    register, 
    handleSubmit, 
    control,
    formState: { errors } 
  } = useForm<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: 'client' | 'photographer' | '';
  }>({
    resolver: yupResolver(schema) as any, // Type cast to fix compatibility issue
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
    }
  });

  /**
   * Process form submission after validation
   */
  const processSubmit = (data: any) => {
    const { confirmPassword, ...registerData } = data;
    onSubmit(registerData as RegisterFormData);
  };

  return (
    <form onSubmit={handleSubmit(processSubmit)} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          disabled={isLoading}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          disabled={isLoading}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          disabled={isLoading}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          disabled={isLoading}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="text-sm font-medium mb-1">I am a:</div>
        
        <div className="flex items-center space-x-4">
          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="photographer"
                    checked={field.value === 'photographer'}
                    onChange={() => field.onChange('photographer')}
                    disabled={isLoading}
                  />
                  <span>I am a Photographer</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="client"
                    checked={field.value === 'client'}
                    onChange={() => field.onChange('client')}
                    disabled={isLoading}
                  />
                  <span>I am a Client</span>
                </label>
              </>
            )}
          />
        </div>
        
        {errors.role && (
          <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-2 px-4 rounded-md font-medium text-white 
          ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {isLoading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};

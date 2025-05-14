import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RegisterForm } from '@/components/auth/RegisterForm';

describe('RegisterForm', () => {
  it.skip('renders register form with all required fields', () => {
    render(<RegisterForm onSubmit={jest.fn()} />);
    
    // Check for form elements
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    
    // Check for role selection
    expect(screen.getByLabelText(/i am a photographer/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/i am a client/i)).toBeInTheDocument();
    
    // Check for submit button
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it.skip('validates form inputs', async () => {
    const handleSubmit = jest.fn();
    render(<RegisterForm onSubmit={handleSubmit} />);
    
    // Try to submit with empty fields
    const submitButton = screen.getByRole('button', { name: /register/i });
    fireEvent.click(submitButton);
    
    // Check for validation errors
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
      expect(screen.getByText(/please select a role/i)).toBeInTheDocument();
    });
    
    // Ensure form was not submitted
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it.skip('validates password confirmation', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<RegisterForm onSubmit={handleSubmit} />);
    
    // Fill out the form with mismatched passwords
    await user.type(screen.getByLabelText(/name/i), 'Test User');
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.type(screen.getByLabelText(/confirm password/i), 'password456');
    await user.click(screen.getByLabelText(/i am a photographer/i));
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /register/i }));
    
    // Check for password mismatch error
    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
    
    // Ensure form was not submitted
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it.skip('submits form with valid data', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<RegisterForm onSubmit={handleSubmit} />);
    
    // Fill out the form correctly
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/password/i), 'Password123!');
    await user.type(screen.getByLabelText(/confirm password/i), 'Password123!');
    await user.click(screen.getByLabelText(/i am a client/i));
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /register/i }));
    
    // Check if form submission was called with correct data
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123!',
        role: 'client'
      });
    });
  });
});

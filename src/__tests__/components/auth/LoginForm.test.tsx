import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '@/components/auth/LoginForm';

describe('LoginForm', () => {
  it('renders login form with all required fields', () => {
    render(<LoginForm onSubmit={jest.fn()} />);
    
    // Check for form elements
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    
    // Check for submit button
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
    
    // Check for forgot password link
    expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
  });

  it.skip('validates form inputs', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<LoginForm onSubmit={handleSubmit} />);
    
    // Try to submit with empty fields
    await user.click(screen.getByRole('button', { name: /log in/i }));
    
    // Check for validation errors
    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
    
    // Ensure form was not submitted
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it.skip('validates email format', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<LoginForm onSubmit={handleSubmit} />);
    
    // Fill form with invalid email
    await user.type(screen.getByLabelText(/email/i), 'invalid-email');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /log in/i }));
    
    // Check for email format error
    await waitFor(() => {
      expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
    });
    
    // Ensure form was not submitted
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it.skip('submits form with valid data', async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();
    render(<LoginForm onSubmit={handleSubmit} />);
    
    // Fill out the form correctly
    await user.type(screen.getByLabelText(/email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/password/i), 'Password123!');
    
    // Submit the form
    await user.click(screen.getByRole('button', { name: /log in/i }));
    
    // Check if form submission was called with correct data
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'Password123!'
      });
    });
  });

  it('shows loading state when isLoading prop is true', () => {
    render(<LoginForm onSubmit={jest.fn()} isLoading={true} />);
    
    // Check for loading indicator
    expect(screen.getByRole('button', { name: /logging in/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logging in/i })).toBeDisabled();
  });

  it('displays error message when error prop is provided', () => {
    const errorMessage = 'Invalid email or password';
    render(<LoginForm onSubmit={jest.fn()} error={errorMessage} />);
    
    // Check for error message
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useCompanyStore } from '../../store/companyStore';
import { Mail, Lock, ArrowRight, Loader2, AlertTriangle } from 'lucide-react';
import { validateEmail, validatePassword } from '../../utils/validation';

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp, user } = useAuthStore();
  const { company } = useCompanyStore();

  useEffect(() => {
    // Check if we were directed here for signup
    if (location.state?.isSignUp) {
      setIsSignUp(true);
    }
  }, [location.state]);

  useEffect(() => {
    if (user) {
      // If user has no company, redirect to setup
      if (!company) {
        navigate('/setup');
        return;
      }
      // Otherwise go to dashboard
      navigate('/dashboard');
    }
  }, [user, company, navigate]);

  const validateForm = () => {
    const errors: { email?: string; password?: string } = {};
    
    if (!validateEmail(email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!validatePassword(password)) {
      errors.password = 'Password must be at least 8 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setValidationErrors({});

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error: signUpError } = await signUp(email, password);
        if (signUpError) throw signUpError;
        // After signup, redirect to setup
        navigate('/setup');
      } else {
        const { error: signInError } = await signIn(email, password);
        if (signInError) throw signInError;
        // After signin, check if company exists
        if (!company) {
          navigate('/setup');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#040707] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center items-center mb-6">
            <div className="w-3 h-3 rounded-full bg-[#72f68e]" />
            <span className="text-2xl font-bold text-white ml-2">mavrika</span>
          </div>
          <h2 className="text-center text-3xl font-bold text-white">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="mt-2 text-center text-gray-400">
            {isSignUp 
              ? 'Start automating your company with EVEs™'
              : 'Sign in to continue to your dashboard'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="flex items-center bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  type="email"
                  required
                  className={`appearance-none block w-full px-4 py-3 border ${
                    validationErrors.email ? 'border-red-500' : 'border-white/10'
                  } bg-white/5 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#72f68e] focus:border-transparent placeholder-gray-500`}
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  type="password"
                  required
                  className={`appearance-none block w-full px-4 py-3 border ${
                    validationErrors.password ? 'border-red-500' : 'border-white/10'
                  } bg-white/5 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#72f68e] focus:border-transparent placeholder-gray-500`}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                {validationErrors.password && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.password}</p>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-[#040707] bg-[#72f68e] hover:bg-[#72f68e]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#72f68e] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <div className="flex items-center">
                {isSignUp ? 'Create account' : 'Sign in'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            )}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
                setValidationErrors({});
              }}
              className="text-[#72f68e] hover:text-[#72f68e]/80 transition-colors text-sm"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authApi, authTokens, userData } from '@/services/AuthService';
import { AuthResponse } from '@/types/auth';

export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
  profile: () => [...authKeys.all, 'profile'] as const,
};

/**
 * Hook to get current user data
 */
export function useUser() {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: () => {
      const user = userData.get();
      if (!user && authTokens.isValid()) {
        // If we have a token but no user data, fetch from API
        return authApi.getProfile();
      }
      return user;
    },
    enabled: authTokens.isValid(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
}

/**
 * Hook to get fresh user profile from API
 */
export function useProfile() {
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: authApi.getProfile,
    enabled: authTokens.isValid(),
    staleTime: 1 * 60 * 1000, // 1 minute
    retry: (failureCount, error: any) => {
      // Don't retry on 401 errors
      if (error?.response?.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
  });
}

/**
 * Hook for user registration
 */
export function useRegister() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data: AuthResponse) => {
      // Store auth data
      authTokens.set(data.access_token);
      userData.set(data.user);
      
      // Update React Query cache
      queryClient.setQueryData(authKeys.user(), data.user);
      queryClient.setQueryData(authKeys.profile(), data.user);
      
      // Redirect to dashboard
      router.push('/dashboard');
    },
  });
}

/**
 * Hook for user login
 */
export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data: AuthResponse) => {
      // Store auth data
      authTokens.set(data.access_token);
      userData.set(data.user);
      
      // Update React Query cache
      queryClient.setQueryData(authKeys.user(), data.user);
      queryClient.setQueryData(authKeys.profile(), data.user);
      
      // Redirect to dashboard
      router.push('/dashboard');
    },
  });
}

/**
 * Hook for user logout
 */
export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Clear auth data
      authTokens.remove();
      userData.remove();
      
      // Clear React Query cache
      queryClient.removeQueries({ queryKey: authKeys.all });
      queryClient.clear();
      
      // Redirect to login
      router.push('/auth/login');
    },
    onError: (error) => {
      // Still clear data and redirect even if API call fails
      authTokens.remove();
      userData.remove();
      queryClient.removeQueries({ queryKey: authKeys.all });
      queryClient.clear();
      router.push('/auth/login');
    },
  });
}

/**
 * Hook to check authentication status
 */
export function useAuth() {
  const { data: user, isLoading, error } = useUser();
  
  return {
    user,
    isAuthenticated: !!user && authTokens.isValid(),
    isLoading,
    error,
  };
}

/**
 * Hook for protected routes
 */
export function useAuthGuard() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  if (!isLoading && !isAuthenticated) {
    router.push('/auth/login');
  }

  return { isAuthenticated, isLoading };
}

/**
 * Hook for forgot password
 */
export function useForgotPassword() {
  return useMutation({
    mutationFn: authApi.forgotPassword,
  });
}

/**
 * Hook for reset password
 */
export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: () => {
      // Redirect to login after successful password reset
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    },
  });
}

/**
 * Hook to validate reset token
 */
export function useValidateResetToken(token: string) {
  return useQuery({
    queryKey: ['validateResetToken', token],
    queryFn: () => authApi.validateResetToken(token),
    enabled: !!token,
    retry: false,
    staleTime: 0,
  });
}

'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 0,
      networkMode: 'online',
    },
    mutations: {
      onError: error => {
        if (axios.isAxiosError(error)) {
          if (error.code === 'ERR_NETWORK') {
            // Handle network error
            console.error('Network error:', error);
          } else if (error.response?.status === 400) {
            // Handle CORS error or other specific errors
            console.error('CORS error or other specific error:', error);
          } else {
            // Handle other errors
            console.error('An error occurred:', error);
          }
        } else {
          // Handle non-Axios errors
          console.error('An error occurred:', error);
        }
      },
      retry: (failureCount, error) => {
        if (axios.isAxiosError(error)) {
          if (error.code === 'ERR_NETWORK') {
            // Retry the request after a delay (e.g., 2 seconds)
            return failureCount < 3; // Retry up to 3 times
          } else if (error.response?.status === 400) {
            // Retry the request after a delay (e.g., 2 seconds)
            return failureCount < 3; // Retry up to 3 times
          }
        }
        return false; // Do not retry for other errors
      },
      retryDelay: failureCount => Math.min(1000 * 2 ** failureCount, 30000), // Exponential backoff
    },
  },
});

export default function QueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

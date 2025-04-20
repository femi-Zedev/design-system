'use client';

import { Button } from '@mantine/core';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
          <div className="max-w-md">
            <h1 className="text-2xl font-bold text-error-600 mb-4">Something went wrong!</h1>
            <p className="text-gray-600 mb-6">
              We apologize for the inconvenience. Our team has been notified of this issue.
            </p>
            <Button
              onClick={reset}
              variant="filled"
              size="md"
              className="bg-brand-500 hover:bg-brand-600"
            >
              Try again
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}

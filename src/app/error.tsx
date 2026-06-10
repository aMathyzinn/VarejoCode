'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-discord-darkest">
      <div className="text-center px-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Algo deu errado!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Desculpe, ocorreu um erro inesperado.
        </p>
        <button
          onClick={reset}
          className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}

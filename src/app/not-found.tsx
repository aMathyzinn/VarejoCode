import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-discord-darkest">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold mb-4 text-gray-900 dark:text-white">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
          Página não encontrada
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          A página que você está procurando não existe.
        </p>
        <Link
          href="/"
          className="inline-block bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Voltar para Home
        </Link>
      </div>
    </div>
  );
}

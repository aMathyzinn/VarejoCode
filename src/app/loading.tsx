export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-discord-darkest">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-700 border-t-black dark:border-t-white rounded-full animate-spin" />
        <p className="text-gray-600 dark:text-gray-400 text-sm animate-pulse">
          Carregando...
        </p>
      </div>
    </div>
  );
}

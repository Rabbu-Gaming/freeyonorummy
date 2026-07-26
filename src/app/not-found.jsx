import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-8xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-6">Page not found</p>
      <p className="text-gray-500 mb-10 max-w-md">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <Link
        href="/"
        className="
          inline-flex items-center
          px-6 py-2.5
          bg-transparent
          text-black text-sm font-medium
          border border-black rounded-lg
          hover:bg-gray-100 hover:border-gray-800
          transition-colors duration-200
        "
      >
        Return to Home
      </Link>
    </div>
  );
}

export const dynamic = 'force-static';
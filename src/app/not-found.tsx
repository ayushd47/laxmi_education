import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-6xl font-bold text-royal-blue mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-royal-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Go to Homepage
          </Link>
          <Link
            href="/contact-us"
            className="bg-gray-200 text-gray-900 font-semibold px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-200"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}


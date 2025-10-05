

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#800000]">404</h1>
        <p className="text-2xl text-gray-700 mt-4">Page Not Found</p>
        <p className="text-lg text-gray-600 mt-2">The page you're looking for doesn't exist.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;

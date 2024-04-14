import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Page Not Found</h2>
        <Link to="/" className="btn primary">Go to Home</Link>
      </div>
    </section>
  );
};

export default ErrorPage;

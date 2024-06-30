import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800">Greska 404</h1>
        <p className="text-gray-600 mt-2">
          Stranica nije pronadjena. Kliknite{" "}
          <Link to="/" className="link link-secondary">
            ovde
          </Link>{" "}
          da odete na pocetnu stranicu.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;

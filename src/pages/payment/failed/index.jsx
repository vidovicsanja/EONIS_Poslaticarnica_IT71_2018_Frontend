import { Link } from "react-router-dom";

const PaymentFailedPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800">
          Greska pri kupovini
        </h1>
        <p className="text-gray-600 mt-2">
          Problem sa obradom porudzbine. Klikni{" "}
          <Link to="/user/proizvodi" className="link link-secondary">
            ovde
          </Link>{" "}
          da odete na pocetnu stranicu.
        </p>
      </div>
    </div>
  );
};

export default PaymentFailedPage;

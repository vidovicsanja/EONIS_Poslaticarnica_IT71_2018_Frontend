import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";

import avatar from "../../../assets/avatar.webp";
import { STRIPE_PUBLIC_KEY } from "../../../config/stripe";
import { getTrenutni } from "../../../services/korisnik";
import { AuthContext } from "../../../context/auth-context";
import { usePorudzbinaStore } from "../../../store/use-porudzbina-store";
import { getUkupnaCijena, stripeSesija } from "../../../services/korpa";

const UserHeaderComponent = () => {
  const [data, setData] = useState();

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  const korpa = usePorudzbinaStore((state) => state?.korpa);
  const izbrisiProizvod = usePorudzbinaStore((state) => state?.izbrisiProizvod);

  const modalRef = useRef();

  useEffect(() => {
    getTrenutni().then((r) => {
      setData(r);
    });
  }, []);

  const handleLogout = () => {
    authContext?.logout();
    navigate("/");
  };

  const handleOpenCart = () => {
    modalRef.current.showModal();
  };

  const handleCheckout = async () => {
    const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

    let stripe = await stripePromise;

    stripeSesija({
      korisnikId: data?.id,
      items: korpa?.proizvodi?.map((p) => ({
        productId: p?.id,
        productName: p?.nazivProizvoda,
        productDescription: p?.opis,
        productPrice: p?.cena * 100,
        quantity: p?.kolicina,
      })),
    }).then(async (sessionId) => {
      await stripe.redirectToCheckout(sessionId);
    });
  };

  const handleRemove = (productId) => {
    izbrisiProizvod(productId);
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Poslasticarnica</a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {korpa?.proizvodIds?.length}
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold">
                  {korpa?.proizvodIds?.length > 0
                    ? `${korpa?.proizvodIds?.length} stavki`
                    : "Prazno"}
                </span>
                <span className="text-info">
                  Ukupno EUR {getUkupnaCijena(korpa)}
                </span>
                <div className="card-actions">
                  <button
                    className="btn btn-ghost btn-block btn-sm"
                    onClick={handleOpenCart}
                  >
                    Prikazi
                  </button>
                  <button
                    className="btn btn-secondary btn-block btn-sm"
                    onClick={handleCheckout}
                  >
                    Zavrsi
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={avatar} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/podesavanja">Moj profil</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Odjavi se</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Korpa</h3>
          {korpa?.proizvodi?.map((proizvod, idx) => (
            <div
              key={`stavka__${idx + 1}`}
              className="flex flex-row justify-between py-1"
            >
              <button
                className="btn btn-circle btn-ghost btn-xs"
                onClick={() => handleRemove(proizvod?.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div>{proizvod?.nazivProizvoda}</div>
              <div className="flex flex-col items-end gap-1">
                <div>
                  EUR <strong>{proizvod?.cena * proizvod?.kolicina}</strong>
                </div>
                <div>
                  Kolicina: <strong>{proizvod?.kolicina}</strong>
                </div>
              </div>
            </div>
          ))}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm">Zatvori</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default UserHeaderComponent;

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProizvodi } from "../../services/proizvod";

const HomePage = () => {
  const [options, setOptions] = useState({
    perPage: 10,
    page: 1,
    sort: "ID",
    direction: "asc",
  });
  const [data, setData] = useState([]);

  useMemo(() => {
    getProizvodi(options).then((r) => {
      setData({
        metada: r?.metada,
        data: [...(data?.data?.length > 0 ? data?.data : []), ...r?.data],
      });
    });
  }, [options]);

  const handleLoadMore = () => {
    setOptions({
      ...options,
      page: options?.page + 1,
    });
  };

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/auth/login");
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Poslasticarnica</a>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost" onClick={handleLogin}>
            Prijava
          </button>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="flex flex-col gap-5">
          <div className="flex flex-row flex-wrap justify-center gap-3">
            {data?.data?.length > 0 ? (
              data?.data?.map((d, idx) => (
                <div
                  key={`proizvod__${idx + 1}`}
                  className="card w-96 bg-base-100 shadow-xl"
                >
                  <div className="card-body">
                    <h2 className="card-title">{d?.nazivProizvoda}</h2>
                    <p>{d?.opis}</p>
                    <div className="card-actions justify-between">
                      <div>
                        EUR <strong>{d?.cena}</strong>
                      </div>
                      <div className="flex flex-row gap-1">
                        <input
                          id={`proizvod__kolicina__${d?.id}`}
                          type="number"
                          min="1"
                          defaultValue={1}
                          placeholder="Kolicina"
                          className="input input-bordered input-sm max-w-24"
                        />
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={handleLogin}
                        >
                          Dodaj
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div role="alert" className="alert alert-warning">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>Nema dodatih proizvoda</span>
              </div>
            )}
          </div>
          {data?.metada?.totalPages > 1 &&
            data?.metada?.totalPages > data?.metada?.currentPage && (
              <button
                className="btn btn-ghost btn-block"
                onClick={handleLoadMore}
              >
                Vise proizvoda
              </button>
            )}
        </div>
      </div>
    </>
  );
};

export default HomePage;

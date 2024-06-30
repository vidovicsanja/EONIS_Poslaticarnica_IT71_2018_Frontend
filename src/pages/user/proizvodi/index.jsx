import { useMemo, useState } from "react";

import { getProizvodi, getProizvodiByName } from "../../../services/proizvod";
import { usePorudzbinaStore } from "../../../store/use-porudzbina-store";

const UserProizvodiPage = () => {
  const [options, setOptions] = useState({
    perPage: 10,
    page: 1,
    sort: "ID",
    direction: "asc",
  });
  const [data, setData] = useState([]);

  const dodajProizvod = usePorudzbinaStore((state) => state?.dodajProizvod);

  useMemo(() => {
    getProizvodi(options).then((r) => {
      setData({
        metada: r?.metada,
        data: [
          ...(data?.data?.length > 0 ? data?.data : []),
          ...r?.data,
        ]?.filter(
          (obj, index, self) =>
            index === self.findIndex((t) => t?.id === obj?.id)
        ),
      });
    });
  }, [options]);

  const handleLoadMore = () => {
    setOptions({
      ...options,
      page: options?.page + 1,
    });
  };

  const handleAdd = (proizvod) => {
    const kolicina = document.getElementById(
      `proizvod__kolicina__${proizvod?.id}`
    );

    dodajProizvod({ ...proizvod, kolicina: parseInt(kolicina?.value) });
  };

  const handleSearch = (e) => {
    if (e?.target?.value === "" || e?.target?.value === null) {
      setOptions(() => ({
        perPage: 10,
        page: 1,
        sort: "ID",
        direction: "asc",
      }));

      return;
    }

    getProizvodiByName({ name: e?.target?.value }).then((r) => {
      setData({
        ...data,
        data: r,
      });
    });
  };

  return (
    <>
      <div className="container mx-auto mb-5">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            onChange={handleSearch}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row flex-wrap justify-center gap-3">
          {data?.data?.map((d, idx) => (
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
                      onClick={() => handleAdd(d)}
                    >
                      Dodaj
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
    </>
  );
};

export default UserProizvodiPage;

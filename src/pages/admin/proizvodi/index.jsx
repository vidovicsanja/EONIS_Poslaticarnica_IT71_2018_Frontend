import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  dodajProizvod,
  getKategorijeProizvoda,
  getProizvod,
  getProizvodi,
  izbrisiProizvod,
  izmjeniProizvod,
} from "../../../services/proizvod";
import TdOptionsComponent from "../../../components/td-options";
import PaginationComponent from "../../../components/pagination";
import LoadingComponent from "../../../components/loading";
import SortComponent from "../../../components/sort";

const ProizvodiPage = () => {
  const [pagination, setPagination] = useState({
    perPage: 10,
    page: 1,
    sort: "ID",
    direction: "asc",
  });
  const [data, setData] = useState([]);
  const [kategorije, setKategorije] = useState([]);
  const [isEdit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { isValid },
    setValue,
    getValues,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      nazivProizvoda: "",
      opis: "",
      cena: "",
      idkp: -1,
    },
    resolver: yupResolver(
      yup
        .object({
          nazivProizvoda: yup.string().required(),
          opis: yup.string().required(),
          cena: yup.number().required(),
          idkp: yup.number().required(),
        })
        .required()
    ),
  });

  const modalRef = useRef();
  const selectedItemRef = useRef(null);

  useEffect(() => {
    setLoading(true);

    getKategorijeProizvoda({
      perPage: 100,
      page: 1,
      sort: "ID",
      direction: "asc",
    }).then((r) => {
      setKategorije(r);
    });
    getProizvodi(pagination).then((r) => {
      setLoading(false);
      setData(r);
    });
  }, [pagination]);

  const handleOpenModal = () => {
    setEdit(false);
    modalRef.current.showModal();
  };

  const handleCloseModal = () => {
    modalRef.current.close();
    reset();
  };

  const onSubmit = (data) => {
    setLoading(true);

    if (isEdit) {
      izmjeniProizvod({
        ...data,
        id: selectedItemRef.current,
        deleted: false,
      }).then(() => {
        setLoading(false);
        setPagination({
          perPage: 10,
          page: 1,
          sort: "ID",
          direction: "asc",
        });
        handleCloseModal();
      });
    } else {
      dodajProizvod(data).then(() => {
        setLoading(false);
        setPagination({
          perPage: 10,
          page: 1,
          sort: "ID",
          direction: "asc",
        });
        handleCloseModal();
      });
    }
  };

  const handleEdit = (id) => {
    getProizvod(id).then((r) => {
      selectedItemRef.current = id;
      setEdit(true);
      setValue("nazivProizvoda", r?.nazivProizvoda);
      setValue("opis", r?.opis);
      setValue("cena", r?.cena);
      setValue("idkp", r?.idkp);

      modalRef.current.showModal();
    });
  };

  const handleDelete = (id) => {
    setLoading(true);
    izbrisiProizvod(id).then(() => {
      setLoading(false);
      setPagination({
        perPage: 10,
        page: 1,
        sort: "ID",
        direction: "asc",
      });
    });
  };

  const handlePaginate = (page) => {
    setPagination({
      ...pagination,
      page,
    });
  };

  const handleSort = (sort) => {
    setPagination({
      ...pagination,
      sort,
    });
  };

  const handleDirection = (e) => {
    setPagination({
      ...pagination,
      direction: e?.target?.checked ? "desc" : "asc",
    });
  };

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <div className="flex flex-row items-center gap-3">
            <button className="btn  btn-sm" onClick={handleOpenModal}>
              Dodaj novog prodavca
            </button>
            <h4>Sort</h4>
            <SortComponent
              labels={["ID", "NazivProizvoda", "Opis", "Cena"]}
              selectedLabel={pagination?.sort}
              onSort={handleSort}
            />
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text mr-3">Opadajuce</span>
                <input
                  type="checkbox"
                  value="desc"
                  checked={pagination?.direction === "desc"}
                  className="checkbox"
                  onChange={handleDirection}
                />
              </label>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Naziv proizvoda</th>
                  <th>Opis</th>
                  <th>Cena (EUR)</th>
                  <th>Opcije</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((d, idx) => (
                  <tr key={`proizvod${idx + 1}`}>
                    <th>{d?.id}</th>
                    <td>{d?.nazivProizvoda}</td>
                    <td>{d?.opis}</td>
                    <td>{d?.cena}</td>
                    <td>
                      <TdOptionsComponent
                        id={d?.id}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <PaginationComponent
            totalPages={data?.metada?.totalPages}
            pagination={pagination}
            handlePaginate={handlePaginate}
          />
        </>
      )}

      <dialog ref={modalRef} className="modal">
        <div className="modal-box w-full max-w-xs">
          <h3 className="font-bold text-lg">Podaci o proizvodu</h3>
          <div className="flex flex-col gap-3 py-4">
            <input
              {...register("nazivProizvoda")}
              type="text"
              placeholder="Naziv proizvoda"
              className="input input-bordered input-sm w-full max-w-xs"
            />
            <input
              {...register("opis")}
              type="text"
              placeholder="Opis"
              className="input input-bordered input-sm w-full max-w-xs"
            />
            <input
              {...register("cena")}
              type="number"
              min="0"
              placeholder="Cena"
              className="input input-bordered input-sm w-full max-w-xs"
            />
            <select
              {...register("idkp")}
              className="input input-bordered input-sm w-full max-w-xs"
            >
              <option value={-1}>Izaberite...</option>
              {kategorije?.data?.map((k, idx) => (
                <option
                  key={`kategorija__${idx + 1}`}
                  value={k?.id}
                  // selected={getValues("idkp") === k?.id}
                >
                  {k?.nazivKategorije}
                </option>
              ))}
            </select>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn btn-secondary btn-sm mr-2"
                disabled={!isValid}
                onClick={handleSubmit(onSubmit)}
              >
                Sacuvaj
              </button>
              <button
                className="btn btn-ghost btn-sm"
                onClick={handleCloseModal}
              >
                Izadji
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ProizvodiPage;

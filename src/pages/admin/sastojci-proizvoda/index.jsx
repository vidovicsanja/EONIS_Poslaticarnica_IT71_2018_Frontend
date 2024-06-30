import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  dodajSastojak,
  getSastojak,
  getSastojci,
  izbrisiSastojak,
  izmjeniSastojak,
} from "../../../services/sastojak";
import LoadingComponent from "../../../components/loading";
import TdOptionsComponent from "../../../components/td-options";
import PaginationComponent from "../../../components/pagination";
import SortComponent from "../../../components/sort";

const SastojciProizvodaPage = () => {
  const [pagination, setPagination] = useState({
    perPage: 10,
    page: 1,
    sort: "ID",
    direction: "asc",
  });
  const [data, setData] = useState([]);
  const [isEdit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { isValid },
    setValue,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      nazivSastojka: "",
      alergen: "",
    },
    resolver: yupResolver(
      yup
        .object({
          nazivSastojka: yup.string().required(),
          alergen: yup.string().required(),
        })
        .required()
    ),
  });

  const modalRef = useRef();
  const selectedItemRef = useRef(null);

  useEffect(() => {
    setLoading(true);

    getSastojci(pagination).then((r) => {
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
      izmjeniSastojak({
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
      dodajSastojak(data).then(() => {
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
    getSastojak(id).then((r) => {
      selectedItemRef.current = id;
      setEdit(true);
      setValue("nazivSastojka", r?.nazivSastojka);
      setValue("alergen", r?.alergen);

      modalRef.current.showModal();
    });
  };

  const handleDelete = (id) => {
    setLoading(true);

    izbrisiSastojak(id).then(() => {
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
              Dodaj novi sastojak
            </button>
            <h4>Sort</h4>
            <SortComponent
              labels={["ID", "NazivSastojka", "Alergen"]}
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
                  <th>Naziv sastojka</th>
                  <th>Alergen</th>
                  <th>Opcije</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((d, idx) => (
                  <tr key={`sastojak-proizvoda__${idx + 1}`}>
                    <th>{d?.id}</th>
                    <td>{d?.nazivSastojka}</td>
                    <td>{d?.alergen}</td>
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
          <h3 className="font-bold text-lg">Podaci o sastojku</h3>
          <div className="flex flex-col gap-3 py-4">
            <input
              {...register("nazivSastojka")}
              type="text"
              placeholder="Naziv sastojka"
              className="input input-bordered input-sm w-full max-w-xs"
            />
            <input
              {...register("alergen")}
              type="text"
              placeholder="Alergen"
              className="input input-bordered input-sm w-full max-w-xs"
            />
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

export default SastojciProizvodaPage;

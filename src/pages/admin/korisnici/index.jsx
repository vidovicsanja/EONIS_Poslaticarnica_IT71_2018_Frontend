import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  dodajProdavca,
  getKorisnici,
  getKorisnik,
  izbrisiKorisnika,
  izmjeniKorisnika,
} from "../../../services/korisnik";
import LoadingComponent from "../../../components/loading";
import PaginationComponent from "../../../components/pagination";
import TdOptionsComponent from "../../../components/td-options";
import SortComponent from "../../../components/sort";

const KorisniciPage = () => {
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
      ime: "",
      prezime: "",
      email: "",
      brojTelefona: "",
      korisnickoIme: "",
      lozinka: "",
      uloga: "",
    },
    resolver: yupResolver(
      yup
        .object({
          ime: yup.string().required(),
          prezime: yup.string().required(),
          email: yup.string().required(),
          brojTelefona: yup.string().required(),
          korisnickoIme: yup.string().required(),
          lozinka: yup.string().required(),
        })
        .required()
    ),
  });

  const modalRef = useRef();
  const selectedItemRef = useRef(null);

  useEffect(() => {
    setLoading(true);

    getKorisnici(pagination).then((r) => {
      setData(r);
      setLoading(false);
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
      izmjeniKorisnika({
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
      dodajProdavca(data).then(() => {
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
    getKorisnik(id).then((r) => {
      selectedItemRef.current = id;
      setEdit(true);
      setValue("ime", r?.ime);
      setValue("prezime", r?.prezime);
      setValue("email", r?.email);
      setValue("brojTelefona", r?.brojTelefona);
      setValue("korisnickoIme", r?.korisnickoIme);
      setValue("lozinka", r?.lozinka);
      setValue("uloga", r?.uloga);

      modalRef.current.showModal();
    });
  };

  const handleDelete = (id) => {
    setLoading(true);

    izbrisiKorisnika(id).then(() => {
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
              labels={["ID", "Ime", "Prezime", "KorisnickoIme"]}
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
                  <th>Ime</th>
                  <th>Prezime</th>
                  <th>Email</th>
                  <th>Telefon</th>
                  <th>Nadimak</th>
                  <th>Uloga</th>
                  <th>Opcije</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((d, idx) => (
                  <tr key={`korisnik__${idx + 1}`}>
                    <th>{d?.id}</th>
                    <td>{d?.ime}</td>
                    <td>{d?.prezime}</td>
                    <td>{d?.email}</td>
                    <td>{d?.brojTelefona}</td>
                    <td>{d?.korisnickoIme}</td>
                    <td>{d?.uloga}</td>
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
          <h3 className="font-bold text-lg">Podaci o korisniku</h3>
          <div className="flex flex-col gap-3 py-4">
            <input
              {...register("ime")}
              type="text"
              placeholder="Ime"
              className="input input-bordered input-sm w-full max-w-xs"
            />
            <input
              {...register("prezime")}
              type="text"
              placeholder="Prezime"
              className="input input-bordered input-sm w-full max-w-xs"
            />
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="input input-bordered input-sm w-full max-w-xs"
            />
            <input
              {...register("brojTelefona")}
              type="text"
              placeholder="Broj telefona (06XXXXXXX)"
              className="input input-bordered input-sm w-full max-w-xs"
            />
            <input
              {...register("korisnickoIme")}
              type="text"
              placeholder="Nadimak"
              className="input input-bordered input-sm w-full max-w-xs"
            />
            {!isEdit && (
              <input
                {...register("lozinka")}
                type="password"
                placeholder="Lozinka"
                className="input input-bordered input-sm w-full max-w-xs"
              />
            )}
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

export default KorisniciPage;

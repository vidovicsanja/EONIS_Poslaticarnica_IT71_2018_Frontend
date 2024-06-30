import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import welcome from "../../../assets/welcome.webp";
import ToastError from "../../../components/toast/error";
import { registracija } from "../../../services/auth";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const {
    register,
    formState: { isValid },
    handleSubmit,
  } = useForm({
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

  const navigate = useNavigate();

  const onSubmit = (data) => {
    setLoading(true);

    registracija(data)
      .then((r) => {
        setLoading(false);

        navigate("/auth/login");
      })
      .catch((error) => {
        setLoading(false);
        setError(error?.response?.data);
      });
  };

  const handleLogin = () => {
    navigate("/auth/login");
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="card lg:card-side bg-base-100 shadow-xl">
          <figure className="max-w-md p-5">
            <img src={welcome} alt="Welcome" className="rounded-2xl" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Registracija</h2>
            <div>Unesite svoje podatke kako bi ste napravili nalog</div>
            <div className="flex flex-col flex-grow gap-3 my-3">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Ime</span>
                </div>
                <input
                  {...register("ime")}
                  type="text"
                  placeholder="Ime"
                  className="input input-bordered input-sm w-full"
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Prezime</span>
                </div>
                <input
                  {...register("prezime")}
                  type="text"
                  placeholder="Prezime"
                  className="input input-bordered input-sm w-full"
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Email</span>
                </div>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Email"
                  className="input input-bordered input-sm w-full"
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Broj telefona</span>
                </div>
                <input
                  {...register("brojTelefona")}
                  type="text"
                  placeholder="Broj telefona"
                  className="input input-bordered input-sm w-full"
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Korisnicko ime</span>
                </div>
                <input
                  {...register("korisnickoIme")}
                  type="text"
                  placeholder="Korisnicko ime"
                  className="input input-bordered input-sm w-full"
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Lozinka</span>
                </div>
                <input
                  {...register("lozinka")}
                  type="password"
                  placeholder="Lozinka"
                  className="input input-bordered input-sm w-full"
                />
              </label>
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-ghost btn-sm" onClick={handleLogin}>
                Prijava
              </button>
              <button
                className="btn btn-secondary btn-sm"
                disabled={loading || !isValid}
                onClick={handleSubmit(onSubmit)}
              >
                Registracija
              </button>
            </div>
          </div>
        </div>
      </div>
      {error && (
        <ToastError
          text={error}
          handleLeave={() => {
            setError(null);
          }}
        />
      )}
    </>
  );
};

export default RegisterPage;

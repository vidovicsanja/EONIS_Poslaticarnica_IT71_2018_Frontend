import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import welcome from "../../../assets/welcome.webp";
import ToastError from "../../../components/toast/error";
import { AuthContext } from "../../../context/auth-context.jsx";
import { login } from "../../../services/auth/index.js";

const LoginPage = () => {
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
          email: yup.string().required(),
          lozinka: yup.string().required(),
        })
        .required()
    ),
  });

  const authContext = useContext(AuthContext);

  const navigate = useNavigate();

  const onSubmit = (data) => {
    setLoading(true);

    login(data)
      .then((r) => {
        authContext?.login(r?.token);
      })
      .catch((error) => {
        setLoading(false);
        setError(error?.response?.data);
      });
  };

  const handleRegister = () => {
    navigate("/auth/register");
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="card lg:card-side bg-base-100 shadow-xl">
          <figure className="max-w-md p-5">
            <img src={welcome} alt="Welcome" className="rounded-2xl" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Prijava</h2>
            <div>Unesite kredencijale kako bi ste pristupili sistemu</div>
            <div className="flex flex-col flex-grow gap-3 my-5">
              <label className="input input-bordered input-sm flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  {...register("email")}
                  type="text"
                  placeholder="Email"
                  className="grow"
                />
              </label>
              <label className="input input-bordered input-sm flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  {...register("lozinka")}
                  type="password"
                  placeholder="Lozinka"
                  className="grow"
                />
              </label>
            </div>

            <div className="card-actions justify-end">
              <button className="btn btn-ghost btn-sm" onClick={handleRegister}>
                Registracija
              </button>
              <button
                className="btn btn-secondary btn-sm"
                disabled={loading || !isValid}
                onClick={handleSubmit(onSubmit)}
              >
                Prijava
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

export default LoginPage;

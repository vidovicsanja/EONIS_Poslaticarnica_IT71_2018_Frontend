import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import ToastSuccess from "../../components/toast/success";
import { getCurrent, izmjeniKorisnika } from "../../services/korisnik";

const SettingsPage = () => {
  const [success, setSuccess] = useState(false);
  const {
    register,
    formState: { isValid },
    setValue,
    handleSubmit,
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

  useEffect(() => {
    getCurrent().then((r) => {
      setValue("id", r?.id);
      setValue("ime", r?.ime);
      setValue("prezime", r?.prezime);
      setValue("email", r?.email);
      setValue("brojTelefona", r?.brojTelefona);
      setValue("korisnickoIme", r?.korisnickoIme);
      setValue("lozinka", r?.lozinka);
      setValue("uloga", r?.uloga);
    });
  }, []);

  const onSubmit = (data) => {
    izmjeniKorisnika({
      ...data,
      deleted: false,
    }).then(() => {
      setSuccess(true);
    });
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
          <h1 className="text-2xl font-bold text-gray-800">Moji podaci</h1>
          <div className="flex flex-col gap-3 py-4">
            <input
              {...register("ime")}
              type="text"
              placeholder="Ime"
              className="input input-bordered input-sm w-full"
            />
            <input
              {...register("prezime")}
              type="text"
              placeholder="Prezime"
              className="input input-bordered input-sm w-full"
            />
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="input input-bordered input-sm w-full"
            />
            <input
              {...register("brojTelefona")}
              type="text"
              placeholder="Broj telefona (06XXXXXXX)"
              className="input input-bordered input-sm w-full"
            />
            <input
              {...register("korisnickoIme")}
              type="text"
              placeholder="Nadimak"
              className="input input-bordered input-sm w-full"
            />
            <button
              className="btn btn-secondary btn-sm"
              disabled={!isValid}
              onClick={handleSubmit(onSubmit)}
            >
              Sacuvaj
            </button>
            <button className="btn btn-ghost btn-sm" onClick={handleBack}>
              Nazad
            </button>
          </div>
        </div>
      </div>

      {success && (
        <ToastSuccess
          text="Podaci uspjesno sacuvani"
          handleLeave={() => {
            setSuccess(false);
          }}
        />
      )}
    </>
  );
};

export default SettingsPage;

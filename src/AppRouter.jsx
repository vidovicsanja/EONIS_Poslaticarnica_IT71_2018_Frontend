import { createBrowserRouter } from "react-router-dom";

import AuthPage from "./pages/auth";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import HomePage from "./pages/home";
import UserPage from "./pages/user";
import UserProizvodiPage from "./pages/user/proizvodi";
import AdminPage from "./pages/admin";
import KategorijaProizvodaPage from "./pages/admin/kategorija-proizvoda";
import KorisniciPage from "./pages/admin/korisnici";
import SastojciProizvodaPage from "./pages/admin/sastojci-proizvoda";
import ProizvodiPage from "./pages/admin/proizvodi";
import PorudzbinePage from "./pages/admin/porudzbine";
import PaymentPage from "./pages/payment";
import PaymentSuccessPage from "./pages/payment/success";
import PaymentFailedPage from "./pages/payment/failed";
import NotFoundPage from "./pages/not-found";
import SettingsPage from "./pages/settings";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/user",
    element: <UserPage />,
    children: [
      {
        path: "proizvodi",
        element: <UserProizvodiPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminPage />,
    children: [
      {
        path: "kategorije-proizvoda",
        element: <KategorijaProizvodaPage />,
      },
      {
        path: "korisnici",
        element: <KorisniciPage />,
      },
      {
        path: "sastojci-proizvoda",
        element: <SastojciProizvodaPage />,
      },
      {
        path: "proizvodi",
        element: <ProizvodiPage />,
      },
      {
        path: "porudzbine",
        element: <PorudzbinePage />,
      },
    ],
  },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/payment",
    element: <PaymentPage />,
    children: [
      {
        path: "success",
        element: <PaymentSuccessPage />,
      },
      {
        path: "failed",
        element: <PaymentFailedPage />,
      },
    ],
  },
  {
    path: "/podesavanja",
    element: <SettingsPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;

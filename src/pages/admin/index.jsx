import { NavLink, Outlet } from "react-router-dom";

import AdminHeaderComponent from "../../components/admin/header";

const AdminPage = () => {
  return (
    <>
      <AdminHeaderComponent />
      <div className="max-w-5xl mx-auto my-5">
        <div className="flex flex-row gap-3">
          <div className="basis-1/4">
            <ul className="menu bg-base-200 w-56 rounded-box space-y-3">
              <li>
                <NavLink to="/admin/korisnici" activeclassname="active">
                  Korisnici
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/kategorije-proizvoda"
                  activeclassname="active"
                >
                  Kategorije
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/sastojci-proizvoda"
                  activeclassname="active"
                >
                  Sastojci
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/proizvodi" activeclassname="active">
                  Proizvodi
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/porudzbine" activeclassname="active">
                  Porudzbine
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="basis-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;

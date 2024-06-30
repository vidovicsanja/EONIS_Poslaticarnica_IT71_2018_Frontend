import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getTrenutni } from "../../../services/korisnik";
import { AuthContext } from "../../../context/auth-context";

const AdminHeaderComponent = () => {
  const [data, setData] = useState();

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  useEffect(() => {
    getTrenutni().then((r) => {
      setData(r);
    });
  }, []);

  const handleLogout = () => {
    authContext?.logout();
    navigate("/");
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Poslasticarnica AdminPanel</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>
                Dobrodošao, <strong>{data?.korisnickoIme}</strong>
              </summary>
              <ul className="p-2 bg-base-100 rounded-t-none">
                <li>
                  <Link to="/podesavanja">Moj profil</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Odjavi se</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminHeaderComponent;

import { Outlet } from "react-router-dom";

import UserHeaderComponent from "../../components/user/header";

const UserPage = () => {
  return (
    <>
      <UserHeaderComponent />
      <div className="mx-auto max-w-5xl mx-auto my-5">
        <Outlet />
      </div>
    </>
  );
};

export default UserPage;

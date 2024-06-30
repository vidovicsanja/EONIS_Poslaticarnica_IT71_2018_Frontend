import { Outlet } from "react-router-dom";

import { AuthProvider } from "../../context/auth-context";

const AuthPage = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default AuthPage;

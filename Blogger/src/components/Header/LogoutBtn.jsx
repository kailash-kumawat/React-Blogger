import React from "react";
import { useDispatch } from "react-redux";
import { authService } from "../../appwrite/config.js";
import { logout } from "../../store/authSlice.js";

function LogoutBtn() {
  const dispatch = useDispatch();
  const handleLogout = () =>
    authService.logout().then(() => {
      dispatch(logout());
    });

  return (
    <div className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
      Logout
    </div>
  );
}

export default LogoutBtn;

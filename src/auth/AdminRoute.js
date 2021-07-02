import React from "react";
import { Route, Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

export default function AdminRoute({ children, ...props }) {
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  // Nếu người dùng chưa đăng nhập
  if (userInfo === null) {
    return <Redirect to="/admin/login" />;
  }

  // Check người dùng không phải là Admin
  if (userInfo && userInfo.maLoaiNguoiDung !== "QuanTri") {
    Swal.fire(
      "You are not allowed to access this ADMIN page !",
      "Authorization required to become admin !",
      "error"
    );
    return <Redirect to="/admin/login" />;
  }

  return <Route {...props}>{children}</Route>;
}

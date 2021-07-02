import React from "react";
import { AiOutlineSearch, AiOutlineAlert } from "react-icons/ai";
import { UncontrolledCollapse, Button, CardBody, Card } from "reactstrap";
import { Link, useHistory, Redirect } from "react-router-dom";
import "../styles/style.css";
import "../styles/menu.scss";
import Swal from "sweetalert2";

export default function Navbar() {
  const history = useHistory();
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  // Handle Logout here !
  const handleLogOut = () => {
    return Swal.fire({
      title: "Are you sure?",
      text: "Are you sure to sign out of this account?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userInfo");
        history.push("/admin/login");
      } else {
        history.push("/admin/dashboard");
      }
    });
  };
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <button
        id="sidebarToggleTop"
        className="btn btn-link d-md-none rounded-circle mr-3"
      >
        <i className="fa fa-bars" />
      </button>
      <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
        <div className="input-group">
          <input
            type="text"
            className="form-control bg-light border-0 small"
            placeholder="Search for..."
            aria-label="Search"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              <AiOutlineSearch
                style={{ fontSize: "20px", fontWeight: "900" }}
              ></AiOutlineSearch>
            </button>
          </div>
        </div>
      </form>
      <ul className="navbar-nav ml-auto">
        <li
          className="nav-item dropdown no-arrow"
          style={{ position: "relative" }}
        >
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="userDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            id="user"
          >
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
              {userInfo.hoTen}
            </span>
            <img
              className="img-profile rounded-circle"
              src="/images/undraw_profile.svg"
            />
          </a>
          <UncontrolledCollapse
            toggler="#user"
            style={{
              position: "absolute",
              top: "100%",
              right: "0",
              width: "100%",
            }}
          >
            <Card style={{ padding: "5px" }}>
              <Link to="/" className="text-center collapse-item">
                Thông tin
              </Link>
              <Link
                to="/"
                className="text-center collapse-item"
                style={{ color: "red" }}
                onClick={handleLogOut}
              >
                Đăng xuất
              </Link>
            </Card>
          </UncontrolledCollapse>
        </li>
      </ul>
    </nav>
  );
}

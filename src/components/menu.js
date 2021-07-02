import React, {useState} from "react";
import { BiHappy } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import '../styles/style.css'
import "../styles/menu.scss";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <Link
        className="sidebar-brand d-flex align-items-center justify-content-center"
        to="/admin/dashboard"
      >
        <div className="sidebar-brand-text mx-3 d-flex align-items-center">
          <BiHappy style={{ fontSize: "30px", marginRight: "10px" }}></BiHappy>
          <span>Tix Admin</span>
        </div>
      </Link>
      <hr className="sidebar-divider my-0" />
      <li className="nav-item active">
        <Link className="nav-link" to="/admin/dashboard">
          <i className="fas fa-fw fa-tachometer-alt" />
          <span>Dashboard</span>
        </Link>
      </li>
      <hr className="sidebar-divider" />
      <div className="sidebar-heading">Interface</div>
      <li className="nav-item">
        <a className="nav-link collapsed d-flex align-items-center justify-content-between" style={{cursor: "pointer"}} onClick={toggle}>
          <span style={{ fontWeight: "900" }}>Quản lý</span>
          {isOpen ? <BiChevronDown></BiChevronDown> :<BiChevronRight></BiChevronRight>} 
        </a>
        <Collapse isOpen={isOpen}>
          <Card style={{padding: "5px"}}>
            <Link to="/admin/quanlyphim" className="collapse-item">
              Quản lý phim
            </Link>
            <Link to="/admin/quanlynguoidung" className="collapse-item">
              Quản lý người dùng
            </Link>
          </Card>
        </Collapse>
      </li>

      <div className="sidebar-card d-none d-lg-flex mt-2">
        <img
          className="sidebar-card-illustration mb-2"
          src="/images/web-logo.png"
          alt="..."
        />
        <p className="text-center mb-2">
          <strong>Tix Admin</strong> is packed with premium features,
          components, and more!
        </p>
        <a
          className="btn btn-success btn-sm"
          href="https://startbootstrap.com/theme/sb-admin-pro"
        >
          Upgrade to Pro!
        </a>
      </div>
    </ul>
  );
}

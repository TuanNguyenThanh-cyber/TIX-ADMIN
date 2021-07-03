import React from "react";
import TableUser from "../../components/tableUser";
import { AiOutlineSearch } from "react-icons/ai";

export default function UserManagement() {
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center">
        <div className="input-group mb-3" style={{ width: "25rem" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search movie here ..."
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          />
          <div className="input-group-append">
            <button
              className="btn btn-primary"
              type="button"
              id="button-addon2"
            >
              <AiOutlineSearch style={{ fontSize: "18px" }}></AiOutlineSearch>
            </button>
          </div>
        </div>
        <button className="btn btn-primary mb-3" type="button">
          Thêm người dùng
        </button>
      </div>
      <TableUser></TableUser>
    </div>
  );
}

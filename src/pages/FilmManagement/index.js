import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieListAction } from "../../redux/actions/getMovieListAction";
import TableFilm from "../../components/tableFilm";
import { AiOutlineSearch } from "react-icons/ai";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../styles/customFileInput.scss";
import Alert from "@material-ui/lab/Alert";

// Tạo schame validation
const schema = yup.object().shape({
  account: yup.string().required("Account can not be blank !"),
  fullName: yup.string().required("Name can not be blank !"),
  email: yup
    .string()
    .required("Email can not be blank !")
    .email("Email has wrong format !"),
  phone: yup.string().required("Phone can not be blank !"),
  password: yup.string().required("Password can not be blank !"),
});

export default function FilmManagement() {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  let dataMovies = [];
  const { dataMovieList } = useSelector((state) => state.movieList);

  // Variable for form
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  // Call API
  useEffect(() => {
    dispatch(getMovieListAction());
  }, []);

  // Get data movies here!
  if (dataMovieList) {
    dataMovies = [...dataMovieList];
  }

  // Set Modal Popup
  const toggle = () => setModal(!modal);

  // Handle Add Movie
  const handleAddMovie = () => {};

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
        <button className="btn btn-primary mb-3" type="button" onClick={toggle}>
          Thêm phim
        </button>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Thêm phim</ModalHeader>
          <ModalBody>
            <form className="user" onSubmit={handleSubmit(handleAddMovie)}>
              <div className="form-group row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Mã phim"
                    {...register("maPhim")}
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tên phim"
                    {...register("tenPhim")}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Bí Danh"
                    {...register("biDanh")}
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Trailer"
                    {...register("trailer")}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Đánh giá"
                    {...register("danhGia")}
                  />
                </div>
                <div className="col-sm-6">
                  <input type="date" name="begin" className="form-control" />
                </div>
              </div>
              <div className="form-group">
                <textarea
                  className="form-control "
                  placeholder="Mô tả"
                  {...register("moTa")}
                  rows="4"
                />
              </div>
              <div className="form-group">
                <p>Select a picture (Format: .JPEG, .PNG)</p>
                <input type="file" id="myfile" name="myfile" />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>
              Submit
            </Button>{" "}
            <Button color="danger" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <TableFilm dataMovieList={dataMovies}></TableFilm>
    </div>
  );
}

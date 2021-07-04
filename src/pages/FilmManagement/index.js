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
import { addMovieAction } from "../../redux/actions/addMovieAction";
import {formatDay} from '../../utils/formatDay'

// Tạo schame validation
const schema = yup.object().shape({
  maPhim: yup.string().required("Mã phim không được để trống"),
  tenPhim: yup.string().required("Tên phim không được để trống"),
  biDanh: yup.string().required("Bí danh không được để trống"),
  trailer: yup
    .string()
    .required("Trailer không được để trống")
    .url("Url không hợp lệ"),
  danhGia: yup
    .number()
    .required("Đánh giá không được để trống")
    .min(0, "Đánh giá không được là số âm")
    .max(10, "Đánh giá không vượt quá 10"),
  moTa: yup.string().required("Mô tả không được để trống"),
});

export default function FilmManagement() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.addMovie);
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
  const handleAddMovie = (value) => {
    const ObjToAddMovie = {
      ...value,
      hinhAnh: value.hinhAnh[0],
      ngayKhoiChieu: formatDay(value.ngayKhoiChieu),
      maNhom: "GP10",
    };
    console.log("ObjToAddMovie", ObjToAddMovie);
    let formData = new FormData();
    for (let key in ObjToAddMovie) {
      formData.append(key, ObjToAddMovie[key]);
    }
    console.log("PHIM: ", formData.get("tenPhim"));
    dispatch(addMovieAction(formData));
  };

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
                  <p className="text-monospace">Mã phim</p>
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Mã phim"
                    {...register("maPhim")}
                  />
                  {errors.maPhim && (
                    <Alert severity="error" className="text-monospace mt-3">
                      {errors.maPhim.message}
                    </Alert>
                  )}
                </div>
                <div className="col-sm-6">
                  <p className="text-monospace">Tên phim</p>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tên phim"
                    {...register("tenPhim")}
                  />
                  {errors.tenPhim && (
                    <Alert severity="error" className="text-monospace mt-3">
                      {errors.tenPhim.message}
                    </Alert>
                  )}
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <p className="text-monospace">Bí danh</p>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Bí Danh"
                    {...register("biDanh")}
                  />
                  {errors.biDanh && (
                    <Alert severity="error" className="text-monospace mt-3">
                      {errors.biDanh.message}
                    </Alert>
                  )}
                </div>
                <div className="col-sm-6">
                  <p className="text-monospace">Trailer</p>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Trailer"
                    {...register("trailer")}
                  />
                  {errors.trailer && (
                    <Alert severity="error" className="text-monospace mt-3">
                      {errors.trailer.message}
                    </Alert>
                  )}
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <p className="text-monospace">Đánh giá</p>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Đánh giá"
                    {...register("danhGia")}
                  />
                  {errors.danhGia && (
                    <Alert severity="error" className="text-monospace mt-3">
                      {errors.danhGia.message}
                    </Alert>
                  )}
                </div>
                <div className="col-sm-6">
                  <p className="text-monospace">Ngày khởi chiếu</p>
                  <input
                    type="date"
                    className="form-control"
                    {...register("ngayKhoiChieu")}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <p className="text-monospace">Mô tả</p>
                <textarea
                  className="form-control "
                  placeholder="Mô tả"
                  {...register("moTa")}
                  rows="4"
                />
                {errors.moTa && (
                  <Alert severity="error" className="text-monospace mt-3">
                    {errors.moTa.message}
                  </Alert>
                )}
              </div>
              <div className="form-group">
                <p className="text-monospace">
                  Hình ảnh (Định dạng: .JPEG, .PNG)
                </p>
                <input
                  type="file"
                  id="myfile"
                  name="myfile"
                  {...register("hinhAnh")}
                  required
                />
              </div>
              <ModalFooter>
                <Button color="primary" type="submit">
                  Submit
                </Button>
                <Button color="danger" onClick={toggle}>
                  Cancel
                </Button>
                {error && (
                  <Alert severity="error" className="text-monospace mt-3">
                    {error}
                  </Alert>
                )}
              </ModalFooter>
            </form>
          </ModalBody>
        </Modal>
      </div>
      <TableFilm dataMovieList={dataMovies}></TableFilm>
    </div>
  );
}

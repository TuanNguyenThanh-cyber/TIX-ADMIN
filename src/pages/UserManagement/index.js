import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserListAction } from "../../redux/actions/getUserListAction";
import { addUserAction } from "../../redux/actions/addUserAction";
import { updateUserAction } from "../../redux/actions/updateUserAction";
import { deleteUserAction } from "../../redux/actions/deleteUserAction";
import { AiOutlineSearch } from "react-icons/ai";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../styles/customFileInput.scss";
import { formatDay } from "../../utils/formatDay";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import Alert from "@material-ui/lab/Alert";
import Swal from "sweetalert2";

// Regex VietNam phone number
const phoneRegVn = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

// Tạo schame validation
const schema = yup.object().shape({
  taiKhoan: yup.string().required("Tài khoản không được để trống"),
  email: yup.string().required("Email không được để trống"),
  matKhau: yup.string().required("Mật khẩu không được để trống"),
  soDt: yup
    .string()
    .required("Số điện thoại không được để trống")
    .matches(phoneRegVn, "Số điện thoại không đúng định dạng"),
  hoTen: yup.string().required("Đánh giá không được để trống"),
  maLoaiNguoiDung: yup.string().required("Mã loại người dùng chưa được chọn"),
});

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function FilmManagement() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.addMovie);
  const [modalAddUser, setModalAddUser] = useState(false);
  const [modalUpdateUser, setModalUpdateUser] = useState(false);
  const [searchMovie, setSearchMovie] = useState("");
  const { dataUserList, Loading } = useSelector((state) => state.userList);
  const [dataUsers, setDataUsers] = useState(dataUserList);

  // Variable for form
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  // Call API to get list data movie
  useEffect(() => {
    dispatch(getUserListAction());
  }, []);

  // Update dataMovies when dataMovieList has changed !
  useEffect(() => {
    setDataUsers(dataUserList);
  }, [dataUserList]);

  // Set Modal Popup Add Movie
  const toggleAddUser = () => setModalAddUser(!modalAddUser);

  // Handle Add User
  const handleAddUser = async (value) => {
    const ObjToAddUser = { ...value, maNhom: "GP10" };
    await dispatch(addUserAction(ObjToAddUser));
    await dispatch(getUserListAction());
  };

  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, dataUsers?.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Toggle Update Movie
  const toggleUpdateMovie = (dataUser) => {
    setModalUpdateUser(!modalUpdateUser);
    setValue("taiKhoan", dataUser.taiKhoan);
    setValue("email", dataUser.email);
    setValue("matKhau", dataUser.matKhau);
    setValue("soDt", dataUser.soDt);
    setValue("hoTen", dataUser.hoTen);
    setValue("maLoaiNguoiDung", dataUser.maLoaiNguoiDung);
  };

  // Handle Update User
  const handleUpdateUser = async (value) => {
    const ObjToUpdateUser = { ...value, maNhom: "GP10" };
    await dispatch(updateUserAction(ObjToUpdateUser));
    await dispatch(getUserListAction());
  };

  // Handle Delete User
  const handleDeleteUser = (dataUser) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mr-2",
        cancelButton: "btn btn-danger mr-2",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await dispatch(deleteUserAction(dataUser));
          await dispatch(getUserListAction());
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your movie is safe :)",
            "error"
          );
        }
      });
  };

  return (
    <div className="container">
      {/* Search and add film */}
      <div className="d-flex justify-content-between align-items-center">
        <div className="input-group mb-3" style={{ width: "25rem" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm tài khoản người dùng ..."
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            onChange={(event) => {
              setSearchMovie(event.target.value);
            }}
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
        <button
          className="btn btn-primary mb-3"
          type="button"
          onClick={toggleAddUser}
        >
          Thêm người dùng
        </button>
        <Modal isOpen={modalAddUser} toggle={toggleAddUser}>
          <ModalHeader toggle={toggleAddUser}>Thêm người dùng</ModalHeader>
          <ModalBody>
            <form className="user" onSubmit={handleSubmit(handleAddUser)}>
              <div className="form-group row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <p className="text-monospace">Tài khoản</p>
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Tài khoản"
                    {...register("taiKhoan")}
                  />
                  {errors.taiKhoan && (
                    <Alert severity="error" className="text-monospace mt-3">
                      {errors.taiKhoan.message}
                    </Alert>
                  )}
                </div>
                <div className="col-sm-6">
                  <p className="text-monospace">Email</p>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <Alert severity="error" className="text-monospace mt-3">
                      {errors.email.message}
                    </Alert>
                  )}
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <p className="text-monospace">Mật khẩu</p>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Mật khẩu"
                    {...register("matKhau")}
                  />
                  {errors.matKhau && (
                    <Alert severity="error" className="text-monospace mt-3">
                      {errors.matKhau.message}
                    </Alert>
                  )}
                </div>
                <div className="col-sm-6">
                  <p className="text-monospace">Số điện thoại</p>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Số điện thoại"
                    {...register("soDt")}
                  />
                  {errors.soDt && (
                    <Alert severity="error" className="text-monospace mt-3">
                      {errors.soDt.message}
                    </Alert>
                  )}
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <p className="text-monospace">Họ tên</p>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Họ tên"
                    {...register("hoTen")}
                  />
                  {errors.hoTen && (
                    <Alert severity="error" className="text-monospace mt-3">
                      {errors.hoTen.message}
                    </Alert>
                  )}
                </div>
                <div className="col-sm-6">
                  <p className="text-monospace">Loại người dùng</p>
                  <select
                    className="form-control"
                    style={{ appearance: "auto" }}
                    {...register("maLoaiNguoiDung")}
                  >
                    <option value="KhachHang">KhachHang</option>
                    <option value="QuanTri">QuanTri</option>
                  </select>
                  {errors.maLoaiNguoiDung && (
                    <Alert severity="error" className="text-monospace mt-3">
                      {errors.maLoaiNguoiDung.message}
                    </Alert>
                  )}
                </div>
              </div>
              <ModalFooter>
                <Button color="primary" type="submit">
                  Submit
                </Button>
                <Button color="danger" onClick={toggleAddUser}>
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
      {/* Table Info Movies */}
      {/* <TableFilm dataMovies={dataMovies}></TableFilm> */}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell align="center">STT</TableCell>
              <TableCell align="center">Tài khoản</TableCell>
              <TableCell align="center">Mật khẩu</TableCell>
              <TableCell align="center">Họ tên</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Số điện thoại</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataUsers &&
              (rowsPerPage > 0
                ? dataUsers?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : dataUsers
              )
                .filter((val) => {
                  if (searchMovie == "") {
                    return val;
                  } else if (
                    val.taiKhoan
                      .toLowerCase()
                      .includes(searchMovie.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((dataUser, index) => (
                  <TableRow key={dataUser.maPhim}>
                    <TableCell component="th" scope="row" align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">{dataUser.taiKhoan}</TableCell>
                    <TableCell align="center">{dataUser.matKhau}</TableCell>
                    <TableCell align="center">{dataUser.hoTen}</TableCell>
                    <TableCell align="center">{dataUser.email}</TableCell>
                    <TableCell align="center">{dataUser.soDt}</TableCell>

                    <TableCell align="center">
                      <button
                        type="button"
                        className="btn btn-outline-primary mr-2"
                      >
                        Ghi Danh
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-success mr-2"
                        onClick={() => toggleUpdateMovie(dataUser)}
                      >
                        Sửa
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger mr-2"
                        onClick={() => handleDeleteUser(dataUser)}
                      >
                        Xóa
                      </button>
                      <Modal
                        isOpen={modalUpdateUser}
                        toggle={toggleUpdateMovie}
                      >
                        <ModalHeader toggle={toggleUpdateMovie}>
                          Chỉnh sửa thông tin tài khoản
                        </ModalHeader>
                        <ModalBody>
                          <form
                            className="user"
                            onSubmit={handleSubmit(handleUpdateUser)}
                          >
                            <div className="form-group row">
                              <div className="col-sm-6 mb-3 mb-sm-0">
                                <p className="text-monospace">Tài khoản</p>
                                <input
                                  type="text"
                                  className="form-control "
                                  placeholder="Tài khoản"
                                  {...register("taiKhoan")}
                                />
                                {errors.taiKhoan && (
                                  <Alert
                                    severity="error"
                                    className="text-monospace mt-3"
                                  >
                                    {errors.taiKhoan.message}
                                  </Alert>
                                )}
                              </div>
                              <div className="col-sm-6">
                                <p className="text-monospace">Email</p>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Email"
                                  {...register("email")}
                                />
                                {errors.email && (
                                  <Alert
                                    severity="error"
                                    className="text-monospace mt-3"
                                  >
                                    {errors.email.message}
                                  </Alert>
                                )}
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-sm-6 mb-3 mb-sm-0">
                                <p className="text-monospace">Mật khẩu</p>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Mật khẩu"
                                  {...register("matKhau")}
                                />
                                {errors.matKhau && (
                                  <Alert
                                    severity="error"
                                    className="text-monospace mt-3"
                                  >
                                    {errors.matKhau.message}
                                  </Alert>
                                )}
                              </div>
                              <div className="col-sm-6">
                                <p className="text-monospace">Số điện thoại</p>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Số điện thoại"
                                  {...register("soDt")}
                                />
                                {errors.soDt && (
                                  <Alert
                                    severity="error"
                                    className="text-monospace mt-3"
                                  >
                                    {errors.soDt.message}
                                  </Alert>
                                )}
                              </div>
                            </div>
                            <div className="form-group row">
                              <div className="col-sm-6 mb-3 mb-sm-0">
                                <p className="text-monospace">Họ tên</p>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Họ tên"
                                  {...register("hoTen")}
                                />
                                {errors.hoTen && (
                                  <Alert
                                    severity="error"
                                    className="text-monospace mt-3"
                                  >
                                    {errors.hoTen.message}
                                  </Alert>
                                )}
                              </div>
                              <div className="col-sm-6">
                                <p className="text-monospace">
                                  Loại người dùng
                                </p>
                                <select
                                  className="form-control"
                                  style={{ appearance: "auto" }}
                                  {...register("maLoaiNguoiDung")}
                                >
                                  <option value="KhachHang">KhachHang</option>
                                  <option value="QuanTri">QuanTri</option>
                                </select>
                                {errors.maLoaiNguoiDung && (
                                  <Alert
                                    severity="error"
                                    className="text-monospace mt-3"
                                  >
                                    {errors.maLoaiNguoiDung.message}
                                  </Alert>
                                )}
                              </div>
                            </div>
                            <ModalFooter>
                              <Button color="primary" type="submit">
                                Submit
                              </Button>
                              <Button
                                color="danger"
                                onClick={toggleUpdateMovie}
                              >
                                Cancel
                              </Button>
                            </ModalFooter>
                          </form>
                        </ModalBody>
                      </Modal>
                    </TableCell>
                  </TableRow>
                ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                count={dataUsers?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}

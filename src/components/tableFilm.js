import React, { useState } from "react";
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
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
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
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function CustomPaginationActionsTable(props) {
  const { dataMovieList } = props;
  const [modal, setModal] = useState(false);

  // Variable for form
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, dataMovieList.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Set Modal Popup
  const toggle = () => setModal(!modal);

  // Handle Update Movie
  const handleUpdateMovie = () => {

  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Mã phim</TableCell>
            <TableCell align="center">Tên phim</TableCell>
            <TableCell align="center">Hình ảnh</TableCell>
            <TableCell align="center">Mô tả</TableCell>
            <TableCell align="center">Mã nhóm</TableCell>
            <TableCell align="center">Ngày khởi chiếu</TableCell>
            <TableCell align="center">Đánh giá</TableCell>
            <TableCell align="center">Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? dataMovieList.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : dataMovieList
          ).map((dataMovie) => (
            <TableRow key={dataMovie.maPhim}>
              <TableCell component="th" scope="row" align="center">
                {dataMovie.maPhim}
              </TableCell>
              <TableCell align="center">{dataMovie.tenPhim}</TableCell>
              <TableCell align="center">
                <img
                  src={dataMovie.hinhAnh}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                ></img>
              </TableCell>
              <TableCell align="center">
                <p
                  style={{
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    width: "200px",
                  }}
                >
                  {dataMovie.moTa}
                </p>
              </TableCell>
              <TableCell align="center">{dataMovie.maNhom}</TableCell>
              <TableCell align="center">{dataMovie.ngayKhoiChieu}</TableCell>
              <TableCell align="center">{dataMovie.danhGia}</TableCell>
              <TableCell align="center">
                <button type="button" className="btn btn-outline-primary mr-2">
                  Tạo lịch chiếu
                </button>
                <button
                  type="button"
                  className="btn btn-outline-success mr-2"
                  onClick={toggle}
                >
                  Sửa
                </button>
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader toggle={toggle}>Sửa phim</ModalHeader>
                  <ModalBody>
                    <form
                      className="user"
                      onSubmit={handleSubmit(handleUpdateMovie)}
                    >
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
                          <input
                            type="date"
                            name="begin"
                            className="form-control"
                          />
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
                <button type="button" className="btn btn-outline-danger mr-2">
                  Xóa
                </button>
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
              count={dataMovieList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

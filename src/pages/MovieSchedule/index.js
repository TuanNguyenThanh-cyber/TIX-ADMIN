import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMovieShowTimeAction } from "../../redux/actions/getMovieShowTime";
import { getInfoTheaterSysAction } from "../../redux/actions/getInfoTheaterSys";
import { getInfoTheaterClusterSysAction } from "../../redux/actions/getInfoTheaterClusterSys";
import { createShowTimeAction } from "../../redux/actions/createShowTimeAction";
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
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Alert from "@material-ui/lab/Alert";
import { formatDayAndTime } from "../../utils/formatDay";

// Tạo schame validation
const schema = yup.object().shape({
  thoiLuongPhim: yup
    .number()
    .required("Thời lượng phim không được để trống")
    .integer("Thời lượng phim phải là số nguyên")
    .min(1, "Thời lượng phim phải lớn hơn 0"),
  giaVe: yup
    .number()
    .required("Giá vé không được để trống")
    .integer("Giá vé phải là số nguyên")
    .min(20000, "Giá vé phải từ 20.000 vnd trở lên"),
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

export default function CustomPaginationActionsTable() {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispacth = useDispatch();
  const { id } = useParams();
  const { dataMovieShowTime } = useSelector((state) => state.movieShowTime);
  const { dataInfoTheaterSys } = useSelector((state) => state.infoTheaterSys);
  const { dataInfoTheaterClusterSys } = useSelector(
    (state) => state.infoTheaterClusterSys
  );
  const [movieShowTime, setMovieShowTime] = useState(dataMovieShowTime);

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

  // Create State to handleOnChange in Theater Sys
  const [theaterSys, setTheaterSys] = useState("");
  const [theaterCluster, setTheaterCluster] = useState("");
  const [theater, setTheater] = useState([]);
  const [theaterName, setTheaterName] = useState("");
  const [theaterID, setTheaterID] = useState("");

  // Handle OnChange in Theater Sys
  const handleChangeTheaterSys = (event) => {
    setTheaterSys(event.target.value);
  };

  // Handle OnChange TheaterCluster
  const handleChangeTheaterCluster = (event) => {
    setTheaterCluster(event.target.value);
  };

  // Handle OnChange TheaterName
  const handleChangeTheaterName = (event) => {
    setTheaterName(event.target.value);
  };

  // Call API
  useEffect(() => {
    dispacth(getMovieShowTimeAction(id));
    dispacth(getInfoTheaterSysAction());
  }, []);

  // Call API when theaterSys change
  useEffect(() => {
    console.log(theaterSys);
    dispacth(getInfoTheaterClusterSysAction(theaterSys));
    if (theaterSys === "-- Vui lòng chọn hệ thống rạp --") {
      setTheaterCluster("-- Vui lòng chọn cụm rạp --");
    }
  }, [theaterSys]);

  // Set theater when theaterCluster change
  useEffect(() => {
    let flag = 0;
    dataInfoTheaterClusterSys &&
      dataInfoTheaterClusterSys.map((item) => {
        if (item.tenCumRap === theaterCluster) {
          flag = 1;
          setTheater([...item.danhSachRap]);
        }
      });
    if (!flag) {
      setTheater([]);
    }
  }, [theaterCluster]);

  // Update theaterID when theaterName change
  useEffect(() => {
    let flag = 0;
    theater.map((item) => {
      if (item.tenRap === theaterName) {
        flag = 1;
        setTheaterID(item.maRap);
      }
    });
    if (!flag) {
      setTheaterID("");
    }
  }, [theaterName]);

  // Update State movieShowTime
  useEffect(() => {
    setMovieShowTime(dataMovieShowTime);
  }, [dataMovieShowTime]);

  // Handle Create ShowTime
  const handleCreateShowTime = (value) => {
    console.log("value", value);
    const objToCreateShowTime = {
      maPhim: id,
      ngayChieuGioChieu: formatDayAndTime(value.ngayChieuGioChieu),
      maRap: theaterID,
      giaVe: value.giaVe,
      thoiLuongPhim: value.thoiLuongPhim,
    };
    console.log("ngayChieuGioChieu", objToCreateShowTime.ngayChieuGioChieu);
    if (theaterID === "") {
      alert("Vui lòng điền đầy đủ thông tin rạp");
    } else {
      dispacth(createShowTimeAction(objToCreateShowTime));
      dispacth(getMovieShowTimeAction(id));
    }
  };

  console.log("theater", theater);
  console.log("theaterName", theaterName);
  console.log("theaterID", theaterID);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, movieShowTime?.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div
      className="movieSchedule"
      style={{ backgroundColor: "rgb(215 215 215)", padding: "15px" }}
    >
      <div className="container">
        <h2 className="text-center">
          Thông tin lịch chiếu phim {movieShowTime?.tenPhim}
        </h2>
        <hr />
        <div className="formMovieSchedule" style={{ padding: "15px" }}>
          <div className="container">
            <form onSubmit={handleSubmit(handleCreateShowTime)}>
              <div className="row">
                <div className="col-6">
                  <p className="text-monospace">Chọn hệ thống rạp</p>
                  <select
                    className="form-control mb-3"
                    style={{ appearance: "auto" }}
                    onChange={handleChangeTheaterSys}
                  >
                    <option>-- Vui lòng chọn hệ thống rạp --</option>
                    {dataInfoTheaterSys &&
                      dataInfoTheaterSys.map((item) => (
                        <option key={item.maHeThongRap}>
                          {item.maHeThongRap}
                        </option>
                      ))}
                  </select>
                  <p className="text-monospace">Chọn cụm rạp</p>
                  <select
                    className="form-control mb-3"
                    style={{ appearance: "auto" }}
                    onChange={handleChangeTheaterCluster}
                  >
                    <option>-- Vui lòng chọn cụm rạp --</option>
                    {dataInfoTheaterClusterSys &&
                      theaterSys !== "-- Vui lòng chọn hệ thống rạp --" &&
                      dataInfoTheaterClusterSys.map((item) => (
                        <option key={item.maCumRap}>{item.tenCumRap}</option>
                      ))}
                  </select>
                  <p className="text-monospace">Chọn rạp</p>
                  <select
                    className="form-control mb-3"
                    style={{ appearance: "auto" }}
                    onChange={handleChangeTheaterName}
                  >
                    <option>-- Vui lòng chọn rạp --</option>
                    {theater.length !== 0 &&
                      theater.map((item) => <option>{item.tenRap}</option>)}
                  </select>
                  {theaterID === "" && (
                    <Alert severity="error" className="text-monospace mt-3">
                      Vui lòng điền thông tin rạp
                    </Alert>
                  )}
                </div>
                <div className="col-6">
                  <p className="text-monospace">Chọn ngày chiếu giờ chiếu</p>
                  <input
                    type="datetime-local"
                    className="form-control mb-3"
                    {...register("ngayChieuGioChieu")}
                    required
                  />
                  <p className="text-monospace">Chọn thời lượng phim</p>
                  <input
                    type="text"
                    className="form-control mb-3"
                    {...register("thoiLuongPhim")}
                  />
                  {errors.thoiLuongPhim && (
                    <Alert severity="error" className="text-monospace mt-3">
                      {errors.thoiLuongPhim.message}
                    </Alert>
                  )}
                  <p className="text-monospace">Giá vé</p>
                  <input
                    type="text"
                    className="form-control mb-3"
                    {...register("giaVe")}
                  />
                  {errors.giaVe && (
                    <Alert severity="error" className="text-monospace mt-3">
                      {errors.giaVe.message}
                    </Alert>
                  )}
                </div>
              </div>
              <div className="text-right">
                <button className="btn btn-primary" type="submit">
                  Tạo lịch chiếu
                </button>
              </div>
            </form>
          </div>
        </div>
        <hr />
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Mã Lịch Chiếu</TableCell>
                <TableCell align="center">Hệ thống rạp</TableCell>
                <TableCell align="center">Cụm rạp</TableCell>
                <TableCell align="center">Ngày giờ chiếu</TableCell>
                <TableCell align="center">Giá vé</TableCell>
                <TableCell align="center">Thời lượng phim</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movieShowTime?.heThongRapChieu.map((showTimes) =>
                showTimes.cumRapChieu.map((showTime) =>
                  showTime.lichChieuPhim.map((item) => (
                    <TableRow key={item.maLichChieu}>
                      <TableCell align="center">{item.maLichChieu}</TableCell>
                      <TableCell align="center">
                        {showTimes.tenHeThongRap}
                      </TableCell>
                      <TableCell align="center">{showTime.tenCumRap}</TableCell>
                      <TableCell align="center">
                        {item.ngayChieuGioChieu}
                      </TableCell>
                      <TableCell align="center">{item.giaVe}</TableCell>
                      <TableCell align="center">{item.thoiLuong}</TableCell>
                    </TableRow>
                  ))
                )
              )}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

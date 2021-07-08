import baseAPI from "./baseAPI";

const theaterAPI = {
  getMovieShowTime: (value) => {
    return baseAPI.get(`/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${value}`);
  },
  getInfoTheaterSys: () => {
    return baseAPI.get("/QuanLyRap/LayThongTinHeThongRap");
  },
  getInfoTheaterClusterSys: (value) => {
    return baseAPI.get(
      `/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${value}`
    );
  },
  createShowTime: (value) => {
    return baseAPI.post("/QuanLyDatVe/TaoLichChieu", value);
  },
};

export default theaterAPI;

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
};

export default theaterAPI;

import baseAPI from "./baseAPI";

const filmAPI = {
  getMovieList: () => {
    return baseAPI.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP10");
  },
  addMovie: (value) => {
    return baseAPI.post("/QuanLyPhim/ThemPhimUploadHinh", value);
  },
  uploadMovie: (value) => {
    return baseAPI.post("/QuanLyPhim/CapNhatPhimUpload", value);
  },
  deleteMovie: (value) => {
    return baseAPI.delete(`/QuanLyPhim/XoaPhim?MaPhim=${value.maPhim}`, value);
  },
};

export default filmAPI;

import baseAPI from "./baseAPI";

const authAPI = {
  getMovieList: () => {
    return baseAPI.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP10");
  },
  addMovie: (value) => {
    return baseAPI.post("/QuanLyPhim/ThemPhimUploadHinh", value);
  }
};

export default authAPI;

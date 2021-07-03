import baseAPI from "./baseAPI";

const authAPI = {
  getMovieList: () => {
    return baseAPI.get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP10");
  },
};

export default authAPI;

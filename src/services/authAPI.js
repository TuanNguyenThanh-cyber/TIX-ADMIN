import baseAPI from "./baseAPI";

const authAPI = {
  login: (value) => {
    return baseAPI.post("/QuanLyNguoiDung/DangNhap", value);
  },

  register: (value) => {
    return baseAPI.post("/QuanLyNguoiDung/DangKy", value);
  },
};

export default authAPI;

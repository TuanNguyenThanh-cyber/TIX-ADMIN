import baseAPI from "./baseAPI";

const userAPI = {
  getUserList: () => {
    return baseAPI.get("/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP10");
  },
  addUser: (value) => {
    return baseAPI.post("/QuanLyNguoiDung/ThemNguoiDung", value);
  },
  updateUser: (value) => {
    return baseAPI.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", value);
  },
  deleteUser: (value) => {
    return baseAPI.delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${value.taiKhoan}`, value);
  },
};

export default userAPI;

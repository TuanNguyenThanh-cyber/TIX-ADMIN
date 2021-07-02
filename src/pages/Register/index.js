import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerAction } from "../../redux/actions/registerAction";
import * as yup from "yup";
import Alert from "@material-ui/lab/Alert";

// Regex phone number
const regexVNPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

// Tạo schame validation
const schema = yup.object().shape({
  account: yup.string().required("Account can not be blank !"),
  fullName: yup.string().required("Name can not be blank !"),
  email: yup
    .string()
    .required("Email can not be blank !")
    .email("Email has wrong format !"),
  phone: yup
    .string()
    .required("Phone can not be blank !")
    .matches(regexVNPhoneNumber, "Phone has wrong format !"),
  password: yup.string().required("Password can not be blank !"),
  repeatPassword: yup
    .string()
    .required("Repeat password can not be blank !")
    .oneOf([yup.ref("password"), null], "Password does not match"),
});

export default function Register() {
  // Create variable dispatch and useSelector signup
  const dispatch = useDispatch();
  // const { error } = useSelector((state) => state.signup);

  // Variable for form
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  // Handle Signup
  const handleRegister = (value) => {
    // ObjSignUp is a object when call API and dispatch this obj for BE
    const ObjRegister = {
      taiKhoan: value.account,
      matKhau: value.password,
      email: value.email,
      soDt: value.phone,
      maNhom: "GP10",
      maLoaiNguoiDung: "KhachHang",
      hoTen: value.fullName,
    };
    dispatch(registerAction(ObjRegister));
  };

  return (
    <div className="bg-gradient-primary">
      <div className="container">
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            {/* Nested Row within Card Body */}
            <div className="row">
              <div className="col-lg-5 d-none d-lg-block bg-register-image" />
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">
                      Create an Account!
                    </h1>
                  </div>
                  <form className="user" onSubmit={handleSubmit(handleRegister)}>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          placeholder="Account"
                          {...register("account")}
                        />
                        {errors.account && (
                          <Alert severity="error" className="mt-3">
                            {errors.account.message}
                          </Alert>
                        )}
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          placeholder="Full Name"
                          {...register("fullName")}
                        />
                        {errors.fullName && (
                          <Alert severity="error" className="mt-3">
                            {errors.fullName.message}
                          </Alert>
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control form-control-user"
                        placeholder="Email Address"
                        {...register("email")}
                      />
                      {errors.email && (
                        <Alert severity="error" className="mt-3">
                          {errors.email.message}
                        </Alert>
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-user"
                        placeholder="Phone"
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <Alert severity="error" className="mt-3">
                          {errors.phone.message}
                        </Alert>
                      )}
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          placeholder="Password"
                          {...register("password")}
                        />
                        {errors.password && (
                          <Alert severity="error" className="mt-3">
                            {errors.password.message}
                          </Alert>
                        )}
                      </div>
                      <div className="col-sm-6">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          placeholder="Repeat Password"
                          {...register("repeatPassword")}
                        />
                        {errors.repeatPassword && (
                          <Alert severity="error" className="mt-3">
                            {errors.repeatPassword.message}
                          </Alert>
                        )}
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-user btn-block"
                    >
                      Register Account
                    </button>
                    <hr />
                    <button className="btn btn-google btn-user btn-block">
                      <i className="fab fa-google fa-fw" /> Register with Google
                    </button>
                    <button className="btn btn-facebook btn-user btn-block">
                      <i className="fab fa-facebook-f fa-fw" /> Register with
                      Facebook
                    </button>
                  </form>
                  <hr />
                  <div className="text-center">
                    <Link className="small" to="/admin/forgotpassword">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="text-center">
                    <Link className="small" to="/admin/login">
                      Already have an account? Login!
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

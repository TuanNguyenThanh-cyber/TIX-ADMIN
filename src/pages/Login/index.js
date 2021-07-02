import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Alert from "@material-ui/lab/Alert";
import { loginAction } from "../../redux/actions/loginAction";
import * as yup from "yup";

// Tạo schame validation
const schema = yup.object().shape({
  taiKhoan: yup.string().required("Account can not be blank"),
  matKhau: yup.string().required("Password can not be blank"),
});

export default function Login() {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  // Hanlde Login
  const handleLogin = (value) => {
    dispatch(loginAction(value));
  };

  return (
    <div className="bg-gradient-primary">
      <div className="container">
        {/* Outer Row */}
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                {/* Nested Row within Card Body */}
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      </div>
                      <form
                        className="user"
                        onSubmit={handleSubmit(handleLogin)}
                      >
                        <div className="form-group">
                          <input
                            type="account"
                            className="form-control form-control-user"
                            placeholder="Enter Your Account..."
                            {...register("taiKhoan")}
                          />
                          {errors.taiKhoan && (
                            <Alert severity="error" className="mt-3">
                              {errors.taiKhoan.message}
                            </Alert>
                          )}
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            placeholder="Password"
                            {...register("matKhau")}
                          />
                          {errors.matKhau && (
                            <Alert severity="error" className="mt-3">
                              {errors.matKhau.message}
                            </Alert>
                          )}
                        </div>
                        <div className="form-group">
                          <div className="custom-control custom-checkbox small">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck"
                            >
                              Remember Me
                            </label>
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary btn-user btn-block"
                        >
                          Login
                        </button>
                        <hr />
                        <button className="btn btn-google btn-user btn-block">
                          <i className="fab fa-google fa-fw" /> Login with
                          Google
                        </button>
                        <button className="btn btn-facebook btn-user btn-block">
                          <i className="fab fa-facebook-f fa-fw" /> Login with
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
                        <Link className="small" to="/admin/register">
                          Create an Account ?
                        </Link>
                      </div>
                    </div>
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

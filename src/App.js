import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminRoute from "./auth/AdminRoute";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Switch>
            <Route path="/admin">
              <AdminRoute path="/admin/dashboard" exact>
                <AdminLayout>
                  <Dashboard></Dashboard>
                </AdminLayout>
              </AdminRoute>
              <AdminRoute path="/admin/quanlyphim">
                <AdminLayout>Quản lý phim</AdminLayout>
              </AdminRoute>
              <AdminRoute path="/admin/quanlynguoidung">
                <AdminLayout>Quản lý người dùng</AdminLayout>
              </AdminRoute>
              <Route path="/admin/login" exact>
                <Login></Login>
              </Route>
              <Route path="/admin/register" exact>
                <Register></Register>
              </Route>
              <Route path="/admin/forgotpassword" exact>
                <ForgotPassword></ForgotPassword>
              </Route>
            </Route>
          </Switch>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminRoute from "./auth/AdminRoute";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import FilmManagement from "./pages/FilmManagement";
import UserManagement from "./pages/UserManagement";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import MovieSchedule from "./pages/MovieSchedule";
import PageNotFound from "./pages/PageNotFound";

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
              <AdminRoute path="/admin/quanlyphim" exact>
                <AdminLayout>
                  <FilmManagement></FilmManagement>
                </AdminLayout>
              </AdminRoute>
              <AdminRoute path="/admin/quanlynguoidung" exact>
                <AdminLayout>
                  <UserManagement></UserManagement>
                </AdminLayout>
              </AdminRoute>
              <AdminRoute path="/admin/quanlyphim/lichchieuphim/:id" exact>
                <AdminLayout>
                  <MovieSchedule></MovieSchedule>
                </AdminLayout>
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
              <Route path="*">
                <PageNotFound></PageNotFound>
              </Route>
            </Route>
          </Switch>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

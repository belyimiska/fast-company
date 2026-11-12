import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import EditUserPage from "./components/page/EditUserPage";
import Navbar from "./components/ui/Navbar";
import ProfessionProvider from "./hooks/useProfessions";
import QualitiesProvider from "./hooks/useQualities";
import UserProvider from "./hooks/useUsers";
import Login from "./layouts/Login";
import Main from "./layouts/Main";
import Users from "./layouts/Users";

export default function App() {
  return (
    <>
      <Navbar />
      <QualitiesProvider>
        <ProfessionProvider>
          <Switch>
            <Route path="/login/:type?" component={Login} />

            <Route path="/users">
              <UserProvider>
                <Switch>
                  <Route path="/users/:userId/edit" component={EditUserPage} />
                  <Route path="/users/:userId?" exact component={Users} />
                  <Redirect to="/" />
                </Switch>
              </UserProvider>
            </Route>

            <Route path="/" exact component={Main} />
            <Redirect to="/" />
          </Switch>
        </ProfessionProvider>
      </QualitiesProvider>
      <ToastContainer />
    </>
  );
}

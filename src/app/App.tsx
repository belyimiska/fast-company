import { Redirect, Route, Switch } from "react-router-dom";
import EditUserPage from "./components/page/EditUserPage";
import Navbar from "./components/ui/Navbar";
import Login from "./layouts/Login";
import Main from "./layouts/Main";
import Users from "./layouts/Users";

export default function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/login/:type?" component={Login} />
        <Route path="/users/:userId/edit" component={EditUserPage} />
        <Route path="/users/:userId?" exact component={Users} />
        <Route path="/" exact component={Main} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

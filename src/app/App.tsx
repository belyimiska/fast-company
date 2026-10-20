import { Redirect, Route, Switch } from "react-router-dom";
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
        <Route path="/users/:userId?" component={Users} />
        <Route path="/" exact component={Main} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

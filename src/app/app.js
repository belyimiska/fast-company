import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./components/login";
import Main from "./components/main";
import Navbar from "./components/navbar";
import UsersList from "./components/usersList";

const App = () => {
    return (
        <>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={UsersList} />
                <Redirect to="/" />
            </Switch>
        </>
    );
};

export default App;

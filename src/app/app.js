import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Navbar from "./components/ui/navbar";
import Users from "./layouts/users";
import LogOut from "./layouts/logOut";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";
import { loadProfessionsList } from "./store/professions";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
    }, []);

    return (
        <div>
            <AuthProvider>
                <Navbar />
                <Switch>
                    <ProtectedRoute
                        path="/users/:userId?/:edit?"
                        component={Users}
                    />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/logout" component={LogOut} />
                    <Route path="/" exact component={Main} />
                    <Redirect to="/" />
                </Switch>
            </AuthProvider>
            <ToastContainer />
        </div>
    );
};

export default App;

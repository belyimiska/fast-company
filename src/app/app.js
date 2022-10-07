import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Navbar from "./components/ui/navbar";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQuality";
import { AuthProvider } from "./hooks/useAuth";
import { LoginProvider } from "./hooks/useLogin";

const App = () => {
    return (
        <div>
            <LoginProvider>
                <AuthProvider>
                    <Navbar />
                    <QualityProvider>
                        <ProfessionProvider>
                            <Switch>
                                <Route
                                    path="/users/:userId?/:edit?"
                                    component={Users}
                                />
                                <Route path="/login/:type?" component={Login} />
                                <Route path="/" exact component={Main} />
                                <Redirect to="/" />
                            </Switch>
                        </ProfessionProvider>
                    </QualityProvider>
                </AuthProvider>
            </LoginProvider>
            <ToastContainer />
        </div>
    );
};

export default App;

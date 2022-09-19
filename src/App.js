import React from "react";
import { Box } from "@material-ui/core";
import TerraFormerSignup from "./Components/TerraFormer/TerraFormerSignup";
import { AuthProvider } from "./Context/AuthContext";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import TeraFormerLogin from "./Components/TerraFormer/TeraFormerLogin";
import PrivateRoute from "./PrivateRoute";
import TerraFormersDashBoard from "./Components/TerraFormer/TerraformersDashBoard";
import LandingPage from "./LandingPage";
import UserDashBoard from "./Components/User/UserDashBoard";
import UserLogin from "./Components/User/UserLogin";
import UserSignup from "./Components/User/UserSignUp";

export default () => {
  return (
    <AuthProvider>
      <Box>
        <div>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <PrivateRoute exact path="/" component={LandingPage} />
              <Route path="/signup" component={TerraFormerSignup} />
              <Route path="/login" component={TeraFormerLogin} />
              <Route path="/userlogin" component={UserLogin} />
              <Route path="/home" component={TerraFormersDashBoard} />
              <PrivateRoute exact path="/" component={LandingPage} />
              <Route path="/userDashBoard" component={UserDashBoard} />
              <Route path="/usersignup" component={UserSignup} />
            </Switch>
          </BrowserRouter>
        </div>
      </Box>
    </AuthProvider>
  );
};

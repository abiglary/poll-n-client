import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import HomePage from "./components/HomePage.js";
import NavBar from "./components/NavBar.js";
import LoginPage from "./components/auth/LoginPage.js";
import SignupPage from "./components/auth/SignupPage.js";
import BrowsePolls from "./components/vote/BrowsePolls.js";
import NotFound from "./components/NotFound.js";

class App extends Component {
  constructor(props) {
    super(props);
    // get the initial value of currentUser from localStorage
    let userInfo = localStorage.getItem("currentUser");
    if (userInfo) {
      userInfo = JSON.parse(userInfo);
    }
    this.state = {
      currentUser: userInfo
    };
  }

  updateUser(newUser) {
    if (newUser) {
      //save the user info in localStorage if we are logged IN
      localStorage.setItem("currentUser", JSON.stringify(newUser));
    } else {
      // delete the user info from localStorage if we are logging OUT
      localStorage.removeItem("currentUser");
    }
    this.setState({ currentUser: newUser });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NavBar
            currentUser={this.state.currentUser}
            logoutConfirmed={() => this.updateUser(null)}
          />
        </header>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            path="/signup-page"
            render={() => {
              return (
                <SignupPage
                  currentUser={this.state.currentUser}
                  signupSuccess={user => this.updateUser(user)}
                />
              );
            }}
          />
          <Route
            path="/login-page"
            render={() => {
              return (
                <LoginPage
                  currentUser={this.state.currentUser}
                  loginSuccess={user => this.updateUser(user)}
                />
              );
            }}
          />
          <Route path="/browse-polls" component={BrowsePolls} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;

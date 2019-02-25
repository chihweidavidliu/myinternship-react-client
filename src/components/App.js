import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import background from "images/internship.jpg";
import history from "history.js";
import * as actions from "actions";
import "components/styles/App.css";
import LandingPage from "components/LandingPage";
import Dashboard from "components/Dashboard/Dashboard";
import AdminLandingPage from "components/AdminLandingPage";
import AdminSorter from "components/AdminDashboard/AdminSorter";
import AdminStudentView from "components/AdminDashboard/AdminStudentView";
import AdminCompanyView from "components/AdminDashboard/AdminCompanyView";

class App extends Component {

  async componentDidMount() {
    await this.props.fetchUser();
    if (this.props.auth) {
      if (this.props.auth.auth === "admin") {
        history.push("/admin/students");
      } else {
        history.push("/dashboard");
      }
    }
  }

  render() {
    const style = { backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundPosition: "center" }
    return (
      <Router history={history}>
        <div className="app-container" style={style}>
          <Route path="/" exact render={(props) => <LandingPage {...props} language={this.props.language} />} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/admin" exact component={AdminLandingPage} />
          <Route path="/admin/sorter" exact component={AdminSorter} />
          <Route path="/admin/students" exact component={AdminStudentView} />
          <Route path="/admin/companies" exact component={AdminCompanyView} />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    language: state.language
  }
}
export default connect(mapStateToProps, actions) (App);

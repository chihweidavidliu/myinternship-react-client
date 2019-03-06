import React, { Component } from "react";
import { Route } from "react-router-dom";

import requireAdminAuth from "requireAdminAuth";
import AdminNavbar from "./AdminNavbar";
import AdminStudentView from "components/AdminDashboard/AdminStudentView";
import AdminCompanyView from "components/AdminDashboard/AdminCompanyView";
import AdminSorter from "components/AdminDashboard/AdminSorter";
import AdminSettings from "./AdminSettings";

class AdminDashboard extends Component {
  render() {
    return (
      <div className="dashboard-container">
        <AdminNavbar />
        <div className="dashboard-flex-box">
          <div className="main-box">
            <Route path="/admin/dashboard" exact component={AdminStudentView} />
            <Route path="/admin/dashboard/sorter" exact component={AdminSorter} />
            <Route path="/admin/dashboard/companies" exact component={AdminCompanyView} />
            <Route path="/admin/dashboard/settings" exact component={AdminSettings} />
          </div>
        </div>
      </div>
    )
  }
}

export default requireAdminAuth(AdminDashboard);

import React from "react";

import requireStudentAuth from "requireStudentAuth";

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <a href="/auth/logout">Log Out</a>
    </div>
  )
};

export default requireStudentAuth(Dashboard);

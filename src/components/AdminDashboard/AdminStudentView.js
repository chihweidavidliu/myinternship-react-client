import React from "react";

import requireAdminAuth from "requireAdminAuth";

const AdminStudentView = () => {
  return (
    <div>
      <p>Admin Student View</p>
      <a href="/auth/logout">Sign-out</a>
    </div>
  )
};

export default requireAdminAuth(AdminStudentView);

/** @format */

import React from "react";
import Topbar from "../component/Topbar";
import Tabs from "../component/Tabs";
import CreateStaff from "./CreateStaff";
import StaffList from "./StaffList";

const Staff = () => {
  const tabs = [
    {label: "Create Staff", content: <CreateStaff />},
    {label: "Staff List", content: <StaffList />},
  ];

  return (
    <div>
      <Topbar name='Staff' />
      <Tabs tabs={tabs} />
    </div>
  );
};

export default Staff;

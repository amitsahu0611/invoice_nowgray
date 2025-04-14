/** @format */

import React from "react";
import Topbar from "../component/Topbar";
import Tabs from "../component/Tabs";
import CreateCompany from "./CreateCompany";
import CompanyList from "./CompanyList";

const Company = () => {
  const tabs = [
    {label: "Create Company", content: <CreateCompany />},
    {label: "Company List", content: <CompanyList />},
  ];

  return (
    <div>
      <Topbar name='Company' />
      <Tabs tabs={tabs} />
    </div>
  );
};

export default Company;

/** @format */

import React from "react";
import Topbar from "../component/Topbar";
import Tabs from "../component/Tabs";
import QuotationList from "./QuotationList";
import QuotationForm from "./QuotationForm";

const Quotation = () => {
  const tabs = [
    {label: "Create", content: <QuotationForm />},
    {label: "List", content: <QuotationList />},
  ];

  return (
    <div>
      <Topbar name='Quotations' />
      <Tabs tabs={tabs} />
    </div>
  );
};

export default Quotation;

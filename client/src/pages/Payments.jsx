/** @format */

import React from "react";
import Topbar from "../component/Topbar";
import Tabs from "../component/Tabs";
import CreatePayment from "./CreatePayment";
import PaymentList from "./PaymentList";

const Payments = () => {
  const tabs = [
    {label: "Create Payment", content: <CreatePayment />},
    {label: "Payment List", content: <PaymentList />},
  ];

  return (
    <div>
      <Topbar name='Payment' />
      <Tabs tabs={tabs} />
    </div>
  );
};

export default Payments;

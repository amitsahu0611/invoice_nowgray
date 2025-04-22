/** @format */

import {Card, CardBody, CardHeader, Typography} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import {FileText} from "lucide-react";

// The component now accepts props
export default function PieChart({
  allQuotation = 0,
  allInvoices = 0,
  approvedInvoice = 0,
  invoiceDownloaded = 0,
}) {
  const chartConfig = {
    type: "pie",
    width: 280,
    series: [allQuotation, approvedInvoice, invoiceDownloaded, allInvoices],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      labels: [
        "Quotation Created",
        "Quotation Approved",
        "Invoice Downloaded",
        "All Invoices",
      ],
      dataLabels: {
        enabled: true,
      },
      colors: ["#6366F1", "#10B981", "#F59E0B"], // Tailwind Indigo, Green, Yellow
      legend: {
        show: true,
        position: "bottom",
        fontSize: "14px",
        fontFamily: "Inter, sans-serif",
        labels: {
          colors: "#4B5563", // Gray-700
        },
      },
    },
  };

  return (
    <Card className='w-full'>
      <CardHeader
        floated={false}
        shadow={false}
        color='transparent'
        className='flex flex-col px-4 gap-4 rounded-none md:flex-row md:items-center'
      >
        <div className='w-max rounded-lg bg-indigo-600 p-4 text-white'>
          <FileText className='h-6 w-6' />
        </div>
        <div>
          <Typography variant='h6' color='blue-gray'>
            Quotation & Invoice Overview
          </Typography>
        </div>
      </CardHeader>
      <CardBody className='mt-4 grid place-items-center px-2'>
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
}

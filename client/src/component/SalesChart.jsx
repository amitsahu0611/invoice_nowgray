/** @format */

import Chart from "react-apexcharts";
import {Square3Stack3DIcon} from "@heroicons/react/24/outline";

const chartConfig = {
  type: "line",
  height: 240,
  series: [
    {
      name: "Sales",
      data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
    },
  ],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#020617"],
    stroke: {
      lineCap: "round",
      curve: "smooth",
    },
    markers: {
      size: 0,
    },
    xaxis: {
      axisTicks: {show: false},
      axisBorder: {show: false},
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      labels: {
        style: {
          colors: "#616161",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 400,
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: "dark",
    },
  },
};

export default function SalesChart() {
  return (
    <div className='bg-white rounded-xl shadow-md p-6'>
      <div className='flex flex-col gap-4 md:flex-row md:items-center'>
        <div className=' rounded-lg bg-gray-900 p-4 text-white'>
          <Square3Stack3DIcon className='h-6 w-6' />
        </div>
        <div>
          <h2 className='text-lg font-semibold text-gray-800'>Line Chart</h2>
          <p className='text-sm text-gray-500'>
            Visualize your data in a simple way using ApexCharts.
          </p>
        </div>
      </div>
      <div className='mt-4'>
        <Chart {...chartConfig} />
      </div>
    </div>
  );
}

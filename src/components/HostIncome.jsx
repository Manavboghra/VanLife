import React from "react";
import { useOutletContext } from "react-router-dom";
import { Space, Table, Tag } from "antd";

const HostIncome = () => {
  const van = useOutletContext();
  const vansData = van.reviews;
  const total = vansData?.reduce((a, b) => a + b.payment, 0) || "0";

  const columns = [
    {
      title: <span className="text-lg font-bold">Customer</span>,
      dataIndex: "customer",
      key: "customer",
      render: (text) => <div className="text-lg  font-medium">{text}</div>,
    },
    {
      title: <span className="text-lg font-bold">Payment</span>,
      dataIndex: "payment",
      key: "payment",
      render: (text) => <div className="text-lg  font-medium">{text}</div>,
    },
    {
      title: <span className="text-lg font-bold">Date</span>,
      dataIndex: "date",
      key: "date",
      render: (text) => <div className="text-lg  font-medium">{text}</div>,
    },
  ];

  const data =
    vansData.map((van, i) => {
      return {
        key: i,
        customer: van.reviewer,
        payment: `$${van.payment}`,
        date: van.date,
      };
    });

  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <div className="font-bold text-3xl text-gray-700">Income</div>

        <div className="text-xl font-[600]">
          Total:{" "}
          {total > 0 ? (
            <span className="text-green-600">${total}</span>
          ) : (
            <span className="text-red-600">${total}</span>
          )}
        </div>
      </div>
    {data && data.length > 0 ? (
  <Table columns={columns} dataSource={data} />
) : (
  <div>No data available</div>
)}

    </div>
  );
};

export default HostIncome;

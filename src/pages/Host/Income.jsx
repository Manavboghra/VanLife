import { Column } from "@ant-design/plots";
import { DatePicker } from "antd";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import CurrencyFormatter from "../../components/CurrencyFormatter";

const { MonthPicker } = DatePicker;

const Income = () => {
  const { vans = [] } = useOutletContext() || {};
  const allReviews = vans.flatMap((van) => van.reviews || []);
  const [selectedMonth, setSelectedMonth] = useState(null);


  const getMonthKey = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  };

  const monthlyIncomeMap = {};
  allReviews.forEach((review) => {
    if (!review.date || !review.payment) return;
    const key = getMonthKey(review.date);
    if (!monthlyIncomeMap[key]) monthlyIncomeMap[key] = 0;
    monthlyIncomeMap[key] += review.payment;
  });

  const data = Object.entries(monthlyIncomeMap).map(([type, value]) => ({
    type,
    value,
  }));

  const filteredReviews = selectedMonth
    ? allReviews.filter((review) => getMonthKey(review.date) === selectedMonth)
    : allReviews;

  const totalIncome = data.reduce((sum, d) => sum + d.value, 0);
  const maxAmount = Math.max(...data.map((d) => d.value), 0);
  const minAmount = Math.min(...data.map((d) => d.value), 0);

  const config = {
    data,
    xField: "type",
    yField: "value",
    scale: { y: { domain: [minAmount, maxAmount] } },
    legend: false,
    axis: {
      y: {
        gridLineDash: [10, 16],
        gridStrokeOpacity: 0.5,
        title: "Change in price ($)",
      },
    },
    state: {
      active: { fill: "#FF8C38" },
      inactive: { fill: "#FFEAD0" },
    },
  };

  // MonthPicker handler
  const handleChange = (_, dateString) => {
    if (dateString) {
      setSelectedMonth(dateString);
    } else {
      setSelectedMonth();
    }
  };


  return (
    <div className="p-8 space-y-8 bg-white min-h-screen">
      <div className=" text-4xl px-5">Income</div>
      <div className="text-4xl font-black pb-10 p-5">
        {totalIncome > 0 ? (
          <CurrencyFormatter value={totalIncome} />
        ) : (
          <span className="text-gray-400 text-xl">
            Sorry, No data available
          </span>
        )}
      </div>
      <div>
        <Column
          title={false}
          colorField={"#FF8C38"}
          frame={"dotted"}
          className={""}
          {...config}
        />
      </div>
      <div>
        <div className="text-2xl p-5 font-[600]">
          Your transactions ({filteredReviews.length})
        </div>
        <div className="mb-6 p-3">
          <MonthPicker
            onChange={handleChange}
            placeholder="Filter by month"
            format="YYYY-MM"
            allowClear
          />
        </div>
        <div className="pl-3 font-bold text-xl">
          {selectedMonth
            ? `${new Date(selectedMonth + "-01").toLocaleString("default", {
                month: "long",
              })}`
            : "All Months"}
        </div>

        {filteredReviews.length === 0 ? (
          <div className="text-gray-400 text-lg pl-3 py-8">
            No transactions found for this month.
          </div>
        ) : (
          filteredReviews.map((review, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-lg flex items-center justify-between m-3 gap-2"
            >
              <div className="text-4xl font-[600]">
                {Number(review.payment) > 0 ? (
                  Number(review.payment).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                ) : (
                  <span className="text-gray-400">No income found</span>
                )}
              </div>
              <div className="text-gray-700">
                {review.date
                  ? ` ${new Date(review.date).toLocaleDateString()}`
                  : ""}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Income;

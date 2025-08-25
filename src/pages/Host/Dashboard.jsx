import React from "react";
import CurrencyFormatter from "../../components/CurrencyFormatter";
import { useLoaderData } from "react-router-dom";

const Dashboard = () => {
  const vans = useLoaderData();

  const allReviews = (vans || []).flatMap((van) => van.reviews || []);
  const totalIncome = allReviews.reduce((sum, review) => sum + review.income, 0);

  return (
    <div>
      <div className="text-5xl">
        Total Income:
        <CurrencyFormatter value={totalIncome} />
      </div>
    </div>
  );
};

export default Dashboard;
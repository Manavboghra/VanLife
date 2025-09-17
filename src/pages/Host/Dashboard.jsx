import React, { useMemo } from "react";
import CurrencyFormatter from "../../components/CurrencyFormatter";
import { Link, useOutletContext } from "react-router-dom";
import HostVans from "../Host/HostVans";
import { Star, TrendingDown, TrendingUp } from "react-feather";

const Dashboard = () => {
  const { vans } = useOutletContext() || [];

  const { totalIncome, averageStars } = useMemo(() => {
    const allReviews = vans.flatMap((van) => van.reviews || []);
    const totalReviews = allReviews.length;

    const totalIncome = allReviews.reduce(
      (sum, r) => sum + (r.payment || 0),
      0
    );

    const averageStars =
      totalReviews > 0
        ? (
            allReviews.reduce((sum, r) => sum + (r.stars || 0), 0) /
            totalReviews
          ).toFixed(1)
        : "0";

    return { totalIncome, averageStars };
  }, [vans]);

  const totalStars = 5;

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 bg-white min-h-screen">
      <div className="text-center md:text-left">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          Welcome Back!
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Here's an overview of your hosting performance
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white border rounded-xl shadow-md p-4 md:p-6 flex flex-col">
          <div className="flex justify-between items-center">
            <h2 className="text-base md:text-lg font-semibold text-gray-700">
              Total Income
            </h2>
            <Link
              to="./income"
              className="text-xs md:text-sm text-blue-600 hover:underline"
            >
              Details
            </Link>
          </div>
          <div className="flex flex-row items-center gap-3 md:gap-4">
            <div className="mt-3 md:mt-4 text-2xl md:text-3xl font-bold text-gray-900">
              <CurrencyFormatter value={totalIncome} />
            </div>
            {totalIncome > 0 ? (
              <TrendingUp className="text-green-600" size={30} />
            ) : (
              <TrendingDown className="text-red-600" size={30} />
            )}
          </div>
        </div>

        <div className="bg-white border rounded-xl shadow-md p-4 md:p-6 flex flex-col">
          <div className="flex justify-between items-center">
            <h2 className="text-base md:text-lg font-semibold text-gray-700">
              Review Score
            </h2>
            <Link
              to="./reviews"
              className="text-xs md:text-sm text-blue-600 hover:underline"
            >
              Details
            </Link>
          </div>
          <div className="mt-3 md:mt-4 flex items-center gap-2">
            <Star size={18} className="fill-amber-400 text-amber-500" />
            <span className="text-xl md:text-2xl font-bold text-gray-900">
              {averageStars}
            </span>
            <span className="text-gray-500 text-sm">/ {totalStars}</span>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-xl shadow-md p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-2">
          <h2 className="text-base md:text-lg font-semibold text-gray-700">
            Your Vans
          </h2>
          <Link
            to="./vans"
            className="text-xs md:text-sm text-blue-600 hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="pointer-events-none">
        <HostVans propVans={vans.slice(0, 1)} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

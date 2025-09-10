import React, { useMemo } from "react";
import CurrencyFormatter from "../../components/CurrencyFormatter";
import { Link, useOutletContext } from "react-router-dom";
import HostVans from "../Host/HostVans";
import { Star } from "react-feather";

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
    <div className="p-8 space-y-8 bg-white min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Welcome Back!</h1>
        <p className="text-gray-500 text-sm">
          Here’s an overview of your hosting performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Income Card */}
        <div className="bg-white border rounded-xl shadow-md p-6 flex flex-col">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700">Total Income</h2>
            <Link to="./income" className="text-sm text-blue-600 hover:underline">
              Details
            </Link>
          </div>
          <div className="mt-4 text-3xl font-bold text-gray-900">
            <CurrencyFormatter value={totalIncome} />
          </div>
        </div>

        {/* Review Score Card */}
        <div className="bg-white border rounded-xl shadow-md p-6 flex flex-col">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700">Review Score</h2>
            <Link to="./reviews" className="text-sm text-blue-600 hover:underline">
              Details
            </Link>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Star size={20} className="fill-amber-400 text-amber-500" />
            <span className="text-2xl font-bold text-gray-900">{averageStars}</span>
            <span className="text-gray-500">/ {totalStars}</span>
          </div>
        </div>
      </div>

      {/* Vans Section */}
      <div className="bg-white border rounded-xl shadow-md p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Your Vans</h2>
          <Link to="./vans" className="text-sm text-blue-600 hover:underline">
            View All
          </Link>
        </div>
        <HostVans propVans={vans.slice(0, 1)} />
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useMemo } from "react";
import CurrencyFormatter from "../../components/CurrencyFormatter";
import { Link, useOutletContext } from "react-router-dom";
import HostVans from "../Vans/HostVans";
import { Star } from "react-feather";

const Dashboard = () => {
  const {vans, currentUser} = useOutletContext() || [];
  
  const { totalIncome, averageStars } = useMemo(() => {
  // const filter = vans.filter((van) => van.hostId === currentUser?.hostId);

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

    if (currentUser?.hostId === "01") {
    return (
      <div className="bg-[#FFF7ED] h-full flex items-center justify-center p-10">
        <div className="text-2xl font-semibold text-gray-500">
          Sorry, you do not have this access.
        </div>
      </div>
    );
  }


  return (
    <div className="text-4xl">
      <div className="bg-[#FFEAD0] p-6 flex flex-col gap-3">
        <div className="font-bold text-3xl">Welcome!</div>
        <div className="text-lg flex justify-between">
          <div className="text-[#4D4D4D]">Total Income:</div>
          <div className="hover:underline text-sm content-center">
            <Link to="./income">Details</Link>
          </div>
        </div>
        <div className="font-bold">
          <CurrencyFormatter value={totalIncome} />
        </div>
      </div>

      <div className="text-lg p-6 bg-[#FFDDB2] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="font-bold">Review score</div>
          <Star size={19} className="fill-amber-400 text-amber-500" />
          <div className="flex items-baseline font-bold">
            {averageStars}/<span className="font-light">{totalStars}</span>
          </div>
        </div>

        <div className="hover:underline text-sm">
          <Link to="./reviews">Details</Link>
        </div>
      </div>

      <div className="relative">
        <div className="pointer-events-none">
          <div className="flex flex-col-reverse">
            <HostVans propVans={vans.slice(0, 1)} />
          </div>
        </div>
        <div className="absolute hover:underline top-6 right-4 text-sm px-2 py-1 rounded">
          <Link to="./vans">View All</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

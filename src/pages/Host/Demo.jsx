// import React from "react";
// import { useLoaderData } from "react-router-dom";
// import { Star } from "react-feather";

// const Demo = () => {
//   const vans = useLoaderData();

//   const allReviews = vans.flatMap((van) => van.reviews || []);

//   const starCount = [5, 4, 3, 2, 1];
//   const totalReviews = allReviews.length;

//   const starStats = starCount.map((star) => {
//     const count = allReviews.filter((r) => r.stars === star).length;
//     const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
//     return { star, count, percentage };
//   });

//   return (
//     <div>
//       {/* {vans.map((van) => (
//         <div key={van.id} className="mb-6 pb-4">
//           {van.reviews && van.reviews.length > 0 ? (
//             van.reviews.map((review, idx) => (
//               <div key={idx} className="flex items-center gap-1">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     size={16}
//                     className={
//                       i < review.stars
//                         ? "text-yellow-500 fill-yellow-500"
//                         : "text-gray-300"
//                     }
//                   />
//                 ))}
//                 <span className="ml-2 text-sm text-gray-600">{review.comment}</span>
//               </div>
//             ))
//           ) : (
//             <p className="text-sm text-gray-500">No reviews yet.</p>
//           )}
//         </div>
//       ))} */}

//       {starStats.map(({ star, percentage }) => (
//         <div key={star} className="flex flex-row items-center gap-5 p-2">
//           <div className="w-12">{star} stars</div>
//           <div className="flex-1 bg-gray-300 h-4 rounded-2xl overflow-hidden">
//             <div
//               className="bg-yellow-400 h-4 rounded-2xl transition-all duration-300"
//               style={{ width: `${percentage}%` }}
//             />
//           </div>
//           <div className="w-12 text-right">{percentage.toFixed(0)}%</div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Demo;
  import { Column } from "@ant-design/plots";
  import React, { useState } from "react";
  import { useLoaderData } from "react-router-dom";

  const Demo = () => {
    const vans = useLoaderData();
    const allReviews = vans.flatMap((van) => van.reviews || []);

    const monthlyIncomeMap = {};
    allReviews.forEach((review) => {
      if (!review.date || !review.income) return;

      const d = new Date(review.date);
      const label = `${d.toLocaleString("en-US", { month: "long" })} `;
      if (!monthlyIncomeMap[label]) monthlyIncomeMap[label] = 0;
      monthlyIncomeMap[label] += review.income;
    });

    const data = Object.entries(monthlyIncomeMap).map(([type, value]) => ({ type, value }));

    const totalIncome = data.reduce((sum, d) => sum + d.value, 0);
    const maxAmount = Math.max(...data.map((d) => d.value), 0);
    const minAmount = Math.min(...data.map((d) => d.value), 0);


  const config = {

      data,
      xField: "type",
      yField: "value",
      markBackground: { style: { fill: "#eee" } },
      scale: { y: { domain: [minAmount, maxAmount] } },
      legend: false,
      animate: {
        enter: { type: "scaleInY", duration: 800 },
        update: { type: "morphing" },
      },

    };


      return (
        <div  className="bg-[#FFF7ED]">
          <div className="text-4xl font-extrabold p-5">
            {totalIncome.toLocaleString("en-US", { style: "currency", currency: "USD" })}
          </div>
          <div >
          <Column  title={false} colorField={"#FF8C38"} frame={"dotted"} className={""} {...config} />
          </div>
        </div>
      );
    };

  export default Demo;
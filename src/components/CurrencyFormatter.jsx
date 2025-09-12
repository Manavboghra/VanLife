import React from "react";

const CurrencyFormatter = ({ value, currency = "USD", locale = "en-US" }) => {
  if (typeof value !== "number") return null;
  const formattedValue = value.toLocaleString(locale, {
    style: "currency",
    currency,
  });
  return <span>{formattedValue}</span>;
};

export default CurrencyFormatter;
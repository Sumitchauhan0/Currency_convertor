import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    if (!currency) return;

    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency.toLowerCase()}.json`)
      .then((res) => res.json())
      .then((res) => {
        console.log("API response:", res);
        setData(res[currency.toLowerCase()]);
      })
      .catch((err) => {
        console.error("API fetch error:", err);
        setData({}); // Fallback to avoid crash
      });
  }, [currency]);

  return data;
}

export default useCurrencyInfo;
